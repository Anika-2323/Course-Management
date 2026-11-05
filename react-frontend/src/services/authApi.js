import api from "./api";

function resolveEndpoint(path) {
  const base = api.defaults.baseURL || "";
  if (base.endsWith("/api/v1")) {
    return path.replace(/^\/?(api\/)?v1\//, "/");
  }
  if (base.endsWith("/api")) {
    return path.startsWith("/") ? path : `/${path}`;
  }
  return path.startsWith("/api") ? path : `/api${path.startsWith("/") ? path : `/${path}`}`;
}

export async function registerStudent(studentData) {
  const endpoint = resolveEndpoint("/v1/auth/register");
  const response = await api.post(endpoint, studentData);
  return response.data;
}

export async function loginStudent(credentials) {
  const endpoint = resolveEndpoint("/v1/auth/login");
  const response = await api.post(endpoint, credentials);
  return response.data;
}