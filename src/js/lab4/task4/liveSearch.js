const users = require("../../lab3/users");
export const liveSearch = () => {

  document.addEventListener('click', (event) =>{
    if (event.target.classList.contains("teacher-search") === false) {
        document.querySelector('.search-group__list').style.display = 'none';
    }
  });

  document.querySelector("#teacherSearch").oninput = () => {
    let list = document.querySelector('.search-group__list');
    list.style.display = 'block';
    let val = document.querySelector("#teacherSearch").value.trim();
    list.innerHTML = "";

    users.forEach((element) => {
        if (element["full_name"].search(val) == -1){

        } else {
            let link = `
                <li class="search-group__item" > 
                <a href="#!" class="search-group__link" data-card="${element["id"]}">
                  ${element["full_name"]}, ${element["age"]}, ${element["note"]}
                </a>
            </li>`;

            let elemId = element["id"];
            let card = document.getElementById(elemId);
            document.querySelector('#searchBtn').onclick = () => {
                card.style.background = "green";
            }
            list.innerHTML += link;
        }
    });

    let links = document.querySelectorAll('.search-group__link');

    links.forEach((element) => {
        element.addEventListener('click', (event) =>{
            let cardId = event.target.dataset.card;
            document.getElementById(cardId).click();
        });
    });

    
  };
};

