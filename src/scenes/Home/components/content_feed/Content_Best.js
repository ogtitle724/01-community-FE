import Board from "../component/board/Board";
import "./style.css";

export default function Best({ postData }) {
  return (
    <div className="main__content">
      <Board title={"Best Posts"} postData={postData} postNum={35} />
    </div>
  );
}
