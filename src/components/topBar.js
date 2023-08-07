import icons from "./sprite.svg";

export default function TopBar() {
  return (
    <div className="top-bar">
      <button className="btn-note-books" type="button">
        NOTE BOOKS
      </button>
      <form action="">
        <input type="text" name="note" placeholder="Search" id="note" />
        <label htmlFor="note">
          <svg className="icon">
            <use href={`${icons}#search-outline`}></use>
          </svg>
        </label>
      </form>
      <button className="btn btn--circle btn--circle--big" type="button">
        <svg className="icon icon-big">
          <use href={`${icons}#star-outline`}></use>
        </svg>
      </button>
    </div>
  );
}
