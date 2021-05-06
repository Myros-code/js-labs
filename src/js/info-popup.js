import Popup from "./popups";
import users from "./lab3/users";
import { teachersPage } from "./app";
import splideCarousel from "./splide-carousel";

module.exports = class infoPopup extends Popup {
  constructor(id) {
    super(id);
    this.teacherImg = document.querySelector("#pTeacherImg");
    this.teacherName = document.querySelector("#pTeacherName");
    this.teacherCity = document.querySelector("#pTeacherCity");
    this.teacherCountry = document.querySelector("#pTeacherCountry");
    this.teacherGender = document.querySelector("#pTeacherGender");
    this.teacherPhone = document.querySelector("#pTeacherPhone");
    this.teacherMail = document.querySelector("#pTeacherMail");
    this.teacherAge = document.querySelector("#pTeacherAge");
    this.teacherComent = document.querySelector("#pTeacherComent");
    this.favoriteBtn = document.querySelector("#toggleFav");


    // clouse on click "clouse button"
    this.clouseBtn.addEventListener("click", () => {
        this.clouse();
      });

      // clouse on click container
    this.container.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup-container")) {
          this.clouse();
        }
    });

  }

  renderData(elem) {
      
    this.teacherName.innerHTML = elem["full_name"];
    this.teacherImg.src = elem["picture_large"];
    this.teacherCity.innerHTML = elem["city"];
    this.teacherCountry.innerHTML = elem["country"];
    // this.teacherGender.innerHTML   = gender;
    this.teacherPhone.innerHTML = elem["phone"];
    this.teacherAge.innerHTML = elem["age"];
    this.teacherComent.innerHTML = elem["note"];
    this.teacherMail.innerHTML = elem["email"];
  }

  listen() {
    // foreach for all popup triggers
    this.trigers = this.getTriggers();
    this.trigers.forEach((el) => {
      // even trigger listen "click event"
      el.addEventListener("click", (event) => {
        // open container
        this.container.classList.add("open");

        let card = event.target.closest(".popup-trigger");
        let cardId = card.id;
        let elem = this.getElem(cardId);

        // see, if container open
        if (this.container.classList.contains("open")) {
          this.open();
          this.renderData(elem);
          this.checkFavorite(elem);

          this.favoriteBtn.onclick = () => {
            this.toggleFavorite(elem, card);
          };
        }
      });
    });
  }

  getElem(cardId) {
    return users.find((el) => {
      return el["id"] == cardId;
    });
  }

  toggleFavorite(elem, card) {
    if (elem["favorite"] === true) {
      elem["favorite"] = false;
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
      card.classList.remove("teacher-card_favorite");
    } else {
      elem["favorite"] = true;
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
      card.classList.add("teacher-card_favorite");
    }
    teachersPage.renderFavorite();
    splideCarousel();
  }

  checkFavorite(elem) {
    if (elem["favorite"] === true) {
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
    } else {
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
    }
  }
};
