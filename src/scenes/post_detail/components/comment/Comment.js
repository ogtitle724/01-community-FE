import { Fragment, useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../../../redux/slice/signSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";

import timeConverter from "../../../../util/time_converter";
import { changeP2Span, deleteEnter } from "../../../../util/textProcess";
import "./style.css";
import thumbsUp from "../../../../asset/icons/thumbs-up.svg";
import thumbsDown from "../../../../asset/icons/thumbs-down.svg";
import chatBox from "../../../../asset/icons/chatbox.svg";
import edit from "../../../../asset/icons/edit.svg";
import trash from "../../../../asset/icons/trash.svg";
import close from "../../../../asset/icons/close.svg";

export default function CommentBoard({
  postDetail,
  user,
  trigger,
  setTrigger,
  sanitize,
}) {
  const [content, setContent] = useState("");
  const [target, setTarget] = useState(null);
  const editorRef = useRef();

  const handleClickBtnOk = async () => {
    if (content) {
      let payload, path;
      let contentArg = changeP2Span(content);
      contentArg = deleteEnter(contentArg);

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
        let ck = editorRef.current.editor;

        ck.setData("댓글을 입력해주세요...");
        setTarget(null);
        setContent("");
        setTimeout(() => {
          setTrigger(!trigger);
        }, 500);
      } catch (err) {
        alert("로그인이 필요합니다.");
        console.log(err);
      }
    }
  };

  const handleClickBtnCancel = () => {
    let ck = editorRef.current.editor;

    ck.setData("댓글을 입력해주세요...");
    setTarget(null);
    setContent("");
  };

  const ckFocus = () => {
    if (editorRef.current) {
      editorRef.current.editor.editing.view.focus();
    }
  };

  return (
    <section className="comment-board">
      <section className="comment-board__comment-wrapper">
        <form
          className={
            "comment-board__form" + (target ? " comment-board__form-reply" : "")
          }
        >
          <CKEditor
            ref={editorRef}
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              editor.setData("댓글을 입력해주세요...");
            }}
            onFocus={(event, editor) => {
              if (content) {
                editor.setData(content);
              } else {
                editor.setData("");
              }
            }}
            onChange={(event, editor) => {
              let data = editor.getData();
              console.log(data);
              if (data === "<p>댓글을 입력해주세요...</p>") {
                setContent("");
              } else {
                setContent(data);
              }
            }}
            onBlur={(event, editor) => {
              if (!content) {
                editor.setData("댓글을 입력해주세요...");
              }
            }}
          />

          <div className={"comment-board__btn-wrapper"}>
            <button
              type="button"
              className="btn--good comment-board__btn"
              onClick={() => handleClickBtnOk()}
              disabled={!content}
            >
              ✔
            </button>
            <button
              type="button"
              className="btn--bad comment-board__btn"
              onMouseDown={() => handleClickBtnCancel()}
            >
              ✖
            </button>
          </div>
        </form>
        <div className="comment-board__comment">
          {postDetail.comments.map((comment, idxC) => {
            return (
              <Fragment key={"comment-" + idxC}>
                <Comment
                  user={user}
                  comment={comment}
                  parentId={comment.id}
                  target={target}
                  setTarget={setTarget}
                  sanitize={sanitize}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  ckFocus={ckFocus}
                />
                {comment.replies?.length
                  ? comment.replies.map((reply, idxR) => {
                      return (
                        <Comment
                          key={"reply-" + idxR}
                          user={user}
                          comment={reply}
                          parentId={comment.id}
                          target={target}
                          setTarget={setTarget}
                          cName={" comment__reply"}
                          sanitize={sanitize}
                          trigger={trigger}
                          setTrigger={setTrigger}
                          ckFocus={ckFocus}
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
  target,
  setTarget,
  cName,
  sanitize,
  trigger,
  setTrigger,
  ckFocus,
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
    if (target?.targetCommentId === comment.id) {
      setTarget(null);
    } else {
      setTarget({
        parentId,
        targetId: comment.user_id,
        targetNick: comment.user_nick,
        targetCommentId: comment.id,
      });
      ckFocus();
    }
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
    let path = process.env.REACT_APP_PATH_COMMENT.replace(
      "{comment-id}",
      comment.id
    );
    let contentArg = changeP2Span(content);
    contentArg = deleteEnter(contentArg);

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
    <div
      className={
        "comment__default" +
        (cName ? cName : "") +
        (target?.targetCommentId === comment.id ? " comment-target" : "")
      }
    >
      <span className="comment__info">
        <div className="comment__img"></div>
        <span className="comment__nickname">{comment.user_nick}</span>
        <span className="comment__date">{timeDisplay}</span>
      </span>
      <div className="comment__detail">
        {!isEdit && cName ? (
          <span className="comment__reply-target">
            {comment.parent_nick ? "🔗" + comment.parent_nick : "🔗targetNick"}
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
                className="btn-ok comment__edit-btn btn--good"
                onClick={handleClickBtnUpdate}
              >
                ✔
              </button>
              <button
                className="btn-cancel comment__edit-btn btn--bad"
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
              onMouseDown={(e) => e.preventDefault()}
            >
              <img
                src={target?.targetCommentId === comment.id ? close : chatBox}
                alt="reply"
              ></img>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
