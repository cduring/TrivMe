export function formatDesc(str, len = 40) {
  const text = String(str ?? "");
  if (text.length <= len) return text;
  return text.slice(0, len) + "...";
}
