const users = require("../../users");

module.exports = class Teachers {
  constructor() {
    this.favoriteTeachers = this.getFavTeachers();
  }

  render() {
    const cardContainer = document.querySelector(".teachers-cards__inner");
    cardContainer.innerHTML = "";
    users.forEach((element) => {
      let card = `<div
    class="teacher-card ${this.checkFavorite(element)} ${this.checkImgClass(
        element
      )} popup-trigger" id="${element["id"]}"
    data-popup="teacherInfo"
  >
    <img
      src="./images/star.svg"
      alt="star"
      class="teacher-card_favorite__star-img"
    />
    <div class="teacher-card__inner">
      <div class="teacher-card__img-block">
        ${this.checkImgPhoto(element)}
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

  renderFilter(arr) {
    const cardContainer = document.querySelector(".teachers-cards__inner");
    cardContainer.innerHTML = "";
    arr.forEach((element) => {
      let card = `<div
      class="teacher-card ${this.checkFavorite(element)} ${this.checkImgClass(
        element
      )} popup-trigger" id="${element["id"]}"
      data-popup="teacherInfo"
    >
      <img
        src="./images/star.svg"
        alt="star"
        class="teacher-card_favorite__star-img"
      />
      <div class="teacher-card__inner">
        <div class="teacher-card__img-block">
          ${this.checkImgPhoto(element)}
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

  renderFavorite() {
    const favTeachList = document.querySelector("#favTeachers");
    const favTeachersArr = this.getFavTeachers();
    favTeachList.innerHTML = "";
    favTeachersArr.forEach((element) => {
      let card = `
        <li class="splide__slide">
            <div class="teacher-card ${this.checkFavorite(
              element
            )} ${this.checkImgClass(element)}" data-card="${element["id"]}">
                <img src="./images/star.svg" alt="star" class="teacher-card_favorite__star-img"/>
                <div class="teacher-card__inner">
                    <div class="teacher-card__img-block">
                      ${this.checkImgPhoto(element)}
                    </div>
                    <div class="teacher-card__info">
                    <h2 class="teacher-card__name">${element["full_name"]}</h2>
                    <span class="teacher-card__location">${
                      element["country"]
                    }</span>
                    </div>
                </div>
            </div>
        </li>`;
      favTeachList.innerHTML += card;
    });
  }

  renderStatistic(arr) {
    const statisticTable = document.querySelector(".statistics-table__body");
    statisticTable.innerHTML = `<tr>
    <th class="statistics-table__filter-toggles" data-sort="full_name">Name</th>
    <th class="statistics-table__filter-toggles" data-sort="age">Age</th>
    <th class="statistics-table__filter-toggles" data-sort="b_date">Birthday</th>
    <th class="statistics-table__filter-toggles" data-sort="country">Country</th>
    </tr>`;
    arr.forEach((element) => {
      let statisticItem = `<tr>
      <td>${element["full_name"]}</td>
      <td>${element["age"]}</td>
      <td>${this.getBirthday(new Date(element["b_date"]))}</td>
      <td>${element["country"]}</td>
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

  checkImgClass(element) {
    if (!("picture_large" in element) && !("picture_thumbnail" in element)) {
      return "teacher-card_without-img";
    } else {
      return "";
    }
  }

  checkImgPhoto(element) {
    if (!("picture_large" in element) && !("picture_thumbnail" in element)) {
      return `<span class="teacher-card__initials">${element["full_name"]}</span>`;
    } else {
      return `<img
          src='${
            element["picture_large"]
              ? element["picture_large"]
              : element["picture_thumbnail"]
          }'
          height="200"
          width="auto"
          alt="teacher"
          class="teacher-card__img"
        />`;
    }
  }

  getFavTeachers() {
    return users.filter((el) => {
      return el["favorite"] === true;
    });
  }

  getBirthday(date) {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }
};
