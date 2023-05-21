import { useState, useEffect } from "react";
import axios from "axios";

import HorizontalList from "../component/horizontal_list/Horizontal_List";
import Board from "../component/board/Board";
import "./style.css";

export default function ContentHome({ domain }) {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(domain + "/api/board/post");
        const posts = JSON.parse(res).content;

        setPostData(posts);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="main__content">
      <HorizontalList />
      <Board title={"Recent Posts"} postData={postData} />
    </div>
  );
}
