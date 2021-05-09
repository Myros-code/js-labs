const users = require("../../users");

module.exports = class Filter {
  constructor(teachersPage, info_teacher_popup) {
    this.favFilter = document.querySelector("#teacherFilter2");
    this.users = this.getUsers();
    this.countryFilter = document.querySelector("#teacherFilter3");
    this.filterUsers = this.getUsers();
    this.ageFilterMin = document.querySelector("#teacherFilter4");
    this.ageFilterMax = document.querySelector("#teacherFilter5");
    this.genderFilterMale = document.querySelector("#teacherFilter6");
    this.genderFilterFemale = document.querySelector("#teacherFilter7");
    this.remFilterBtn = document.querySelector("#filterRemBtn");
    this.filterBtn = document.querySelector("#filterBtn");
    this.teachersPage = teachersPage;
    this.info_teacher_popup = info_teacher_popup;
    this.clickListener();
  }

  filter() {
    if (this.favFilter.checked) {
      this.filterUsers = this.filterFavorites(this.getUsers());
      console.log(this.getUsers());
    } else {
      this.filterUsers = this.getUsers();
    }

    this.filterUsers = this.filterCounties(
      this.filterUsers,
      this.countryFilter.value
    );

    this.filterUsers = this.filterAge(
      this.filterUsers,
      this.ageFilterMin.value,
      this.ageFilterMax.value
    );

    this.filterUsers = this.filterGender(
      this.filterUsers,
      this.genderFilterMale.checked,
      this.genderFilterFemale.checked
    );
  }

  filterFavorites(arr) {
    return arr.filter((el) => {
      return el["favorite"];
    });
  }

  filterCounties(arr, country) {
    if (country === "all" || country === "") {
      return arr;
    } else {
      return arr.filter((el) => {
        return el["country"] === country;
      });
    }
  }

  filterAge(arr, min, max) {
    return arr.filter((el) => {
      return el["age"] >= min && el["age"] <= max;
    });
  }

  filterGender(arr, male, female) {
    return arr.filter((el) => {
      if (male === true && female === false) {
        return el["gender"] === "male";
      } else if (male === false && female === true) {
        return el["gender"] === "female";
      } else {
        return arr;
      }
    });
  }

  getFilterUs() {
    return this.filterUsers;
  }

  clickListener() {
    this.filterBtn.addEventListener("click", () => {
      this.filter();
      this.teachersPage.renderFilter(this.filterUsers);
      this.info_teacher_popup.listen(this.teachersPage);
    });

    this.remFilterBtn.addEventListener("click", () => {
      this.favFilter.checked = false;
      this.teachersPage.renderFilter(this.users);
      this.info_teacher_popup.listen(this.teachersPage);
    });
  }

  getUsers() {
    return users;
  }
};
