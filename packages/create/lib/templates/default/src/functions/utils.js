import admin from 'firebase-admin';

const getIdToken = (req) => {
  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || '';
  const components = authorizationHeader.split(' ');

  return components.length > 1 ? components[1] : '';
};

export const requireAuth = (req, res) => admin.auth().verifyIdToken(getIdToken(req))
  .then(decodedClaims => decodedClaims)
  .catch(() => {
    res.status(401).send({ message: 'Unauthorized' });
  });
