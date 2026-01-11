import { generateNickname } from "../utils/gameFunctions";
import supabase from "./supabase";

export async function getPlayers(sessionId) {
  const { data: gamePlayers, error } = await supabase
    .from("gamePlayers")
    .select("*")
    .eq("sessionId", sessionId);

  if (error) {
    console.error(error);
    throw new Error(error.message || "Issue with fetching players.");
  }

  return gamePlayers;
}

export async function createPlayer(player) {
  // provided player object should just come with sessionId and score
  const nickname = generateNickname();

  const { data: playerData, error } = await supabase
    .from("gamePlayers")
    .insert([{ ...player, nickname }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Issue with creating new player.");
  }

  return playerData;
}

export async function deletePlayer(playerId) {
  const { error } = await supabase
    .from("gamePlayers")
    .delete()
    .eq("id", playerId);

  if (error) {
    console.error(error);
    throw new Error("Player could not be deleted!");
  }
}
