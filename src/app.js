import express from "express"
import path from 'path';
import {fileURLToPath} from 'url';
import * as fs from "fs";

import passport from 'passport'
import {BasicStrategy} from 'passport-http';
import bcrypt from "bcrypt";

import avatarsRouter from "./routers/avatars/avatars.router.js";

// if import.meta.url is set we take the module dir from other, otherwise from  __dirname
const module_dir = import.meta.url ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;

// create the data file in current working directory (cwd) if it does not yet exist

const user_file = path.join(process.cwd(), 'users.json');
if (!fs.existsSync(user_file)) {
    fs.writeFileSync(user_file, JSON.stringify([]))
}


const app = express()

passport.use(new BasicStrategy(
    async function(userid, password, done) {
        try {
            const users = JSON.parse(fs.readFileSync(user_file, 'utf8'))
            const user = users.find(user => user.userName === userid);
            if (user) {
                const isCorrect = await bcrypt.compare(password, user.password);
                if(isCorrect) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err);
        }
    }
));


app.use(express.static(path.join(module_dir, 'public')))
app.use(express.json())
app.use(passport.authenticate('basic', {session: false}));

app.get('/', function (req, res) {
    res.sendFile(`index.html`)
})

app.use('/', avatarsRouter);

export default app;
