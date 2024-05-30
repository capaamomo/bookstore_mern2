import React, { useState } from 'react'
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [title, settitle] = useState('');
  const [author, setauthor] = useState('');
  const [PublishYear, setpublishyear] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();



  const handlesavebook = () =>{
    const data = {
      title,
      author,
      PublishYear
    };
    setloading(true);

    axios
    .post('https://bookstore-mern2-backend.vercel.app/books', data)
/*    .then(()=>{
      navigate('/');
      setloading(false);
    })
    .catch((error) => {
      setloading(false);
      alert('WHHYYYY???????');
      console.log(error);
    });
*/
/*
    .catch((error)=>{
      setloading(false);
      alert('annoying error');
      console.log(error);
    });
*/
    setTimeout(() => {
      setloading(false);
      navigate('/')
    }, 2000);
  };


  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>create book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'>Title</label>
          <input type='text'
          value = {title}
          onChange={(e) => settitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'>Author</label>
          <input type='text'
          value = {author}
          onChange={(e) => setauthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'>Publish Year</label>
          <input type='text'
          value = {PublishYear}
          onChange={(e) => setpublishyear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handlesavebook}>
          save
        </button>
      </div>
    </div>
  )
}

export default CreateBook