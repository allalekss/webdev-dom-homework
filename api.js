import { nameInputElement, textInputElement } from "./main.js";
const host = "https://wedev-api.sky.pro/api/v1/ala-sharova/comments";
export const form = document.querySelector('.add-form');

export function getTodos() {
    return fetch(host, {
        method: "GET",
      })
      .then((response) => {
      return response.json();
      })
};


export function postTodo(){
   return fetch(host, {
    method: "POST", 
    body: JSON.stringify({
      text: textInputElement.value,
      name: nameInputElement.value
     }), 
  })
  .then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Плохой запрос");
    } else {
      return response.json();
    }
    
  })
};