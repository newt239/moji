export function extractText(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || "").trim();
}

export function isEmptyContent(html: string): boolean {
  return extractText(html) === "";
}
