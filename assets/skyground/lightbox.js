document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const images = document.querySelectorAll("img");

  if (!lightbox || !lightboxImg || images.length === 0) return;

  images.forEach((img) => {
    img.addEventListener("click", () => {
      if (img.closest("[data-no-lightbox]")) return;

      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  const close = () => {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  };

  lightbox.addEventListener("click", close);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
});
