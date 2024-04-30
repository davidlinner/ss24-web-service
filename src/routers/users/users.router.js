import {Router} from 'express';
import passport from "passport";
import jwt from 'jsonwebtoken';

const usersRouter = Router()

usersRouter.post('/authenticate',
    passport.authenticate('basic', {session: false}),
    (req, res) => {
        const token = jwt.sign({
                roles: req.user.roles,
                name: req.user.name
            },
            'my-secret',
            {
                subject: req.user.userName,
                expiresIn: '1d'
            }
        )
        res.status(200).send({token});
    })
export default usersRouter;
