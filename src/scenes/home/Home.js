import { useState, useRef, useEffect } from "react";
import axios from "axios";

import Header from "../../components/header/Header";
import Snb from "../../components/snb/Snb";
import ContentHome from "./components/content_feed/Content_Home";
import ContentBest from "./components/content_feed/Content_Best";
import ContentTopic from "./components/content_topic/Content_Topic";
import "./style.css";

export default function Home() {
  const [pageTopic, setPageTopic] = useState("HOME");
  const [content, mainEle] = [useRef(""), useRef()];
  const [page, setPage] = useState(1);
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
          `/api/board/post?category=${converter[pageTopic]}&page=${
            page - 1
          }&size=30`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [pageTopic, page]);

  if (pageTopic === "HOME")
    content.current = (
      <ContentHome posts={posts} page={page} setPage={setPage} />
    );
  else if (pageTopic === "BEST")
    content.current = (
      <ContentBest posts={posts} page={page} setPage={setPage} />
    );
  else
    content.current = (
      <ContentTopic
        title={pageTopic}
        posts={posts}
        page={page}
        setPage={setPage}
      />
    );

  return (
    <div className="home">
      <Header />
      <Snb pageTopic={pageTopic} setPageTopic={setPageTopic} />
      <main ref={mainEle} className="main">
        {content.current}
      </main>
    </div>
  );
}
