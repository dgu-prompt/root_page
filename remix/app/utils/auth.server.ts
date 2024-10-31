export async function validateCredentials(
  username: string,
  password: string
): Promise<string | null> {
  if (username === "testuser" && password === "password123") {
    return username;
  }

  // For testing
  if (password) {
    return username;
  }

  return null;
}
