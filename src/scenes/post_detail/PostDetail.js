import { useState, useRef } from "react";

import Header from "../../components/header/Header";
import Snb from "../../components/Snb/Snb";
import "./style.css";

export default function PostDetail({ domain }) {
  const [pageTopic, setPageTopic] = useState("HOME");

  return (
    <div className="home">
      <Header domain={domain} />
      <Snb domain={domain} pageTopic={pageTopic} setPageTopic={setPageTopic} />
    </div>
  );
}
