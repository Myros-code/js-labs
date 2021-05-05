export const validateAll = (obj) => {
  validateStr(obj.full_name);
  validateStr(obj.gender);
  validateStr(obj.note);
  validateStr(obj.state);
  validateStr(obj.city);
  validateStr(obj.country);
  validateNum(obj.age);
  validateMail(obj.email);
  validatePhone(obj.phone);
};

export const validateStr = (data) => {
  // 'char' is a string containing a single character
  function isUpperCase(char) {
    return char !== char.toLowerCase();
  }

  if (typeof data !== "string") {
    console.log(`field ${data} is not STRING type`);
  } else if (isUpperCase(data.charAt(0)) === false) {
    console.log(`the first letter field '${data}' must be uppercase.`);
  } else {
  }
};

export const validateNum = (data) => {
  if (typeof data !== "number") {
    console.log(`field '${data}' is not NUMBER type`);
  } else {
  }
};

export const validatePhone = (data) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const valid = re.test(data);
  if (!valid) {
    console.log(`phone not a valid`);
  }
  return valid;
};

export const validateMail = (data) => {
  const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  const valid = re.test(data);
  if (!valid) {
    console.log(`email not a valid`);
  }
  return valid;
};
