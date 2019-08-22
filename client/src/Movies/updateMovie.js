import React, { useState, useEffect } from "react";
import axios from 'axios'
import { ECONNRESET } from "constants";


const UpdateForm = (props) => {
    console.log(props)
    const [original, setOriginal] = useState({})
    const [ updatedMovie, setUpdatedMovie ] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setOriginal(res.data)
                setUpdatedMovie(res.data)
                
            })

    },[])

    

      const submitHandler = (e) => {
          e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
            .then(res => {console.log(res)})
            .catch(err => console.log(err));
        
        
        // props.history.push('/')
      }

      const changeHandler = (e) => {
        setUpdatedMovie({...updatedMovie, [e.target.name]: e.target.value})
        console.log(updatedMovie)
      }




    return (
        <>
        <h2 onClick={() => console.log(original)}>update: {original.title} </h2>
        <form onSubmit={(event) => submitHandler(event)}>
            <input name='title' placeholder={updatedMovie.title} type='text' onChange={(event) => changeHandler(event)} value={updatedMovie.title} />
            <input name='director' placeholder={updatedMovie.director} type='text' onChange={(event) => changeHandler(event)} value={updatedMovie.director} />
            <input name='metascore' placeholder={updatedMovie.metascore} type='text' onChange={(event) => changeHandler(event)} value={updatedMovie.metascore} />
            <button>change</button>
        </form>
        </>
    )
}
export default UpdateForm;