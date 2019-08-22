import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard";


const MovieList = () => {

  const [ state, setState ] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  })

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
    setState({movies: state.movies.filter(movie => movie.id !== id)})

  }

  return (
          <div className="movie-list">
           {state? state.movies.map(movie => (
              <MovieDetails deleteMovie={deleteMovie} key={movie.id} movie={movie} />
            )) : <h1>loading</h1>
           
             } 
          </div>
        );

}

const MovieDetails = (props) => {
  return (
      <MovieCard movie={props.movie} deleteMovie={props.deleteMovie} />
  );
}

export default MovieList;

// export default class MovieList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movies: []
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("http://localhost:5000/api/movies")
//       .then(res => this.setState({ movies: res.data }))
//       .catch(err => console.log(err.response));
//   }

//   deleteMovie(id) {
//     axios
//       .delete(`http://localhost:5000/api/movies/${id}`)
//       .then(response => console.log(response))
//       .catch(err => console.log(err));
//     console.log(this.state)
//     this.setState({movies: this.state.movies.filter(movie => movie.id !== id)})
    
//   }

//   render() {
//     return (
//       <div className="movie-list">
//         {this.state.movies.map(movie => (
//           <MovieDetails deleteMovie={this.deleteMovie} key={movie.id} movie={movie} />
//         ))}
//       </div>
//     );
//   }
// }

// function MovieDetails(props) {
//   return (
//       <MovieCard movie={props.movie} deleteMovie={props.deleteMovie} />
//   );
// }
