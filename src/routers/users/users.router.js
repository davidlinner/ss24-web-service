import {Router} from 'express';
import passport from "passport";

const usersRouter = Router()
usersRouter.post('/authenticate',
    passport.authenticate('basic', {session: true}),
    (req, res) => {
        res.sendStatus(200);
    })
export default usersRouter;
