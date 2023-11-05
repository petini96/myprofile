window.addEventListener('load', function () {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'none';

    const initialElements = document.querySelectorAll('.initial');
    initialElements.forEach(element => {
      element.style.display = 'block';
    });
});
 