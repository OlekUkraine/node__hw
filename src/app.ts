import express, {Request, Response} from 'express';

const app = express();
const PORT = 5001;


const users = [
    {
        name: 'Vasyl',
        age: 20,
        gender: 'male'
    },
    {
        name: 'Oleg',
        age: 27,
        gender: 'male'
    },
    {
        name: 'Lesya',
        age: 25,
        gender: 'female'
    },
    {
        name: 'Masha',
        age: 33,
        gender: 'female'
    },
    {
        name: 'Cocos',
        age: 37,
        gender: 'male'
    }
]


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
})

app.get('/users/:id', (req: Request, res: Response)=>{
const {id} = req.params;

res.json(users[+id]);
})

app.post('/users', (req: Request, res: Response)=>{
users.push(req.body);

res.status(201).json({message: 'user created.'});
})

app.put('/users/:id', (req: Request, res: Response)=>{
    const {id} = req.params;

    users[+id] = req.body;

    res.status(200).json({
        message: 'user updated',
        data: users[+id]
    })
})

app.delete('/users/:id', (req: Request, res: Response)=>{
    const {id} = req.params;

    users.splice(+id, 1);
    res.json({
        message: 'user deleted'
    })
})

app.listen(PORT, ()=>{
    console.log(`Server has started on PORT ${PORT}`);
})