export default function changeP2Span(content) {
  content = content.replace("<p>", "<span>");
  content = content.replace("</p>", "</span>");
  return content;
}
