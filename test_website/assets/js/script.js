let indexx = 0;

let good_index = 1;

function Slide(index, title, background, link ) {
    this.title = title;
    this.background = background;
    this.link = link;
    this.id = "slide-" + index;
}

const Slider = {
    current: 0,
    slides: [],
    initSlider: function(slides){
        let index = 0;
        for (let slide of slides){
            this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
            index++;
        }
        this.buildSlider();
    },

    buildSlider: function() {
        let sliderHTML = "";

        for(let slide of this.slides) {

//зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
            sliderHTML +=
                `<div id='${slide.id}' class='singleSlide'
           style='background-image:url(${slide.background});'>
           <div class='slideOverlay'>
           <h2>${slide.title}</h2>
           <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;

            let btn = document.createElement('button');
            btn.className = 'buttons';
            btn.id = 'button-' + slide.id;
            btn.innerHTML = "Slide " + good_index;

            var myDiv = document.getElementById("rrr");

            document.getElementById("slider").appendChild(btn);
            btn.addEventListener("click", ()=> {
                let curr = slide.id.slice(-1);
                    while (indexx != curr) {
                        this.nextSlide();
                    }
                }
            );
            myDiv.appendChild(btn);
            good_index++;
        }
        document.getElementById("slider").innerHTML = sliderHTML;
        document.getElementById("slide-" + this.current).style.left = 0;
    },
    prevSlide: function() {
        console.log(indexx);
        let next;
        if (this.current === 0 ) {
            indexx = this.slides.length - 1;
            next = this.slides.length - 1;
        } else {
            indexx--;
            next = this.current - 1;
        }
        document.getElementById("slide-" + next).style.left = "-100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

        this.current = next;
    },
    nextSlide: function(){
        console.log(indexx);
        let next;
        if (this.current === (this.slides.length - 1) ) {
            indexx = 0;
            next = 0;
        } else {
            indexx++;
            next = this.current + 1;
        }

        document.getElementById("slide-" + next).style.left = "100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");
        this.current = next;
    },
    setSlide: function (index) {
        while(index !== this.getIndex){
            this.nextSlide();
        }
    },
    setFirstSlide: function () {
        while (this.current !== 0) {
            this.nextSlide();
        }
    },
    getIndex: function () {
        return this.good_index;
    },
}

function setSlidee(id) {
    while (this.current !== id) {
        this.nextSlide();
    }
}