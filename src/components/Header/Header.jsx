import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>

      {location.pathname === "/" && ( // Check if not on MovieDetails page
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              placeholder="Search Movies"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      )}

      
    </div>
  );
};

export default Header;
