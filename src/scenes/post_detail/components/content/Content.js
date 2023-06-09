import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import thumbsUp from "../../../../asset/icons/thumbs-up.svg";
import thumbsDown from "../../../../asset/icons/thumbs-down.svg";
import "./style.css";

export default function ContentBoard({
  postDetail,
  user,
  isWriter,
  trigger,
  setTrigger,
  sanitize,
}) {
  const recommendations = useRef();

  recommendations.current = Object.entries(postDetail.recommendations);
  const recNum = recommendations.current.filter(
    (value) => value[1] === 1
  ).length;
  const nrecNum = recommendations.current.filter(
    (value) => value[1] === -1
  ).length;

  const handleClickRecommend = async (value) => {
    if (!user) {
      return alert("로그인이 필요합니다!");
    }

    try {
      await axios.post(process.env.REACT_APP_PATH_REC, {
        postId: postDetail.id,
        id: user.id,
        value,
      });
      setTrigger(!trigger);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="content-board">
      <article className="content-board__content">
        <h2 className="content-board__title">
          {postDetail.title}
          {isWriter ? <UD postDetail={postDetail} /> : ""}
        </h2>
        <div className="content-board__info-wrapper">
          <span className="content-board__date">
            {postDetail.wr_date.slice(0, -8).replace("T", " ")}
          </span>
          <div>
            <span className="content-board__category">
              {postDetail.category ? postDetail.category : "카테고리 없음"}
            </span>
            <span> | </span>
            <span className="content-board__writer">
              {postDetail.user.nick}
            </span>
          </div>
        </div>
        <div
          className="content-board__detail"
          dangerouslySetInnerHTML={{ __html: sanitize(postDetail.content) }}
        ></div>
        <div className="content-board__btn-wrapper">
          <button
            className="content-board__btn content-board__btn--good"
            onClick={() => handleClickRecommend(1)}
          >
            <img src={thumbsUp} alt="추천"></img>
            <span>{recNum}</span>
          </button>
          <button
            className="content-board__btn content-board__btn--bad"
            onClick={() => handleClickRecommend(-1)}
          >
            <img src={thumbsDown} alt="비추천"></img>
            <span>{nrecNum}</span>
          </button>
        </div>
        <section className="content-board__related">
          <h3 className="content-board__title-related">추천 컨텐츠</h3>
          <div className="content-board__best"></div>
        </section>
      </article>
    </section>
  );
}

function UD({ postDetail }) {
  const navigate = useNavigate();

  const handleClickUpdate = () => {
    navigate(process.env.REACT_APP_ROUTE_WRITE, {
      state: {
        isUpdate: true,
        title: postDetail.title,
        id: postDetail.id,
        category: postDetail.category,
        content: postDetail.content,
      },
    });
  };

  const handleClickDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    let isDelete = confirm("게시물을 삭제 하시겠습니까?");

    if (isDelete) {
      try {
        await axios.post(process.env.REACT_APP_PATH_DELETE, {
          id: postDetail.id,
        });
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="ud">
      <span className="ud__btn ud__span" onClick={handleClickUpdate}>
        수정
      </span>
      <span className=" ud__span">|</span>
      <span className="ud__btn ud__span" onClick={handleClickDelete}>
        삭제
      </span>
    </div>
  );
}
