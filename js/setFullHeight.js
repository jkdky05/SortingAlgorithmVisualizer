let vh = window.innerHeight * 0.01;
//
window.onload = function resize() {
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
