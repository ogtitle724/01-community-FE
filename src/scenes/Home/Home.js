import { useState, useRef, useEffect } from "react";
import axios from "axios";

import Header from "../../components/header/Header";
import Snb from "../../components/snb/Snb";
import ContentHome from "./components/content_feed/Content_Home";
import ContentBest from "./components/content_feed/Content_Best";
import ContentTopic from "./components/content_topic/Content_Topic";
import "./style.css";

export default function Home({ domain }) {
  const [pageTopic, setPageTopic] = useState("HOME");
  const [content, main] = [useRef(""), useRef()];
  const [pageNum, setPageNum] = useState(1);
  const [postData, setPostData] = useState({
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
          domain +
            `/api/board/post?category=${converter[pageTopic]}&page=${pageNum}&size=20`
        );
        const posts = JSON.parse(res.data);
        setPostData(posts);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [pageTopic, pageNum, domain]);

  console.log("rendered");

  if (pageTopic === "HOME")
    content.current = (
      <ContentHome
        domain={domain}
        postData={postData}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    );
  else if (pageTopic === "BEST")
    content.current = (
      <ContentBest
        domain={domain}
        postData={postData}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    );
  else
    content.current = (
      <ContentTopic
        title={pageTopic}
        domain={domain}
        postData={postData}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    );

  return (
    <div className="home">
      <Header domain={domain} />
      <Snb domain={domain} pageTopic={pageTopic} setPageTopic={setPageTopic} />
      <main ref={main} className="main">
        {content.current}
      </main>
    </div>
  );
}
