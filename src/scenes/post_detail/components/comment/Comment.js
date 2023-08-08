import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../../../redux/slice/signSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import timeConverter from "../../../../util/time_converter";
import changeP2Span from "../../../../util/commentProcess";
import "./style.css";
import thumbsUp from "../../../../asset/icons/thumbs-up.svg";
import thumbsDown from "../../../../asset/icons/thumbs-down.svg";
import chatBox from "../../../../asset/icons/chatbox.svg";
import closeCircle from "../../../../asset/icons/close-circle.svg";
import edit from "../../../../asset/icons/edit.svg";
import trash from "../../../../asset/icons/trash.svg";

export default function CommentBoard({
  postDetail,
  user,
  trigger,
  setTrigger,
  sanitize,
}) {
  const [isShowInput, setIsShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [targetId, setTargetId] = useState(null);
  const btnShow = useRef();
  const isDarkMode = useSelector(selectIsDarkMode);

  const handleClickBtnShow = (e) => {
    if (isShowInput) {
      btnShow.current.style = "transform:rotateZ(0deg)";
      setIsShowInput(false);
      setTargetId(null);
    } else {
      btnShow.current.style = "transform:rotateZ(45deg)";
      setIsShowInput(true);
    }
  };

  const handleClickBtnAdd = async () => {
    let payload, path;
    let contentArg = changeP2Span(content);

    payload = {
      content: contentArg,
    };

    if (targetId) {
      path = process.env.REACT_APP_PATH_REPLY;
      path = path
        .replace("{post-id}", postDetail.id)
        .replace("{comment-id}", targetId);
    } else {
      path = process.env.REACT_APP_PATH_COMMENT;
      path = path.replace("{post-id}", postDetail.id);
    }

    try {
      await axios.post(path, payload);
      btnShow.current.style = "transform:rotateZ(0deg)";

      setTimeout(() => {
        setIsShowInput(false);
        setTargetId(null);
        setTrigger(!trigger);
        setContent("");
      }, 200);
    } catch (err) {
      alert("로그인이 필요합니다.");
      console.log(err);
    }
  };

  return (
    <section className="comment-board">
      <section className="comment-board__comment-wrapper">
        <div className="comment-board__comment">
          {postDetail.comments.map((comment, idxC) => {
            return (
              <>
                <Comment
                  key={"comment-" + idxC}
                  postId={postDetail.id}
                  user={user}
                  comment={comment}
                  btnShow={btnShow}
                  setIsShowInput={setIsShowInput}
                  setTargetId={setTargetId}
                  sanitize={sanitize}
                  trigger={trigger}
                  setTrigger={setTrigger}
                />
                {comment.replies.length
                  ? comment.replies.map((reply, idxR) => {
                      return (
                        <Comment
                          key={"reply-" + idxR}
                          postId={postDetail.id}
                          user={user}
                          comment={reply}
                          btnShow={btnShow}
                          setIsShowInput={setIsShowInput}
                          setTargetId={setTargetId}
                          cName={" comment__reply"}
                          sanitize={sanitize}
                          trigger={trigger}
                          setTrigger={setTrigger}
                        />
                      );
                    })
                  : ""}
              </>
            );
          })}
        </div>
      </section>
      <button
        className={
          "comment-board__btn-add" +
          (isDarkMode ? " comment-board__btn-add--dark" : "")
        }
        onClick={(e) => handleClickBtnShow(e)}
      >
        <img ref={btnShow} src={closeCircle} alt="x" />
      </button>
      {isShowInput && (
        <form className="comment-board__form">
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
          <button
            type="button"
            className="comment-board__btn"
            onClick={() => handleClickBtnAdd()}
          >
            Add
          </button>
        </form>
      )}
    </section>
  );
}

function Comment({
  postId,
  user,
  comment,
  btnShow,
  setIsShowInput,
  setTargetId,
  cName,
  sanitize,
  trigger,
  setTrigger,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [content, setContent] = useState("");
  const isDarkMode = useSelector(selectIsDarkMode);
  const timeDisplay = timeConverter(comment.wr_date);
  const recResult = comment.recommend_cnt + comment.decommend_cnt;

  useEffect(() => {
    if (user && user.id === comment.user.id) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [user, comment]);

  const handleClickBtnReply = () => {
    setIsShowInput(true);
    setTargetId(comment.id);
    btnShow.current.style = "transform:rotateZ(45deg)";
  };

  const handleClickRec = async (value) => {
    if (!user) {
      return alert("로그인이 필요합니다!");
    }

    try {
      let path = process.env.REACT_APP_PATH_COMMENT_REC.replace(
        "{post-id}",
        postId
      ).replace("{comment-id}", comment.id);
      await axios.patch(path, { value });
      setTrigger(!trigger);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBtnEdit = async () => {
    try {
      setContent(comment.content);
      setIsEdit(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBtnUpdate = async () => {
    const contentArg = changeP2Span(content);
    try {
      let path = process.env.REACT_APP_PATH_COMMENT.replace(
        "{post-id}",
        postId
      ).replace("{comment-id}", comment.id);

      await axios.patch(path, { content: contentArg });
      setIsEdit(false);
      setTrigger(!trigger);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBtnCancel = () => {
    setIsEdit(false);
  };

  const handleClickBtnDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("댓글을 삭제하시겠습니까?")) {
      try {
        let path = process.env.REACT_APP_PATH_COMMENT.replace(
          "{post-id}",
          postId
        ).replace("{comment-id}", comment.id);
        await axios.delete(path);
        setTrigger(!trigger);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={"comment__default" + (cName ? cName : "")}>
      <span className="comment__info">
        <div className="comment__img"></div>
        <span className="comment__nickname">{comment.user.nick}</span>
        <span className="comment__date">{timeDisplay}</span>
      </span>
      <div className="comment__detail">
        {!isEdit && cName ? (
          <span className="comment__reply-target">
            {comment.targetId.user.nick}
          </span>
        ) : (
          ""
        )}
        {isEdit ? (
          <>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                editor.setData(content);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
            <div className="comment__edit-btn-wrapper">
              <button
                className="comment__edit-btn"
                onClick={handleClickBtnUpdate}
              >
                ✔
              </button>
              <button
                className="comment__edit-btn"
                onClick={handleClickBtnCancel}
              >
                ✖
              </button>
            </div>
          </>
        ) : (
          <span
            className="comment__descripition"
            dangerouslySetInnerHTML={{ __html: sanitize(comment.content) }}
          ></span>
        )}
      </div>
      {!isEdit && !comment.isDeleted && (
        <div
          className={
            "comment__interface" +
            (isDarkMode ? " comment__interface--dark" : "")
          }
        >
          <div className="comment__rec-wrapper">
            <button
              className="comment__btn comment__btn-like"
              onClick={() => handleClickRec(1)}
            >
              <img src={thumbsUp} alt="like"></img>
            </button>
            <span className="comment__span-rec">{recResult}</span>
            <button
              className="comment__btn comment__btn-dislike"
              onClick={() => handleClickRec(-1)}
            >
              <img src={thumbsDown} alt="dislike"></img>
            </button>
            <span className="comment__span-rec" hidden>
              {comment.decommend_cnt}
            </span>
          </div>
          <div className="comment__btn-wrapper">
            {isWriter && (
              <button
                className="comment__btn comment__btn-edit"
                onClick={() => handleClickBtnEdit()}
              >
                <img src={edit} alt="edit"></img>
              </button>
            )}
            {isWriter && (
              <button
                className="comment__btn comment__btn-delete"
                onClick={() => handleClickBtnDelete()}
              >
                <img src={trash} alt="delete"></img>
              </button>
            )}
            <button
              className="comment__btn comment__btn-reply"
              onClick={() => handleClickBtnReply()}
            >
              <img src={chatBox} alt="reply"></img>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
