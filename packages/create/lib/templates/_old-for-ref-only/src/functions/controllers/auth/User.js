import Base from './Base';

export default class User extends Base {
  get() {
    return this.authenticate()
      .then(decodedClaims => this.res.status(200).json(decodedClaims));
  }
}
