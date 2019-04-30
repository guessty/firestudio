import * as admin from 'firebase-admin';
import createError from 'http-errors';
//
import Base from '../Base';
import COOKIES from '../../config/cookies';

export default class AuthBase extends Base {
  authenticate = () => {
    try {
      const sessionCookie = this.cookies.get(COOKIES.SESSION.KEY);
      const authToken = sessionCookie[COOKIES.SESSION.AUTH];

      return admin.auth().verifySessionCookie(authToken);
    } catch {
      this.updateCookies();
      throw createError(401, 'You need to log in');
    }
  }
}
