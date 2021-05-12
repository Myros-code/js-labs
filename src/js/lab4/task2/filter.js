const _ = require('lodash');

module.exports = class Filter {
  constructor(teachersPage, info_teacher_popup, sort) {
    this.favFilter = document.querySelector('#teacherFilter2');
    this.countryFilter = document.querySelector('#teacherFilter3');
    this.filterUsers = [];
    this.sort = sort;
    this.ageFilterMin = document.querySelector('#teacherFilter4');
    this.ageFilterMax = document.querySelector('#teacherFilter5');
    this.genderFilterMale = document.querySelector('#teacherFilter6');
    this.genderFilterFemale = document.querySelector('#teacherFilter7');
    this.remFilterBtn = document.querySelector('#filterRemBtn');
    this.filterBtn = document.querySelector('#filterBtn');
    this.teachersPage = teachersPage;
    this.info_teacher_popup = info_teacher_popup;
  }

  filter(users) {
    this.filterUsers = users.slice();
    if (this.favFilter.checked) {
      this.filterUsers = this.filterFavorites(this.filterUsers);
    } else {
      this.filterUsers = users.slice();
    }

    this.filterUsers = this.filterCounties(
      this.filterUsers,
      this.countryFilter.value,
    );

    this.filterUsers = this.filterAge(
      this.filterUsers,
      this.ageFilterMin.value,
      this.ageFilterMax.value,
    );

    this.filterUsers = this.filterGender(
      this.filterUsers,
      this.genderFilterMale.checked,
      this.genderFilterFemale.checked,
    );
  }

  filterFavorites(arr) {
    return arr.filter((el) => {
      const card = document.getElementById(el.id.value);
      if (card === null) {
      } else {
        return card.classList.contains('teacher-card_favorite');
      }
    });
  }

  filterCounties(arr, country) {
    if (country === 'all' || country === '') {
      return arr;
    }
    return _.filter(arr, { location: { country } });
  }

  filterAge(arr, min, max) {
    return _.filter(arr, (el) => el.dob.age >= min && el.dob.age <= max);
  }

  filterGender(arr, male, female) {
    return arr.filter((el) => {
      if (male === true && female === false) {
        return el.gender === 'male';
      } if (male === false && female === true) {
        return el.gender === 'female';
      }
      return arr;
    });
  }

  getUsers() {
    return this.filterUsers;
  }

  clickListener(users, favUsers, Allusers) {
    this.filterBtn.onclick = () => {
      this.filter(users);
      this.teachersPage.render(this.filterUsers, favUsers);
      this.teachersPage.renderStatistic(this.filterUsers, 'name', Allusers);
      this.info_teacher_popup.listen(this.filterUsers);
      this.sort.init(this.filterUsers, Allusers);
    };

    this.remFilterBtn.onclick = () => {
      this.favFilter.checked = false;
      this.teachersPage.render(users, favUsers);
      this.teachersPage.renderStatistic(users, 'name', Allusers);
      this.info_teacher_popup.listen(users);
      this.sort.init(users, Allusers);
    };
  }
};
