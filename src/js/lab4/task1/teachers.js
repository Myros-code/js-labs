const dayjs = require('dayjs');
module.exports = class Teachers {
  constructor() {}

  render(users, favUsers) {
    const cardContainer = document.querySelector(".teachers-cards__inner");
    cardContainer.innerHTML = "";
    users.forEach((element) => {
      let card = `<div
    class="teacher-card ${this.checkFavorite(
      element,
      favUsers
    )} ${this.checkImgClass(element)} popup-trigger" id="${element.id.value}"
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
        <h2 class="teacher-card__name">${element.name.first} ${
        element.name.last
      }</h2>
        <span class="teacher-card__location">${element.location.country}</span>
      </div>
    </div>
  </div>
  `;
      cardContainer.innerHTML += card;
    });
  }

  renderFavorite(users) {
    const favTeachList = document.querySelector("#favTeachers");
    const favTeachersArr = users;
    favTeachList.innerHTML = "";
    favTeachersArr.forEach((element) => {
      let card = `
        <li class="splide__slide">
            <div class="teacher-card teacher-card_favorite ${this.checkImgClass(
              element
            )}" data-card="${element.id.value}">
                <img src="./images/star.svg" alt="star" class="teacher-card_favorite__star-img"/>
                <div class="teacher-card__inner">
                    <div class="teacher-card__img-block">
                      ${this.checkImgPhoto(element)}
                    </div>
                    <div class="teacher-card__info">
                    <h2 class="teacher-card__name">${element.name.first} ${
        element.name.last
      }</h2>
                    <span class="teacher-card__location">${
                      element.location.country
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
    <th class="statistics-table__filter-toggles" data-sort="name">Name</th>
    <th class="statistics-table__filter-toggles" data-sort="age">Age</th>
    <th class="statistics-table__filter-toggles" data-sort="b_date">Birthday</th>
    <th class="statistics-table__filter-toggles" data-sort="country">Country</th>
    </tr>`;
    arr.forEach((element) => {
      let statisticItem = `<tr>
      <td>${element.name.first} ${element.name.last}</td>
      <td>${element.dob.age}</td>
      <td>${this.getBirthday(new Date(element.dob.date))}</td>
      <td>${element.location.country}</td>
    </tr>`;
      statisticTable.innerHTML += statisticItem;
    });
  }

  checkFavorite(element, favUsers) {
    let res = favUsers.findIndex((el) => {
      return el.id.value === element.id.value;
    });
    if (res === -1) {
      return "";
    } else {
      return "teacher-card_favorite";
    }
  }

  checkImgClass(element) {
    if (
      !("large" in element.picture) &&
      !("medium" in element.picture) &&
      !("thumbnail" in element.picture)
    ) {
      return "teacher-card_without-img";
    } else {
      return "";
    }
  }

  checkImgPhoto(element) {
    if (
      !("large" in element.picture) &&
      !("medium" in element.picture) &&
      !("thumbnail" in element.picture)
    ) {
      let firstLetterName = element.name.first.slice(0, 1);
      let secondLetterName = element.name.last.slice(0, 1);
      return `<span class="teacher-card__initials">${firstLetterName}.${secondLetterName}</span>`;
    } else {
      return `<img
          src='${
            element.picture.large
              ? element.picture.large
              : element.picture.medium
              ? element.picture.medium
              : element.picture.thumbnail
          }'
          height="200"
          width="auto"
          alt="teacher"
          class="teacher-card__img"
        />`;
    }
  }

  getFavTeachers(users) {
    return users.filter((el) => {
      return el["favorite"] === true;
    });
  }

  getBirthday(date) {
    return `${dayjs(date).format('DD.MM.YYYY')}`;
  }
};
