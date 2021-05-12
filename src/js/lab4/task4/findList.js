module.exports = class FindList {
  constructor() {
    this.findList = document.querySelector('.search-group__list');
  }

  showList() {
    this.findList.classList.add('active');
  }

  clearList() {
    this.findList.innerHTML = '';
  }

  fillList(content) {
    this.findList.innerHTML += content;
  }

  hideList() {
    this.findList.classList.remove('active');
  }

  clearField(field) {
    field.value = '';
  }

  getAllItems() {
    return document.querySelectorAll('.search-group__link');
  }

  listenFocus(field) {
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('teacher-search') === false) {
        this.hideList();
        this.clearField(field);
      }
    });
  }
};
