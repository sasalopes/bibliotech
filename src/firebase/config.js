import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2dbv9NRd9Ki9Rmtp5SLyKL0fM0AAXRdY",
  authDomain: "bibliotech-jam.firebaseapp.com",
  projectId: "bibliotech-jam",
  storageBucket: "bibliotech-jam.appspot.com",
  messagingSenderId: "499833366664",
  appId: "1:499833366664:web:28720edb34ec8bedbd973d"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);
