import * as admin from 'firebase-admin';
//
import Base from './Base';

export default class Login extends Base {
  post() {
    return this.authenticate()
      .then(decodedClaims => admin.auth().revokeRefreshTokens(decodedClaims.sub))
      .finally(() => {
        this.updateCookies();

        return this.res.status(204).json({});
      });
  }
}
