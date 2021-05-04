export const findAll = (arr, name = null, note = null, age = null) => {
  let thisArr = arr;
  if (name) {
    thisArr = findName(thisArr, name);
  }
  if (note) {
    thisArr = findNote(thisArr, note);
  }
  if (age) {
    thisArr = findAge(thisArr, age);
  }
  return thisArr;
};

export const findName = (arr, name) => {
    let newArr = [];
    arr.forEach(el => {
        if (el["full_name"].includes(name)){
            newArr.push(el);
        }
    });
    return newArr;
};

export const findNote = (arr, note) => {
    let newArr = [];
    arr.forEach(el => {
        if (el["full_name"].includes(note)){
            newArr.push(el);
        }
    });
    return newArr;
};


export const findAge = (arr, age) => {
    let newArr = [];
    arr.forEach(el => {
        if (el["age"] > age){
            newArr.push(el);
        }
    });
    return newArr;
};
