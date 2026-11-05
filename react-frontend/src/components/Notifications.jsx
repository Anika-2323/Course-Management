import { useEffect, useState } from "react";
import api from "../services/api";
import { createSocket } from "../api/socketClient";

function Notifications({ onReply }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const apiBase = (api.defaults.baseURL || "").replace(/\/+$/, "");
  const endpointPrefix = apiBase.endsWith("/api/v1")
    ? ""
    : apiBase.endsWith("/api")
      ? "/v1"
      : "/api/v1";
  const baseEndpoint = `${endpointPrefix}/notifications`;

  useEffect(() => {
    let active = true;

    api
      .get(baseEndpoint)
      .then((res) => {
        if (active) {
          setNotifications(res.data.notifications || []);
        }
      })
      .catch(() => {});

    const socket = createSocket();

    socket.on("new_notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    socket.connect();

    return () => {
      active = false;
      socket.disconnect();
    };
  }, [baseEndpoint]);

  async function markRead(id) {
    try {
      await api.patch(`${baseEndpoint}/${id}/read`);
      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  function openMessage(item) {
    if (!item.isRead) {
      markRead(item._id);
    }
    setIsOpen(false);
    if (onReply) {
      let senderIdentifier = item.senderId || item.sender?._id || item.sender;
      if (!senderIdentifier && item.message && item.message.toLowerCase().includes("from ")) {
        senderIdentifier = item.message.split(/from /i)[1]?.trim();
      }
      onReply(senderIdentifier);
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const unreadNotifications = notifications.filter((notification) => !notification.isRead);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 18px",
          fontSize: "0.88rem",
          cursor: "pointer"
        }}
      >
        <span>Notifications</span>
        {unreadCount > 0 && (
          <span
            style={{
              background: "#b91c1c",
              color: "#fff",
              borderRadius: "12px",
              padding: "2px 8px",
              fontSize: "0.75rem",
              fontWeight: "600"
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: "360px",
            background: "#fff",
            border: "1px solid var(--line, #e2ded5)",
            borderRadius: "var(--radius, 8px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            zIndex: 100,
            padding: "16px",
            fontFamily: "var(--body, sans-serif)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              borderBottom: "1px solid var(--line, #eee)",
              paddingBottom: "8px"
            }}
          >
            <h4
              style={{
                margin: 0,
                fontFamily: "var(--display, serif)",
                fontSize: "1.1rem",
                color: "var(--ink, #1a1a1a)"
              }}
            >
              Alerts & Notifications
            </h4>
            <span style={{ fontSize: "0.78rem", opacity: 0.6 }}>
              {unreadCount} unread
            </span>
          </div>

          <div style={{ maxHeight: "280px", overflowY: "auto" }}>
            {unreadNotifications.length === 0 ? (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#888",
                  textAlign: "center",
                  padding: "1rem"
                }}
              >
                No unread notifications right now.
              </p>
            ) : (
              unreadNotifications.map((item) => {
                const isMessageAlert =
                  item.title === "New Message" ||
                  (item.message && item.message.toLowerCase().includes("message from"));

                return (
                  <div
                    key={item._id}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      background: item.isRead ? "transparent" : "rgba(235, 243, 255, 0.7)",
                      border: "1px solid",
                      borderColor: item.isRead ? "var(--line, #eee)" : "#cfe2ff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        color: "var(--ink, #1a1a1a)",
                        lineHeight: "1.3"
                      }}
                    >
                      {item.message}
                    </p>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      {isMessageAlert ? (
                          <button
                            type="button"
                            onClick={() => openMessage(item)}
                            style={{
                              background: "var(--ink, #1f2937)",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              padding: "3px 8px",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                              fontWeight: "600",
                              whiteSpace: "nowrap"
                            }}
                          >
                            Open chat
                          </button>
                        ) : (
                        !item.isRead && (
                          <button
                            type="button"
                            onClick={() => markRead(item._id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#0369a1",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                              fontWeight: "600",
                              whiteSpace: "nowrap"
                            }}
                          >
                            Read
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;