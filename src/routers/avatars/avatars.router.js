import {isChild, isParent} from "../../roles.js";
import avatarSchema from "./avatar.schema.js";
import {v4 as uuid} from "uuid";
import fs from "fs";
import {Router} from 'express';
import path from "path";
import passport from "passport";

const data_file = path.join(process.cwd(), 'avatars.json');
if (!fs.existsSync(data_file)) {
    fs.writeFileSync(data_file, JSON.stringify([]))
}

const avatarsRouter = Router()

avatarsRouter.use(passport.authenticate('jwt', { session: false }))

avatarsRouter.post('/api/avatars',
    isParent,
    (req, res) => {
        console.log(" POST /api/avatars")

        const {error, value} = avatarSchema.validate(req.body);

        if (error) {
            res.status(400).send(error)
            return
        }

        const newAvatar = {
            id: uuid(),
            ...value,
            createdAt: new Date(Date.now()).toISOString()
        }

        try {
            const obj = JSON.parse(fs.readFileSync(data_file, "utf8"))

            fs.writeFileSync(data_file, JSON.stringify([...obj, newAvatar]))
            res.status(201).set("Location", `/api/avatars/${newAvatar.id}`).send(newAvatar)
        } catch (e) {
            res.sendStatus(500)
        }
    })

avatarsRouter.get(
    "/api/avatars",
    isChild,
    (req, res) => {
        console.log(" GET /api/avatars")

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const avatarsArray = JSON.parse(fs.readFileSync(data_file, "utf8"))

        const startIndex = (page - 1) * size;
        const endIndex = page * size;

        const avatarsPage = avatarsArray.slice(startIndex, endIndex);

        res.set("X-Total-Count", avatarsArray.length.toString())
        res.set("X-Page-Size", size.toString())
        res.set("X-Page-Number", page.toString())
        res.send(avatarsPage)
    })

avatarsRouter.get("/api/avatars/:id",
    isChild,
    (req, res) => {
        const avatarID = req.params.id;
        console.log(` GET /api/avatars/:${avatarID}`)
        const avatarsArray = JSON.parse(fs.readFileSync(data_file, "utf8"))
        const avatar = avatarsArray.find((av) => av.id === avatarID)
        if (!avatar)
            res.sendStatus(404)
        else
            res.send(avatar)
    })

avatarsRouter.put("/api/avatars/:id",
    isParent,
    async (req, res) => {
        try {
            const {error, value} = avatarSchema.validate(req.body, {abortEarly: false});

            if (error) {
                res.status(400).send(error)
                return
            }

            const data = fs.readFileSync(data_file);
            const avatars = JSON.parse(data);

            const avatar = avatars.find(avatar => avatar.id === parseInt(req.params.id));

            if (!avatar) {
                res.sendStatus(404)
                return;
            }

            avatar.avatarName = req.body.avatarName;
            avatar.childAge = req.body.childAge;
            avatar.skinColor = req.body.skinColor;
            avatar.hairstyle = req.body.hairstyle;
            avatar.headShape = req.body.headShape;
            avatar.upperClothing = req.body.upperClothing;
            avatar.lowerClothing = req.body.lowerClothing;

            fs.writeFileSync(data_file, JSON.stringify(avatars))

            res.sendStatus(204);
        } catch {
            res.sendStatus(500)
        }
    })

avatarsRouter.delete("/api/avatars/:id",
    isParent,
    (req, res) => {
        const avatarID = parseInt(req.params.id)
        console.log(` DELETE /api/avatars/:${avatarID}`)
        const avatarsArray = JSON.parse(fs.readFileSync(data_file, "utf8"))
        const avatar = avatarsArray.findIndex((av) => av.id === avatarID)
        if (avatar === -1)
            res.sendStatus(404)
        else {
            avatarsArray.splice(avatar, 1)
            fs.writeFileSync(data_file, JSON.stringify(avatarsArray), (err) => {
                if (err) {
                    console.log("ERROR")
                }
            })
            res.sendStatus(204)
        }

    })

export default avatarsRouter;
