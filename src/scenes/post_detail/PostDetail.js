import { useState, useRef } from "react";

import Header from "../../components/header/Header";
import Snb from "../../components/Snb/Snb";
import "./style.css";

export default function PostDetail({ serverURL }) {
  const [pageTopic, setPageTopic] = useState("HOME");

  return (
    <div className="home">
      <Header serverURL={serverURL} />
      <Snb
        serverURL={serverURL}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
    </div>
  );
}
