import { useState, useRef, useEffect } from "react";
import "./style.css";
import thumbsUp from "../../../../asset/icons/thumbs-up.svg";
import thumbsDown from "../../../../asset/icons/thumbs-down.svg";
import chatBox from "../../../../asset/icons/chatbox.svg";
import closeCircle from "../../../../asset/icons/close-circle.svg";

export default function CommentBoard() {
  const [isAddComment, setIsAddComment] = useState(false);
  const btnAdd = useRef();

  const handleClickBtnAdd = (e) => {
    e.preventDefault();
    setIsAddComment(!isAddComment);

    if (!isAddComment) {
      btnAdd.current.style = "transform:rotateZ(45deg)";
    } else {
      btnAdd.current.style = "transform:rotateZ(0deg)";
    }
  };

  return (
    <section className="comment-board">
      <section className="comment-board__comment-wrapper">
        <div className="comment-board__comment">
          {samplePost.comment.map((comment, idx1) => {
            if (comment.reply) {
              return (
                <>
                  <Comment
                    key={"hit-comment__" + idx1}
                    writer={comment.writer}
                    date={comment.date}
                    detail={comment.detail}
                  />
                  {comment.reply.map((reply, idx2) => (
                    <Comment
                      key={"hit-comment__" + idx1 + "-" + idx2}
                      writer={reply.writer}
                      date={reply.date}
                      detail={reply.detail}
                      className="comment__reply"
                    />
                  ))}
                </>
              );
            }
            return (
              <Comment
                key={"hit-comment__" + idx1}
                writer={comment.writer}
                date={comment.date}
                detail={comment.detail}
              />
            );
          })}
        </div>
      </section>
      <button
        className="comment-board__btn-add"
        onClick={(e) => handleClickBtnAdd(e)}
      >
        <img ref={btnAdd} src={closeCircle} alt="x" />
      </button>
      <form
        className="comment-board__form"
        style={{ visibility: isAddComment ? "visible" : "hidden" }}
      >
        <textarea className="comment-board__input" type="text" />
        <button className="comment-board__btn">Add</button>
      </form>
    </section>
  );
}

function Comment({ writer, date, detail, className }) {
  return (
    <div className={"comment__default " + className}>
      <span className="comment__info">
        <div className="comment__img"></div>
        <span className="comment__nickname">{writer}</span>
        <span className="comment__date">{date}</span>
      </span>
      <div className="comment__detail">{detail}</div>
      <div className="comment__btn-wrapper">
        <button className="comment__btn comment__btn-like">
          <img src={thumbsUp} alt="x"></img>
        </button>
        <button className="comment__btn comment__btn-dislike">
          <img src={thumbsDown} alt="x"></img>
        </button>
        <button className="comment__btn comment__btn-reply">
          <img src={chatBox} alt="x"></img>
        </button>
      </div>
    </div>
  );
}

