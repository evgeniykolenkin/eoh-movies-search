import { useRef } from "react";
import starImg from "../assets/star.png";
import elsellipseImg from "../assets/ellipse.png";
import playImg from "../assets/play.png";
import markImg from "../assets/popup-mark.png";
import shareImg from "../assets/share.png";
import closeImg from "../assets/close.png";
// import noImg from "../assets/no-image.png";

export function SelectedMovie({
  selectedMovie,
  setSelectedMovie,
  setShowDetails,
}) {
  // ?? как деструктурировать если undefined
  // const { Title, Year, Plot, Genre, imdbRating, Poster, Rated } = selectedMovie;

  const ref = useRef();

  const closePopupOutContent = (e) => {
    if (!ref.current.contains(e.target)) {
      setSelectedMovie();
      setShowDetails(false);
      document.body.classList.remove("fixed");
    }
  };

  const closePopup = () => {
    setSelectedMovie();
    setShowDetails(false);
    document.body.classList.remove("fixed");
  };

  return (
    <div className="popup" onClick={(e) => closePopupOutContent(e)}>
      <div className="popup__content" ref={ref}>
        {selectedMovie ? (
          <>
            <img
              className="close__btn"
              src={closeImg}
              alt="close cross"
              onClick={closePopup}
            />
            <img
              src={
                selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : `https://placehold.co/210x308?text=No+Poster`
              }
              alt="movie poster"
            />
            <div className="selected__movie__info">
              <h1>{selectedMovie.Title}</h1>
              <div className="info__header">
                <button className="play__btn">
                  <img src={playImg} alt="play" />
                  <p>Смотреть</p>
                </button>
                <img src={markImg} alt="" />
                <img src={shareImg} alt="" />
              </div>
              <div className="rating__year">
                <span>
                  <img src={starImg} alt="star" />
                  <span>{selectedMovie.imdbRating}</span>
                </span>
                <span>|</span>
                <span>{selectedMovie.Year}</span>
              </div>
              <div className="rated">{selectedMovie.Rated}</div>
              <div className="genres">
                {selectedMovie.Genre.toString()
                  .split(",")
                  .map((item, index) => (
                    <div key={index} className="genre">
                      <span>{item}</span>
                      <img src={elsellipseImg} alt="ellipse" />
                    </div>
                  ))}
              </div>
              <div className="plot">{selectedMovie.Plot}</div>
            </div>
          </>
        ) : (
          <div className="loading">Хуй тебе, подожди...</div>
        )}
      </div>
    </div>
  );
}
