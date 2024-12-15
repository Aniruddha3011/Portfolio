let menuicon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menuicon.oneclick=() =>{
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');

window.onscroll=() =>{
    sections.forEach(sec =>{
        let top=window.scrollY;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top>=offset && top<offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+ id +']').classList.add('active');
            });
        };
    });
    let header=document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY>100);

    menuicon.classList.remove('bx-x');
    navbar.classList.remove('active');


};

document.querySelectorAll('.readmore').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceBox = button.parentElement;
        const shortDesc = serviceBox.querySelector('.short');
        const fullDesc = serviceBox.querySelector('.full');

        
        if (fullDesc.style.display === "none") {
            fullDesc.style.display = "block";
            shortDesc.style.display = "none";
            button.textContent = "Show Less";
        } else {
            fullDesc.style.display = "none";
            shortDesc.style.display = "block";
            button.textContent = "Read More";
       n}
    });
});

ScrollReveal ({
    reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.homecontent, .heading',{origin:'top'});
ScrollReveal().reveal('.homeimg, .servicescontainer,portfoliobox,.contact form',{origin:'bottom'});
ScrollReveal().reveal('.homecontent h1, .aboutpng',{origin:'left'});
ScrollReveal().reveal('.homecontent p, .aboutcontent',{origin:'right'});

// name scrolling

const typed=new Typed('.multipletext',{
    strings:['Java Developer','Frontend Developer'],
    typeSpeed:80,
    backSpeed:80,
    backDelay:900,
    loop:true
});

document.querySelectorAll(".circle").forEach((circle) => {
    const percentage = circle.getAttribute("data-percentage");
    const percentageSpan = circle.querySelector(".percentage");

    let progress = 0;
    const interval = setInterval(() => {
        progress++;
        percentageSpan.textContent =`${progress}%`; 
        circle.style.background = `conic-gradient(
            var(--main-color) ${progress * 3.6}deg,
            var(--bg-color) 0deg
        )`;
        if (progress >= percentage) {
            clearInterval(interval);
       }
    },20);
});



