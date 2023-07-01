import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import profileImg from "../../asset/icons/person.svg";
import "./style.css";

export default function MyPage() {
  return (
    <div className="mypage">
      <Header />
      <Gnb />
      <main className="mypage__main">
        <section className="mypage__grid-container">
          <h2 className="mypage__title" hidden>
            my page
          </h2>
          <div className="mypage__profile">
            <div className="mypage__img-wrapper">
              <img
                src={profileImg}
                className="mypage__profile-img"
                alt="profile-img"
              ></img>
              <p className="mypage__nick">nickname</p>
            </div>
            <p className="mypage__email">sample@gmail.com</p>
          </div>
          <div className="mypage__my-write mypage__exp">
            <p>16</p>
            <p>게시글</p>
          </div>
          <div className="mypage__my-comment mypage__exp">
            <p>72</p>
            <p>댓글</p>
          </div>
          <div className="mypage__grade mypage__exp">
            <p>72</p>
            <p>등급</p>
          </div>
          <section className="mypage__swap">
            <h3 hidden>swap spot</h3>
            <div className="swapspot__item">
              <p className="swapspot__info">판매중</p>
            </div>
            <div className="swapspot__item">
              <p className="swapspot__info">거래완료</p>
            </div>
          </section>
          <div className="mypage__visit">
            <h3>최근 읽은 글</h3>
            <div className="mypage__visit-board"></div>
          </div>

          <div className="mypage__comment">
            <h3>방명록</h3>
            <div className="mypage__comment-board"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
