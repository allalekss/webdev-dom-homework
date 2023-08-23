//счетчик лайков
import { renderComments} from "./render.js";
import {comments } from "./main.js";

export function getLikeButton() {
    const likesButton = document.querySelectorAll('.like-button');
    for (const like of likesButton) {
      like.addEventListener("click", (event) => {
        const likeIndex = like.dataset.index;
        const commentsElement = comments[likeIndex];
        event.stopPropagation();
        if (commentsElement.isLiked) {
          commentsElement.likes -= 1;
          commentsElement.isLiked = false;
          commentsElement.propertyColorLike = 'like-button -no-active-like'; 
          renderComments(comments);
        } else {
          commentsElement.likes += 1;
          commentsElement.isLiked = true;
          commentsElement.propertyColorLike = 'like-button -active-like';  
        }      
        renderComments(comments);       
      });	      
    };   
  };