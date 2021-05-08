const users = require("../../users");
const FindList = require("./findList");

module.exports = class Search {
  constructor() {
    this.findList = new FindList();
    this.searchField = document.querySelector("#teacherSearch");
    this.init();
  }

  init() {
    this.searchField.oninput = () => {
      this.findList.listenFocus(this.searchField);
      this.findList.showList();
      this.findList.clearList();
      this.findSimilar(users);
      this.listenClick();
    };
  }

  getValue() {
    return this.searchField.value.trim();
  }

  findSimilar(arr) {
    arr.forEach((element) => {
      if (this.searchExp(element)) {
      } else {
        let listItem = this.createItem(element, this.searchFindStr(element));
        this.findList.fillList(listItem);
      }
    });
  }

  createItem(element,str) {
    return `
    <li class="search-group__item" > 
        <a href="#!" class="search-group__link" data-card="${element["id"]}">
            ${str}
        </a>
    </li>`;
  }

  getItemStr(element) {
    return `${element["full_name"]}, ${element["age"]}, ${element["note"]}`;
  }

  searchExp(element) {
    return (
      (element["full_name"].search(this.getValue()) == -1 &&
        element["age"].toString().search(this.getValue()) == -1 &&
        element["note"].toString().search(this.getValue()) == -1) ||
      this.getValue() === ""
    );
  }

  searchFindStr(element) {
    if (element["full_name"].search(this.getValue()) !== -1) {
      let str = element["full_name"];
      return `${this.insertMark(str, str.search(this.getValue()),this.getValue().length)}, ${element["age"]}, ${element["note"]}`;
    } else if (element["age"].toString().search(this.getValue()) !== -1) {
      let str = element["age"].toString();
      return `${element["full_name"]}, ${this.insertMark(str, str.search(this.getValue()), this.getValue().length)}, ${element["note"]}`;
    } else {
      let str = element["note"];
      return `${element["full_name"]}, ${element["age"]}, ${this.insertMark(str, str.search(this.getValue()), this.getValue().length)}`;
    }
  }

  listenClick() {
    items = this.findList.getAllItems();
    items.forEach((element) => {
      element.addEventListener("click", (event) => {
        let cardId = event.target.dataset.card;
        document.getElementById(cardId).click();
      });
    });
  }

  insertMark(str, pos, len) {
    return (
      str.slice(0, pos) +
      "<mark>" +
      str.slice(pos, pos + len) +
      "</mark>" +
      str.slice(pos + len)
    );
  }
};
