import { useRef } from "react";
import "./style.css";

export default function HorizontalList() {
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
    } else if (container.current.offsetLeft < -765) {
      container.current.style.transition = "0.6s";
      container.current.style.left = `-725px`;
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
