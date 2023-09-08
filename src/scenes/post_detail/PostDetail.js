import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentBoard from "./components/content/Content";
import CommentBoard from "./components/comment/Comment";
import "./style.css";

export default function PostDetail() {
  const [postDetail, setPostDetail] = useState();
  const [trigger, setTrigger] = useState(false);
  const postId = useParams().postId;

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
    <>
      <Header />
      <Gnb />
      <main className="post-detail__main">
        <ContentBoard
          postDetail={postDetail}
          trigger={trigger}
          setTrigger={setTrigger}
        />

        <CommentBoard
          postDetail={postDetail}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      </main>
    </>
  );
}
