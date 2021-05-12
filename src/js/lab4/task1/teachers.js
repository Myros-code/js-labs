const dayjs = require('dayjs');
const _ = require('lodash');

module.exports = class Teachers {
  constructor() {
    this.chartCreate = false;
    this.myChart = 0;
  }

  render(users, favUsers) {
    const cardContainer = document.querySelector('.teachers-cards__inner');
    cardContainer.innerHTML = '';
    users.forEach((element) => {
      const card = `<div
    class="teacher-card ${this.checkFavorite(
    element,
    favUsers,
  )} ${this.checkImgClass(element)} popup-trigger" id="${element.id.value}"
    data-popup="teacherInfo"
  >
    <img
      src="./images/star.svg"
      alt="star"
      class="teacher-card_favorite__star-img"
    />
    <div class="teacher-card__inner">
      <div class="teacher-card__img-block">
        ${this.checkImgPhoto(element)}
      </div>
      <div class="teacher-card__info">
        <h2 class="teacher-card__name">${element.name.first} ${
  element.name.last
}</h2>
        <span class="teacher-card__location">${element.location.country}</span>
      </div>
    </div>
  </div>
  `;
      cardContainer.innerHTML += card;
    });
  }

  renderFavorite(users) {
    const favTeachList = document.querySelector('#favTeachers');
    const favTeachersArr = users;
    favTeachList.innerHTML = '';
    favTeachersArr.forEach((element) => {
      const card = `
        <li class="splide__slide">
            <div class="teacher-card teacher-card_favorite ${this.checkImgClass(
    element,
  )} popup-trigger" data-card="${element.id.value}">
                <img src="./images/star.svg" alt="star" class="teacher-card_favorite__star-img"/>
                <div class="teacher-card__inner">
                    <div class="teacher-card__img-block">
                      ${this.checkImgPhoto(element)}
                    </div>
                    <div class="teacher-card__info">
                    <h2 class="teacher-card__name">${element.name.first} ${
  element.name.last
}</h2>
                    <span class="teacher-card__location">${
  element.location.country
}</span>
                    </div>
                </div>
            </div>
        </li>`;
      favTeachList.innerHTML += card;
    });
  }

  renderStatistic(arr, value, Allusers) {
    const statisticTable = document.querySelector('.statistics-table__body');
    statisticTable.innerHTML = `<tr>
    <th class="statistics-table__filter-toggles" data-sort="name">Name</th>
    <th class="statistics-table__filter-toggles" data-sort="age">Age</th>
    <th class="statistics-table__filter-toggles" data-sort="b_date">Birthday</th>
    <th class="statistics-table__filter-toggles" data-sort="country">Country</th>
    </tr>`;
    arr.forEach((element) => {
      const statisticItem = `<tr>
      <td>${element.name.first} ${element.name.last}</td>
      <td>${element.dob.age}</td>
      <td>${this.getBirthday(new Date(element.dob.date))}</td>
      <td>${element.location.country}</td>
    </tr>`;
      statisticTable.innerHTML += statisticItem;
    });

    this.createChart(value, Allusers);
  }

  checkFavorite(element, favUsers) {
    const res = _.findIndex(favUsers, (el) => el.id.value === element.id.value);
    return (res === -1) ? '' : 'teacher-card_favorite';
  }

  checkImgClass(element) {
    if (
      !('large' in element.picture)
      && !('medium' in element.picture)
      && !('thumbnail' in element.picture)
    ) {
      return 'teacher-card_without-img';
    }
    return '';
  }

  checkImgPhoto(element) {
    if (
      !('large' in element.picture)
      && !('medium' in element.picture)
      && !('thumbnail' in element.picture)
    ) {
      const firstLetterName = element.name.first.slice(0, 1);
      const secondLetterName = element.name.last.slice(0, 1);
      return `<span class="teacher-card__initials">${firstLetterName}.${secondLetterName}</span>`;
    }
    return `<img
          src='${
  element.picture.large
    ? element.picture.large
    : element.picture.medium
      ? element.picture.medium
      : element.picture.thumbnail
}'
          height="200"
          width="auto"
          alt="teacher"
          class="teacher-card__img"
        />`;
  }

  getBirthday(date) {
    return `${dayjs(date).format('DD.MM.YYYY')}`;
  }

  createChart(value, Allusers) {
    if (!this.chartCreate) {
      const ctx = document.getElementById('myChart').getContext('2d');
      ctx.canvas.parentNode.style.height = '700px';
      ctx.canvas.parentNode.style.width = '700px';
      this.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Mens', 'Womens'],
          datasets: [
            {
              label: 'Number of men and women',
              data: this.revealGender(Allusers),
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      this.chartCreate = true;
    } else {
      this.myChart.destroy();
      const ctx = document.getElementById('myChart').getContext('2d');
      ctx.canvas.parentNode.style.height = '700px';
      ctx.canvas.parentNode.style.width = '700px';
      this.createCurChart(value, ctx, Allusers);
    }
  }

  createCurChart(value, ctx, Allusers) {
    switch (value) {
      case 'name':
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Mens', 'Womens'],
            datasets: [
              {
                label: 'Number of men and women',
                data: this.revealGender(Allusers),
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        break;
      case 'age':
        const labelsA = this.revealAge(Allusers)[0];
        const numDataA = this.revealAge(Allusers)[1];
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labelsA,
            datasets: [
              {
                label: 'Users age',
                data: numDataA,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        break;
      case 'b_date':
        const labelsD = this.revealAge(Allusers)[0];
        const numDataD = this.revealAge(Allusers)[1];
        this.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labelsD,
            datasets: [
              {
                label: 'Users age',
                data: numDataD,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        break;
      case 'country':
        const labels = this.revealCountry(Allusers)[0];
        const numData = this.revealCountry(Allusers)[1];
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels,
            datasets: [
              {
                label: 'Number of different countries',
                data: numData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        break;
    }
  }

  revealGender(Allusers) {
    const mens = _.filter(Allusers, { gender: 'male' });
    const womens = _.filter(Allusers, { gender: 'female' });
    return [Number(mens.length), Number(womens.length)];
  }

  revealAge(Allusers) {
    function ageCount(el) {
      return el.length;
    }
    const dobs = _.map(Allusers, 'dob');
    const agesAll = _.map(dobs, 'age');
    const ages = _.uniq(agesAll).sort();
    const agesCount = _.reduce(
      agesAll.sort(),
      (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      },
      {},
    );
    const ageCountNum = _.map(agesCount, ageCount);
    return [ages, ageCountNum];
  }

  revealCountry(Allusers) {
    function countryCount(el) {
      return el.length;
    }
    const locations = _.map(Allusers, 'location');
    const countriesAll = _.map(locations, 'country');
    const countries = _.uniq(countriesAll).sort();
    const countriesCount = _.reduce(
      countriesAll.sort(),
      (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      },
      {},
    );
    const countriesCountNum = _.map(countriesCount, countryCount);
    return [countries, countriesCountNum];
  }
};
