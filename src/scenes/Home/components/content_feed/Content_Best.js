import Board from "../component/board/Board";
import "./style.css";

export default function Best({ postData, pageNum, setPageNum }) {
  return (
    <div className="main__content">
      <Board
        title={"Best Posts"}
        postData={postData}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </div>
  );
}
