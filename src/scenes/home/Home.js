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
import MenuBtn from "../../components/menu_btn/Menu_Btn";
import "./style.css";

export default function Home() {
  const category = useSelector(selectCategory);
  const page = useSelector(selectPage);
  const scrollY = useSelector(selectScrollY);
  const [posts, setPosts] = useState();
  const [content, mainEle] = [useRef(), useRef()];

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_PATH_PAGING +
            `?category=${category}&page=${page - 1}&size=30`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [category, page]);

  if (mainEle.current) {
    if (category === "HOME")
      content.current = <ContentHome posts={posts} mainEle={mainEle} />;
    else if (category === "BEST")
      content.current = <ContentBest posts={posts} mainEle={mainEle} />;
    else content.current = <ContentTopic posts={posts} mainEle={mainEle} />;

    if (scrollY) {
      mainEle.current.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });
    } else {
      mainEle.current.scrollTo({
        top: scrollY,
        behavior: "auto",
      });
    }
  }

  return (
    <main className="home">
      <Header />
      <Snb />
      <section ref={mainEle} className="main">
        {posts && content.current}
      </section>
      <MenuBtn mainEle={mainEle} />
    </main>
  );
}
