import { useNavigate } from "react-router-dom";
import axios from "axios";

import timeConverter from "../../../../util/time_converter";
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
  const timeDisplay = timeConverter(postDetail.wr_date);

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
      <article className="content-board__content">
        <h2 className="content-board__title">
          {postDetail.title}
          {isWriter ? <UD postDetail={postDetail} /> : ""}
        </h2>
        <div className="content-board__info-wrapper">
          <span className="content-board__date">{timeDisplay}</span>
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
            className="content-board__btn content-board__btn--good"
            onClick={() => handleClickRecommend(1)}
          >
            <img src={thumbsUp} alt="추천"></img>
            <span>
              {postDetail.recommend_cnt ? postDetail.recommend_cnt : "0"}
            </span>
          </button>
          <button
            className="content-board__btn content-board__btn--bad"
            onClick={() => handleClickRecommend(-1)}
          >
            <img src={thumbsDown} alt="비추천"></img>
            <span>
              {postDetail.decommend_cnt ? postDetail.decommend_cnt : "0"}
            </span>
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
