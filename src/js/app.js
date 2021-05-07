// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./splide-carousel";
// import modalInit from "./modal";
import Popup from "./popups";
import infoPopup from "./info-popup";


const users = require("./lab3/users");

// for lab 4
import appendCards from './lab4/task1/appendCards';
import Teachers from "./teachers";
import Filter from "./lab4/task2/filter";
import Sort from "./lab4/task3/sort";
import { liveSearch } from "./lab4/task4/liveSearch";
import Search from "./lab4/task4/search";



// Include my css styles
require("../css/app.css");
// Include my scss styles
require("../scss/style.scss");







// appendCards(users);



// --------------INITIALIZING SPLIDE CAROUSEL INIT FUNCTION ----------------------

// --------------INITIALIZING MODAL INIT FUNCTION ----------------------
console.log(users);
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