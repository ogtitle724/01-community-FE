import { useRef } from "react";
import "./style.css";

export default function ChatRoom() {
  const ref = useRef();
  const handleClkBtnTop = (e) => {
    e.preventDefault();

    ref.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <main className="chat-room__main">
        <ul ref={ref} className="chat-room__chats">
          <li className="chat-room__chat chat-room__chat--me">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--me">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other"></li>
          <li className="chat-room__chat chat-room__chat--me">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--me">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other"></li>
          <li className="chat-room__chat chat-room__chat--me">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
          <li className="chat-room__chat chat-room__chat--other">
            테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 채팅 내용입니다.테스트용 채팅
            내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅 내용입니다.
          </li>
        </ul>
        <div className="chat-room__input"></div>
        <buttom
          className="chat-room__btn-top"
          onClick={handleClkBtnTop}
        ></buttom>
      </main>
    </>
  );
}
