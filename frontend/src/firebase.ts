import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyBMAuwaoLyhF9YT3DiWE_CA1ojTlnGJgz8",
  authDomain: "salt-student-overview-9f42d.firebaseapp.com",
  projectId: "salt-student-overview-9f42d",
  storageBucket: "salt-student-overview-9f42d.appspot.com",
  messagingSenderId: "858359016780",
  appId: "1:858359016780:web:5bdb1b616886ac7379b3e9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const name = result.user.displayName!;
    const email = result.user.email;
    const profilePic = result.user.photoURL!;

    if (email?.split('@')[1] !== 'appliedtechnology.se') {
      throw new Error('You can only login with a valid </salt> account')
    } else {
      localStorage.setItem('name', name);
      localStorage.setItem('profilePic', profilePic);
      window.location.href = '/';
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}
