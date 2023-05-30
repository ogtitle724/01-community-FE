import "./style.css";

export default function ContentBoard({ post, sanitize }) {
  console.log(sanitize(post.content));
  return (
    <section className="content-board">
      <article className="content-board__content">
        <h2 className="content-board__title">{post.title}</h2>
        <div className="content-board__info-wrapper">
          <span className="content-board__date">{post.date}</span>
          <div>
            <span className="content-board__category">{post.category}</span>
            <span> | </span>
            <span className="content-board__writer">{post.author}</span>
          </div>
        </div>
        <div
          className="content-board__detail"
          dangerouslySetInnerHTML={{ __html: sanitize(post.content) }}
        ></div>
        <div className="content-board__btn-wrapper">
          <button className="content-board__btn content-board__btn--good">
            Good
          </button>
          <button className="content-board__btn content-board__btn--bad">
            Bad
          </button>
        </div>
        <section className="content-board__related">
          <h3 className="content-board__title-related">추천 컨텐츠</h3>
          <div className="content-board__best"></div>
        </section>
      </article>
    </section>
  );
}
