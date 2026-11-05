import { useEffect, useState, useRef } from "react";
import { createSocket } from "../api/socketClient";
import api from "../services/api";

function apiEndpoint(path) {
  const baseURL = (api.defaults.baseURL || "").replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (baseURL.endsWith("/api/v1")) return cleanPath;
  if (baseURL.endsWith("/api")) return `/v1${cleanPath}`;
  return `/api/v1${cleanPath}`;
}

function Chat({ isOpen, onClose, initialRecipientId = null }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch student directory when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const endpoint = apiEndpoint("/students/directory");
    let active = true;

    setStudentsLoading(true);
    setStudentsError("");
    api
      .get(endpoint)
      .then((res) => {
        if (active) {
          setStudents(res.data.students || []);
        }
      })
      .catch((fetchError) => {
        console.error("Failed to load student directory:", fetchError);
        if (active) {
          setStudentsError("Unable to load the student list. Please try again.");
        }
      })
      .finally(() => {
        if (active) {
          setStudentsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isOpen]);
  // Auto-select peer when opening via Reply (supports either user _id or student Name)
  useEffect(() => {
      if (!isOpen || !initialRecipientId || students.length === 0) return;

      // Check if initialRecipientId matches a student _id or a student name
      const targetStudent = students.find(
        (s) =>
          s._id === initialRecipientId ||
          (s.name && s.name.toLowerCase() === String(initialRecipientId).toLowerCase())
      );

      if (targetStudent) {
        handleSelectRecipient(targetStudent._id);
      } else if (typeof initialRecipientId === "string" && initialRecipientId.length === 24) {
        handleSelectRecipient(initialRecipientId);
      }
    }, [isOpen, initialRecipientId, students]);
  // Connect socket
  useEffect(() => {
    if (!isOpen) return;

    const client = createSocket();

    client.on("connect", () => {
      setConnected(true);
      setError("");
    });

    client.on("disconnect", () => {
      setConnected(false);
    });

    client.on("connect_error", (err) => {
      setError(err.message || "Failed to connect to chat server");
    });

    client.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    client.connect();
    setSocket(client);

    return () => {
      client.disconnect();
    };
  }, [isOpen]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat history whenever a recipient is selected
  async function handleSelectRecipient(id) {
    setRecipientId(id);
    if (!id) {
      setMessages([]);
      return;
    }
    setError("");
    try {
      const endpoint = apiEndpoint(`/messages/${id}`);

      const res = await api.get(endpoint);
      setMessages(res.data.messages || []);
    } catch (err) {
      setError("Could not load message history.");
    }
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!socket || !connected || !message.trim() || !recipientId) return;

    socket.emit(
      "send_message",
      {
        recipientId,
        text: message.trim()
      },
      (ack) => {
        if (ack?.success) {
          setMessage("");
          setError("");
        } else {
          setError(ack?.message || "Failed to send message");
        }
      }
    );
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "16px",
        backdropFilter: "blur(4px)"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "520px",
          borderRadius: "var(--radius, 12px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid var(--line, #e2ded5)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--line, #eee)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fcfbfa"
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--display, serif)",
                fontSize: "1.25rem",
                color: "var(--ink, #1a1a1a)"
              }}
            >
              Peer Messaging Workspace
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                marginTop: "3px"
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: connected ? "#16a34a" : "#dc2626"
                }}
              />
              <span style={{ color: connected ? "#16a34a" : "#dc2626", fontWeight: "500" }}>
                {connected ? "Connected" : "Offline"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.4rem",
              cursor: "pointer",
              color: "var(--ink, #666)"
            }}
          >
            ×
          </button>
        </div>

        {/* Peer Selection Dropdown */}
        <div
          style={{
            padding: "12px 20px",
            background: "#faf9f6",
            borderBottom: "1px solid var(--line, #eee)"
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#555",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}
          >
            Select a student (online or offline):
          </label>
          <select
            value={recipientId}
            onChange={(e) => handleSelectRecipient(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid var(--line, #ccc)",
              fontSize: "0.9rem",
              fontFamily: "var(--body, sans-serif)",
              background: "#fff",
              cursor: "pointer"
            }}
          >
            <option value="">-- Choose a student --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>
          {studentsLoading && <p style={{ margin: "8px 0 0", fontSize: "0.82rem" }}>Loading students...</p>}
          {studentsError && <p role="alert" style={{ margin: "8px 0 0", color: "#991b1b", fontSize: "0.82rem" }}>{studentsError}</p>}
          {!studentsLoading && !studentsError && students.length === 0 && (
            <p style={{ margin: "8px 0 0", fontSize: "0.82rem" }}>No other students are registered yet.</p>
          )}
        </div>

        {error && (
          <div
            style={{
              padding: "8px 20px",
              background: "#fef2f2",
              color: "#991b1b",
              fontSize: "0.82rem"
            }}
          >
            {error}
          </div>
        )}

        {/* Message Stream */}
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "#fff"
          }}
        >
          {!recipientId ? (
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                color: "#999",
                fontSize: "0.88rem"
              }}
            >
              Select a student from the dropdown above to start a conversation.
            </div>
          ) : messages.length === 0 ? (
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                color: "#999",
                fontSize: "0.88rem"
              }}
            >
              No message history yet. Say hello!
            </div>
          ) : (
            messages.map((item, idx) => {
              const isMine =
                String(item.recipient?._id || item.recipient || item.receiver?._id || item.receiver) === recipientId;
              return (
                <div
                  key={item._id || idx}
                  style={{
                    alignSelf: isMine ? "flex-end" : "flex-start",
                    maxWidth: "75%",
                    background: isMine ? "var(--ink, #1f2937)" : "#f3f4f6",
                    color: isMine ? "#fff" : "var(--ink, #1f2937)",
                    padding: "8px 14px",
                    borderRadius: isMine ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    fontSize: "0.88rem",
                    lineHeight: "1.4"
                  }}
                >
                  <p style={{ margin: 0 }}>{item.text || item.content}</p>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={sendMessage}
          style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--line, #eee)",
            display: "flex",
            gap: "10px",
            background: "#fcfbfa"
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!recipientId || !connected}
            placeholder={
              !recipientId
                ? "Select a student first..."
                : "Type your message..."
            }
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid var(--line, #ccc)",
              fontSize: "0.88rem",
              fontFamily: "var(--body, sans-serif)",
              background: !recipientId ? "#f5f5f5" : "#fff"
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!connected || !message.trim() || !recipientId}
            style={{
              padding: "10px 20px",
              fontSize: "0.88rem",
              background: "var(--ink, #1f2937)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: !connected || !message.trim() || !recipientId ? "not-allowed" : "pointer"
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;