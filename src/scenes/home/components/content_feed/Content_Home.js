import HorizontalList from "../horizontal_list/Horizontal_List";
import Board from "../board/Board";
import "./style.css";

export default function ContentHome({ domain, postData, page, setPage }) {
  return (
    <div className="main__content">
      <HorizontalList />
      <Board
        title={"Recent Posts"}
        postData={postData}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
