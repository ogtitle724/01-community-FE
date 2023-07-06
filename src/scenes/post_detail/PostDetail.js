import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/signSlice";
import sanitizeHtml from "sanitize-html-react";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentBoard from "./components/content/Content";
import CommentBoard from "./components/comment/Comment";
import "./style.css";

export default function PostDetail() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const postId = location.state.postId;

  const [postDetail, setPostDetail] = useState();
  const [isWriter, setIsWriter] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const initialSet = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_PATH_BOARD + `/${postId}`
        );
        const post = res.data;

        if (user && post.user.id === user.id) {
          setIsWriter(true);
        } else {
          setIsWriter(false);
        }

        setPostDetail(post);
      } catch (err) {
        console.log(err);
      }
    };

    initialSet();
  }, [postId, trigger]);

  useEffect(() => {
    const checkWriter = async () => {
      if (postDetail) {
        if (postDetail.user.id === user.id) {
          setIsWriter(true);
        } else {
          setIsWriter(false);
        }
      }
    };

    checkWriter();
  }, [user]);

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
          {postDetail && (
            <ContentBoard
              postDetail={postDetail}
              isWriter={isWriter}
              user={user}
              trigger={trigger}
              setTrigger={setTrigger}
              sanitize={sanitize}
            />
          )}
          {postDetail && (
            <CommentBoard
              postDetail={postDetail}
              user={user}
              trigger={trigger}
              setTrigger={setTrigger}
              sanitize={sanitize}
            />
          )}
        </div>
      </main>
    </div>
  );
}
