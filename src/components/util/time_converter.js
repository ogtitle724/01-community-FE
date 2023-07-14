export default function timeConverter(wr_date) {
  console.log(wr_date);
  const date = new Date(wr_date);
  const now = new Date();
  const diffMinutes = ~~((now - date) / (1000 * 60));
  let timeDisplay;

  if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes}분 전`;
  } else if (diffMinutes < 60 * 24) {
    timeDisplay = `${~~(diffMinutes / 60)}시간 전`;
  } else {
    timeDisplay = wr_date.slice(0, -8).replace("T", " ");
  }

  return timeDisplay;
}
