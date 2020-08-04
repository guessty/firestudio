const admin = require('firebase-admin');
const serviceAccount = require('../config/service-account.json');
const babelConfig = require('../babel.config');

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  ...babelConfig,
  babelrc: false,
});

function grantEditorRole(email) {
  return admin.auth().getUserByEmail(email).then((user) => {
    if (user.customClaims && user.customClaims.editor === true) {
      return undefined;
    }

    return admin.auth().setCustomUserClaims(user.uid, {
      editor: true,
    });
  });
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

if (process.argv.length !== 3) {
  throw Error('Invalid use of grant editor. Usage: node grant-editor.js <email>');
}
const email = process.argv[2];
grantEditorRole(email).then(() => {
  // eslint-disable-next-line no-console
  console.log(`User ${email} has been given editor role`);
  process.exit(0);
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log(`Failed to grant user with editor role: ${err}`);
  process.exit(1);
});
