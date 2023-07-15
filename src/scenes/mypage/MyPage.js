import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/signSlice";
import axios from "axios";

import timeConverter from "../../components/util/time_converter";
import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import profileImg from "../../asset/icons/person.svg";
import store from "../../asset/icons/store.svg";
import setting from "../../asset/icons/settings.svg";
import chat from "../../asset/icons/chatbubble.svg";
import clip from "../../asset/icons/clip.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async () => {
      try {
        let res = await axios.get(process.env.REACT_APP_PATH_USER);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="mypage">
      <Header />
      <Gnb />
      <main className="mypage__main">
        <section className="mypage__grid-container">
          <h2 className="mypage__title" hidden>
            my page
          </h2>
          <div className="mypage__profile">
            <img
              src={profileImg}
              className="mypage__profile-img"
              alt="profile-img"
            ></img>
          </div>
          <section className="mypage__board">
            <h3 hidden>mypage board</h3>
            <img src={store} alt="icon-trade"></img>
            <img src={chat} alt="icon-chat"></img>
            <img src={setting} alt="icon-setting"></img>
          </section>
          <section className="point-graph">
            <h3 className="point-graph__title">
              <span className="point-grap__nick">{user.nick}</span>
              <div className="point-graph__amount">
                <img className="point-graph__img" src={clip} alt="point" />
                <span className="point-graph__span">120</span>
              </div>
            </h3>
            <canvas id="point-graph__canvas" width="480" height="160"></canvas>
          </section>
          <section className="mp-document">
            <h3 className="mp-document__title">내가 쓴 글/댓글</h3>
            <div className="mp-document__display">
              <ul className="mp-document__posts">
                {userData &&
                  userData.posts.map((post, idx) => {
                    return (
                      <ListItem
                        key={`mp-list__${idx}`}
                        postId={post.id}
                        title={post.title}
                        category={post.category}
                        date={post.wr_date}
                        view={post.view_cnt}
                      />
                    );
                  })}
                <button className="mp-document__btn-showmore">+더보기</button>
              </ul>
              <ul className="mp-document__comments">
                <button className="mp-document__btn-showmore">+더보기</button>
              </ul>
            </div>
          </section>
          <div className="mypage__comment"></div>
        </section>
      </main>
    </div>
  );
}

function ListItem({ title, category, date, view, postId }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/post", { state: { postId } });
  };

  return (
    <li className="mp-list" onClick={handleClick}>
      <div>
        <span className="mp-list__title">{title}</span>
        <span className="mp-list__indicator">
          {"( " + date.slice(0, 10) + " )"}
        </span>
      </div>
      <div>
        <span>{category ? category : "카테고리 없음"}</span>
        <span className="mp-list__view">{view}</span>
      </div>
    </li>
  );
}
