// FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5Xo9Go9mjTkLJFZyiWix9F2ds-uvvKMw",
  authDomain: "movileshibridas.firebaseapp.com",
  projectId: "movileshibridas",
  storageBucket: "movileshibridas.firebasestorage.app",
  messagingSenderId: "481091793841",
  appId: "1:481091793841:web:6690c672e272ae61374390",
  measurementId: "G-265BT5EL2G"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
const auth = getAuth(app);

export { auth };
export default app;