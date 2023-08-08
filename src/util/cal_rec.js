export default function calRecommend(recObj) {
  const recommendations = Object.entries(recObj);

  const recNum = recommendations.filter((value) => value[1] === 1).length;
  const nrecNum = recommendations.filter((value) => value[1] === -1).length;

  return { like: recNum, disLike: nrecNum, result: recNum - nrecNum };
}
