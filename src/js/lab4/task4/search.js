const users = require("../../users");
const FindList = require("./findList");

module.exports = class Search {
  constructor(info_popup, teachersPage) {
    this.findList = new FindList();
    this.searchField = document.querySelector("#teacherSearch");
    this.init(info_popup, teachersPage);
  }

  init(info_popup, teachersPage) {
    this.searchField.oninput = () => {
      this.findList.listenFocus(this.searchField);
      this.findList.showList();
      this.findList.clearList();
      this.findSimilar(users);
      this.listenClick(info_popup, teachersPage);
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

  listenClick(info_popup, teachersPage) {
    items = this.findList.getAllItems();
    items.forEach((element) => {
      element.addEventListener("click", (event) => {

        info_popup.openContainer();
        let cardId = event.target.dataset.card;
        let card = document.getElementById(cardId);
        let elem = info_popup.getElem(cardId);

        // see, if container open
        if (info_popup.container.classList.contains("open")) {
          info_popup.open();
          info_popup.renderData(elem);
          info_popup.checkFavorite(elem);
          info_popup.favoriteBtn.onclick = () => {
            info_popup.toggleFavorite(elem, card, teachersPage);
          };
        }

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
