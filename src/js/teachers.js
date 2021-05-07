const users = require("./lab3/users");


module.exports = class Teachers {
  constructor() {
    this.favoriteTeachers = this.getFavTeachers();
  }

  render() {
    const cardContainer = document.querySelector(".teachers-cards__inner");
    users.forEach((element) => {
      let card = `<div
    class="teacher-card ${this.checkFavorite(element)} popup-trigger" id="${
        element["id"]
      }"
    data-popup="teacherInfo"
  >
    <img
      src="./images/star.svg"
      alt="star"
      class="teacher-card_favorite__star-img"
    />
    <div class="teacher-card__inner">
      <div class="teacher-card__img-block">
        <img
          src='${element["picture_large"]}'
          height="200"
          width="auto"
          alt="teacher"
          class="teacher-card__img"
        />
      </div>
      <div class="teacher-card__info">
        <h2 class="teacher-card__name">${element["full_name"]}</h2>
        <span class="teacher-card__location">${element["country"]}</span>
      </div>
    </div>
  </div>
  `;
      cardContainer.innerHTML += card;
    });
  }

  renderFilter(arr){
    const cardContainer = document.querySelector(".teachers-cards__inner");
    cardContainer.innerHTML = "";
    arr.forEach((element) => {
        let card = `<div
      class="teacher-card ${this.checkFavorite(element)} popup-trigger" id="${
          element["id"]
        }"
      data-popup="teacherInfo"
    >
      <img
        src="./images/star.svg"
        alt="star"
        class="teacher-card_favorite__star-img"
      />
      <div class="teacher-card__inner">
        <div class="teacher-card__img-block">
          <img
            src='${element["picture_large"]}'
            height="200"
            width="auto"
            alt="teacher"
            class="teacher-card__img"
          />
        </div>
        <div class="teacher-card__info">
          <h2 class="teacher-card__name">${element["full_name"]}</h2>
          <span class="teacher-card__location">${element["country"]}</span>
        </div>
      </div>
    </div>
    `;
        cardContainer.innerHTML += card;
    });
  } 

  renderFavorite(){
    const favTeachList = document.querySelector("#favTeachers");
    const favTeachersArr = this.getFavTeachers();
    favTeachList.innerHTML = "";
    favTeachersArr.forEach((element) => {
        let card = `
        <li class="splide__slide">
            <div class="teacher-card teacher-card_favorite">
                <img
                    src="./images/star.svg"
                    alt="star"
                    class="teacher-card_favorite__star-img"
                />
                <div class="teacher-card__inner">
                    <div class="teacher-card__img-block">
                        <img
                            src="${element["picture_large"]}"
                            height="200"
                            width="auto"
                            alt="teacher"
                            class="teacher-card__img"
                        />
                    </div>
                    <div class="teacher-card__info">
                    <h2 class="teacher-card__name">${element["full_name"]}</h2>
                    <span class="teacher-card__location">${element["country"]}</span>
                    </div>
                </div>
            </div>
        </li>`;
        favTeachList.innerHTML += card;
    });
  }

  renderStatistic(arr){
    const statisticTable = document.querySelector(".statistics-table__body");
    statisticTable.innerHTML = `<tr>
    <th class="statistics-table__filter-toggles" data-sort="full_name">Name</th>
    <th class="statistics-table__filter-toggles" data-sort="age">Age</th>
    <th class="statistics-table__filter-toggles" data-sort="b_date">Birthday</th>
    <th class="statistics-table__filter-toggles" data-sort="country">Country</th>
    </tr>`;
    arr.forEach((element) => {
      let statisticItem = `<tr>
      <td>${element['full_name']}</td>
      <td>${element['age']}</td>
      <td>${new Date(element['b_date'])}</td>
      <td>${element['country']}</td>
    </tr>`;
    statisticTable.innerHTML += statisticItem;
    });
  }

  getTeachers() {
    return users;
  }

  checkFavorite(element) {
    if (element["favorite"] === true) {
      return "teacher-card_favorite";
    } else {
      return "";
    }
  }

  getFavTeachers() {
    return users.filter((el) => {
        return el['favorite'] === true;
    });
  }
  
};
