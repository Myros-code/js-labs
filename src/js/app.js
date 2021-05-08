// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./vendors/splide-carousel";
// import modalInit from "./modal";
import Popup from "./vendors/popups";
import infoPopup from "./vendors/info-popup";


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



class App {
    constructor(){
        this.users = this.getUsers();
        this.teachersPage = new Teachers();
        this.teachersPage.render();
        this.teachersPage.renderStatistic(this.users);
        this.teachersPage.renderFavorite();
        this.popup = new Popup('addTeacher');
        this.info_teacher_popup = new infoPopup('teacherInfo',this.teachersPage);
        this.filter = new Filter(this.teachersPage, this.info_teacher_popup);
        this.mySort = new Sort(this.teachersPage);
        this.mySearch = new Search(this.info_teacher_popup, this.teachersPage);
        splideCarousel();
    }

    getUsers(){
        return users;
    }
}
const app = new App();



// appendCards(users);



// --------------INITIALIZING SPLIDE CAROUSEL INIT FUNCTION ----------------------
// --------------INITIALIZING MODAL INIT FUNCTION ----------------------

