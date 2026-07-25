
/* =====================================================
   Microsoft Intune Portfolio
   script.js
   Part 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initStickyHeader();

    initSmoothScroll();

    initNavigationHighlight();

});

/* =====================================================
   Sticky Header
===================================================== */

function initStickyHeader(){

    const header = document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 80){

            header.classList.add("sticky");

        }else{

            header.classList.remove("sticky");

        }

    });

}

/* =====================================================
   Smooth Scroll
===================================================== */

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        });

    });

}

/* =====================================================
   Active Navigation
===================================================== */

function initNavigationHighlight(){

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-150;

            const height=section.offsetHeight;

            if(pageYOffset>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    });

}

/* =====================================================
   Microsoft Intune Portfolio
   script.js
   Part 2
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();

    initCounters();

    initReadingProgress();

});

/* =====================================================
   Scroll Reveal Animation
===================================================== */

function initScrollReveal(){

    const elements=document.querySelectorAll(

        ".overview-card," +
        ".path-card," +
        ".project-card," +
        ".skill-card," +
        ".documentation-card," +
        ".resource-card," +
        ".timeline-item," +
        ".gallery-item," +
        ".journey-card," +
        ".outcome-card"

    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    elements.forEach((element,index)=>{

        element.style.transitionDelay=`${index*60}ms`;

        observer.observe(element);

    });

}

/* =====================================================
   Animated Statistics Counters
===================================================== */

function initCounters(){

    const counters=document.querySelectorAll(".stat-card h2");

    if(!counters.length) return;

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter=entry.target;

            const finalValue=parseInt(

                counter.dataset.target ||
                counter.textContent.replace(/\D/g,'')

            );

            animateCounter(counter,finalValue);

            observer.unobserve(counter);

        });

    },{

        threshold:.5

    });

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}

function animateCounter(element,target){

    let current=0;

    const duration=1800;

    const step=Math.max(1,Math.ceil(target/(duration/16)));

    const suffix=element.dataset.suffix || "";

    function update(){

        current+=step;

        if(current>target){

            current=target;

        }

        element.textContent=current + suffix;

        if(current<target){

            requestAnimationFrame(update);

        }

    }

    update();

}

/* =====================================================
   Reading Progress Bar
===================================================== */

function initReadingProgress(){

    let progress=document.querySelector(".reading-progress");

    if(!progress){

        progress=document.createElement("div");

        progress.className="reading-progress";

        document.body.appendChild(progress);

    }

    window.addEventListener("scroll",()=>{

        const scrollTop=document.documentElement.scrollTop;

        const scrollHeight=

            document.documentElement.scrollHeight-
            document.documentElement.clientHeight;

        const percent=(scrollTop/scrollHeight)*100;

        progress.style.width=percent+"%";

    });

}

/* =====================================================
   Microsoft Intune Portfolio
   script.js
   Part 3
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initBackToTop();

    initGalleryLightbox();

    initLazyLoading();

    initCopyButtons();

});

/* =====================================================
   Back To Top Button
===================================================== */

function initBackToTop(){

    const button=document.querySelector(".back-to-top");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* =====================================================
   Gallery Lightbox
===================================================== */

function initGalleryLightbox(){

    const images=document.querySelectorAll(".gallery-item img");

    if(!images.length) return;

    const lightbox=document.createElement("div");

    lightbox.className="lightbox";

    lightbox.innerHTML=`

        <span class="close-lightbox">&times;</span>

        <img class="lightbox-image">

    `;

    document.body.appendChild(lightbox);

    const lightboxImage=lightbox.querySelector(".lightbox-image");

    const closeButton=lightbox.querySelector(".close-lightbox");

    images.forEach(image=>{

        image.addEventListener("click",()=>{

            lightbox.classList.add("active");

            lightboxImage.src=image.src;

            lightboxImage.alt=image.alt;

        });

    });

    closeButton.addEventListener("click",()=>{

        lightbox.classList.remove("active");

    });

    lightbox.addEventListener("click",(event)=>{

        if(event.target===lightbox){

            lightbox.classList.remove("active");

        }

    });

}

/* =====================================================
   Native Lazy Loading
===================================================== */

function initLazyLoading(){

    document.querySelectorAll("img").forEach(image=>{

        image.loading="lazy";

    });

}

/* =====================================================
   Copy Code Buttons
===================================================== */

function initCopyButtons(){

    const blocks=document.querySelectorAll("pre");

    blocks.forEach(block=>{

        const button=document.createElement("button");

        button.className="copy-button";

        button.textContent="Copy";

        block.appendChild(button);

        button.addEventListener("click",()=>{

            const code=block.querySelector("code");

            if(!code) return;

            navigator.clipboard.writeText(code.innerText);

            button.textContent="Copied!";

            setTimeout(()=>{

                button.textContent="Copy";

            },2000);

        });

    });

}

/* =====================================================
   Microsoft Intune Portfolio
   script.js
   Part 4
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initThemeToggle();

    initPrintButton();

    initKeyboardShortcuts();

});

/* =====================================================
   Theme Toggle
===================================================== */

function initThemeToggle(){

    const button=document.querySelector(".theme-toggle");

    if(!button) return;

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark-mode");

        button.innerHTML="☀️";

    }

    button.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        const dark=document.body.classList.contains("dark-mode");

        localStorage.setItem("theme",dark ? "dark" : "light");

        button.innerHTML=dark ? "☀️" : "🌙";

    });

}

/* =====================================================
   Print Portfolio
===================================================== */

function initPrintButton(){

    const button=document.querySelector(".print-button");

    if(!button) return;

    button.addEventListener("click",()=>{

        window.print();

    });

}

/* =====================================================
   Keyboard Shortcuts
===================================================== */

function initKeyboardShortcuts(){

    document.addEventListener("keydown",(event)=>{

        /* CTRL + SHIFT + D */

        if(event.ctrlKey && event.shiftKey && event.key==="D"){

            event.preventDefault();

            document.querySelector(".theme-toggle")?.click();

        }

        /* CTRL + P */

        if(event.ctrlKey && event.key.toLowerCase()==="p"){

            event.preventDefault();

            window.print();

        }

        /* HOME */

        if(event.key==="Home"){

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

        /* END */

        if(event.key==="End"){

            window.scrollTo({

                top:document.body.scrollHeight,

                behavior:"smooth"

            });

        }

    });

}

/* =====================================================
   Portfolio Ready
===================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    console.log(

        "%cMicrosoft Intune Portfolio Ready",

        "color:#2563eb;font-size:16px;font-weight:bold"

    );

    console.log(

        "%cCreated by Chezer O. Samonte",

        "color:#64748b"

    );

});



const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    menuToggle.textContent =

        navMenu.classList.contains("show")

        ? "✕"

        : "☰";

});


document.querySelectorAll(".nav-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        navMenu.classList.remove("show");

        menuToggle.textContent="☰";

    });

});


const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close-lightbox");

document.querySelectorAll(".clickable-image").forEach(img => {

    img.addEventListener("click", () => {

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside the image

lightbox.addEventListener("click", function(e){

    if(e.target === lightbox){

        closeLightbox();

    }

});

// Press ESC to close

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        closeLightbox();

    }

});

/* BACK TO TOP BUTTON */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    topBtn.classList.toggle("show", window.scrollY > 400);

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



