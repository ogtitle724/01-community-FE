import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import "./style.css";

export default function ItemDetail() {
  const [itemDetail, setItemDetail] = useState();
  const [isSug, setIsSug] = useState(false);
  const itemId = useParams().itemId;

  useEffect(() => {
    const getItemData = async () => {
      try {
        let path = process.env.REACT_APP_PATH_ITEM.replace("{item-id}", itemId);
        const res = await axios.get(path);

        setItemDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItemData();
  }, [itemId]);

  const handleClkBtnSug = () => {
    setIsSug(true);
  };

  const handleClkCancel = () => {
    setIsSug(false);
  };

  return (
    <>
      <Header />
      <Gnb />
      <main
        className="item-detail__main"
        onScroll={(e) => console.log("scroll:", e.target)}
      >
        {false ? <img></img> : <div className="item-detail__no-img"></div>}
        <h2 className="item-detail__title">(미개봉) 뉴발 993 트리플 블랙</h2>

        <div className="item-detail__description">
          뉴발란스993팝니다. 박스도 있습니다. 연락주세요!
        </div>
        <div className="item-detail__info">
          <button className="item-detail__btn-like"></button>
          <span className="item-detail__figure">99+</span>
          <button className="item-detail__btn-chat"></button>
          <span className="item-detail__figure">99+</span>
          <span className="item-detail__time">3시간전</span>
        </div>
        <div className="suged-list">
          <h3 className="suged-list__title">제안된 거래</h3>
          <ul className="suged-list__ul">
            <li className="suged-item">
              <div className="suged-item__img"></div>
              <span className="suged-item__title">
                아이폰 13프로 맥스 스그 s급
              </span>
              <span className="suged-item__nick">샘플유접</span>
            </li>
          </ul>
        </div>
        <button className="item-detail__btn-ask" onClick={handleClkBtnSug}>
          제안하기
        </button>
      </main>
      {isSug && <SugForm setIsSug={setIsSug} />}
    </>
  );
}

function SugForm({ setIsSug }) {
  /**
   * 자기 자신이 올려둔 아이템 데이터 받아옴
   * 체크 가능하도록
   * 아이템 별 상태가 있어야 할듯 / 거래제안됨, 거래완료, 일반 => 제안된 상태는 추가적인 제안 가능??
   * 제안 창에서 바로 거래 포스팅 올리도록 하는게 좋을까? 아니면 제안용과 제안받을 용을 나누는게 좋을까?
   * 채팅은 어느타이밍에 넘어가야하지? 제안시 바로 연결은 해야될듯 => 채팅창을 따로 라우팅하는게 맞겠다
   */
  const [selecteItemId, setSelectedItemId] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [imgs, setImgs] = useState([]);

  const handleClkBtnSubmit = (e) => {
    e.preventDefault();
    if (selecteItemId) {
      setIsSug(false);
    } else {
      alert("품목을 선택해주세요");
    }
  };

  const handleClkBtnCancel = (e) => {
    e.preventDefault();
    if (isCreate) {
      setIsCreate(false);
      setImgs([]);
    } else {
      setIsSug(false);
      setSelectedItemId(null);
    }
  };

  const handleClkRadio = (e) => {
    setSelectedItemId(e.target.value);
  };

  const handleClkBtnCreate = (e) => {
    e.preventDefault();
    setIsCreate(true);
  };

  const handleClickUploadBtn = (e) => {
    const files = e.target.files;
    let temp = [];

    const loadFile = (fileIndex) => {
      if (files[fileIndex] && fileIndex < 5) {
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
          temp.push(event.target.result);
          loadFile(fileIndex + 1);
        });
        reader.readAsDataURL(files[fileIndex]);
      } else {
        setImgs(temp);
      }
    };

    // Start reading the first file
    loadFile(0);
  };

  const handleClkBtnDel = (e, idx) => {
    e.preventDefault();
    let newImgs = imgs.slice();
    newImgs.splice(idx, 1);
    setImgs(newImgs);
  };

  const getImgs = () => {
    let eles = [];
    for (let i = 0; i < 5; i++) {
      if (imgs?.[i]) {
        eles.push(
          <div className="create-field__img-wrapper">
            <img src={imgs[i]} alt="imgs" className="create-field__img"></img>
            <button
              className="create-filed__btn-delete-img"
              onClick={(e) => handleClkBtnDel(e, i)}
            >
              ✖
            </button>
          </div>
        );
      } else {
        eles.push(<div className="create-field__default-img"></div>);
      }
    }

    return eles;
  };

  console.log(imgs);
  let a = null;

  return (
    <form className="sug-form" onSubmit={handleClkBtnSubmit}>
      {isCreate ? (
        <>
          <div className="create-field">
            <div className="create-field__img-receive">
              <label
                className="create-field__img-label"
                for="create-field__img-input"
              >
                <input
                  id="create-field__img-input"
                  className="create-field__img-input"
                  type="file"
                  multiple="multiple"
                  capture="environment"
                  ccept="image/*"
                  onChange={handleClickUploadBtn}
                />
                <span className="create-field__img-count">{`${imgs.length}/5`}</span>
              </label>
              {getImgs(imgs)}
            </div>
            <input
              type="text"
              className="create-field__title"
              placeholder="제목을 입력하세요"
            ></input>
            <div className="create-field__description"></div>
          </div>
          <div className="create-field__btn-wrapper">
            <button className="create-field__btn" onClick={handleClkBtnCancel}>
              취 소
            </button>
            <button className="create-field__btn">확 인</button>
          </div>
        </>
      ) : (
        <>
          <ul className="sug-form__items">
            <button className="sug-from__btn-new" onClick={handleClkBtnCreate}>
              + 새로 만들기
            </button>
            <li>
              <label for="sub-form__radio-id" className="sug-form__item">
                <input
                  type="radio"
                  name="sug-from__radio"
                  id="sub-form__radio-id"
                  className="sug-form__radio-btn"
                  value="id1"
                  onChange={handleClkRadio}
                ></input>
                <div className="sug-form__item-img"></div>
                <span className="sug-form__item-title">샘플 데이터 타이틀</span>
                <span className="sug-form__item-nick">유저123</span>
              </label>
            </li>
            <li>
              <label for="sub-form__radio-id" className="sug-form__item">
                <input
                  type="radio"
                  name="sug-from__radio"
                  id="sub-form__radio-id"
                  className="sug-form__radio-btn"
                  value="id1"
                  onChange={handleClkRadio}
                ></input>
                <div className="sug-form__item-img"></div>
                <span className="sug-form__item-title">샘플 데이터 타이틀</span>
                <span className="sug-form__item-nick">유저123</span>
              </label>
            </li>
            <li>
              <label for="sub-form__radio-id" className="sug-form__item">
                <input
                  type="radio"
                  name="sug-from__radio"
                  id="sub-form__radio-id"
                  className="sug-form__radio-btn"
                  value="id1"
                  onChange={handleClkRadio}
                ></input>
                <div className="sug-form__item-img"></div>
                <span className="sug-form__item-title">샘플 데이터 타이틀</span>
                <span className="sug-form__item-nick">유저123</span>
              </label>
            </li>
          </ul>
          <div className="sug-form__btn-wrapper">
            <button className="sug-form__btn" onClick={handleClkBtnCancel}>
              취 소
            </button>
            <button className="sug-form__btn">확 인</button>
          </div>
        </>
      )}
    </form>
  );
}
