import Popup from "./popups";
import users from "../users";
import userImg from "../../images/user.png";
import splideCarousel from "./splide-carousel";

module.exports = class infoPopup extends Popup {
  constructor(id, teachersPage) {
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
    this.teachersPage = teachersPage;
    this.listen(this.teachersPage);

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
    this.checkImg(elem);
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
        this.openContainer();
        let card = event.target.closest(".popup-trigger");
        let cardId = card.id;
        let elem = this.getElem(cardId);

        // see, if container open
        if (this.container.classList.contains("open")) {
          this.open();
          this.renderData(elem);
          this.checkFavorite(elem);
          this.favoriteBtn.onclick = () => {
            this.toggleFavorite(elem, this.teachersPage);
            this.checkCardFavorite(elem);
          };
        }
      });
    });
  }

  openContainer() {
    this.container.classList.add("open");
  }

  getElem(cardId) {
    return users.find((el) => {
      return el["id"] == cardId;
    });
  }

  toggleFavorite(elem) {
    if (elem["favorite"] === true) {
      elem["favorite"] = false;
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
    } else {
      elem["favorite"] = true;
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
    }
    this.teachersPage.renderFavorite();
    splideCarousel();
  }

  checkFavorite(elem) {
    if (elem["favorite"] === true) {
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
    } else {
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
    }
  }

  checkImg(elem) {
    if (!("picture_large" in elem) && !("picture_thumbnail" in elem)) {
      this.teacherImg.src = userImg;
    } else {
      this.teacherImg.src = elem["picture_large"]
        ? elem["picture_large"]
        : elem["picture_thumbnail"];
    }
  }

  checkCardFavorite(elem) {
    let card = document.getElementById(elem["id"]);
    if (elem["favorite"] === true) {
      card.classList.add("teacher-card_favorite");
    } else {
      card.classList.remove("teacher-card_favorite");
    }
  }
};
