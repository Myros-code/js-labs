import { teachersPage } from "../../app";

module.exports = class Sort {
  constructor() {
    this.users = teachersPage.getTeachers();
    this.filterToggle = this.getFilterToggle();
    this.init();
  }

  init() {
    this.filterToggle = this.getFilterToggle();
    this.filterToggle.forEach((el) => {
      el.addEventListener("click", (event) => {
        console.log(event);
        let sortValue = event.target.dataset.sort;
        let sortArr = this.sort(sortValue);
        teachersPage.renderStatistic(sortArr);
        this.init();
      });
    });
  }

  sort(value) {
    this.users = teachersPage.getTeachers();
    let sortUsers = this.users.slice();

    return sortUsers.sort(function (a, b) {
      return (b[`${value}`] < a[`${value}`]) - (a[`${value}`] < b[`${value}`]);
    });
  }

  getFilterToggle() {
    return document.querySelectorAll(".statistics-table__filter-toggles");
  }
};
