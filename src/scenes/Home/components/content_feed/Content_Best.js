import Board from "../component/board/Board";
import "./style.css";

export default function Best() {
  return (
    <div className="main__content">
      <Board title={"Best Posts"} postData={Array(200).fill("")} postNum={35} />
    </div>
  );
}
