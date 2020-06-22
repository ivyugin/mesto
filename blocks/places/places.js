let places = document.querySelector('.places');

let place_arr = places.querySelectorAll('.place');
console.log(place_arr);

let like_btn_arr = places.querySelectorAll('.place__like-btn');
console.log(like_btn_arr);

for (let i = 0; i < like_btn_arr.length; i++) {
  like_btn_arr[i].addEventListener('click', function () {
    like_btn_arr[i].classList.toggle('place__like-btn_cheked');
  });
}
