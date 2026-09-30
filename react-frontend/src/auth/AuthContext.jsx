import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [loggedInStudent, setLoggedInStudent] = useState(() => {
        const data = localStorage.getItem("loggedInStudent");
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            localStorage.removeItem("loggedInStudent");
            return null;
        }
    });

    const [loggedInAdmin, setLoggedInAdmin] = useState(() => {
        const data = localStorage.getItem("loggedInAdmin");
        if (!data) return localStorage.getItem("isAdminVerified") === "true" ? { role: "admin" } : null;
        try {
            return JSON.parse(data);
        } catch {
            localStorage.removeItem("loggedInAdmin");
            return null;
        }
    });

    function loginStudent(student) {
        setLoggedInStudent(student);
        localStorage.setItem("loggedInStudent", JSON.stringify(student));
    }

    function loginAdmin(admin) {
        logoutStudent();
        setLoggedInAdmin(admin);
        localStorage.setItem("loggedInAdmin", JSON.stringify(admin));
        localStorage.setItem("isAdminVerified", "true");
    }

    function logoutStudent() {
        setLoggedInStudent(null);
        localStorage.removeItem("loggedInStudent");
        localStorage.removeItem("isStudentLoggedIn");
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentAcademicId");
    }

    function logoutAdmin() {
        setLoggedInAdmin(null);
        localStorage.removeItem("loggedInAdmin");
        localStorage.removeItem("isAdminVerified");
    }

    function logout(role) {
        if (role === "admin") {
            logoutAdmin();
        } else {
            logoutStudent();
        }
    }

    return (
        <AuthContext.Provider
            value={{
                loggedInStudent,
                loggedInAdmin,
                loginStudent,
                loginAdmin,
                logoutStudent,
                logoutAdmin,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}