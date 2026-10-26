import api from "./api";

export async function registerStudent(studentData) {
  const response = await api.post("/api/v1/auth/register", studentData);
  return response.data;
}

export async function loginStudent(credentials) {
  const response = await api.post("/api/v1/auth/login", credentials);
  return response.data;
}