import { uid } from "uid";
import { form, list } from "./refs";
import { saveUserData, getData, removeData, updateData } from "./api";
import { createMarkup } from "./markup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

form.addEventListener("submit", (e) => {
  try {
    e.preventDefault();

    const value = e.target.elements.message.value.trim();
    if (!value) return;

    const newObj = createObj(value);

    addMarkup([newObj]);

    saveUserData(newObj);
    e.target.reset();
  } catch (error) {
    console.log(error.message);
  }
});

function createObj(value) {
  return {
    value,
    done: false,
    id: uid(),
  };
}

getData()
  .then((resp) => {
    addMarkup(resp);
  })
  .catch((err) => console.log(err));

function addMarkup(data) {
  const markup = createMarkup(data);
  list.insertAdjacentHTML("beforeend", markup);
}

list.addEventListener("click", (e) => {
  try {
    if (e.target.tagName !== "BUTTON") return;

    const { liEl, dataId } = getParentData(e.target);

    removeData(dataId);
    liEl.remove();
  } catch (error) {
    console.log(error.message);
  }
});

list.addEventListener("click", (e) => {
  try {
    if (!e.target.classList.contains("text")) return;

    const { liEl, dataId } = getParentData(e.target);

    const isClass = liEl.classList.toggle("checked");

    updateData(dataId, isClass);
  } catch (error) {
    console.log(error.message);
  }
});

function getParentData(el) {
  const liEl = el.closest(".item");

  const dataId = liEl.dataset.id;

  return {
    liEl,
    dataId,
  };
}
