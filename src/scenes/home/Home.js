import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategory,
  selectPage,
  selectScrollY,
  selectWidth,
  setWidth,
} from "../../redux/slice/pageSlice";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentHome from "./components/content/Content_Home";
import ContentTopic from "./components/content_topic/Content_Topic";
import WriteBtn from "../../components/write_btn/WriteBtn";
import "./style.css";

export default function Home() {
  const category = useSelector(selectCategory);
  const page = useSelector(selectPage);
  const scrollY = useSelector(selectScrollY);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  const [content, mainEle] = [useRef(), useRef()];

  useEffect(() => {
    const handleResize = () => dispatch(setWidth({ width: window.innerWidth }));
    const getPosts = async () => {
      let path;

      if (category === "홈") {
        path = process.env.REACT_APP_PATH_PAGING_BEST;
      } else {
        path = process.env.REACT_APP_PATH_PAGING.replace(
          "{category}",
          category
        );
      }
      console.log(path);
      try {
        const res = await axios.get(path + `?page=${page - 1}&size=30`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [category, page, dispatch]);

  if (mainEle.current) {
    if (category === "홈") {
      content.current = <ContentHome posts={posts} mainEle={mainEle} />;
    } else {
      content.current = <ContentTopic posts={posts} mainEle={mainEle} />;
    }

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
