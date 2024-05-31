import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://bookstore-mern2-backend.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <Backbutton />
      <div className='flex justify-center'>
        <h1 className='text-2xl my-4'>Details</h1>
      </div>
      
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mx-auto'>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Id :</span>
            <span>{book._id}</span>
          </div>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Title :</span>
            <span>{book.title}</span>
          </div>
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Author :</span>
            <span>{book.author}</span>
          </div>

          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year :</span>
            <span>{book.PublishYear}</span>
          </div>
          
          <div className='my-1'>
            <span className='text-xl mr-4 text-gray-500'>Create Time :</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time :</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;