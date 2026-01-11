import supabase from "./supabase";

export async function createQuestions(questions) {
  const { data, error } = await supabase
    .from("questions")
    .insert(questions)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Questions could not be added!");
  }

  return data;
}
export async function getQuestions(gameId) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("gameId", gameId)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message || "Questions could not be loaded!");
  }

  return data;
}

export async function updateQuestion(id, question) {
  const { data, error } = await supabase
    .from("questions")
    .update(question)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Question could not be updated!");
  }

  return data;
}

export async function deleteQuestion(id) {
  const { error } = await supabase.from("questions").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message || "Question could not be deleted!");
  }
}
