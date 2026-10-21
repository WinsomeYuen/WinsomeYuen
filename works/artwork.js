(function () {
  let currentImageIndex = 0;
  const images = document.querySelectorAll('.reel-image');
  const indicators = document.querySelectorAll('.indicator');
  const reel = document.querySelector('.image-reel');
  const reelContainer = document.querySelector('.reel-container');
  let autoPlayInterval;

  if (!images.length || !reel) return;

  if (images.length <= 1) {
    reel.classList.add('single-image');
    images[0].classList.add('active');
    return;
  }

  function showImage(index) {
    images.forEach((img) => img.classList.remove('active'));
    indicators.forEach((ind) => ind.classList.remove('active'));

    images[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');

    currentImageIndex = index;
  }

  function changeImage(direction) {
    let newIndex = currentImageIndex + direction;

    if (newIndex >= images.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = images.length - 1;
    }

    showImage(newIndex);
    resetAutoPlay();
  }

  function goToImage(index) {
    showImage(index);
    resetAutoPlay();
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      changeImage(1);
    }, 4000);
  }

  window.changeImage = changeImage;
  window.goToImage = goToImage;

  startAutoPlay();

  if (reelContainer) {
    reelContainer.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    reelContainer.addEventListener('mouseleave', () => {
      startAutoPlay();
    });
  }
})();
