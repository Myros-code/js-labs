import Splide from "@splidejs/splide";

const splideCarousel = () => {
  document.addEventListener("DOMContentLoaded", function () {
    new Splide(".splide", {
      type: "loop",
      perPage: 5,
      speed: 300,
      pagination: false,
      breakpoints: {
        430: {
          perPage: 2,
        },
        640: {
          perPage: 3,
        },
        900: {
          perPage: 4,
        },
      },
      perMove: 1,
    }).mount();
  });
};

export default splideCarousel;
