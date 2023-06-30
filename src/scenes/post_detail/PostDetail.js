import { useLocation } from "react-router-dom";
import sanitizeHtml from "sanitize-html-react";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentBoard from "./components/content/Content";
import CommentBoard from "./components/comment/Comment";
import "./style.css";

export default function PostDetail() {
  const location = useLocation();
  const post = location.state;

  const sanitize = (content) =>
    sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["span", "img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt"],
      },
    });

  return (
    <div className="post-detail">
      <Header />
      <Gnb />
      <main className="post-detail__main">
        <div className="post-detail__wrapper">
          <ContentBoard post={post} sanitize={sanitize} />
          <CommentBoard sanitize={sanitize} />
        </div>
      </main>
    </div>
  );
}
