import { uid } from "uid";
import { formEl, listEl } from "./refs";
import { createMarkup } from "./markup";
import { saveData, getData, delateData, updateData } from "./api";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
formEl.addEventListener("submit", oneSubmit);
listEl.addEventListener("click", oneClick);

const getInfobyParent = (target) => {
  const liEl = target.closest(".item");
  const id = liEl.dataset.id;
  return { liEl, id };
};

function oneClick(event) {
  if (event.target.tagName !== "P") {
    return;
  }
  const { liEl, id } = getInfobyParent(event.target);
  const done = liEl.classList.toggle("checked");
  try {
    updateData(id, done);
  } catch (error) {
    console.log(error.message);
  }
}

listEl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  const { liEl, id } = getInfobyParent(e.target);

  liEl.remove();
  try {
    delateData(id);
  } catch (error) {
    console.log(error.message);
  }
});

getData()
  .then((respnse) => addMarkup(respnse))
  .catch((error) => console.log(error));

function oneSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.message.value.trim();
  if (value === "") {
    return;
  }

  const data = createDataObj(value);
  addMarkup([data]);
  try {
    saveData(data);
  } catch (error) {
    console.log(error.message);
  }
  event.target.reset();
}

function createDataObj(value) {
  return {
    value,
    done: false,
    id: uid(),
  };
}

function addMarkup(items) {
  const markup = createMarkup(items);
  listEl.insertAdjacentHTML("beforeend", markup);
}
