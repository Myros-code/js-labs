export const filterAll = (
  arr,
  country = null,
  age = 0,
  gender = null,
  favorite = false
) => {
  let newArr = arr;

  if (country) {
    // newArr = newArr.filter((el)=>{
    //     return filterCountry(el, country);
    // });
    newArr = filterUniversal(newArr, country, "country");
  }

  if (age) {
    // newArr = newArr.filter((el)=>{
    //     return filterAge(el, age);
    // });
    newArr = filterUniversal(newArr, age, "age");
  }
  return newArr;
};

const filterCountry = (obj, country) => {
  if (obj.country === country) {
    return true;
  }
};

const filterAge = (obj, age) => {
  if (obj.age === age) {
    return true;
  }
};

const filterUniversal = (arr, param, paramName) => {
  
  return arr.filter((el) => {
    console.log(el[paramName]);
    if (el[paramName] === param) {
        return true;
    } else {
        console.log('no');
    }
  });
};
