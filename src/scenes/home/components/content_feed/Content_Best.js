import Board from "../board/Board";
import "./style.css";

export default function Best({ postData, page, setPage }) {
  return (
    <div className="main__content">
      <Board
        title={"Best Posts"}
        postData={postData}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
