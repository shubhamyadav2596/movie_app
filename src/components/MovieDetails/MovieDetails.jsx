import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchAsyncMovieOrShow,
  getSelectedMoviesOrShows,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";

import "./MovieDetails.scss";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();

  const data = useSelector(getSelectedMoviesOrShows);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShow(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  console.log(data);
  return (
    <>
      <div style={{marginTop: "1.5rem"}}>
        <Link className="back-btn" to="/">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
      </div>
      <div className="movie-section">
        {Object.keys(data).length === 0 ? (
          <div>...Loading</div>
        ) : (
          <>
            <div className="section-left">
              <div className="movie-title">{data.Title}</div>
              <div className="movie-plot">{data.Plot}</div>
              <div className="movie-rating">
                <span>
                  IMDB Rating <i className="fa-solid fa-star"></i> :{" "}
                  {data.imdbRating}
                </span>
                <span>
                  IMDB Votes <i className="fa-solid fa-thumbs-up"></i> :{" "}
                  {data.imdbVotes}
                </span>
                <span>
                  Runtime <i className="fa-solid fa-film"></i> : {data.Runtime}
                </span>
                <span>
                  Year <i className="fa-solid fa-calenderr"></i> : {data.Year}
                </span>
              </div>
              <div className="movie-plot">{data.plot}</div>
              <div className="movie-info">
                <div>
                  <span>Director</span>
                  <span>{data.Director}</span>
                </div>
                <div>
                  <span>Stars</span>
                  <span>{data.Actors}</span>
                </div>
                <div>
                  <span>Geners</span>
                  <span>{data.Genre}</span>
                </div>
                <div>
                  <span>Languages</span>
                  <span>{data.Language}</span>
                </div>
                <div>
                  <span>Awards</span>
                  <span>{data.Awards}</span>
                </div>
              </div>
            </div>

            <div className="section-right">
              <img src={data.Poster} alt={data.Title} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
