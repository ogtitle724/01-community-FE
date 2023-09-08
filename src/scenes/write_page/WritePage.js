import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import noImg from "../../asset/icons/image.svg";
import "./style.css";

export default function WritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdate = location.state?.isUpdate;
  const titleArg = isUpdate ? location.state.title : "";
  const categoryArg = isUpdate ? location.state.category : "";
  const postId = isUpdate && location.state.id;
  const ogData = isUpdate && location.state.content;

  const [title, setTitle] = useState(titleArg);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(categoryArg);
  const [thumbnail, setThumbnail] = useState("");
  const [isThumbShow, setIsThumbShow] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

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
    if (!title) {
      alert("제목을 입력해주세요");
      return;
    } else if (!body) {
      alert("내용을 입력해주세요");
      return;
    } else if (!category) {
      alert("카테고리를 정해주세요");
      return;
    }

    let payload = {
      title,
      category,
      content: body,
      thumbnail,
    };

    try {
      if (isUpdate) {
        const path = process.env.REACT_APP_PATH_POST.replace(
          "{post-id}",
          postId
        );
        console.log(payload);
        await axios.patch(path, payload);
      } else {
        const path = process.env.REACT_APP_PATH_POST.replace("/{post-id}", "");
        await axios.post(path, payload);
      }
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert("게시글 작성 혹은 수정을 완료하지 못했습니다.");
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
                "heading",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "imageInsert",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "highlight",
                "removeFormat",
                "|",
                "alignment",
                "|",
                "numberedList",
                "bulletedList",
                "|",
                "indent",
                "outdent",
                "|",
                "todoList",
                "link",
                "blockQuote",
                "imageUpload",
                "insertTable",
                "mediaEmbed",
                "|",
                "undo",
                "redo",
                "CKFinder",
              ],
            },
          }}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
            if (isUpdate && ogData) {
              editor.setData(ogData);
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            /* console.log("Blur.", editor); */
          }}
          onFocus={(event, editor) => {
            /* console.log("Focus.", editor); */
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
    console.log(file);
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      console.log(event.target.result);
      setThumbnail(event.target.result);
    });

    if (file) {
      let a = reader.readAsDataURL(file);
      console.log(a);
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
