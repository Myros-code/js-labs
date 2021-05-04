// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./splide-carousel";
import modalInit from "./modal";
import obj from "./myObject";
import { validateNum, validateStr, validateMail, validatePhone} from "./lab3/task2/validation";
const users = require('./lab3/users');
import {filterAll} from './lab3/task3/filterAll';
 

// --------------INITIALIZING SPLIDE CAROUSEL INIT FUNCTION ----------------------
splideCarousel();
modalInit();


// for task 2
validateStr(obj.full_name);
validateStr(obj.gender);
validateNum(obj.age);
validateMail(obj.email);
validatePhone(obj.phone);

// for task 3
console.log(filterAll(users, "Germany"));


// Include my css styles
require("../css/app.css");

/** ******** Your code here! *********** */

// Include my scss styles
require("../scss/style.scss");
