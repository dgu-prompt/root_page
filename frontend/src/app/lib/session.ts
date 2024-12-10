import "server-only";
import { cookies } from "next/headers";

export async function createSession({
  token,
  username,
}: {
  token: string;
  username: string;
}) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일 후 만료
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 옵션 활성화
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("username", username, {
    httpOnly: false, // JavaScript에서도 접근 가능
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일 연장

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 옵션 활성화
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("username");
}
