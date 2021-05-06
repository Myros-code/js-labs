// lab 4
const appendCards = (array) => {
    const cardContainer = document.querySelector('.teachers-cards__inner');
    array.forEach(element => {
    let card = `<div
    class="teacher-card ${checkFavorite(element)}  popup-trigger" id="${element['id']}"
    data-popup="teacherInfo"
  >
    <img
      src="./images/star.svg"
      alt="star"
      class="teacher-card_favorite__star-img"
    />
    <div class="teacher-card__inner">
      <div class="teacher-card__img-block">
        <img
          src='${element['picture_large']}'
          height="200"
          width="auto"
          alt="teacher"
          class="teacher-card__img"
        />
      </div>
      <div class="teacher-card__info">
        <h2 class="teacher-card__name">${element['full_name']}</h2>
        <span class="teacher-card__location">${element['country']}</span>
      </div>
    </div>
  </div>
  `;
  cardContainer.innerHTML += card;
  });
};


const checkFavorite = (element) => {
  if (element['favorite'] === true){
    return 'teacher-card_favorite';
  } else {
    return '';
  }
}

export default appendCards;