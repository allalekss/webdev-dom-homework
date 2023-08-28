const host = `https://wedev-api.sky.pro/api/v2/ala_sharova/comments`;
const userHost = `https://wedev-api.sky.pro/api/user/login

`;

export let token;
export let name;

export const setToken = (newToken) => {
  token = newToken;
};

export const setLoginName = (newName) => {
  return name = newName;
}

// Функция получения данных без авторизации
export function getTodos() {
  return fetch(host, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
}

// Функция получения данных с авторизацией
export function getTodosAuthorization() {
  return fetch(host, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
          isLikeLoading: false,
          id: comment.id,
        };
      });
    });
}
//   Функция отправки данных на сервер

export function postTodo(userName, userComment) {
  // Отправляем запрос за публикацию карточки в массив
  const fetchPromise = fetch(host, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: userComment,
      name: userName,
    }),
  });
  return fetchPromise;
}

//   Функция отправки данных на сервер
export function login({ login, password }) {
  // Отправляем запрос за публикацию карточки в массив
   return fetch(userHost, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}
