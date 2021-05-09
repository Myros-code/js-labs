import users from "../../users";
import Popup from "../../vendors/popups";
import splideCarousel from "../../vendors/splide-carousel";

module.exports = class AddPopup extends Popup {
  constructor(id, teachersPage, info_teacher_popup, filter, mySort, mySearch) {
    super(id);
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
    this.addBtn = document.querySelector("#addTeaherBtn");
    this.newTeachGender = this.getGender();
    this.teachersPage = teachersPage;
    this.info_teacher_popup = info_teacher_popup;
    this.filter = filter;
    this.mySort = mySort;
    this.mySearch = mySearch;
    console.log(users);
    this.add();
  }

  add() {
    this.addBtn.onclick = (event) => {
      event.preventDefault();
      let newTeacher = {};
      newTeacher["id"] = this.giveId();
      newTeacher["favorite"] = false;
      newTeacher["bg_color"] = this.newTeachBgColor.value;
      newTeacher["gender"] = this.getGender();
      newTeacher["full_name"] = this.newTeachName.value.trim();
      newTeacher["country"] = this.newTeachCountry.value.trim();
      newTeacher["city"] = this.newTeachCity.value.trim();
      newTeacher["email"] = this.newTeachEmail.value.trim();
      newTeacher["phone"] = this.newTeachNumber.value.trim();
      newTeacher["age"] = this.getAge();
      newTeacher["b_date"] = this.getBirthdate();
      // newTeacher['picture_large'] = '';
      // newTeacher['picture_thumbnail'] = '';
      users.push(newTeacher);
      console.log(users);

      this.teachersPage.render();
      this.teachersPage.renderStatistic(users);
      this.teachersPage.renderFavorite();
      this.info_teacher_popup.listen();
      this.filter.filter();
      this.filter.clickListener();
      this.mySearch.init();
      this.mySort.init();
      this.splideCarousel();
      this.clouse();
    };
  }

  giveId() {
    let id = this.getRandomInt(1, 10000);
    return this.checkSameId(id);
  }

  checkSameId(id) {
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
