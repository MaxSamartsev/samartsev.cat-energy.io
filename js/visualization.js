var tabletWidth = 768;
var visual = document.querySelector(".visualization");
var visualBlock = visual.querySelector(".visualization__wrapper");
var btnBefore = document.querySelector(".visualization__label--before");
var btnAfter = document.querySelector(".visualization__label--after");
var scale = visual.querySelector(".visualization__scale");
var grip = visual.querySelector(".visualization__grip");
var imageBefore = visual.querySelector(".visualization__image--before");
var imageAfter = visual.querySelector(".visualization__image--after");
var windowSize = window.screen.width;
var scaleWidth;
var gripWidth;

var getElemWidth = function (elem) {
  return parseInt(getComputedStyle(elem).width, 10);
};

btnBefore.onclick = function (evt) {
  if (windowSize < tabletWidth) {
    imageAfter.style.right = "";
    imageBefore.style.left = "";
    visualBlock.classList.remove('visualization__wrapper--after');
    visualBlock.classList.add('visualization__wrapper--before');
  }
  else {
    evt.preventDefault();
    imageAfter.style.width = "0";
    grip.style.marginLeft = "0";
  }
};

btnAfter.onclick = function (evt) {
  evt.preventDefault();
  if (windowSize < tabletWidth) {
    imageAfter.style.right = (0) + 'px';
    imageBefore.style.left = (-320) + 'px';
    visualBlock.classList.remove('visualization__wrapper--before');
    visualBlock.classList.add('visualization__wrapper--after');

  }
  else {
    imageAfter.style.width = "100%";
    grip.style.marginLeft = "calc(100% - " + gripWidth + "px)";
    imageAfter.style.transition = "width 0.1s ease-in-out";
  }
};

grip.ondblclick = function () {
  imageBefore.style.width = "50%";
  imageAfter.style.width = "50%";
  grip.style.marginLeft = "calc(50% - " + gripWidth / 2 + "px)";
};

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();
  return box.left + pageXOffset + 200;
};

var gripDownHandler = function (evtDown) {
  var gripCoords = getCoords(grip);
  var scaleCoords = getCoords(scale);
  grip.style.transition = "none";

  var shiftX = evtDown.pageX - gripCoords;

  document.onmousemove = function (evtMove) {
    imageAfter.style.transition = "none";

    var newLeft = evtMove.pageX - shiftX - scaleCoords;

    if (newLeft < 0) {
      newLeft = 0;
    }

    var rightEdge = scaleWidth - gripWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    var gripValue = newLeft / rightEdge * 100;
    grip.style.marginLeft = newLeft + "px";

    imageAfter.style.width = gripValue + "%";
  };

  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null;
    grip.style.transition = "margin-left 0.2s ease-out";
  };

  return false;
};

var addGripHandlers = function () {
  grip.addEventListener("mousedown", gripDownHandler);
};

var removeGripHandlers = function () {
  grip.removeEventListener("mousedown", gripDownHandler);
};

var start = function () {
  windowSize = window.screen.width;

  scaleWidth = getElemWidth(scale);
  gripWidth = getElemWidth(grip);

  imageBefore.style.width = "";
  imageAfter.style.width = "";
  imageAfter.style.right = "";
  imageBefore.style.left = "";
  grip.style.marginLeft = "";
  imageAfter.style.transition = "";
  imageBefore.style.transition = "";
  visualBlock.classList.remove('visualization__wrapper--before');
  visualBlock.classList.remove('visualization__wrapper--after');

  if (windowSize >= tabletWidth) {
    addGripHandlers();
  } else {
    removeGripHandlers();
    visualBlock.classList.add('visualization__wrapper--before');
    imageAfter.style.transition = "right 0.5s ease-out";
    imageBefore.style.transition = "left 0.5s ease-out";
  }

};

window.addEventListener("load", start);
window.addEventListener("resize", start);
