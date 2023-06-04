const express = require('express');

const fileService = require('./file.service');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/users', async (req, res) => {
    const users = await fileService.readDB();
    res.json(users);
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.readDB();
    const user = users.find(user => +user.id === +userId);

    if (!user) {
        return res.status(422).json('user not found');
    }

    res.json(user);
})

app.get('/users/gender/:userGender', async (req, res) => {
    const {userGender} = req.params;
    const users = await fileService.readDB();
    const filteredUsers = users.filter(user => user.gender === userGender);

    if (!filteredUsers) {
        return res.status(422).json('user not found');
    }

    res.json(filteredUsers);
})

app.post('/users', async (req, res) => {
    const {name, gender, age} = req.body;
    const users = await fileService.readDB();

    if (!name || !gender || !age) {
        return res.status(400).json('All fields must be filled in.')
    }

    if (name && name.length < 3) {
        return res.status(400).json('name is wrong');
    }

    if (age && age < 1) {
        return res.status(400).json('age is wrong');
    }

    const createIdForUser = users.length ? +users[users.length - 1].id + 1 : 1;
    const createdUser = {
        id: createIdForUser,
        name,
        gender,
        age
    }

    users.push(createdUser);

    await fileService.writeDB(users);
    res.status(201).json(createdUser);
})

app.put('/users/change/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, gender, age} = req.body;
    const users = await fileService.readDB();
    const user = users.find(user => +user.id === +userId);

    if (!user) {
        return res.status(422).json('user not found');
    }

    if (name && name.length < 3) {
        return res.status(400).json('name is wrong');
    }

    if (age && age < 1) {
        return res.status(400).json('age is wrong');
    }

    const updateUsers = users.map(user => {
        if (+userId === +user.id) {
            return {
                ...user,
                name: name || user.name,
                gender: gender || user.gender,
                age: age || user.age
            }
        }
        return user;
    })

    await fileService.writeDB(updateUsers);
    res.json(updateUsers);
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.readDB();
    const userIndex = users.findIndex(user => +user.id === +userId);

    if (userIndex === -1) {
        return res.status(422).json('user not found');
    }

    users.splice(userIndex, 1);

    await fileService.writeDB(users);
    res.sendStatus(204);
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})
