// --------------IMPORT SPLIDE CAROUSEL INIT FUNCTION ----------------------
import splideCarousel from "./splide-carousel";
import modalInit from "./modal";

// test arrays for task 1
const additional_users = require("./lab3/additional_users");
const random_user_mock = require("./lab3/random_user_mock");

// test functions for task 1
import connection from "./lab3/task1/connection";
// test functions for task 2
import {
  validateAll,
} from "./lab3/task2/validation";
// test finction for task 3
import { filterAll } from "./lab3/task3/filterAll";
// test function for task 4
import { sortArr } from "./lab3/task4/sortArr";
// test function for task 5
import { findAll } from "./lab3/task5/findAll";
// test function for task 6
import { userStatistics } from "./lab3/task6/userStatistics";
// users test array
const users = require("./lab3/users");

// Include my css styles
require("../css/app.css");
// Include my scss styles
require("../scss/style.scss");

// --------------INITIALIZING SPLIDE CAROUSEL INIT FUNCTION ----------------------
splideCarousel();
// --------------INITIALIZING MODAL INIT FUNCTION ----------------------
modalInit();

// for task 1
// connection(additional_users.additional_users, random_user_mock.random_user_mock);
console.log('connect function:');
console.log(connection(additional_users.additional_users, random_user_mock.random_user_mock));

// for task 2
validateAll(users[0]);

// for task 3
console.log('filter function:');
console.log(filterAll(users, "Germany", 65));

// for task 4
console.log('sort function:');
console.log(sortArr(users));

// for task 5
console.log('find function:');
console.log(findAll(users,"N"));

// for task 6
console.log('statistic:');
console.log(userStatistics(users,findAll(users,"N")));
