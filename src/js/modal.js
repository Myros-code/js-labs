const modalInit = (arr) => {
  const popupContainer = document.querySelector(".popup-container");
  const popupTrigger = document.querySelectorAll(".popup-trigger");
  const body = document.querySelector("body");
  const popupInfo = document.querySelector('.popup_teaher-info');

  //----------- FUNCTION FOR CLOUSING POPUP -------------//
  const clousePopup = (popup, container) => {
    body.style.overflowY = "auto";
    popup.classList.add("slide-out-bck-center");
    setTimeout(() => {
      container.classList.remove("open");
      popup.classList.remove("open");
      popup.classList.remove("slide-out-bck-center");
    }, 200);
  };

  //----------- FUNCTION FOR OPENING POPUP -------------//
  const openPopup = (popup) => {
    body.style.overflowY = "hidden";
    popup.classList.add("open");
    popup.classList.add("tilt-in-top-1");
  };

  //----------- FUNCTION FOR OPENING POPUP -------------//
  const showData = (arr, id,card) => {
    const teacherImg = document.querySelector("#pTeacherImg");
    const teacherName = document.querySelector("#pTeacherName");
    const teacherCity = document.querySelector("#pTeacherCity");
    const teacherCountry = document.querySelector("#pTeacherCountry");
    const teacherGender = document.querySelector("#pTeacherGender");
    const teacherPhone = document.querySelector("#pTeacherPhone");
    const teacherMail = document.querySelector("#pTeacherMail");
    const teacherAge = document.querySelector("#pTeacherAge");
    const teacherComent = document.querySelector("#pTeacherComent");

    let favoriteBtn = document.querySelector('#toggleFav');
    let myElem = arr.find((el) => {
      if (Number(el["id"]) === Number(id)) {
        return el['id'];
      }
    });

    if(myElem['favorite'] === true){
      popupInfo.classList.add('popup_teaher-info_teacher-favorite');
    } else if (myElem['favorite'] === false){
      popupInfo.classList.remove('popup_teaher-info_teacher-favorite');
    }

    let gender = "?";
    if (myElem['gender'] === "female"){
      gender = 'F';
    } else {
      gender = 'M';
    }


    teacherName.innerHTML     = myElem["full_name"];
    teacherImg.src     = myElem["picture_large"];
    teacherCity.innerHTML     = myElem["city"];
    teacherCountry.innerHTML  = myElem["country"];
    teacherGender.innerHTML   = gender;
    teacherPhone.innerHTML    = myElem["phone"];
    teacherAge.innerHTML      = myElem["age"];
    teacherComent.innerHTML   = myElem["note"];
    teacherMail.innerHTML     = myElem["email"];






    

    

  //-------- FUNCTION THAT LISTEN POPUP WINDOWS TRIGGER --------//
  popupTrigger.forEach((el) => {
    el.addEventListener("click", (event) => {

      let popupId = event.target.closest(".popup-trigger").dataset.popup;
      let cardId = event.target.closest(".popup-trigger").id;
      let card = event.target.closest(".popup-trigger");
      console.log(card);

      // if (popupId === "teacherInfo") {
      //   showData(arr, cardId, card);
      // }

      popupContainer.classList.add("open");
      // see, if container open
      if (popupContainer.classList.contains("open")) {
        let currentPopup = document.querySelector(`#${popupId}`);
        let closeBtn = currentPopup.querySelector(".popup__close-btn");

        openPopup(currentPopup);

        closeBtn.addEventListener("click", () => {
          clousePopup(currentPopup, popupContainer);
        });

        popupContainer.addEventListener("click", (event) => {
          if (event.target.classList.contains("popup-container")) {
            clousePopup(currentPopup, popupContainer);
          }
        });
      }
    });

    
  });
  //-------- FUNCTION THAT LISTEN POPUP WINDOWS TRIGGER ENDED --------//
};

export default modalInit;
