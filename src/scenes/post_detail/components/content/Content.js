import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectId } from "../../../../redux/slice/signSlice";
import "./style.css";

export default function ContentBoard({ post, sanitize }) {
  const [isWriter, setIsWriter] = useState(false);
  const id = useSelector(selectId);

  useEffect(() => {
    if (id === post.user.id) setIsWriter(true);
    else setIsWriter(false);
  }, []);

  return (
    <section className="content-board">
      <article className="content-board__content">
        <h2 className="content-board__title">
          {post.title}
          {isWriter ? <UD post={post} /> : ""}
        </h2>
        <div className="content-board__info-wrapper">
          <span className="content-board__date">
            {post.wr_date.slice(0, -8).replace("T", " ")}
          </span>
          <div>
            <span className="content-board__category">
              {post.category ? post.category : "카테고리 없음"}
            </span>
            <span> | </span>
            <span className="content-board__writer">{post.user.nick}</span>
          </div>
        </div>
        <div
          className="content-board__detail"
          dangerouslySetInnerHTML={{ __html: sanitize(post.content) }}
        ></div>
        <div className="content-board__btn-wrapper">
          <button className="content-board__btn content-board__btn--good">
            Good
          </button>
          <button className="content-board__btn content-board__btn--bad">
            Bad
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

function UD({ post }) {
  const navigate = useNavigate();

  const handleClickUpdate = () => {
    navigate(process.env.REACT_APP_ROUTE_WRITE, {
      state: {
        isUpdate: true,
        title: post.title,
        id: post.id,
        category: post.category,
        content: post.content,
      },
    });
  };

  const handleClickDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    let isDelete = confirm("게시물을 삭제 하시겠습니까?");

    if (isDelete) {
      try {
        await axios.post(process.env.REACT_APP_PATH_DELETE, { id: post.id });
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
