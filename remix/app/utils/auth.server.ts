export async function validateCredentials(
  username: string,
  password: string
): Promise<string | null> {
  if (process.env.NODE_ENV === "development") {
    const usersDB = [{ username: "testuser", password: "password123" }];
    const user = usersDB.find(
      (u) => u.username === username && u.password === password
    );

    return user ? user.username : null;
  } else {
    const apiUrl = process.env.API_URL;
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.userId;
  }
}
