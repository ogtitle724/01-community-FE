import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategory, selectPage } from "../../redux/slice/pageSlice";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentHome from "./components/content/Content_Home";
import ContentTopic from "./components/content/Content_Topic";
import WriteBtn from "../../components/write_btn/WriteBtn";
import "./style.css";

export default function Home() {
  const category = useSelector(selectCategory);
  const page = useSelector(selectPage);
  const [posts, setPosts] = useState();
  const [content, mainEle] = [useRef(), useRef()];
  console.log("home rendered");

  useEffect(() => {
    const getPosts = async () => {
      let path = process.env.REACT_APP_PATH_PAGING.replace(
        "{category}",
        category === "홈" ? "best" : category
      );

      try {
        const res = await axios.get(path + `?page=${page - 1}&size=30`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [category, page]);

  if (mainEle.current) {
    if (category === "홈") {
      content.current = <ContentHome posts={posts} mainEle={mainEle} />;
    } else {
      content.current = <ContentTopic posts={posts} mainEle={mainEle} />;
    }
  }

  return (
    <main className="home">
      <Header />
      <Gnb />
      <section ref={mainEle} className="main">
        <div className="main-content">
          {posts ? (
            content.current
          ) : (
            <span className="main-content__alert">
              {"서버와의 통신이 불안정합니다 :("}
            </span>
          )}
        </div>
      </section>
      <WriteBtn mainEle={mainEle} />
    </main>
  );
}
