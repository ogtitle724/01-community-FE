import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCategory,
  selectPage,
  selectScrollY,
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
  const scrollY = useSelector(selectScrollY);
  const [content, mainEle] = [useRef(), useRef()];
  const [posts, setPosts] = useState();

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
        console.log(err);
      }
    };
    console.log(scrollY);
    console.log("here:", mainEle.current.scrollTop);

    getPosts();
  }, [category, page]);

  if (mainEle.current) {
    if (category === "HOME")
      content.current = <ContentHome posts={posts} mainEle={mainEle} />;
    else if (category === "BEST")
      content.current = <ContentBest posts={posts} mainEle={mainEle} />;
    else content.current = <ContentTopic posts={posts} mainEle={mainEle} />;

    mainEle.current.scrollTop = scrollY;
  }

  return (
    <div className="home">
      <Header />
      <Snb />
      <main ref={mainEle} className="main">
        {posts && content.current}
      </main>
    </div>
  );
}
