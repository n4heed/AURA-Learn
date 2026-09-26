import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "./repo";
import { homeFor, SESSION_COOKIE, verifySession, type SessionPayload } from "./session";
import type { Role, User } from "./types";

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  return verifySession(jar.get(SESSION_COOKIE)?.value);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;
  const user = getUserById(session.uid);
  // A cookie for a user that no longer exists (e.g. after a store reset) is treated as signed out.
  return user && user.role === session.role ? user : null;
}

/** Guard for server components/layouts. Sends signed-out users to login and wrong-role users home. */
export async function requireUser(role?: Role): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (role && user.role !== role) redirect(homeFor(user.role));
  return user;
}

/** For API routes: the signed-in student, or null. */
export async function getStudentUser(): Promise<User | null> {
  const user = await getCurrentUser();
  return user && user.role === "student" ? user : null;
}
