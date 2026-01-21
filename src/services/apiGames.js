import supabase from "./supabase";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function createGame(game) {
  const { data, error } = await supabase
    .from("games")
    .insert([{ ...game }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Game could not be created!");
  }

  return data;
}

export async function getGame(id) {
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Game could not be found!");
  }

  return game;
}

export async function getGames() {
  const { data: games, error } = await supabase.from("games").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message || "Games could not be found!");
  }

  return games;
}

export async function generateGame(prompt) {
  console.log(backendUrl);
  const res = await fetch(`${backendUrl}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate game");
  }

  return await res.json();
}
