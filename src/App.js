import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  async function fetchHandler() {
    const response = await fetch("https://swapi.dev/api/films/"); //fetch functions is automatically set to get
    const data = await response.json();
    const transformedMovies = data.results.map((moviedata) => {
      return {
        id: moviedata.episode_id,
        title: moviedata.title,
        openingText: moviedata.opening_crawl,
        releaseDate: moviedata.release_date,
      };
    });
    setMovies(transformedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
