import supabase from "./supabase";

export async function createAnswer(answer) {
  const { data, error } = await supabase
    .from("gameAnswers")
    .insert([answer])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Answer could not be submitted!");
  }

  return data;
}

export async function getAnswers(sessionId) {
  const { data, error } = await supabase
    .from("gameAnswers")
    .select("*")
    .eq("sessionId", sessionId);

  if (error) {
    console.error(error);
    throw new Error(error.message || "Answers could not be loaded!");
  }

  return data;
}
