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
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) return null;

        const data = localStorage.getItem("loggedInAdmin");
        if (!data) return null;
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

    function loginAdmin(admin, token) {
        if (!token) {
            throw new Error("Admin login did not return an authentication token");
        }
        logoutStudent();
        setLoggedInAdmin(admin);
        localStorage.setItem("loggedInAdmin", JSON.stringify(admin));
        localStorage.setItem("isAdminVerified", "true");
        sessionStorage.setItem("role", "admin");
        sessionStorage.setItem("user", JSON.stringify(admin));
        if (token) sessionStorage.setItem("token", token);
    }

    function logoutStudent() {
        setLoggedInStudent(null);
        localStorage.removeItem("loggedInStudent");
        localStorage.removeItem("isStudentLoggedIn");
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentAcademicId");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_name");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("studentUser");
    }

    function logoutAdmin() {
        setLoggedInAdmin(null);
        localStorage.removeItem("loggedInAdmin");
        localStorage.removeItem("isAdminVerified");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_name");
        sessionStorage.removeItem("token");
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