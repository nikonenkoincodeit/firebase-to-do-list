import { uid } from "uid";
import { form, list } from "./refs";
import { saveUserData, getData, removeData, updateData } from "./api";
import { createMarkup } from "./markup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = e.target.elements.message.value.trim();
  if (!value) return;

  const newObj = createObj(value);

  addMarkup([newObj]);

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
  if (e.target.tagName !== "BUTTON") return;
  const liEl = e.target.closest(".item");

  const dataId = liEl.dataset.id;

  removeData(dataId);
  liEl.remove();
});

list.addEventListener('click', (e) => {
  if (!e.target.classList.contains('text')) return;

  const liEl = e.target.closest(".item");

  const dataId = liEl.dataset.id;
  console.log(liEl);
  console.log(dataId);

  const isClass = liEl.classList.toggle('checked');

  updateData(dataId, isClass)
})

