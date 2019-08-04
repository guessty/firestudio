import Tokens from 'csrf';
import cookieParser from 'cookie-parser';
import COOKIES from '../config/cookies';
import HEADERS from '../config/headers';

const tokens = new Tokens();

class Base {
  static middleware = () => {}

  static createCsrfPair = () => {
    const secret = tokens.secretSync();
    const token = tokens.create(secret);

    return { token, secret };
  }

  static verifyCsrfPair = (req, callback) => {
    const token = req.headers[HEADERS.CSRF];
    const sessionCookie = req.cookies[COOKIES.SESSION.KEY] || {};
    const secret = sessionCookie[COOKIES.SESSION.CSRF];

    if (!secret) {
      return callback();
    }

    const isValid = tokens.verify(secret, token);

    if (!isValid) {
      callback();
      throw new Error('Invalid CSRF Token');
    }

    return isValid;
  }

  constructor(req, res, next = () => {}) {
    this.req = req;
    this.res = res;
    this.next = next;
    // The Cache-Control is set to private by default when live, but we need to
    // explicitily set it so things work when serving the project locally.
    this.res.set('Cache-Control', 'private');
    this.applyMiddleware();
    this.cookies = {
      get: key => req.cookies[key],
      set: (key, value, options = {}) => res.cookie(key, value, options),
    };
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.notImplemented = this.notImplemented.bind(this);
    this.clearCookie = this.clearCookie.bind(this);
    this.updateCookies = this.updateCookies.bind(this);
  }

  applyMiddleware() {
    cookieParser()(this.req, this.res, this.next);

    return this.constructor.middleware(this.req, this.res, this.next);
  }

  // eslint-disable-next-line class-methods-use-this
  notImplemented() {
    throw new Error('Not implemented');
  }

  get() {
    return this.notImplemented();
  }

  post() {
    return this.notImplemented();
  }

  put() {
    return this.notImplemented();
  }

  patch() {
    return this.notImplemented();
  }

  delete() {
    return this.notImplemented();
  }

  getMethodHandler() {
    switch (this.req.method) {
      case 'GET':
        return this.get;
      case 'POST':
        return this.post;
      case 'PUT':
        return this.put;
      case 'PATCH':
        return this.patch;
      case 'DELETE':
        return this.delete;
      default:
        return this.notImplemented;
    }
  }

  updateCookies(authToken) {
    Object.values(COOKIES).forEach((COOKIE) => {
      this.clearCookie(COOKIE.KEY);
    });
    const { secret, token } = Base.createCsrfPair();
    this.cookies.set(COOKIES.SESSION.KEY, {
      [COOKIES.SESSION.AUTH]: authToken,
      [COOKIES.SESSION.CSRF]: secret,
    }, COOKIES.SESSION.OPTIONS);
    this.cookies.set(COOKIES.CSRF.KEY, token, COOKIES.CSRF.OPTIONS);
    if (authToken) {
      this.cookies.set(COOKIES.STATUS.KEY, '1', COOKIES.STATUS.OPTIONS);
    }
  }

  clearCookie(key) {
    this.cookies.set(key, '', { maxAge: new Date(0) });
  }

  async handle() {
    const methodHandler = this.getMethodHandler();
    try {
      Base.verifyCsrfPair(this.req, () => this.updateCookies());
      const response = methodHandler();

      return response;
    } catch (thrown) {
      const { error, status } = thrown;

      console.log(thrown);

      return this.res.status(status || 500).json({ error: error || thrown });
    }
  }
}

export default Base;
