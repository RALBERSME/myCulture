const my = document.getElementById("my");
const accordion = document.getElementById("accordion");
const kultur = document.getElementById("kultur");
const letters = document.querySelector(".letters");
const body = document.querySelector("body");
const cta = document.querySelector(".cta");
setTimeout(() => {
  letters.style.fontSize = "17.5rem";
  letters.style.paddingTop = "7.5rem";
  letters.style.transition = "all 1s";
  kultur.innerText = "Culture";
}, 8000);
setTimeout(() => {
  my.innerText = "my ";
  my.style.animation = "growText 3s linear forwards";
}, 10000);
setTimeout(() => {
  my.style.animation = "lightenRed 3s linear forwards";
  my.style.fontSize = "10rem";
  body.style.animation = "changeBackground 2s 3s linear forwards";
}, 13000);
setTimeout(() => {
  cta.classList.remove("hide");
  accordion.classList.remove("hide");
}, 18000);
