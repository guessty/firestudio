const firebase = (typeof window !== 'undefined' ? require('./client') : require('../../../../config/firebase-admin'));

export default firebase;
