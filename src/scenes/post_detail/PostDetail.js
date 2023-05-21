import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentBoard from "./components/content/Content";
import CommentBoard from "./components/comment/Comment";
import "./style.css";

export default function PostDetail({ domain }) {
  return (
    <div className="post-detail">
      <Header domain={domain} />
      <Gnb />
      <main className="post-detail__main">
        <div className="post-detail__wrapper">
          <ContentBoard />
          <CommentBoard />
        </div>
      </main>
    </div>
  );
}
