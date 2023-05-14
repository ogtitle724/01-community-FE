import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function WritePage({ serverURL }) {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const navigate = useNavigate();

  console.log(postTitle, postDescription, postCategory);

  const handleClickSave = (e) => {
    e.preventDefault();

    axios.post(serverURL + "/api/board/register", {
      uid: "token으로부터 뽑을예정",
      title: postTitle,
      category: postCategory,
      content: postDescription,
    });
  };

  const handleClickDelete = (e) => {
    e.preventDefault(e);

    // eslint-disable-next-line no-restricted-globals
    const isOk = confirm("저장하지 않고 나가시겠습니까?");

    if (isOk === true) {
      navigate(-1);
    } else {
      return;
    }
  };

  return (
    <>
      <form className="write">
        <header className="write__header">
          <h1 className="write__h1">WON editor</h1>
          <EditorPannel setPostCategory={setPostCategory} />
          <div className="write__btn-submit-wrapper">
            <button
              className="write__btn-submit"
              onClick={(e) => handleClickSave(e)}
            >
              저장
            </button>
            <button
              className="write__btn-submit"
              onClick={(e) => handleClickDelete(e)}
            >
              삭제
            </button>
            <div className="write__btn-border"></div>
            <button className="write__btn-submit">임시저장</button>
          </div>
        </header>
        <main className="write__main">
          <div className="write__text-wrapper">
            <input
              className="write__title"
              type="text"
              placeholder="title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            ></input>
            <textarea
              className="write__description"
              placeholder="description"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            ></textarea>
          </div>
        </main>
      </form>
    </>
  );
}

function EditorPannel({ setPostCategory }) {
  return (
    <section
      className="write__board"
      onChange={(e) => setPostCategory(e.target.value)}
    >
      <select name="category" className="write__select">
        <option value="">카테고리</option>
        <option value="유머">유머</option>
        <option value="게임/스포츠">게임/스포츠</option>
        <option value="연예/방송">연예/방송</option>
        <option value="여행">여행</option>
        <option value="취미">취미</option>
        <option value="경제/금융">경제/금융</option>
        <option value="시사/이슈">시사/이슈</option>
      </select>
      <select name="본문2" className="write__select">
        <option value="">본문2</option>
        <option value="제목1">제목1</option>
        <option value="제목2">제목2</option>
        <option value="제목3">제목3</option>
        <option value="본문1">본문1</option>
        <option value="본문2">본문2</option>
        <option value="본문3">본문3</option>
      </select>
      <div className="write__grid">
        <button className="write__btn-text-align write__btn-text-align--default">
          <img src="./align-just.png" alt="default"></img>
        </button>
        <button className="write__btn-text-align write__btn-text-align--left">
          <img src="./align-left.png" alt="left"></img>
        </button>
        <button className="write__btn-text-align write__btn-text-align--center">
          <img src="./align-center.png" alt="center"></img>
        </button>
        <button className="write__btn-text-align write__btn-text-align--right">
          <img src="./align-right.png" alt="right"></img>
        </button>
        <button className="write__btn-text-deco" style={{ fontWeight: 700 }}>
          B
        </button>
        <button
          className="write__btn-text-deco"
          style={{ fontStyle: "italic" }}
        >
          I
        </button>
        <button
          className="write__btn-text-deco"
          style={{ textDecoration: "underline" }}
        >
          U
        </button>
        <button
          className="write__btn-text-deco"
          style={{ textDecoration: "line-through" }}
        >
          T
        </button>
        <button className="write__btn-text-deco" style={{ color: "red" }}>
          C
        </button>
        <button
          className="write__btn-text-deco"
          style={{ backgroundColor: "rgb(232, 255, 74)" }}
        >
          BC
        </button>
      </div>
    </section>
  );
}
