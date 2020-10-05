import express, {Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Hello, world!',
        data: req.body,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})