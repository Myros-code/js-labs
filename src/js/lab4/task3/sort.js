const users = require("../../users");

module.exports = class Sort {
  constructor(teachersPage) {
    this.users = users;
    this.filterToggle = this.getFilterToggle();
    this.teachersPage = teachersPage;
    this.init();
  }

  init() {
    this.filterToggle = this.getFilterToggle();
    this.filterToggle.forEach((el) => {
      el.addEventListener("click", (event) => {
        let sortValue = event.target.dataset.sort;
        let sortArr = this.sort(sortValue);
        this.teachersPage.renderStatistic(sortArr);
        this.init();
      });
    });
  }

  sort(value) {
    this.users = users;
    let sortUsers = this.users.slice();

    return sortUsers.sort(function (a, b) {
      return (b[`${value}`] < a[`${value}`]) - (a[`${value}`] < b[`${value}`]);
    });
  }

  getFilterToggle() {
    return document.querySelectorAll(".statistics-table__filter-toggles");
  }
};
