import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import firebaseConfig from "../config/firebase-config";

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export function saveUserData(data) {
  set(ref(db, `task/${data.id}`), data);
}

export function getData() {
  return get(ref(db, "task" )).then((snapshot) => {
    if (snapshot.exists()) {
  return Object.values(snapshot.val());
    } else {
      throw new Error("No data available");
    }})
}