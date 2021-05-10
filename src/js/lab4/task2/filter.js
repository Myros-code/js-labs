
module.exports = class Filter {
  constructor(teachersPage, info_teacher_popup, sort) {
    this.favFilter = document.querySelector("#teacherFilter2");
    this.countryFilter = document.querySelector("#teacherFilter3");
    this.filterUsers = [];
    this.sort = sort;
    this.ageFilterMin = document.querySelector("#teacherFilter4");
    this.ageFilterMax = document.querySelector("#teacherFilter5");
    this.genderFilterMale = document.querySelector("#teacherFilter6");
    this.genderFilterFemale = document.querySelector("#teacherFilter7");
    this.remFilterBtn = document.querySelector("#filterRemBtn");
    this.filterBtn = document.querySelector("#filterBtn");
    this.teachersPage = teachersPage;
    this.info_teacher_popup = info_teacher_popup;
  }

  filter(users) {
    this.filterUsers = users;
    // if (this.favFilter.checked) {
    //   this.filterUsers = this.filterFavorites(this.getUsers());
    //   console.log(this.getUsers());
    // } else {
    //   this.filterUsers = this.getUsers();
    // }

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

  // filterFavorites(arr) {
  //   return arr.filter((el) => {
  //     return el["favorite"];
  //   });
  // }

  filterCounties(arr, country) {
    if (country === "all" || country === "") {
      return arr;
    } else {
      return arr.filter((el) => {
        return el.location.country === country;
      });
    }
  }

  filterAge(arr, min, max) {
    return arr.filter((el) => {
      return el.dob.age >= min && el.dob.age <= max;
    });
  }

  filterGender(arr, male, female) {
    return arr.filter((el) => {
      if (male === true && female === false) {
        return el.gender === "male";
      } else if (male === false && female === true) {
        return el.gender === "female";
      } else {
        return arr;
      }
    });
  }

  getFilterUs() {
    return this.filterUsers;
  }

  clickListener(users) {
    this.filterBtn.addEventListener("click", () => {
      this.filter(users);
      console.log(this.filterUsers);
      this.teachersPage.render(this.filterUsers);
      this.teachersPage.renderStatistic(this.filterUsers);
      this.info_teacher_popup.listen(this.filterUsers);
      this.sort.init(this.filterUsers);
    });

    this.remFilterBtn.addEventListener("click", () => {
      this.favFilter.checked = false;
      this.teachersPage.render(users);
      this.teachersPage.renderStatistic(users);
      this.info_teacher_popup.listen(users);
      this.sort.init(users);
    });
  }



};
