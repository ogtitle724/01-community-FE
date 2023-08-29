import axios from "axios";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sanitize } from "../../../../util/secure";
import timeConverter from "../../../../util/time_converter";
import thumbsUp from "../../../../asset/icons/thumbs-up-filled.svg";
import thumbsDown from "../../../../asset/icons/thumbs-down-filled.svg";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/slice/signSlice";
import { useState } from "react";

function ContentBoard({ postDetail, trigger, setTrigger }) {
  const user = useSelector(selectUser);
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    if (user && postDetail && postDetail.user_id === user.id) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [postDetail, user]);

  const handleClickRecommend = async (value) => {
    if (!user) {
      return alert("로그인이 필요합니다!");
    }

    try {
      const path = process.env.REACT_APP_PATH_POST_REC.replace(
        "{post-id}",
        postDetail.id
      );
      await axios.patch(path, { value });
      setTrigger(!trigger);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="content-board">
      {postDetail && (
        <article className="content-board__content">
          <h2 className="content-board__title">
            {postDetail.title}
            {isWriter ? <UD postDetail={postDetail} /> : ""}
          </h2>
          <div className="content-board__info-wrapper">
            <span className="content-board__date">
              {timeConverter(postDetail.wr_date)}
            </span>
            <div>
              <span className="content-board__category">
                {postDetail.category ? postDetail.category : "카테고리 없음"}
              </span>
              <span> | </span>
              <span className="content-board__writer">
                {postDetail.user_nick}
              </span>
            </div>
          </div>
          <div
            className="content-board__detail"
            dangerouslySetInnerHTML={{ __html: sanitize(postDetail.content) }}
          ></div>
          <div className="content-board__btn-wrapper">
            <button
              className="content-board__btn content-board__btn-like"
              onClick={() => handleClickRecommend(1)}
            >
              <img
                className={
                  postDetail.recommend_state === 1
                    ? " content-board__img-like--active"
                    : "content-board__img-like"
                }
                src={thumbsUp}
                alt="추천"
              ></img>
              <span className="content-board__span">
                {postDetail.recommend_cnt}
              </span>
            </button>
            <div className="content-board__divider"></div>
            <button
              className="content-board__btn content-board__btn-dislike"
              onClick={() => handleClickRecommend(-1)}
            >
              <span className="content-board__span">
                {postDetail.decommend_cnt}
              </span>
              <img
                className={
                  postDetail.recommend_state === -1
                    ? " content-board__img-dislike--active"
                    : "content-board__img-dislike"
                }
                src={thumbsDown}
                alt="비추천"
              ></img>
            </button>
          </div>
          <section className="content-board__related">
            <h3 className="content-board__title-related">추천 컨텐츠</h3>
            <div className="content-board__best"></div>
          </section>
        </article>
      )}
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
        const path = process.env.REACT_APP_PATH_POST.replace(
          "{post-id}",
          postDetail.id
        );
        await axios.delete(path);
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

export default memo(ContentBoard);
