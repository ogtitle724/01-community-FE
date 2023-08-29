import HorizontalList from "../horizontal_list/Horizontal_List";
import Board from "../../../../components/board/Board";

export default function ContentHome({ posts, mainEle }) {
  return (
    <>
      <HorizontalList />
      <Board posts={posts} mainEle={mainEle} title={"인기글"} />
    </>
  );
}
