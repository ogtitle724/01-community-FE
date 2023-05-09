import { useState, useRef } from "react";

import Header from "../../components/header/Header";
import Snb from "../../components/Snb/Snb";
import ContentHome from "./components/content_feed/Content_Home";
import ContentBest from "./components/content_feed/Content_Best";
import ContentTopic from "./components/content_topic/Content_Topic";
import "./style.css";

export default function Home({ serverURL }) {
  const [pageTopic, setPageTopic] = useState("HOME");
  const [content, main] = [useRef(""), useRef()];

  if (pageTopic === "HOME") content.current = <ContentHome />;
  else if (pageTopic === "BEST") content.current = <ContentBest />;
  else content.current = <ContentTopic title={pageTopic} />;

  return (
    <>
      <Header serverURL={serverURL} />
      <Snb
        serverURL={serverURL}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      <main ref={main} className="main">
        {content.current}
      </main>
    </>
  );
}
