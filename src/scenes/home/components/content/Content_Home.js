import Board from "../../../../components/board/Board";

export default function ContentHome({ posts }) {
  return (
    <>
      <Board posts={posts} title={"인기글"} />
    </>
  );
}
