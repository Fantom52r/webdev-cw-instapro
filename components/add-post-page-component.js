import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = ""
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <h3>Добавить пост</h3>
      <div class="upload-image-container"></div>
      <label>
      <p>Опишите фотографию</p>
      <textarea class="descriptionPost"></textarea>
      </label>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;
    renderHeaderComponent({

      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    const descriptionElement = document.querySelector(".descriptionPost")
    
    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: descriptionElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        imageUrl,
      });
    });
  };

  render();
}
