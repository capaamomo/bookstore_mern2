import express from "express";
import {Book} from "../models/bookstore_models.js";

const router = express.Router();

router.post('/', async (request,response) => {
    try{
        if(
            !request.body.title || !request.body.author || !request.body.PublishYear || isNaN(request.body.PublishYear)
        ){
            return response.status(500).send({message: 'invalid input'});
        }
        const newbook = {
            title: request.body.title,
            author: request.body.author,
            PublishYear: request.body.PublishYear,
        };

        await Book.create(newbook);

        return response.status(200).send('Book created');
    }catch (error) {
        console.log(error.message);
        response.status(422).send({message: error.message});
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
            return response.status(404).json({message: 'Book not found'});
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
            return response.status(500).send({message:'Some fields are missing'});
        }

        const {id} = request.params;
        const book = await Book.findByIdAndUpdate(id, request.body);

        if(!book){
            return response.status(404).json({
                message: 'Book not found'
            })
        }

        const booktodisplay = await Book.findById(id);

        return response.status(200).json({
            message: 'Book updated new entry:',
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
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book deleted'});
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;