import axios from "axios";
import { useState, useRef, useInsertionEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../../../redux/slice/signSlice";

import "./style.css";
import thumbsUp from "../../../../asset/icons/thumbs-up.svg";
import thumbsDown from "../../../../asset/icons/thumbs-down.svg";
import chatBox from "../../../../asset/icons/chatbox.svg";
import closeCircle from "../../../../asset/icons/close-circle.svg";

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

    if (isReply) {
      payload = {
        postId: postDetail.id,
        content: content,
        wr_date: new Date(),
        targetComment,
      };
    } else {
      payload = {
        postId: postDetail.id,
        content: content,
        wr_date: new Date(),
      };
    }

    try {
      await axios.post(`/api/board/${postDetail.id}/comment`, payload);
      btnShow.current.style = "transform:rotateZ(0deg)";
      setIsShowInput(false);
      setTargetComment(null);
      setIsReply(false);
      setTrigger(!trigger);
      setContent("");
    } catch (err) {
      alert("로그인이 필요합니다.");
      console.log(err);
    }
  };

  const handleWrite = (e) => {
    setContent(e.target.value);
  };

  return (
    <section className="comment-board">
      <section className="comment-board__comment-wrapper">
        <div className="comment-board__comment">
          {postDetail.comments.map((comment, idxC) => {
            console.log(comment.replies);
            return (
              <>
                <Comment
                  idx={idxC}
                  comment={comment}
                  setIsShowInput={setIsShowInput}
                  setIsReply={setIsReply}
                  setTargetComment={setTargetComment}
                />
                {comment.replies.length
                  ? comment.replies.map((reply, idxR) => {
                      return (
                        <Comment
                          idx={idxR}
                          comment={reply}
                          setIsShowInput={setIsShowInput}
                          setIsReply={setIsReply}
                          setTargetComment={setTargetComment}
                          cName={" comment__reply"}
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
          <textarea
            className="comment-board__input"
            type="text"
            value={content}
            onChange={(e) => handleWrite(e)}
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
  comment,
  idx,
  setIsShowInput,
  setIsReply,
  setTargetComment,
  cName,
}) {
  const isDarkMode = useSelector(selectIsDarkMode);
  const date = new Date(comment.wr_date);
  const now = new Date();
  const diffMinutes = ~~((now - date) / (1000 * 60));

  let timeDisplay;

  if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes}분 전`;
  } else if (diffMinutes < 60 * 24) {
    timeDisplay = `${~~(diffMinutes / 60)}시간 전`;
  } else {
    timeDisplay = comment.wr_date.slice(0, -8).replace("T", " ");
  }

  const handleClickBtnReply = () => {
    setIsShowInput(true);
    setIsReply(true);

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

  return (
    <div
      key={"commnets-" + idx}
      className={"comment__default" + (cName ? cName : "")}
    >
      <span className="comment__info">
        <div className="comment__img"></div>
        <span className="comment__nickname">{comment.user.nick}</span>
        <span className="comment__date">{timeDisplay}</span>
      </span>
      <div className="comment__detail">
        {cName ? (
          <span className="comment__reply-target">
            {comment.targetComment.user.nick}
          </span>
        ) : (
          ""
        )}
        <span className="comment__descripition">{comment.content}</span>
      </div>
      <div
        className={
          "comment__btn-wrapper" +
          (isDarkMode ? " comment__btn-wrapper--dark" : "")
        }
      >
        <button className="comment__btn comment__btn-like">
          <img src={thumbsUp} alt="x"></img>
        </button>
        <button className="comment__btn comment__btn-dislike">
          <img src={thumbsDown} alt="x"></img>
        </button>
        <button
          className="comment__btn comment__btn-reply"
          onClick={() => handleClickBtnReply()}
        >
          <img src={chatBox} alt="x"></img>
        </button>
      </div>
    </div>
  );
}
