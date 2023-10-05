import { firebaseConfig } from "../config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export function saveData(data) {
  return set(ref(db, "task/" + data.id), data);
}

export function getData() {
  return get(ref(db, "task")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      throw new Error("No data available");
    }
  });
}

export function delateData(id) {
  return remove(ref(db, "task/" + id));
}

export function updateData(id, params) {
  return update(ref(db, "task/" + id), { done: params });
}
