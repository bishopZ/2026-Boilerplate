import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { postLogin, getLogout } from '../controllers/auth';
import { verifyUser } from '../services/auth';

const router = Router();

passport.use(new LocalStrategy((username, password, callback) => {
  const user = verifyUser(username, password);
  if (!user) {
    callback(null, false, { message: 'Incorrect username or password.' });
    return undefined;
  }
  callback(null, user);
}));

router.post('/login/password', postLogin);
router.get('/logout', getLogout);

export default router;
