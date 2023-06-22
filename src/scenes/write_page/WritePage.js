import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

import noImg from "../../asset/icons/image.svg";
import "./style.css";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isThumbShow, setIsThumbShow] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const navigate = useNavigate();

  //prevent "resizeobserver loop limit exceeded" error appearing
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleThumbShow = () => {
    setIsThumbShow(true);
  };

  const handleThumbHide = () => {
    if (isThumbShow) setIsThumbShow(false);
  };

  const handleClickBtnComplete = async () => {
    try {
      await axios.post("/api/board/register", {
        title,
        category,
        content: body,
        thumbnail,
        wr_date: new Date(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert("게시글 작성을 실패했습니다.");
    }
  };

  return (
    <>
      <main className="write-page" onClick={handleThumbHide}>
        <input
          className="write-page__title"
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요.",
            toolbar: {
              items: [
                "undo",
                "redo",
                "bold",
                "italic",
                "blockQuote",
                "ckfinder",
                "imageTextAlternative",
                "imageUpload",
                "heading",
                "imageStyle:full",
                "imageStyle:side",
                "link",
                "numberedList",
                "bulletedList",
                "mediaEmbed",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
              ],
            },
          }}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <section className="write-page__board">
          <button
            className="write-page__btn-thumbnail"
            onClick={handleThumbShow}
          >
            {"thumbnail"}
          </button>
          {isThumbShow ? (
            <ThumbnailDropbox
              imgSrc={imgSrc}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              setImgSrc={setImgSrc}
            />
          ) : (
            ""
          )}
          <select
            name="category"
            className="write-page__select"
            onChange={(e) => handleSelectCategory(e)}
          >
            <option value="없음">카테고리</option>
            <option value="유머">유머</option>
            <option value="게임/스포츠">게임/스포츠</option>
            <option value="연예/방송">연예/방송</option>
            <option value="여행">여행</option>
            <option value="취미">취미</option>
            <option value="경제/금융">경제/금융</option>
            <option value="시사/이슈">시사/이슈</option>
          </select>
          <button
            className="write-page__btn-complete"
            onClick={handleClickBtnComplete}
          >
            완료
          </button>
        </section>
      </main>
    </>
  );
}

function ThumbnailDropbox({ thumbnail, setThumbnail, imgSrc, setImgSrc }) {
  const handleChangeImgSrc = (e) => {
    setImgSrc(e.target.value);
  };

  const handleClickApplyBtn = () => {
    setThumbnail(imgSrc);
  };

  const handleClickUploadBtn = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      setThumbnail(event.target.result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="th-dropdown" onClick={(e) => e.stopPropagation()}>
      <img
        className={
          "th-dropdown__img-preview" +
          (thumbnail ? " th-dropdown__img-preview--show" : "")
        }
        src={thumbnail ? thumbnail : noImg}
        alt=""
      />
      <div className="th-dropdown-input-wrapper">
        <input
          className="th-dropdown__input-src"
          type="text"
          placeholder="이미지 주소를 입력하세요."
          value={imgSrc}
          onChange={(e) => handleChangeImgSrc(e)}
        />
        <button
          className="th-dropdown__btn-apply"
          onClick={handleClickApplyBtn}
        >
          등록
        </button>
        <span style={{ fontSize: "0.5rem" }}>or</span>
        <input
          type="file"
          className="th-dropdown__input-file"
          id="th-dropdown__file"
          onChange={(e) => handleClickUploadBtn(e)}
        />
        <label for="th-dropdown__file" className="th-dropdown__label-file">
          업로드
        </label>
      </div>
    </section>
  );
}
