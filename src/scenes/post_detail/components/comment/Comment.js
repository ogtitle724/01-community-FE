import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../../../redux/slice/signSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import calRecommend from "../../../../components/util/cal_rec";
import timeConverter from "../../../../components/util/time_converter";
import changeP2Span from "../../../../components/util/commentProcess";
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
  const [isReply, setIsReply] = useState(false);
  const [content, setContent] = useState("");
  const [targetComment, setTargetComment] = useState(null);
  const btnShow = useRef();
  const isDarkMode = useSelector(selectIsDarkMode);

  const handleClickBtnShow = (e) => {
    if (isShowInput) {
      btnShow.current.style = "transform:rotateZ(0deg)";
      setIsShowInput(false);
      setTargetComment(null);
      setIsReply(false);
    } else {
      btnShow.current.style = "transform:rotateZ(45deg)";
      setIsShowInput(true);
    }
  };

  const handleClickBtnAdd = async () => {
    let payload;
    let contentArg = changeP2Span(content);

    if (isReply) {
      payload = {
        content: contentArg,
        targetComment,
      };
    } else {
      payload = {
        content: contentArg,
      };
    }

    try {
      await axios.post(`/board/${postDetail.id}/comment`, payload);
      btnShow.current.style = "transform:rotateZ(0deg)";
      setTimeout(() => {
        setIsShowInput(false);
        setTargetComment(null);
        setIsReply(false);
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
                  postDetail={postDetail}
                  user={user}
                  comment={comment}
                  btnShow={btnShow}
                  setIsShowInput={setIsShowInput}
                  setIsReply={setIsReply}
                  setTargetComment={setTargetComment}
                  sanitize={sanitize}
                  trigger={trigger}
                  setTrigger={setTrigger}
                />
                {comment.replies.length
                  ? comment.replies.map((reply, idxR) => {
                      return (
                        <Comment
                          key={"reply-" + idxR}
                          postDetail={postDetail}
                          user={user}
                          comment={reply}
                          btnShow={btnShow}
                          setIsShowInput={setIsShowInput}
                          setIsReply={setIsReply}
                          setTargetComment={setTargetComment}
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
  postDetail,
  user,
  comment,
  btnShow,
  setIsShowInput,
  setIsReply,
  setTargetComment,
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
  const recResult = calRecommend(comment.recommendations);

  useEffect(() => {
    if (user && user.id === comment.user.id) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [user, comment]);

  const handleClickBtnReply = () => {
    setIsShowInput(true);
    setIsReply(true);
    btnShow.current.style = "transform:rotateZ(45deg)";

    let targetArg;

    if (comment.targetComment) {
      targetArg = {
        rootCommentId: comment.targetComment.rootCommentId,
        commentId: comment.id,
        user: {
          id: comment.user.id,
          nick: comment.user.nick,
        },
      };
    } else {
      targetArg = {
        rootCommentId: comment.id,
        commentId: comment.id,
        user: {
          id: comment.user.id,
          nick: comment.user.nick,
        },
      };
    }

    setTargetComment(targetArg);
  };

  const handleClickRec = async (value) => {
    if (!user) {
      return alert("로그인이 필요합니다!");
    }

    try {
      await axios.post(`/board/${postDetail.id}/comment/rec/${comment.id}`, {
        id: user.id,
        value,
      });
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
      await axios.post(`/board/${postDetail.id}/comment/edit/${comment.id}`, {
        content: contentArg,
      });
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
        await axios.delete(
          `/board/${postDetail.id}/comment/delete/${comment.id}`
        );
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
            {comment.targetComment.user.nick}
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
      {!isEdit && (
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
            <span className="comment__span-rec">{recResult.like}</span>
            <button
              className="comment__btn comment__btn-dislike"
              onClick={() => handleClickRec(-1)}
            >
              <img src={thumbsDown} alt="dislike"></img>
            </button>
            <span className="comment__span-rec">{recResult.disLike}</span>
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
