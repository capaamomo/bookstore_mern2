import express from "express";
import {Book} from "../models/bookstore_models.js";

const router = express.Router();

router.post('/', async (request,response) => {
    try{
        if(
            !request.body.title || !request.body.author || !request.body.PublishYear
        ){
            return response.status(500).send({message: 'send all fields'});
        }

        const newbook = {
            title: request.body.title,
            author: request.body.author,
            PublishYear: request.body.PublishYear,
        };

        const book  = await Book.create(newbook);

    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/', async (request,response) =>{
    try{
        const books = await Book.find({});
        response.status(200).json({
            count: books.length,
            data: books
        });
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


router.get('/:id', async (request,response) =>{
    try{

        const { id } = request.params;
        
        const book = await Book.findById(id);

        if(!book){
            return response.status(404).json({message: 'book not found'});
        }
        response.status(200).json({
            book            
        });
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


router.put('/:id', async (request,response) =>{
    try{
        if(!request.body.title || !request.body.author || !request.body.PublishYear){
            response.status(500).send('give all details');
        }
        const {id} = request.params;
        const book = await Book.findByIdAndUpdate(id, request.body);

        if(!book){
            return response.status(404).json({
                message: 'book not found'
            })
        }

        const booktodisplay = await Book.findById(id);

        return response.status(200).json({
            message: 'book updated new entry:',
            booktodisplay
        })
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


router.delete('/:id', async (request,response) =>{
    try{
        const { id } = request.params;
        const removed = await Book.findByIdAndDelete(id);
        if(!removed){
            return response.status(404).json({message: 'book not found'});
        }
        return response.status(200).json({message: 'book deleted'});
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;