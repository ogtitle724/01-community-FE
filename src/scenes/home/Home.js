import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectPage,
  setPage,
} from "../../redux/slice/pageSlice";
import axios from "axios";

import Header from "../../components/header/Header";
import Snb from "../../components/snb/Snb";
import ContentHome from "./components/content_feed/Content_Home";
import ContentBest from "./components/content_feed/Content_Best";
import ContentTopic from "./components/content_topic/Content_Topic";
import "./style.css";

export default function Home() {
  const category = useSelector(selectCategory);
  const page = useSelector(selectPage);
  const [content, mainEle] = [useRef(""), useRef()];
  const [posts, setPosts] = useState({
    content: [],
    totalPages: 0,
    size: 20,
  });

  useEffect(() => {
    const converter = {
      HOME: "home",
      BEST: "best",
      유머: "humor",
      "게임/스포츠": "game",
      "연예/방송": "broadcast",
      여행: "travel",
      취미: "hobby",
      "경제/금융": "economic",
      "시사/이슈": "issue",
    };

    const getPosts = async () => {
      try {
        const res = await axios.get(
          `/api/board/post?category=${converter[category]}&page=${
            page - 1
          }&size=30`
        );
        setPosts(JSON.parse(res.data));
      } catch (err) {
        console.log("일로");
        console.log(err);
      }
    };

    getPosts();
  }, [category, page]);

  if (category === "HOME") content.current = <ContentHome posts={posts} />;
  else if (category === "BEST") content.current = <ContentBest posts={posts} />;
  else content.current = <ContentTopic posts={posts} />;

  return (
    <div className="home">
      <Header />
      <Snb />
      <main ref={mainEle} className="main">
        {content.current}
      </main>
    </div>
  );
}
