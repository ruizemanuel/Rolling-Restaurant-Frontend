// Reg expressions
const regExpProductName = /^[A-Za-z\s?]+$/;
const regExpPrice = /[0-9]+$/;
const regExpUrl = /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/;
const regExpCategory = /^[A-Za-z\-\s?]+$/;
const regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Functions to validate
export const validateProductName = (field) => {
  if (regExpProductName.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validatePrice = (field) => {
  if (
    regExpPrice.test(field) &&
    field.trim() !== "" &&
    field.trim() > 0 &&
    field.trim() < 2000
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateUrl = (field) => {
  if (regExpUrl.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateCategory = (field) => {
  if (
    regExpCategory.test(field) &&
    field.trim() !== "" &&
    (field === "pizza" ||
      field === "hamburguesa" ||
      field === "taco" ||
      field === "veganas" ||
      field === "bebidas" ||
      field === "postre")
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (field) => {
  if (regExpEmail.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (field) => {
  if (regExpPassword.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};
