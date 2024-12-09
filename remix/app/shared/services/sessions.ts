import { createCookieSessionStorage } from "@remix-run/node";

interface SessionData {
  userId: string;
}

interface SessionFlashData {
  error: string;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 30 * 48,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET || "default_secret"],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { commitSession, destroySession, getSession };
