// Reg expressions
const regExpProductName = /^[A-Za-z\s?]+$/;
const regExpPrice = /[0-9]+$/;
const regExpDescription = /^[a-zA-Z.,\s]+$/;
const regExpUrl = /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/;
const regExpCategory = /^[A-Za-z\-\s?]+$/;
const regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Functions to validate
export const validateProductName = (field) => {
  if (regExpProductName.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'El nombre del producto solo puede contener letras';
  }
};

export const validatePrice = (field) => {
  if (
    regExpPrice.test(field) &&
    field.trim() !== "" &&
    field.trim() > 0 &&
    field.trim() < 2000
  ) {
    return 'ok';
  } else {
    return 'El precio solo puede contener numeros menores a 2000';
  }
};

export const validateDescription = (field) => {
  if (regExpDescription.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'El campo descripcion solo puede contener letras, puntos y comas';
  }
};

export const validateUrl = (field) => {
  if (regExpUrl.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'Ingresa una URL válida';
  }
};

export const validateCategory = (field) => {
  if (
    regExpCategory.test(field) &&
    field?.trim() !== "" &&
    (field === "pizza" ||
      field === "hamburguesa" ||
      field === "taco" ||
      field === "veganas" ||
      field === "bebidas" ||
      field === "postre")
  ) {
    return 'ok';
  } else {
    return 'Debes seleccionar una categoria';
  }
};

export const validateUserName = (field) => {
  if (regExpProductName.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'El nombre de usuario solo puede contener letras';
  }
};

export const validateEmail = (field) => {
  if (regExpEmail.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'Ingrese un mail valido';
  }
};

export const validatePassword = (field) => {
  if (regExpPassword.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'La contraseña debe contener al menos 8 caracteres y tener letras y numeros';
  }
};
