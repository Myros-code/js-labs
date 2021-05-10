import Popup from "./popups";
import userImg from "../../images/user.png";
import splideCarousel from "./splide-carousel";

module.exports = class infoPopup extends Popup {
  constructor(id, teachersPage, favUsers) {
    super(id);
    this.teacherImg = document.querySelector("#pTeacherImg");
    this.teacherName = document.querySelector("#pTeacherName");
    this.teacherCity = document.querySelector("#pTeacherCity");
    this.teacherCountry = document.querySelector("#pTeacherCountry");
    this.teacherGender = document.querySelector("#pTeacherGender");
    this.teacherPhone = document.querySelector("#pTeacherPhone");
    this.teacherMail = document.querySelector("#pTeacherMail");
    this.teacherAge = document.querySelector("#pTeacherAge");
    this.favoriteBtn = document.querySelector("#toggleFav");
    this.trigers = document.querySelectorAll('.popup-trigger');
    this.teachersPage = teachersPage;
    this.favUsers = favUsers;

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
    this.teacherName.innerHTML = `${elem.name.first} ${elem.name.last}`;
    this.checkImg(elem);
    this.teacherCity.innerHTML = elem.location.city;
    this.teacherCountry.innerHTML = elem.location.country;
    this.teacherGender.innerHTML = this.getGender(elem);
    this.teacherPhone.innerHTML = elem.phone;
    this.teacherAge.innerHTML = elem.dob.age;
    this.teacherMail.innerHTML = elem.email;
  }

  listen(users) {
    // foreach for all popup triggers
    this.trigers = document.querySelectorAll('.popup-trigger');
    this.trigers.forEach((el) => {
      // even trigger listen "click event"
      el.addEventListener("click", (event) => {
        this.openContainer();
        let card = event.target.closest(".popup-trigger");
        let cardId = card.id;
        let elem = this.getElem(users, cardId);
        console.log(elem);

        // see, if container open
        if (this.container.classList.contains("open")) {
          this.open();
          this.renderData(elem);
          this.checkFavorite(elem, this.favUsers);
          this.favoriteBtn.onclick = () => {
            this.toggleFavorite(elem, this.favUsers);
            this.checkFavorite(elem, this.favUsers);
          };
        }
      });
    });
  }

  openContainer() {
    this.container.classList.add("open");
  }

  getElem(users, cardId) {
    return users.find((el) => {
      return el.id.value === cardId;
    });
  }

  toggleFavorite(elem, users) {
    let res = users.findIndex((el) => {
      return el.id.value === elem.id.value;
    });
    let card = document.getElementById(elem.id.value);
    console.log(res);
    console.log(card);
    console.log(users);

    if (res === -1){
      users.push(elem);
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
      card.classList.add("teacher-card_favorite");
    } else {
      users.splice(res, 1);
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
      card.classList.remove("teacher-card_favorite");
    }
    console.log(users);

    
    // if (elem["favorite"] === true) {
    //   elem["favorite"] = false;
    //   this.popup.classList.remove("popup_teaher-info_teacher-favorite");
    // } else {
    //   elem["favorite"] = true;
    //   this.popup.classList.add("popup_teaher-info_teacher-favorite");
    // }


    this.teachersPage.renderFavorite(users);
    splideCarousel();
  }

  checkFavorite(elem, users) {
    let res = users.findIndex((el) => {
      return el.id.value === elem.id.value;
    });
    if (res === -1){
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
    } else {
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
    }
  }

  checkImg(elem) {
    if (
      !('large' in elem.picture) &&
      !('medium' in elem.picture) &&
      !('thumbnail' in elem.picture)
    ) {
      this.teacherImg.src = userImg;
    } else {
      this.teacherImg.src = elem.picture.large
        ? elem.picture.large
        : elem.picture.medium
        ? elem.picture.medium
        : elem.picture.thumbnail;
    }
  }

  checkCardFavorite(elem) {
    let card = document.getElementById(elem.id.value);

    if (elem["favorite"] === true) {
      card.classList.add("teacher-card_favorite");
    } else {
      card.classList.remove("teacher-card_favorite");
    }

  }

  getGender(elem) {
    return elem.gender === "male" ? "M" : "F";
  }
};
