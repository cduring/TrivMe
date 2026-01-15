import { sessionCodeGenerator } from "../utils/dbHelpers";
import supabase from "./supabase";

export async function createSession(gameId, hostId) {
  const sessionCode = sessionCodeGenerator();

  const gameSession = hostId
    ? { gameId, hostId, sessionCode }
    : { gameId, sessionCode };

  const { data, error } = await supabase
    .from("gameSessions")
    .insert([gameSession])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Game session could not be created!");
  }

  return data;
}

export async function getSession(sessionCode) {
  const { data: gameSession, error } = await supabase
    .from("gameSessions")
    .select("*")
    .eq("sessionCode", sessionCode)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Session was not found!");
  }

  return gameSession;
}

export async function updateSession(id, updates) {
  const { data, error } = await supabase
    .from("gameSessions")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Session could not be updated!");
  }

  return data;
}

export async function deleteSession(sessionId) {
  const { error } = await supabase
    .from("gameSessions")
    .delete()
    .eq("id", sessionId);

  if (error) {
    console.error(error);
    throw new Error("Session could not be deleted!");
  }
}
