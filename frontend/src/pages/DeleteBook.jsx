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
      <h1 className='text-3xl my-4'> delete book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>entry will be permanently deleted</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handledeletebook}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteBook