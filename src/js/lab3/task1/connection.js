const connection = (arr, arr2) => {
  let newArr = [];
  let key;

  let iterator = 0;

  if (arr.length <= arr2.length) {
    iterator = arr;
  } else {
    iterator = arr2;
  }

  for (let i = 0; i < iterator.length; i++) {
    let newObj = {};
    for (key in iterator[i]) {
      if (iterator[i].hasOwnProperty(key)) {
        newObj[key] = key in arr2[i] ? arr2[i][key] : arr[i][key];
      }
    }
    newArr.push(newObj);
  }

  return newArr;
};
export default connection;
