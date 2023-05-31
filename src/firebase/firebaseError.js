const errors = {
    "auth/wrong-password": "Senha incorreta",
    "auth/user-not-found": "Usuário",
    "auth/weak-password": "Senha fraca",
    "auth/too-many-requests": "Muitas requisiçõe inexistentes realizadas",
    "auth/email-already-in-use": "Conta já registrada com este email",
    "auth/account-exists-with-different-credential": "Conta já registrada com credencial diferente"
  };
  
  export const firebaseError = (code) => errors[code] ?? "Error";