const samplePost = {
  title: "엄청난 비밀이 드러났다! 당신은 반드시 알아야 할 사실!",
  detail:
    "지금까지 숨겨져 있던 엄청난 비밀이 드디어 밝혀졌습니다! 이 비밀은 우리 모두에게 영향을 미치며 알지 못했던 사실들로 가득 차 있습니다. 우선, 당신은 알고 계셨나요? 많은 연구자들이 이를 뒷받침하는 근거를 발견했습니다. 그렇다면, 이 비밀이 바로 당신의 삶에 어떤 영향을 미칠 수 있는지 상상해보세요. 그리고 알고 계신 분들은 그저 침묵해야 할까요? 아니요, 오히려 이 비밀을 공유함으로써 우리는 더욱더 진실을 밝혀내고 세상을 변화시킬 수 있습니다. 이 글에서는 이 비밀의 전말을 공개합니다. 당신은 이제 더 이상 속지 않고, 진실을 알고 싶지 않으신가요? 이 비밀을 알면 당신의 인생은 완전히 달라질 것입니다. 모두가 기다리던 그 비밀, 지금 당신의 눈앞에 펼쳐집니다. 함께 이 세계적인 사건의 흐름에 영향을 끼치고, 앞으로 당신의 선택이 어떻게 변화할지 경험해보세요! 준비되셨나요? 그렇다면, 지금 당장 이 글을 읽어보세요. 이 비밀은 아무도 상상하지 못한 것일지도 모릅니다. 그러니, 당신이 이 세상을 움직일 힘을 손에 넣을 차례입니다.당신은 더는 그저 평범한 삶을 살 수 없을 것입니다. 이 비밀은 당신의 모든 선택에 영향을 미치며, 당신의 삶을 완전히 바꿀 것입니다. 지금까지 당신은 이 비밀을 모르고 살아왔지만, 이제는 진실을 알게 되었습니다. 당신은 이제부터 이 비밀을 어떻게 다룰지, 그것이 당신과 주변 사람들에게 어떤 영향을 줄지 생각해야 합니다. 이 비밀을 숨길 것인지, 공유할 것인지 선택은 당신에게 달렸습니다. 그러나 당신이 선택한 길은 세상을 뒤바꿀 수 있는 힘을 가지게 될 것입니다. 이제부터는 과거의 당신과는 다른 사람이 되어야 합니다. 이 비밀은 당신에게 주어진 새로운 임무입니다. 그리고 이 임무를 수행하기 위해서는 지금 당장 이 글을 끝까지 읽어야 합니다. 거기에는 그 비밀의 모든 것이 담겨 있습니다. 마음을 다잡고, 이제 진실을 향해 나아갑시다. 이 비밀은 어떤 사건을 초래할지, 어떤 사실을 드러낼지 모르는 상태에서 우리는 함께 여정을 떠나야 합니다. 함께 세계를 움직이고, 미래를 바꾸는 힘을 가질 수 있을 것입니다. 지금까지는 당신이 단순한 존재였지만, 이제는 당신은 그 어떤 것보다도 특별한 사람이 될 것입니다. 그 비밀은 당신을 새로운 세계로 인도하며, 당신이 이끌어 갈 주인공이 될 것입니다. 그러니 이제 당신의 선택에 맞게 움직이세요. 이 비밀은 당신의 인생을 완전히 바꿀 것입니다. 그리고 당신은 이 세상을 움직일 힘을 손에 넣게 될 것입니다. 지금 당장 준비되셨나요? 그렇다면, 당신은 이제부터 진실을 향한 여정을 시작할 것입니다.",
  date: "2023-03-23",
  writer: "userA",
  category: "유머",
  comment: [
    {
      idx: 0,
      writer: "usdwd",
      date: "2023-03-23",
      detail: "이런 사건은 정말 신기하고 흥미롭다!",
      reply: [
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
      ],
    },
    {
      idx: 2,
      writer: "kingT",
      date: "2023-03-23",
      detail: "이 비밀이 알려지면 정말 세상이 터져버릴 거야!",
      reply: [
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
      ],
    },
    {
      idx: 3,
      writer: "tydle",
      date: "2023-03-23",
      detail: "비밀이 밝혀지면 우리 삶이 완전히 변할 거야!",
      reply: [
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail:
            "이런 사건은 정말 신기하고 흥미롭다! 만약 댓글이 엄청나게 길어진다면 어떻게 될까??? 옆으로 늘어날까 아래로 늘어날까 내 생각엔 아래로 늘어날 것 같지만 일단 한번 해보자. 해보니까 max-height를 설정해둬야 겠다. 한놈이 다 준내 길게 써버리면 답도 없잖아 딱 보니까 최소 높이의 세 배로 한 뒤에 만약 펼치기 하면 펼쳐 볼 수 있도록 하는게 좋겠어",
        },
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
        {
          idx: 0,
          writer: "usdwd",
          date: "2023-03-23",
          detail: "이런 사건은 정말 신기하고 흥미롭다!",
        },
      ],
    },
  ],
};
