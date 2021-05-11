module.exports = class Popup {
  constructor(id) {
    this.id = id;
    this.container = document.querySelector(".popup-container");
    this.trigers = this.getTriggers();
    this.popup = document.querySelector(`#${this.id}`);
    this.clouseBtn = this.popup.querySelector(".popup__close-btn");
    this.listen();
    this.isOpen = false;
  }

  listen() {
    this.trigers = this.getTriggers();
    // foreach for all popup triggers
    this.trigers.forEach((el) => {
      // even trigger listen "click event"

      el.addEventListener("click", () => {
        // open container
        this.container.classList.add("open");

        // see, if container open
        if (this.container.classList.contains("open")) {
          this.open();
          this.clouseBtn.addEventListener("click", () => {
            this.clouse();
          });

          this.container.addEventListener("click", (event) => {
            if (event.target.classList.contains("popup-container")) {
              this.clouse();
            }
          });
        }
      });
    });
  }

  clouse() {
    document.body.style.overflowY = "auto";
    this.popup.classList.add("slide-out-bck-center");
    setTimeout(() => {
      this.container.classList.remove("open");
      this.popup.classList.remove("open");
      this.popup.classList.remove("slide-out-bck-center");
    }, 200);
    this.isOpen = false;
  }

  open() {
    document.body.style.overflowY = "hidden";
    this.popup.classList.add("open");
    this.popup.classList.add("tilt-in-top-1");
    this.isOpen = true;
  }

  getTriggers() {
    let arr = [];
    const allTriggers = document.querySelectorAll(".popup-trigger");
    allTriggers.forEach((el) => {
      if (el.dataset.popup === this.id) {
        arr.push(el);
      } else {
      }
    });
    return arr;
  }
};
