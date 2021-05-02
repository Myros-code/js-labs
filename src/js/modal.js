const modalInit = () => {
  const popups = document.querySelectorAll(".popup");
  const popupContainer = document.querySelector(".popup-container");
  const popupTrigger = document.querySelectorAll(".popup-trigger");
  const body = document.querySelector("body");

  //----------- FUNCTION FOR CLOUSING POPUP -------------//
  const clousePopup = (popup, container) => {
    body.style.overflowY = "auto";
    console.log(document.body.clientWidth);
    popup.classList.add("slide-out-bck-center");
    setTimeout(() => {
      container.classList.remove("open");
      popup.classList.remove("open");
      popup.classList.remove("slide-out-bck-center");
    }, 200);
  };

  //----------- FUNCTION FOR OPENING POPUP -------------//
  const openPopup = (popup) => {
    console.log(document.body.clientWidth);
    body.style.overflowY = "hidden";
    popup.classList.add("open");
    popup.classList.add("tilt-in-top-1");
  };

  //-------- FUNCTION THAT LISTEN POPUP WINDOWS TRIGGER --------//
  popupTrigger.forEach((el) => {
    el.addEventListener("click", (event) => {
      let popupId = event.target.closest(".popup-trigger").dataset.popup;

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
modalInit();
