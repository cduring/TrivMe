import supabase from "./supabase";

export async function createQuestion() {
  const { data, error } = await supabase
    .from("questions")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
}
