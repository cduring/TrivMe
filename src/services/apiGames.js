import supabase from "./supabase";

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
