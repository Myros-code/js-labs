// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./vendors/splide-carousel";
// import modalInit from "./modal";
import Popup from "./popups";
import infoPopup from "./info-popup";


const users = require("./users");

// for lab 4
import Teachers from "./lab4/task1/teachers";
import Filter from "./lab4/task2/filter";
import Sort from "./lab4/task3/sort";
import Search from "./lab4/task4/search";



// Include my css styles
require("../css/app.css");
// Include my scss styles
require("../scss/style.scss");



// class App {
//     constructor(){
//         this.teachersPage = new Teachers();
//         this.popup = new Popup('addTeacher');
//         this.info_teacher_popup = new infoPopup('teacherInfo');
//         this.filter = new Filter();
//         this.mySort = new Sort();
//         this.mySearch = new Search();
//         splideCarousel();
//     }
// }



// appendCards(users);



// --------------INITIALIZING SPLIDE CAROUSEL INIT FUNCTION ----------------------
// --------------INITIALIZING MODAL INIT FUNCTION ----------------------



export const teachersPage = new Teachers();
teachersPage.render();
teachersPage.renderStatistic(users);
teachersPage.renderFavorite();

// modalInit(users);
const popup = new Popup('addTeacher');
export const info_teacher_popup = new infoPopup('teacherInfo');

splideCarousel();

const filter = new Filter();

const mySort = new Sort();

const mySearch = new Search();

// liveSearch();