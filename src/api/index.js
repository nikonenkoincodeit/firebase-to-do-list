import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from "../config/firebase-config";

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export function saveUserData(data) {
  set(ref(db, `task/${data.id}`), data);
}
