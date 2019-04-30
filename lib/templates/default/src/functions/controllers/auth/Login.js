import * as admin from 'firebase-admin';
//
import Base from './Base';
import COOKIES from '../../config/cookies';

export default class Login extends Base {
  post() {
    const idToken = this.req.body.idToken.toString();
    const authCookieConfig = COOKIES.SESSION;

    return admin.auth().verifyIdToken(idToken)
      .then((decodedClaims) => {
        // Only process if the user just signed in in the last 5 minutes.
        if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
          // Create session cookie and set it.
          return admin.auth().createSessionCookie(idToken, {
            expiresIn: authCookieConfig.OPTIONS.maxAge,
          })
            .then((authToken) => {
              this.updateCookies(authToken);

              return this.res.status(200).json(decodedClaims);
            });
        }
        // A user that was not recently signed in is trying to set a session cookie.
        // To guard against ID token theft, require re-authentication.

        return this.res.status(401).send('Recent sign in required!');
      });
  }
}
