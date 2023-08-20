import { Fragment, useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
import edit from "../../../../asset/icons/edit.svg";
import trash from "../../../../asset/icons/trash.svg";

export default function CommentBoard({
  postDetail,
  user,
  trigger,
  setTrigger,
  sanitize,
}) {
  const [content, setContent] = useState("");
  const [target, setTarget] = useState(null);

  const handleClickBtnOk = async () => {
    let payload, path;
    let contentArg = changeP2Span(content);
    console.log(contentArg);

    payload = {
      content: contentArg,
      postId: postDetail.id,
    };

    if (target) {
      path = process.env.REACT_APP_PATH_REPLY;
      path = path.replace("{comment-id}", target.parentId);
      payload.targetId = target.targetId;
    } else {
      path = process.env.REACT_APP_PATH_COMMENT;
      path = path.replace("/{comment-id}", "");
    }

    try {
      await axios.post(path, payload);

      setTimeout(() => {
        setTarget(null);
        setTrigger(!trigger);
        setContent("");
      }, 200);
    } catch (err) {
      alert("로그인이 필요합니다.");
      console.log(err);
    }

    const event = new MouseEvent("mousedown", { bubbles: true });
    let ele = document.getElementsByClassName("comment-board__comment")[0];
    ele.dispatchEvent(event);
  };

  return (
    <section className="comment-board">
      <section className="comment-board__comment-wrapper">
        <form
          className="comment-board__form"
          onClick={() => console.log("form")}
        >
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              editor.setData("댓글을 입력하세요...");
            }}
            onFocus={(event, editor) => {
              editor.setData("");
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            onBlur={(event, editor) => {
              editor.setData("댓글을 입력하세요...");
            }}
          />

          <div
            className={"comment-board__btn-wrapper"}
            onClick={() => console.log("wrapper")}
          >
            <button
              type="button"
              className="btn-ok comment-board__btn"
              onClick={() => handleClickBtnOk()}
              onMouseDown={(e) => e.preventDefault()}
            >
              ✔
            </button>
            <button type="button" className="btn-cancel comment-board__btn">
              ✖
            </button>
          </div>
        </form>
        <div
          className="comment-board__comment"
          onMouseDown={() => console.log("donnnnnn")}
        >
          {postDetail.comments.map((comment, idxC) => {
            return (
              <Fragment key={"comment-" + idxC}>
                <Comment
                  user={user}
                  comment={comment}
                  parentId={comment.id}
                  setTarget={setTarget}
                  sanitize={sanitize}
                  trigger={trigger}
                  setTrigger={setTrigger}
                />
                {comment.replies?.length
                  ? comment.replies.map((reply, idxR) => {
                      return (
                        <Comment
                          key={"reply-" + idxR}
                          user={user}
                          comment={reply}
                          parentId={comment.id}
                          setTarget={setTarget}
                          cName={" comment__reply"}
                          sanitize={sanitize}
                          trigger={trigger}
                          setTrigger={setTrigger}
                        />
                      );
                    })
                  : ""}
              </Fragment>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function Comment({
  user,
  comment,
  parentId,
  setTarget,
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

  useEffect(() => {
    if (user && user.id === comment.user_id) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [user, comment]);

  const handleClickBtnReply = () => {
    setTarget({ parentId, targetId: comment.user_id });
  };

  const handleClickRec = async (value) => {
    if (!user) {
      return alert("로그인이 필요합니다!");
    }

    let path = process.env.REACT_APP_PATH_COMMENT_REC.replace(
      "{comment-id}",
      comment.id
    );

    try {
      await axios.patch(path, { value });
      setTrigger(!trigger);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBtnEdit = async () => {
    setContent(comment.content);
    setIsEdit(true);
  };

  const handleClickBtnUpdate = async () => {
    const contentArg = changeP2Span(content);
    let path = process.env.REACT_APP_PATH_COMMENT.replace(
      "{comment-id}",
      comment.id
    );

    try {
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
      let path = process.env.REACT_APP_PATH_COMMENT.replace(
        "{comment-id}",
        comment.id
      );

      try {
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
        <span className="comment__nickname">{comment.user_nick}</span>
        <span className="comment__date">{timeDisplay}</span>
      </span>
      <div className="comment__detail">
        {!isEdit && cName ? (
          <span className="comment__reply-target">
            {comment.target_nick ? "🔗" + comment.target_nick : "🔗targetNick"}
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
                className="btn-ok comment__edit-btn"
                onClick={handleClickBtnUpdate}
              >
                ✔
              </button>
              <button
                className="btn-cancel comment__edit-btn"
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
      {!isEdit && !comment.del_date && (
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
            <span className="comment__span-rec">
              {comment.recommend_cnt ? comment.recommend_cnt : "0"}
            </span>
            <button
              className="comment__btn comment__btn-dislike"
              onClick={() => handleClickRec(-1)}
            >
              <img src={thumbsDown} alt="dislike"></img>
            </button>
            <span className="comment__span-rec">
              {comment.decommend_cnt ? comment.decommend_cnt : "0"}
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
