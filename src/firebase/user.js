import { getAuth, updateProfile, updateEmail, updatePassword  } from "firebase/auth";

const auth = getAuth();


export async function updateUser(data){
    await updateEmail(auth.currentUser, data.email)
    await updateProfile(auth.currentUser, {displayName: data.displayName})
    await updatePassword(auth.currentUser, data.senha)
}