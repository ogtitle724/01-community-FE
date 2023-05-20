import HorizontalList from "../component/horizontal_list/Horizontal_List";
import Board from "../component/board/Board";
import "./style.css";

export default function ContentHome() {
  return (
    <div className="main__content">
      <HorizontalList />
      <Board
        title={"Recent Posts"}
        postData={Array(200).fill("")}
        postNum={20}
      />
    </div>
  );
}
