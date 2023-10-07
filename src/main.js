import { uid } from "uid";
import { form, list } from "./refs";
import { saveUserData, getData } from "./api";
import {createMarkup} from "./markup"
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = e.target.elements.message.value.trim();
  if (!value) return;

  const newObj = createObj(value);

  addMarkup([newObj])


  saveUserData(newObj);
  e.target.reset();
});

function createObj(value) {
  return {
    value,
    done: false,
    id: uid(),
  };
}

getData().then(resp => {
addMarkup(resp)
}).catch(err => console.log(err))

function addMarkup(data) {
  const markup = createMarkup(data);
  list.insertAdjacentHTML("beforeend", markup)
}