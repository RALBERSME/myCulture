const char10 = document.getElementById("char10");
const char9 = document.getElementById("char9");
const char8 = document.getElementById("char8");
const char7 = document.getElementById("char7");
const char6 = document.getElementById("char6");
const char5 = document.getElementById("char5");
const char4 = document.getElementById("char4");
const char3 = document.getElementById("char3");
const char2 = document.getElementById("char2");
const footer = document.querySelector("footer");

setTimeout(() => {
  char2.style.left = "14%";
  char3.style.left = "18.5%";
  char4.style.left = "22.6%";
  char5.style.left = "26.5%";
  char6.style.left = "35%";
  char7.style.left = "41%";
  char8.style.left = "45%";
  char9.style.left = "49.5%";
  char10.style.left = "54%";
}, 6000);
setTimeout(() => {
  footer.style.transform = "rotateX(0deg)";
}, 8000);
