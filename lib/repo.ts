import { getStore } from "./db";
import type { Role, StudentProfile, User } from "./types";

/** Thin read helpers over the store. Feature code should prefer these over touching the store directly. */

export function getUserById(id: string): User | undefined {
  return getStore().users.find((u) => u.id === id);
}

export function getStudentProfile(studentId: string): StudentProfile | undefined {
  return getStore().studentProfiles.find((p) => p.studentId === studentId);
}

export function listDemoAccounts(): User[] {
  return getStore().users.filter((u) => u.demo);
}

export function listUsersByRole(role: Role): User[] {
  return getStore().users.filter((u) => u.role === role);
}
