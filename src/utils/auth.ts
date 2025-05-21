const USER_CREDENTIALS = [
  { username: "student", password: "1234", role: "student" },
  { username: "admin", password: "admin", role: "admin" },
];

export function login(username: string, password: string): boolean {
  const user = USER_CREDENTIALS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("user");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
