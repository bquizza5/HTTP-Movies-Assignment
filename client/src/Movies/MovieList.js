import React, { Component, autoBind } from "react";
import axios from "axios";

import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  deleteMovie(id) {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
      console.log(this.state)
    // this.setState({movies: this.state.movies.reduce(movie => movie.id !== id)})
    
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails deleteMovie={this.deleteMovie} key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails(props) {
  return (
      <MovieCard movie={props.movie} deleteMovie={props.deleteMovie} />
  );
}
