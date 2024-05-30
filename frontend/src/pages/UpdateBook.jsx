import React, { useState, useEffect } from 'react'
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const [title, settitle] = useState('');
  const [author, setauthor] = useState('');
  const [PublishYear, setpublishyear] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(()=>{
    setloading(true);
    axios.get(`https://bookstore-mern2-backend.vercel.app/books/${id}`)
    .then((response)=>{
      setauthor(response.data.book.author);
      setpublishyear(response.data.book.PublishYear);
      settitle(response.data.book.title);
      setloading(false);
    }).catch((error)=>{
      setloading(false);
      alert('error getting info');
      console.log(error);
    });
  },[id])

  const handleeditbook = () =>{
    const data = {
      title,
      author,
      PublishYear
    };
    setloading(true);
    axios
    .put(`https://bookstore-mern2-backend.vercel.app/books/${id}`, data)
    .then(() => {
      setloading(false);
      navigate('/');
    })
    .catch((error) => {
      setloading(false);
      alert('error updating');
      console.log(error);
    });
  };
  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>update book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'>title</label>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleeditbook}>
          save
        </button>
      </div>
    </div>
  )
}


export default UpdateBook