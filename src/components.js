import { useState, useRef } from "react";

const initialPost = {
  id: 123,
  title:
    "An overview of the COVID-19 Pandemic Impact on Small Businesses in the U.S",
  description: "this is sample description for post",
  date: "2023.5.1",
  time: "23:52",
  writer: "samS732",
  view: 57,
  like: 30,
  dislike: 4,
  category: "유머",
  comment: [],
};

export function Home() {
  return (
    <div className="main__content">
      <HorizontalList />
      <Board
        title={"Recent Posts"}
        postData={Array(200).fill("")}
        postNum={30}
      />
    </div>
  );
}

export function Best() {
  return (
    <div className="main__content">
      <Board title={"Best Posts"} postData={Array(200).fill("")} postNum={35} />
    </div>
  );
}

export function Others({ title }) {
  function Hits({ postNum }) {
    return (
      <ul className="hits-board">
        {Array(postNum)
          .fill("")
          .map((ele, idx) => {
            return (
              <li className="hits-board__post">
                <span
                  className={
                    "hits-board__order" +
                    (idx < 3 ? " hits-board__order--best" : "")
                  }
                >
                  {idx + 1}
                </span>

                <a href="/" className="hits-board__title">
                  {"여기에 따봉수로 컷한글 15개"}
                </a>
                <span className="hits-board__like">{12}</span>
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div className="main__content main__content--topic">
      <Board title={title} postData={Array(200).fill("")} postNum={35} />
      <section className="hits">
        <aside className="hits__wrapper">
          <h2 className="hits__title">{"Hits"}</h2>
          <Hits postNum={20} />
          <Hits postNum={10} />
        </aside>
      </section>
    </div>
  );
}

function HorizontalList() {
  const [isMouseDown, startX, container] = [
    useRef(false),
    useRef(""),
    useRef(),
  ];

  const handleMouseDown = (e) => {
    e.preventDefault();
    isMouseDown.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    isMouseDown.current = false;
  };

  const handleDrag = (e) => {
    if (!isMouseDown.current) {
      return;
    } else if (container.current.offsetLeft > 40) {
      container.current.style.transition = "0.6s";
      container.current.style.left = `0px`;
      isMouseDown.current = false;
      return;
    } else if (container.current.offsetLeft < -805) {
      container.current.style.transition = "0.6s";
      container.current.style.left = `-765px`;
      isMouseDown.current = false;
      return;
    }

    const degree = e.clientX - startX.current;

    startX.current = e.clientX;
    container.current.style.transition = "0s";
    container.current.style.left = `${container.current.offsetLeft + degree}px`;
  };

  function Card() {
    return (
      <article className="card">
        <img
          src="sample.png"
          className="card__img"
          alt="img dosen't supported"
        />
        <h2 className="card__title">sample title</h2>
      </article>
    );
  }

  return (
    <section className="horizon-list">
      <h1 className="horizon-list__list-title">Trendings</h1>
      <div
        ref={container}
        className="horizon-list__card-container"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseLeave={(e) => handleMouseUp(e)}
        onMouseMove={(e) => handleDrag(e)}
      >
        {Array(10)
          .fill("post")
          .map((post, idx) => {
            return <Card key={"card_" + idx} />;
          })}
      </div>
    </section>
  );
}

function Board({ title, postData, postNum }) {
  const [pageNum, setPageNum] = useState(0);

  function Post({ postData }) {
    return (
      <li className="post">
        <a className="post__title" href={`/post?id=${postData.id}`}>
          {postData.title}
        </a>
        <div className="post__data-wrapper">
          <p className="post__data">
            {postData.category + " | " + postData.view}
          </p>
          <p className="post__data">{postData.time} </p>
        </div>
      </li>
    );
  }

  return (
    <section className="board">
      <h2 className="board__title">{title}</h2>
      <ul>
        {Array(postNum)
          .fill(initialPost)
          .map((post, idx) => {
            return <Post key={"post_" + idx} postData={post} />;
          })}
      </ul>
      <nav className="board__nav">
        <div className="board__nav-direction center-x">
          {String.fromCharCode(94)}
        </div>
        <li
          className="board__nav-btn"
          onClick={() => {
            let curr = pageNum;
            setPageNum(curr + 1);
          }}
        >
          {"<"}
        </li>
        {Array(postData.length / 25)
          .fill("")
          .map((ele, idx) => {
            return (
              <li
                className="board__nav-btn"
                key={idx}
                onClick={() => setPageNum(idx + 1)}
              >
                {idx + 1}
              </li>
            );
          })}
        <li
          className="board__nav-btn"
          onClick={() => {
            let curr = pageNum;
            setPageNum(curr + 1);
          }}
        >
          {">"}
        </li>
      </nav>
    </section>
  );
}
