import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, user } from "../index.js";
import { addLike, deleteLike } from "../api.js";
import { formatDistanceToNow } from 'date-fns'
import {ru} from "date-fns/locale"
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const postHtml = posts
    .map((post) => {
      console.log(post);
      const date = new Date(post.createdAt)
      console.log(date.toLocaleString());
      return `<li class="post">
 <div class="post-header" data-user-id="${post.user.id}">
     <img src="${post.user.imageUrl}" class="post-header__user-image">
     <p class="post-header__user-name">${post.user.name}</p>
 </div>
 <div class="post-image-container">
   <img class="post-image" src="${post.imageUrl}">
 </div>
 <div class="post-likes">
   <button data-is-liked="${post.isLiked}" data-post-id="${post.id}" class="like-button">
     <img src="./assets/images/${post.isLiked ? "like-active": "like-not-active"}.svg">
   </button>
   <p class="post-likes-text">
     Нравится: <strong>${post.likes.length}</strong>
   </p>
 </div>
 <p class="post-text">
   <span class="user-name">${post.user.name}</span>
   ${post.description}
 </p>
 <p class="post-date">
  ${formatDistanceToNow(date, { addSuffix: true, locale: ru })}
 </p>
 </li>`;
    })
    .join(" ");
  console.log(postHtml);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                 ${postHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

 
    initLikeListenners()
  



  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}


export function initLikeListenners() {
  const buttonElements = document.querySelectorAll(".like-button")

for ( let buttonElement of buttonElements){
  buttonElement.addEventListener("click", () => {
    if (!user) {
      alert("Нужно Авторизоваться")
    return
    }
    let id = buttonElement.dataset.postId
    let isLiked = buttonElement.dataset.isLiked
    if (isLiked === "true") {
      deleteLike({id, token: getToken()} )
      .then((data) => { 
        renderPost(data,buttonElement)
      })
     
     
    } else {
      addLike({id, token: getToken()}).then((data) => {
        renderPost(data, buttonElement);
      })
    }
  })
}
}

function renderPost(data, buttonElement) {
  let post = buttonElement.closest(".post")
        const date = new Date(data.createdAt)
        post.innerHTML = `<li class="post">
        <div class="post-header" data-user-id="${data.user.id}">
            <img src="${data.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${data.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${data.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-is-liked="${data.isLiked}" data-post-id="${data.id}" class="like-button">
            <img src="./assets/images/${data.isLiked ? "like-active": "like-not-active"}.svg">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${data.likes.length}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${data.user.name}</span>
          ${data.description}
        </p>
        <p class="post-date">
         ${date.toLocaleString()}
        </p>
        </li>`
        console.log(user);
          initLikeListenners()

} 
