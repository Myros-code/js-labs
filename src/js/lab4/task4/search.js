const users = require("../../lab3/users");
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
      if (element["full_name"].search(this.getValue()) == -1 || this.getValue() ==="") {
      } else {
        let listItem = `
        <li class="search-group__item" > 
            <a href="#!" class="search-group__link" data-card="${element["id"]}">
                ${element["full_name"]}, ${element["age"]}, ${element["note"]}
            </a>
        </li>`;
        this.findList.fillList(listItem);
      }
    });
  }

  listenClick(){
    items = this.findList.getAllItems();
    items.forEach((element) => {
        element.addEventListener('click', (event) =>{
            let cardId = event.target.dataset.card;
            document.getElementById(cardId).click();
        });
    });
  }


};
