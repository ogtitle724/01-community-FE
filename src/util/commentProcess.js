export default function changeP2Span(content) {
  content = content.replace("<p>", "<span>");
  content = content.replace("</p>", "</span>");
  return content;
}

export function getTitle(content) {
  console.log(content);
  content = content.replace("<span>", "");
  let idx = content.indexOf("</span>");

  if (content.indexOf("&lt;img") === 0) {
    return "<이미지 댓글>";
  }

  if (idx < 18) {
    content = content.slice(0, idx);
  } else {
    content = content.slice(0, 18) + "...";
  }

  return content;
}
