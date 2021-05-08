const users = require("../../users");
const FindList = require("./findList");

module.exports = class Search {
  constructor(info_popup, teachersPage, filter) {
    this.findList = new FindList();
    this.info_popup = info_popup;
    this.teachersPage = teachersPage;
    this.filter = filter;
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

        this.info_popup.openContainer();
        let cardId = event.target.dataset.card;
        let elem = this.info_popup.getElem(cardId);

        // see, if container open
        if (this.info_popup.container.classList.contains("open")) {
          this.info_popup.open();
          this.info_popup.renderData(elem);
          this.info_popup.checkFavorite(elem);

          this.info_popup.favoriteBtn.onclick = () => {
            this.info_popup.toggleFavorite(elem, this.teachersPage);
            this.filter.filter();
            this.teachersPage.renderFilter(this.filter.filterUsers);
            this.info_popup.listen(this.teachersPage);
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
