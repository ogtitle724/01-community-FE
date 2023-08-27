import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentBoard from "./components/content/Content";
import CommentBoard from "./components/comment/Comment";
import "./style.css";

export default function PostDetail() {
  console.log("post detail rendered");
  const location = useLocation();
  const postId = location.state.postId;

  const [postDetail, setPostDetail] = useState();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      try {
        let path = process.env.REACT_APP_PATH_POST.replace("{post-id}", postId);
        const res = await axios.get(path);
        const post = res.data;
        setPostDetail(post);
      } catch (err) {
        console.log(err);
      }
    };

    getPostData();
  }, [postId, trigger]);

  return (
    <div className="post-detail">
      <Header />
      <Gnb />
      <main className="post-detail__main">
        <div className="post-detail__wrapper">
          {postDetail && (
            <ContentBoard
              postDetail={postDetail}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          )}
          {postDetail && (
            <CommentBoard
              postDetail={postDetail}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          )}
        </div>
      </main>
    </div>
  );
}
