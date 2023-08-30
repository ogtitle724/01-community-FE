import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategory, selectPage } from "../../redux/slice/pageSlice";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import ContentHome from "./components/content/Content_Home";
import ContentTopic from "./components/content/Content_Topic";
import ContentBarter from "./components/content/Content_Barter";
import WriteBtn from "../../components/write_btn/WriteBtn";
import "./style.css";

export default function Home() {
  const category = useSelector(selectCategory);
  const page = useSelector(selectPage);
  const [content, setContent] = useState(null);
  const mainEle = useRef();
  console.log("home rendered");

  useEffect(() => {
    const getPosts = async () => {
      let path = process.env.REACT_APP_PATH_PAGING.replace(
        "{category}",
        category === "홈" ? "best" : category
      );

      try {
        const res = await axios.get(path + `?page=${page - 1}&size=30`);

        if (category === "홈") {
          setContent(<ContentHome posts={res.data} mainEle={mainEle} />);
        } else if (category === "물물교환") {
          setContent(<ContentBarter posts={res.data} mainEle={mainEle} />);
        } else {
          setContent(<ContentTopic posts={res.data} mainEle={mainEle} />);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [category, page]);

  return (
    <>
      <Header />
      <Gnb />
      <main ref={mainEle} className="main">
        <div className="main-content">
          {content ?? (
            <span className="main-content__alert">
              {"서버와의 통신이 불안정합니다 :("}
            </span>
          )}
        </div>
      </main>
      <WriteBtn mainEle={mainEle} />
    </>
  );
}
