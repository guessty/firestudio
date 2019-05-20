import Tokens from 'csrf';
import Base from './Base';
import COOKIES from '../config/cookies';

const tokens = new Tokens();

export default class Csrf extends Base {
  get() {
    const sessionCookie = this.cookies.get(COOKIES.SESSION.KEY);
    if (sessionCookie && sessionCookie[COOKIES.SESSION.CSRF]) {
      const secret = sessionCookie[COOKIES.SESSION.CSRF];
      const token = tokens.create(secret);
      this.cookies.set(COOKIES.CSRF.KEY, token, COOKIES.CSRF.OPTIONS);
    } else {
      this.updateCookies();
    }

    return this.res.status(204).json({});
  }
}
