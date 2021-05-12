import Popup from '../../vendors/popups';
import splideCarousel from '../../vendors/splide-carousel';

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
    allUsers,
  ) {
    super(id);
    this.trigers = this.getTriggers();

    // BASIC DOM VARIABLES
    this.newTeachName = document.querySelector('#teacherName');
    this.newTeachCountry = document.querySelector('#teacherCountry');
    this.newTeachCity = document.querySelector('#teacherCity');
    this.newTeachNumber = document.querySelector('#teacherNumber');
    this.newTeachEmail = document.querySelector('#teacherEmail');
    this.newTeachDateBirth = document.querySelector('#teacherDateBirth');
    this.newTeachBgColor = document.querySelector('#teacherColor');
    this.newTeachMale = document.querySelector('#teacherGenderMale');
    this.newTeachFemale = document.querySelector('#teacherGenderFemale');
    this.addBtn = document.querySelector('#addTeacherBtn');
    this.pagBtns = document.querySelectorAll('.pagination__item');
    this.newTeachGender = this.getGender();

    // MAIN CLASSES OBJECTS, THAT MANIPULATE PAGE
    this.teachersPage = teachersPage;
    this.info_teacher_popup = info_teacher_popup;
    this.filter = filter;
    this.mySort = mySort;
    this.mySearch = mySearch;
    this.splideCarousel = splideCarousel;

    // FUNCTION THAT ADD NEW USER ON PAGE
    this.add(users, favUsers, allUsers);

    // clouse on click "clouse button"
    this.clouseBtn.onclick = () => {
      this.clouse();
    };

    // clouse on click container
    this.container.onclick = (event) => {
      if (event.target.classList.contains('popup-container')) {
        this.clouse();
      }
    };
  }

  add(users, favUsers, allUsers) {
    this.addBtn.onclick = (event) => {
      this.pagBtns = document.querySelectorAll('.pagination__item');
      event.preventDefault();
      // PUSH NEW USER OBJ TO ALL USERS ARRAY
      allUsers.push(this.createNewTeaher(allUsers));

      this.renderNewData(users, favUsers, allUsers, 'name');

      this.splideCarousel();
      this.clouse();
    };
  }

  // GIVE RANDOM ID VALUE TO USER
  giveId(users) {
    const id = this.getRandomInt(1, 10000);
    return this.checkSameId(id, users);
  }

  // CHECK, WHETER EXISTING IDS WERE GENERATED
  checkSameId(id, users) {
    if (
      users.findIndex((elem) => {
        Number(elem.id) === Number(id);
      }) !== -1
    ) {
      this.giveId();
    } else {
      return id;
    }
  }

  // COUNT THE YEAR FROM FROM
  getAge() {
    const date = this.newTeachDateBirth.value.trim();
    const birthYear = date.slice(0, 4);
    const thisYear = new Date().getFullYear();
    const age = thisYear - birthYear;
    return age;
  }

  // GET BIRTHDAY DATE VALUE FROM FORM
  getBirthdate() {
    // DATE FORMAT : YYYY.MM.DD
    const date = this.newTeachDateBirth.value.trim();
    const birthYear = date.slice(0, 4);
    const birthMonth = date.slice(5, 7);
    const birthDay = date.slice(8);
    const birthDate = new Date(birthYear, birthMonth, birthDay);
    return birthDate;
  }

  // FUNCTION FOR GENERATE ID RANDOM NUMBER
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // GET GENDER VALUE FROM FORM
  getGender() {
    return this.newTeachFemale.checked ? 'female' : 'male';
  }

  // RENDER NEW DATA FOR PAGE
  renderNewData(users, favUsers, allUsers, chartsValue) {
    this.teachersPage.render(users, favUsers);
    this.teachersPage.renderStatistic(users, chartsValue, allUsers);
    this.info_teacher_popup.listen(users);
    this.filter.filter(users);
    this.filter.clickListener(users, favUsers, allUsers);
    this.mySort.init(users, allUsers);
    this.teachersPage.renderFavorite(favUsers);
    this.mySearch.init(allUsers, favUsers);
    this.checkPag(allUsers);
  }

  // GET NAME VALUE FROM FORM
  getName() {
    return this.newTeachName.value.trim().split(' ');
  }

  checkPag(allUsers) {
    const pagBtn = document.querySelector('.pagination__item_current');
    if (pagBtn.dataset.pagination < Math.ceil(allUsers.length / 10)) {
      pagBtn.click();
    }
  }

  // CREATE NEW TEACHER OBJ
  createNewTeaher(allUsers) {
    // NEW TEACHER OBJ SHABLON
    const newTeacher = {
      id: {},
      name: {},
      dob: {},
      picture: {},
      location: {},
    };
    newTeacher.id.value = this.giveId(allUsers);
    newTeacher.bg_color = this.newTeachBgColor.value;
    newTeacher.gender = this.getGender();
    newTeacher.name.first = this.getName()[0];
    newTeacher.name.last = this.getName()[1];
    newTeacher.location.country = this.newTeachCountry.value.trim();
    newTeacher.location.city = this.newTeachCity.value.trim();
    newTeacher.email = this.newTeachEmail.value.trim();
    newTeacher.phone = this.newTeachNumber.value.trim();
    newTeacher.dob.age = this.getAge();
    newTeacher.dob.date = this.getBirthdate();
    return newTeacher;
  }
};
