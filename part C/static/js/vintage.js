let nav = document.querySelector('.navbar');

let activePage = window.location.pathname;
let activeNav = document.querySelectorAll('nav .act a').forEach( link =>{
    if (link.href.includes(`${activePage}`)) {
        link.classList.add("active");
        }
    }
);

let searchForm = document.querySelector('.search-form');
document.querySelector('#search-buttons').onclick = () =>{
    searchForm.classList.toggle('active');
    nav.classList.remove('active');
}

document.querySelector('#menu-buttons').onclick = () =>{
    nav.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
  searchForm.classList.remove('active');
  nav.classList.remove('active');
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