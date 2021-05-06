import { teachersPage, info_teacher_popup } from "../../app";
const users = require("../../lab3/users");

module.exports = class Filter {
    constructor () {
        this.favFilter = document.querySelector("#teacherFilter2");
        this.filterUsers = users;
        this.filterBtn = document.querySelector("#filterBtn");
        this.filterBtn.addEventListener('click', ()=> {
            this.filter();
            teachersPage.renderFilter(this.filterUsers);
            info_teacher_popup.listen();
        });
    }

    filter() {
        if(this.favFilter.checked){
            this.filterUsers = this.filterFavorites(this.filterUsers);
        } else {
            this.filterUsers = users;
        }
    }

    filterFavorites(arr){
        return arr.filter((el) => {
            return el["favorite"];
        });
    }

    getFilterUs(){
        return this.filterUsers;
    }

}
