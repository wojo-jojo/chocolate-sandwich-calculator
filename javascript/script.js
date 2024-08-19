"use strict";

const INITIAL_QUANTITIES = {
  "quantity-eggs": { quantity: 4, decimalPlaces: 1 },
  "quantity-milk": { quantity: 45, decimalPlaces: 0 },
  "quantity-oil": { quantity: 40, decimalPlaces: 0 },
  "quantity-flour": { quantity: 40, decimalPlaces: 0 },
  "quantity-cocoa": { quantity: 12, decimalPlaces: 0 },
  "quantity-sugar": { quantity: 65, decimalPlaces: 0 },
  "quantity-cream": { quantity: 120, decimalPlaces: 0 },
  "quantity-condensed-milk": { quantity: 20, decimalPlaces: 0 },
};

const originalSizeXInput = document.querySelector("#original-size-x");
const originalSizeYInput = document.querySelector("#original-size-y");
const userSizeXInput = document.querySelector("#user-size-x");
const userSizeYInput = document.querySelector("#user-size-y");
const userSizeCircularSwitch = document.querySelector("#switch-circular-tray");
const traySizeInputs = document.querySelectorAll(".tray-size-input");

const areAllInputsValid = function (nodeListOfInputs) {
  return Array.prototype.every.call(nodeListOfInputs, (el) =>
    el.checkValidity()
  );
};

const calculateUserTrayArea = function() {
  const isTrayCircular = userSizeCircularSwitch.checked;
  console.log(isTrayCircular);
};

const updateIngredientsQuantities = function () {
  if (!areAllInputsValid(traySizeInputs)) {
    console.log("Wrong tray size provided.");
    return;
  }

  const originalSizeX = parseInt(originalSizeXInput.value);
  const originalSizeY = parseInt(originalSizeYInput.value);
  const userSizeX = parseInt(userSizeXInput.value);
  const userSizeY = parseInt(userSizeYInput.value);

  const originalArea = originalSizeX * originalSizeY;
  const userArea = userSizeX * userSizeY;
  const ratio = userArea / originalArea;

  Object.keys(INITIAL_QUANTITIES).forEach((key) => {
    const el = document.getElementById(key);
    const initialQuantity = INITIAL_QUANTITIES[key]["quantity"];
    const decimalPlaces = INITIAL_QUANTITIES[key]["decimalPlaces"];
    const newQuantity = (initialQuantity * ratio).toFixed(decimalPlaces);
    el.textContent = newQuantity;
  });
};

updateIngredientsQuantities();

traySizeInputs.forEach((el) => {
  el.addEventListener("input", updateIngredientsQuantities);
});
