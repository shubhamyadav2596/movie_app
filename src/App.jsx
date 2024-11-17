import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PageNotfound from "./components/PageNotfound/PageNotfound";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" exact Component={Home} />
              <Route path="/movie/:imdbID" Component={MovieDetails} />
              <Route Component={PageNotfound} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
