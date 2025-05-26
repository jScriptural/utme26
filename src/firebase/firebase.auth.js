import app  from './firebase.config.js'
import {getAuth} from 'firebase/auth'

const auth = getAuth(app);

//console.log(app);
export default auth;
