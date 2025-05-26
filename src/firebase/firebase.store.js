import { getFirestore } from "firebase/firestore";
import app from './firebase.config.js';

const db = getFirestore(app);

export default db;
