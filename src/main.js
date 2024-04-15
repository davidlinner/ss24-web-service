const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

// Creating an avatar
app.post('/api/avatars', async (req, res) => {
    console.log(req.body);

    const avatar = {
        id: Date.now(),
        avatarName: req.body.avatarName,
        childAge: parseInt(req.body.childAge),
        skinColor: req.body.skinColor,
        hairstyle: req.body.hairstyle,
        headShape: req.body.headShape,
        upperClothing: req.body.upperClothing,
        lowerClothing: req.body.lowerClothing,
        createdAt: new Date().toISOString()
    }

    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data)

        avatars.push(avatar)

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(avatars))

        res.status(201)
            .set("Location", `/api/avatars/${avatar.id}`)
            .send(avatar);
    } catch (error) {
        res.sendStatus(500)
    }
});

// Changing an avatar
app.put('/api/avatars/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data);

        const avatar = avatars.find(avatar => avatar.id === parseInt(req.params.id));

        if (!avatar) {
            res.sendStatus(404)
            return;
        }

        avatar.avatarName = req.body.avatarName;
        avatar.childAge = parseInt(req.body.childAge);
        avatar.skinColor = req.body.skinColor;
        avatar.hairstyle = req.body.hairstyle;
        avatar.headShape = req.body.headShape;
        avatar.upperClothing = req.body.upperClothing;
        avatar.lowerClothing = req.body.lowerClothing;

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(avatars))

        res.sendStatus(204);
    } catch {
        res.sendStatus(500)
    }
});

// Deleting an avatar
app.delete('/api/avatars/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data);

        const avatarIndex = avatars.findIndex(avatar => avatar.id === parseInt(req.params.id));

        if (avatarIndex === -1) {
            res.sendStatus(404);
            return;
        }

        avatars.splice(avatarIndex, 1);

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(avatars))

        res.sendStatus(204);
    } catch {
        res.sendStatus(500)
    }
});

// Getting all avatars
app.get('/api/avatars', async (req, res) => {
    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data);

        res.send(avatars);
    } catch {
        res.sendStatus(500)
    }
});

// Getting a single avatar
app.get('/api/avatars/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data);

        const avatar = avatars.find(avatar => avatar.id === parseInt(req.params.id));

        if (!avatar) {
            res.sendStatus(404);
            return;
        }

        res.send(avatar);
    } catch {
        res.sendStatus(500)
    }
});

app.listen(3000, () => {
    console.log("Server running...")
})
