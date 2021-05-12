module.exports = class Sort {
  constructor(teachersPage) {
    this.filterToggle = this.getFilterToggle();
    this.teachersPage = teachersPage;
  }

  init(users, Allusers) {
    this.filterToggle = this.getFilterToggle();
    this.filterToggle.forEach((el) => {
      el.addEventListener('click', (event) => {
        const sortValue = event.target.dataset.sort;
        const sortArr = this.sort(sortValue, users);
        this.teachersPage.renderStatistic(sortArr, sortValue, Allusers);
        this.init(users, Allusers);
      });
    });
  }

  sort(value, users) {
    const sortUsers = users.slice();
    sortUsers.sort((a, b) => {
      switch (value) {
        case 'name':
          if (
            `${a.name.first} ${a.name.last}` < `${b.name.first} ${b.name.last}`
          ) {
            return -1;
          }
          if (
            `${a.name.first} ${a.name.last}` > `${b.name.first} ${b.name.last}`
          ) {
            return 1;
          }
          return 0;
          break;
        case 'age':
          return b.dob.age - a.dob.age;
          break;
        case 'b_date':
          if (
            new Date(a.dob.date) < new Date(b.dob.date)
          ) {
            return -1;
          }
          if (
            new Date(a.dob.date) > new Date(b.dob.date)
          ) {
            return 1;
          }
          return 0;
          break;
        case 'country':
          if (a.location.country < b.location.country) {
            return -1;
          }
          if (a.location.country > b.location.country) {
            return 1;
          }
          return 0;
          break;
      }
    });
    return sortUsers;
  }

  getFilterToggle() {
    return document.querySelectorAll('.statistics-table__filter-toggles');
  }
};
