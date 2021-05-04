export const filterAll = (
  arr,
  country = null,
  age = 0,
  gender = null,
  favorite = false
) => {
  let newArr = arr;

  if (country) {
    newArr = filterUniversal(newArr, country, "country");
  }
  if (age) {
    newArr = filterUniversal(newArr, age, "age");
  }
  if (gender) {
    newArr = filterUniversal(newArr, gender, "gender");
  }
  if (favorite) {
    newArr = filterUniversal(newArr, favorite, "favorite");
  }

  return newArr;
};

const filterUniversal = (arr, param, paramName) => {
  return arr.filter((el) => {
    if (el[paramName] === param) {
      return true;
    }
  });
};
