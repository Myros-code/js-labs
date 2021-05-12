import Popup from "./popups";
import userImg from "../../images/user.png";
import splideCarousel from "./splide-carousel";
const dayjs = require("dayjs");
const L = require("leaflet");

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
    this.teacherNexBday = document.querySelector("#pNextBday");
    this.teacherAge = document.querySelector("#pTeacherAge");
    this.favoriteBtn = document.querySelector("#toggleFav");
    this.mapContainer = document.querySelector("#mapid");
    this.mymap = L.map("mapid").setView([50, 50], 13);
    this.teachersPage = teachersPage;
    this.favUsers = favUsers;

    this.clouseBtn.addEventListener("click", () => {
      this.clouse();
    });

    this.container.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup-container")) {
        this.clouse();
      }
    });
  }

  renderData(elem) {
    this.teacherNexBday.innerText = this.getTimetoBday(elem);
    this.teacherName.innerHTML = `${elem.name.first} ${elem.name.last}`;
    this.checkImg(elem);
    this.teacherCity.innerHTML = elem.location.city;
    this.teacherCountry.innerHTML = elem.location.country;
    this.teacherGender.innerHTML = this.getGender(elem);
    this.teacherPhone.innerHTML = elem.phone;
    this.teacherAge.innerHTML = elem.dob.age;
    this.teacherMail.innerHTML = elem.email;
    this.getMap(elem);
  }

  listen(users) {
    this.trigers = document.querySelectorAll(".popup-trigger");
    this.trigers.forEach((el) => {
      el.onclick = (event) => {
        this.openContainer();
        let card = event.target.closest(".popup-trigger");
        let cardId = card.id;
        let elem = this.getElem(users, cardId);
        if (this.container.classList.contains("open")) {
          this.open();
          this.renderData(elem);
          this.checkFavorite(elem, this.favUsers);
          this.favoriteBtn.onclick = () => {
            this.toggleFavorite(elem, this.favUsers);
            this.checkFavorite(elem, this.favUsers);
          };
        }
      };
    });
  }

  openContainer() {
    this.container.classList.add("open");
  }

  getElem(users, cardId) {
    return users.find((el) => {
      return el.id.value == cardId;
    });
  }

  toggleFavorite(elem, users) {
    let res = users.findIndex((el) => {
      return el.id.value === elem.id.value;
    });
    let card = document.getElementById(elem.id.value);
    if (res === -1) {
      users.push(elem);
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
      if (card === null) {
      } else {
        card.classList.add("teacher-card_favorite");
      }
    } else {
      users.splice(res, 1);
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");

      if (card === null) {
      } else {
        card.classList.remove("teacher-card_favorite");
      }
    }

    this.teachersPage.renderFavorite(users);
    splideCarousel();
  }

  checkFavorite(elem, users) {
    let res = users.findIndex((el) => {
      return el.id.value === elem.id.value;
    });
    if (res === -1) {
      this.popup.classList.remove("popup_teaher-info_teacher-favorite");
    } else {
      this.popup.classList.add("popup_teaher-info_teacher-favorite");
    }
  }

  checkImg(elem) {
    if (
      !("large" in elem.picture) &&
      !("medium" in elem.picture) &&
      !("thumbnail" in elem.picture)
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

  getTimetoBday(elem) {
    let nowDate = dayjs();
    let dateB = dayjs(elem.dob.date).set("year", dayjs().year());
    let left = Math.abs(dateB.diff(nowDate, "days"));
    return `Birthday left ${left} days`;
  }

  checkCardFavorite(elem) {
    let card = document.getElementById(elem.id.value);

    if (elem["favorite"] === true) {
      card.classList.add("teacher-card_favorite");
    } else {
      card.classList.remove("teacher-card_favorite");
    }
  }

  getMap(elem) {
    if ("coordinates" in elem.location) {
      this.mapContainer.style.display = "block";
      this.mymap.setView(
        [
          elem.location.coordinates.latitude,
          elem.location.coordinates.longitude,
        ],
        13
      );
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoibXlyaWtjb2RlciIsImEiOiJja29qZ3E0anowdW9rMnFybXJqdnkzbTA1In0.3oMNXNVYehfocKeYqwNz4Q",
        }
      ).addTo(this.mymap);

      L.marker([
        elem.location.coordinates.latitude,
        elem.location.coordinates.longitude,
      ]).addTo(this.mymap);
    } else {
      this.mapContainer.style.display = "none";
    }
  }

  getGender(elem) {
    return elem.gender === "male" ? "M" : "F";
  }

  getTriggers() {
    return document.querySelectorAll(".popup-trigger");
  }
};
