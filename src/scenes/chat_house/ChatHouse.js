import { useSelector } from "react-redux";
import { selectIsLogIn } from "../../redux/slice/signSlice";
import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import UserBoard from "../../components/header/components/user_board/UserBoard";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function ChatHouse() {
  const navigate = useNavigate();
  const isLogIn = useSelector(selectIsLogIn);
  if (!isLogIn) navigate(process.env.REACT_APP_ROUTE_HOME);

  const handleClkLogo = () => navigate(process.env.REACT_APP_ROUTE_HOME);
  const handleClkChat = () => navigate(process.env.REACT_APP_ROUTE_CHATROOM);
  return (
    <>
      <header className="chathouse__header">
        <h1 className="chathouse__title" onClick={handleClkLogo}>
          CLiPmArKET
        </h1>
        <UserBoard />
      </header>
      <main className="chathouse__main">
        <ul className="chathouse__ul">
          <li className="chat-entrance" onClick={handleClkChat}>
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">샘플닉네임</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">
              채팅 미리보기 여기채팅 미리보기 여기채팅 미리보기 여기채팅
              미리보기 여기채팅 미리보기 여기채팅 미리보기 여기
            </span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
          <li className="chat-entrance">
            <div className="chat-entrance__img" alt="chat-entrance__img"></div>
            <div className="chat-entrance__info">
              <span className="chat-entrance__opponent-nick">dolldom</span>
              <span className="chat-entrance__time">1시간전</span>
            </div>
            <span className="chat-entrance__preview">채팅 미리보기 여기</span>
          </li>
        </ul>
        {/* <div className="chathouse__btn-newchat">
          <input></input>
          <button></button>
        </div> */}
      </main>
    </>
  );
}
