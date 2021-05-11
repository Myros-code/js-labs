import Popup from "../../vendors/popups";
import splideCarousel from "../../vendors/splide-carousel";

module.exports = class AddPopup extends Popup {
  constructor(
    id,
    teachersPage,
    info_teacher_popup,
    filter,
    mySort,
    mySearch,
    users,
    favUsers,
    allUsers
  ) {
    super(id);
    this.trigers = this.getTriggers();
    this.splideCarousel = splideCarousel;
    this.newTeachName = document.querySelector("#teacherName");
    this.newTeachCountry = document.querySelector("#teacherCountry");
    this.newTeachCity = document.querySelector("#teacherCity");
    this.newTeachNumber = document.querySelector("#teacherNumber");
    this.newTeachEmail = document.querySelector("#teacherEmail");
    this.newTeachDateBirth = document.querySelector("#teacherDateBirth");
    this.newTeachBgColor = document.querySelector("#teacherColor");
    this.newTeachMale = document.querySelector("#teacherGenderMale");
    this.newTeachFemale = document.querySelector("#teacherGenderFemale");
    this.addBtn = document.querySelector("#addTeacherBtn");
    this.pagBtns = document.querySelectorAll(".pagination__item");
    this.newTeachGender = this.getGender();
    this.teachersPage = teachersPage;
    this.info_teacher_popup = info_teacher_popup;
    this.filter = filter;
    this.mySort = mySort;
    this.mySearch = mySearch;
    this.add(users, favUsers, allUsers);

    // clouse on click "clouse button"
    this.clouseBtn.onclick = () => {
      this.clouse();
    };

    // clouse on click container
    this.container.onclick = (event) => {
      if (event.target.classList.contains("popup-container")) {
        this.clouse();
      }
    };
  }

  add(users, favUsers, allUsers) {
    this.addBtn.onclick = (event) => {
      this.pagBtns = document.querySelectorAll(".pagination__item");
      event.preventDefault();
      let newTeacher = {
        id: {},
        name: {},
        dob: {},
        picture: {},
        location: {},
      };
      newTeacher.id.value = this.giveId(users);
      newTeacher["bg_color"] = this.newTeachBgColor.value;
      newTeacher["gender"] = this.getGender();
      let name = this.newTeachName.value.trim().split(" ");
      newTeacher.name.first = name[0];
      newTeacher.name.last = name[1];
      newTeacher.location.country = this.newTeachCountry.value.trim();
      newTeacher.location.city = this.newTeachCity.value.trim();
      newTeacher.email = this.newTeachEmail.value.trim();
      newTeacher.phone = this.newTeachNumber.value.trim();
      newTeacher.dob.age = this.getAge();
      newTeacher.dob.date = this.getBirthdate();
      allUsers.push(newTeacher);
      if (
        this.pagBtns[this.pagBtns.length - 1].classList.contains(
          "pagination__item_current"
        )
      ) {
        let lastChunk = allUsers.slice((6 - 1) * 10, 6 * 10);
        this.teachersPage.render(lastChunk, favUsers);
        this.teachersPage.renderStatistic(lastChunk);
        this.info_teacher_popup.listen(lastChunk);
        this.filter.filter(lastChunk);
        this.filter.clickListener(lastChunk, favUsers);
        this.mySort.init(lastChunk);
      } else {
        this.teachersPage.render(users, favUsers);
        this.teachersPage.renderStatistic(users);
        this.info_teacher_popup.listen(users);
        this.filter.filter(users);
        this.filter.clickListener(users, favUsers);
        this.mySort.init(users);
      }

      this.teachersPage.renderFavorite(favUsers);
      this.mySearch.init(allUsers, favUsers);
      this.splideCarousel();
      this.clouse();
    };
  }

  giveId(users) {
    let id = this.getRandomInt(1, 10000);
    return this.checkSameId(id, users);
  }

  checkSameId(id, users) {
    if (
      users.findIndex((elem) => {
        Number(elem["id"]) === Number(id);
      }) !== -1
    ) {
      this.giveId();
    } else {
      return id;
    }
  }

  getAge() {
    let date = this.newTeachDateBirth.value.trim();
    let birthYear = date.slice(0, 4);
    let thisYear = new Date().getFullYear();
    let age = thisYear - birthYear;
    return age;
  }

  getBirthdate() {
    let date = this.newTeachDateBirth.value.trim();
    let birthYear = date.slice(0, 4);
    let birthMonth = date.slice(5, 7);
    let birthDay = date.slice(8);
    let birthDate = new Date(birthYear, birthMonth, birthDay);
    return birthDate;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  getGender() {
    return this.newTeachFemale.checked ? "female" : "male";
  }
};
