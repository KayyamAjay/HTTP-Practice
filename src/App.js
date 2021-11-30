import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  async function fetchHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/"); //fetch functions is automatically set to get
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found</p>}
        {isLoading && <p>Loading....</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
