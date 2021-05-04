export const sortArr = (dataArr, isReverse = false) => {
  let myArr = dataArr;

  if (isReverse) {
    return (myArr = sortMyR(myArr));
  } else {
    return (myArr = sortMy(myArr));
  }
};

const sortMy = (arr) => {
  return arr.sort(function (a, b) {
    return (
      (b.age < a.age) - (a.age < b.age) ||
      (b["full_name"] < a["full_name"]) - (a["full_name"] < b["full_name"]) ||
      (b["b_day"] < a["b_day"]) - (a["b_day"] < b["b_day"]) ||
      (b["country"] < a["country"]) - (a["country"] < b["country"])
    );
  });
};

const sortMyR = (arr) => {
  return arr.sort(function (a, b) {
    return (
      (b.age > a.age) - (a.age > b.age) ||
      (b["full_name"] > a["full_name"]) - (a["full_name"] > b["full_name"]) ||
      (b["b_day"] > a["b_day"]) - (a["b_day"] > b["b_day"]) ||
      (b["country"] > a["country"]) - (a["country"] > b["country"])
    );
  });
};
