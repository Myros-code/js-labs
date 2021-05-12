const FindList = require("./findList");

module.exports = class Search {
  constructor(info_popup, teachersPage, filter, users, favUsers) {
    this.findList = new FindList();
    this.info_popup = info_popup;
    this.teachersPage = teachersPage;
    this.filter = filter;
    this.searchField = document.querySelector("#teacherSearch");
    this.searchBtn = document.querySelector("#searchBtn");
    this.init(users, favUsers);
  }

  init(users, favUsers) {
    this.searchField.oninput = () => {
      this.findList.listenFocus(this.searchField);
      this.findList.showList();
      this.findList.clearList();
      this.findList.getAllItems();
      this.findSimilar(users);
      this.listenClick(users, favUsers);
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

  createItem(element, str) {
    return `
    <li class="search-group__item" > 
        <a href="#!" class="search-group__link" data-card="${element.id.value}">
            ${str}
        </a>
    </li>`;
  }

  getItemStr(element) {
    return `${element["full_name"]}, ${element["age"]}, ${element["note"]}`;
  }

  searchExp(element) {
    return (
      (element.name.first.search(this.getValue()) == -1 &&
        element.dob.age.toString().search(this.getValue()) == -1 &&
        element.name.last.toString().search(this.getValue()) == -1) ||
      this.getValue() === ""
    );
  }

  searchFindStr(element) {
    if (element.name.first.search(this.getValue()) !== -1) {
      let str = element.name.first;
      return `${this.insertMark(
        str,
        str.search(this.getValue()),
        this.getValue().length
      )} ${element.name.last}, ${element.dob.age}, `;
    } else if (element.dob.age.toString().search(this.getValue()) !== -1) {
      let str = element.dob.age.toString();
      return `${element.name.first} ${element.name.last}, ${this.insertMark(
        str,
        str.search(this.getValue()),
        this.getValue().length
      )}, `;
    } else {
      let str = element.name.last;
      return `${element.name.first} ${this.insertMark(
        str,
        str.search(this.getValue()),
        this.getValue().length
      )}, ${element.dob.age}, `;
    }
  }

  listenClick(users, favUsers) {
    let items = this.findList.getAllItems();
    items.forEach((element) => {
      element.addEventListener("click", (event) => {
        this.info_popup.openContainer();
        let cardId = event.target.dataset.card;
        let elem = this.info_popup.getElem(users, cardId);
        if (this.info_popup.container.classList.contains("open")) {
          this.info_popup.open();
          this.info_popup.renderData(elem);
          this.info_popup.checkFavorite(elem, favUsers);
          this.info_popup.favoriteBtn.onclick = () => {
            this.info_popup.toggleFavorite(elem, favUsers);
            this.info_popup.checkFavorite(elem, favUsers);
            this.info_popup.listen(users);
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
