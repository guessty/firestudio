import Csrf from './controllers/Csrf';
import Hello from './controllers/Hello';
import Login from './controllers/auth/Login';
import Logout from './controllers/auth/Logout';
import User from './controllers/auth/User';
// All functions will recieve an express(like) request and response
// and can be called from the app using the path '/api/functions/<functionName>'

export default {
  csrf: (req, res) => new Csrf(req, res).handle(),
  hello: (req, res) => new Hello(req, res).handle(),
  login: (req, res) => new Login(req, res).handle(),
  logout: (req, res) => new Logout(req, res).handle(),
  user: (req, res) => new User(req, res).handle(),
};
