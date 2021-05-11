// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./vendors/splide-carousel";
import infoPopup from "./vendors/info-popup";

// for lab 4
import Teachers from "./lab4/task1/teachers";
import Filter from "./lab4/task2/filter";
import Sort from "./lab4/task3/sort";
import Search from "./lab4/task4/search";
import AddPopup from "./lab4/task5/add-popup";

// for lab 5
import UserApi from "./lab5/task1/userApi";

// Include my css styles
require("../css/app.css");
// Include my scss styles
require("../scss/style.scss");

class App {
  constructor() {
    this.userApi = new UserApi();
    this.usersAll = [];
    this.users = [];
    this.favUsers = [];
    this.teachersPage = new Teachers(this.favUsers);
    this.info_teacher_popup = new infoPopup(
      "teacherInfo",
      this.teachersPage,
      this.favUsers
    );

    this.mySort = new Sort(this.teachersPage);
    this.filter = new Filter(
      this.teachersPage,
      this.info_teacher_popup,
      this.mySort
    );
    this.init();

    this.pagBtns = document.querySelectorAll(".pag");
    this.pagBox = document.querySelector(".pagination__inner");
    this.changeChunk();

    splideCarousel();
  }

  init() {
    this.renderUsers();
  }

  renderUsers() {
    this.userApi
      .getUsersChunk()
      .then((response) => {
        this.usersAll = response.results;
        this.validateId(this.usersAll);
      })
      .then(() => {
        this.renderStart();
      });
  }

  renderStart() {
    this.mySearch = new Search(
      this.info_teacher_popup,
      this.teachersPage,
      this.filter,
      this.usersAll,
      this.favUsers
    );
    this.renderChunk(1);
  }

  renderChunk(num) {
    let chunk = this.usersAll.slice((num - 1) * 10, num * 10);
    this.addPopup = new AddPopup(
      "addTeacher",
      this.teachersPage,
      this.info_teacher_popup,
      this.filter,
      this.mySort,
      this.mySearch,
      chunk,
      this.favUsers,
      this.usersAll
    );
    this.teachersPage.render(chunk, this.favUsers);
    this.teachersPage.renderStatistic(chunk, "name", this.usersAll);
    this.mySort.init(chunk, this.usersAll);
    this.info_teacher_popup.listen(chunk);
    this.filter.clickListener(chunk, this.favUsers);
  }

  changeChunk() {
    this.pagBtns.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let num = Number(e.target.closest(".pag").dataset.pagination);
        let whatDo = e.target.closest(".pag").dataset.page;

        if (whatDo === "+") {
          this.userApi.CURPAGE += num;

          if (this.userApi.CURPAGE >= 6) {
            this.userApi.CURPAGE = 6;
          }
        } else if (whatDo === "-") {
          this.userApi.CURPAGE -= num;

          if (this.userApi.CURPAGE <= 0) {
            this.userApi.CURPAGE = 1;
          }
        } else {
          this.userApi.CURPAGE = num;
        }
        this.renderChunk(this.userApi.CURPAGE);
        this.renderPagination(this.userApi.CURPAGE);
      });
      if (element.innerText == this.userApi.CURPAGE) {
        element.classList.add("pagination__item_current");
      }
    });
  }

  renderPagination(curNum) {
    curNum = Number(curNum);
    let pagination = `<a href="#!" class="pag pagination__btn" data-page="-" data-pagination="3">
    <img class="pagination__arrow-img pagination__arrow-img_left" src="./images/right-arrow.svg" alt="">
  </a>
  <a href="#!" class="pag pagination__btn" data-page="-" data-pagination="1">
    <img class="pagination__arrow-img pagination__arrow-img_left" src="./images/right-arrow-one.svg" alt="">
  </a>
  ${this.checkPag(curNum)}
  <a href="#!" class="pag pagination__btn" data-page="+" data-pagination="1" id="nextPage">
    <img class="pagination__arrow-img" src="./images/right-arrow-one.svg" alt="">
  </a>
  <a href="#!" class="pag pagination__btn" data-page="+" data-pagination="3">
    <img class="pagination__arrow-img" src="./images/right-arrow.svg" alt="">
  </a>`;
    this.pagBox.innerHTML = pagination;
    this.pagBtns = document.querySelectorAll(".pag");
    this.changeChunk();
  }

  checkPag(curNum) {
    if (curNum - 1 <= 0) {
      return `<a href="#!" class="pag pagination__item" data-pagination="1">1</a>
      <a href="#!" class="pag pagination__item" data-pagination="2">2</a>
      <a href="#!" class="pag pagination__item" data-pagination="3">3</a>`;
    } else if (curNum + 1 >= 6) {
      return `<a href="#!" class="pag pagination__item" data-pagination="4">4</a>
      <a href="#!" class="pag pagination__item" data-pagination="5">5</a>
      <a href="#!" class="pag pagination__item" data-pagination="6">6</a>`;
    } else {
      return `<a href="#!" class="pag pagination__item" data-pagination="${
        curNum - 1
      }">${curNum - 1}</a>
      <a href="#!" class="pag pagination__item" data-pagination="${curNum}">${curNum}</a>
      <a href="#!" class="pag pagination__item" data-pagination="${
        curNum + 1
      }">${curNum + 1}</a>`;
    }
  }

  validateId(arr) {
    arr.forEach((el) => {
      if (el.id.value === null) {
        el.id.value = this.giveId(arr);
      }
    });
  }

  giveId(arr) {
    const id = this.getRandomInt(1, 10000);
    return this.checkSameId(id, arr);
  }

  checkSameId(id, arr) {
    if (
      arr.findIndex((elem) => {
        Number(elem.id.value) === Number(id);
      }) !== -1
    ) {
      this.giveId(arr);
    } else {
      return id;
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export const app = new App();
