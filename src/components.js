export function Home() {
  /* function handleMouseMove(e) {
    e.target.addEventListener("mousemove", (event) =>
      console.log(event.clientX)
    );
  } */

  return (
    <div onScroll={() => console.log("scroll")} className="content--home">
      <section
        /* onMouseDown={(e) => handleMouseMove(e)} */
        className="content__section-bests"
      >
        <h1 className="content__title--home">Trendings</h1>
        {Array(10)
          .fill("post")
          .map((post, idx) => {
            return <PostCard />;
          })}
      </section>
      <section className="content__section-curr"></section>
    </div>
  );
}

function PostCard() {
  return (
    <article className="card">
      <img src="sample.png" className="card__img" alt="img dosen't supported" />
      <h2 className="card__title">sample title </h2>
    </article>
  );
}

export function Best() {
  return;
}

export function Others() {
  return;
}
