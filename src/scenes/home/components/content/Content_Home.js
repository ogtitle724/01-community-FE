import Board from "../../../../components/board/Board";

export default function ContentHome({ posts, mainEle }) {
  return (
    <>
      <Board posts={posts} mainEle={mainEle} title={"인기글"} />
    </>
  );
}
