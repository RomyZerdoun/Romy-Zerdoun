//-------------------navbar active page------------------
let activePage = window.location.pathname;
let activeNav = document.querySelectorAll('nav .act').forEach( link =>{
    if (link.href.includes(`${activePage}`)) {
        link.classList.add("active");
        }
    }
);
 console.log(activeNav);

 //---- search-form - navbar menu- Appearance-------------------------------
// -----search-form-Appearance----------------------------------------
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-buttons').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}
//----------navbar-Appearance----------------------
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-buttons').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}
 // search-form - navbar menu - Appearance close
window.onscroll = () =>{
  searchForm.classList.remove('active');
  navbar.classList.remove('active');
}

//------swiper-home page banner----
let slides = document.querySelectorAll('.slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

//------filter- product and home page-----
let filterBtn = document.querySelectorAll('.filter-buttons .buttons');
let filterItem = document.querySelectorAll('.products .box-container .box');

filterBtn.forEach(button =>{

  button.onclick = () =>{
    filterBtn.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    let dataFilter = button.getAttribute('data-filter');

    filterItem.forEach(item =>{

      item.classList.remove('active');
      item.classList.add('hide');

      if(item.getAttribute('data-item') == dataFilter || dataFilter == 'all'){
        item.classList.remove('hide');
        item.classList.add('active');
      }
    });
  };
});


//------loading button - register page-----
const searchButton = document.querySelector('#loading-button')
const searchButtonContent = document.querySelector('#loading-button div')

searchButton.addEventListener('click', toggleButton)

function toggleButton() {
    searchButtonContent.classList.toggle('loading')
}
