import { uid } from "uid";
import { form } from "./refs";
import { saveUserData } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = e.target.elements.message.value.trim();
  if (!value) return;

  const newObj = createObj(value);
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
