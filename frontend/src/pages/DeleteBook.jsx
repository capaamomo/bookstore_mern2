import React from 'react';
import { useState } from 'react';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const DeleteBook = () => {
  const[loading, setloading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const handledeletebook = ()=>{
    setloading(true);
    axios.delete(`https://bookstore-mern2-backend.vercel.app/books/${id}`)
    .then(()=>{
      setloading(false);
      navigate('/');
    })
    .catch((error)=>{
      alert('error');
      console.log(error);
      setloading(false);
    });
  };
  return (
    <div className='p-4'>
      <Backbutton />
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[450px] p-5 mx-auto'>
        <h3 className='text-xl'>Delete Book?</h3>
        <button className='p-4 bg-red-600 text-white rounded-xl m-4 w-[300px]'
        onClick={handledeletebook}>
          DELETE
        </button>
      </div>
    </div>
  )
}

export default DeleteBook