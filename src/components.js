import { useState } from "react";

export function Home() {
  return (
    <div onScroll={() => console.log("scroll")} className="content--home">
      <HorizontalList />
      <section className="content__section-curr"></section>
    </div>
  );
}

function HorizontalList() {
  let isMouseDown = false;
  let startX;

  function handleMouseDown(e) {
    e.preventDefault();
    isMouseDown = true;
    startX = e.clientX;
  }

  function handleMouseUp(e) {
    isMouseDown = false;
  }

  function handleDrag(e) {
    if (!isMouseDown) return;

    const degree = e.clientX - startX;
    let container = document.getElementsByClassName(
      "horizon-list__card-container"
    )[0];

    container.style.left = `${container.offsetLeft + degree}px`;
    startX = e.clientX;
  }

  return (
    <section className="horizon-list">
      <h1 className="horizon-list__list-title">Trendings</h1>
      <div
        className="horizon-list__card-container"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseLeave={(e) => handleMouseUp(e)}
        onMouseMove={(e) => handleDrag(e)}
      >
        {Array(10)
          .fill("post")
          .map((post, idx) => {
            return <PostCard key={"card_" + idx} />;
          })}
      </div>
    </section>
  );
}

function PostCard() {
  return (
    <article className="horizon-list__card">
      <img
        src="sample.png"
        className="horizon-list__img"
        alt="img dosen't supported"
      />
      <h2 className="horizon-list__card-title">sample title</h2>
    </article>
  );
}

export function Best() {
  return;
}

export function Others() {
  return;
}
