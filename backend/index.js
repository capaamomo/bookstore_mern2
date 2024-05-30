import express from "express";
import mongoose from "mongoose";
import { PORT , mongodburl} from "./config.js";
import { Book } from "./models/bookstore_models.js";
import bookroute from "./routes/bookroute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
/* app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
*/


app.get('/', (request, response)=>{
    console.log(request);
    return response.status(222).send('book database');
});

app.use('/books', bookroute);

mongoose.connect(mongodburl)
        .then(() => {
            console.log('app connected to database');
            app.listen(PORT, () => {
                console.log(`app is litening to port: ${PORT}`);
            });
        })
        .catch((error) => {
            console.log(error);
});
