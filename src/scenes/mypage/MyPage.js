import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/slice/signSlice";
import { selectWidth, setWidth } from "../../redux/slice/pageSlice";
import axios from "axios";

import { getTitle } from "../../util/textProcess";
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const handleResize = () => dispatch(setWidth({ width: window.innerWidth }));
    const getUserData = async () => {
      try {
        let res = await axios.get(process.env.REACT_APP_PATH_USER);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const getListItems = (dataArr) => {
    let components = [];

    for (let i = 0; i < 9; i++) {
      if (!dataArr[i]) break;

      if (dataArr[i]?.title) {
        components.push(
          <ListItem
            key={`mp-list__${i}`}
            postId={dataArr[i].id}
            title={dataArr[i].title}
            date={dataArr[i].wr_date}
            info1={dataArr[i].category ? dataArr[i].category : "카테고리 없음"}
            info2={dataArr[i].view_cnt}
          />
        );
      } else {
        let rec = dataArr[i].recommend_cnt + dataArr[i].decommend_cnt;

        components.push(
          <ListItem
            key={`mp-list_${i}`}
            postId={dataArr[i].postId}
            title={getTitle(dataArr[i].content)}
            date={dataArr[i].wr_date}
            info2={rec}
          />
        );
      }
    }
    return components;
  };

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
            <div className="mypage__img-wrapper">
              <img
                src={profileImg}
                className="mypage__profile-img"
                alt="profile-img"
              ></img>
            </div>
            <div className="mypage__board">
              <h3 hidden>mypage board</h3>
              <img src={store} alt="icon-trade"></img>
              <img src={chat} alt="icon-chat"></img>
              <img src={setting} alt="icon-setting"></img>
            </div>
          </div>
          <div className="point-graph">
            <h3 className="point-graph__title">
              <span className="point-grap__nick">{user.nick}</span>
              <div className="point-graph__amount">
                <img className="point-graph__img" src={clip} alt="point" />
                <span className="point-graph__span">120</span>
              </div>
            </h3>
            <canvas id="point-graph__canvas" width="480" height="160"></canvas>
          </div>
          <div className="mp-document">
            <h3 className="mp-document__title">내가 쓴 글/댓글</h3>
            <div className="mp-document__display">
              <ul className="mp-document__posts">
                {userData && getListItems(userData.posts)}
                <button className="mp-document__btn-showmore">+더보기</button>
              </ul>
              <ul className="mp-document__comments">
                {userData && getListItems(userData.comments)}
                <button className="mp-document__btn-showmore">+더보기</button>
              </ul>
            </div>
          </div>
          <div className="mypage__comment"></div>
        </section>
      </main>
    </div>
  );
}

function ListItem({ title, date, info1, info2, postId }) {
  const navigate = useNavigate();
  const width = useSelector(selectWidth);
  console.log(width);
  const handleClick = () => {
    navigate("/post", { state: { postId } });
  };

  return (
    <li className="mp-list" onClick={handleClick}>
      <div className="mp-list__title-wrapper">
        <span className="mp-list__title">{title}</span>
        <span className="mp-list__indicator">
          {"( " + date.slice(0, 10) + " )"}
        </span>
      </div>
      <div>
        {width > 480 ? <span>{info1}</span> : ""}
        <span className="mp-list__info2">{info2}</span>
      </div>
    </li>
  );
}
