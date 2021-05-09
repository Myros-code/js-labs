// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./vendors/splide-carousel";
// import modalInit from "./modal";

import infoPopup from "./vendors/info-popup";

const users = require("./users");

// for lab 4
import Teachers from "./lab4/task1/teachers";
import Filter from "./lab4/task2/filter";
import Sort from "./lab4/task3/sort";
import Search from "./lab4/task4/search";
import AddPopup from "./lab4/task5/add-popup";

// Include my css styles
require("../css/app.css");
// Include my scss styles
require("../scss/style.scss");

class App {
  constructor() {
    this.users = this.getUsers();
    this.teachersPage = new Teachers();
    this.teachersPage.render();
    this.teachersPage.renderStatistic(this.users);
    this.teachersPage.renderFavorite();
    this.info_teacher_popup = new infoPopup("teacherInfo", this.teachersPage);
    this.filter = new Filter(this.teachersPage, this.info_teacher_popup);
    this.mySort = new Sort(this.teachersPage);
    this.mySearch = new Search(
      this.info_teacher_popup,
      this.teachersPage,
      this.filter
    );
    splideCarousel();
    this.addPopup = new AddPopup(
      "addTeacher",
      this.teachersPage,
      this.info_teacher_popup,
      this.filter,
      this.mySort,
      this.mySearch
    );
  }

  init() {}

  getUsers() {
    return users;
  }
}
const app = new App();

// appendCards(users);

// --------------INITIALIZING SPLIDE CAROUSEL INIT FUNCTION ----------------------
// --------------INITIALIZING MODAL INIT FUNCTION ----------------------
