import firebase from 'firebase';
import { firebaseConfig } from 'miserarenaiyo';
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
export const db = firebase.firestore();