const canvas = document.querySelector(".canvas-holder canvas");
const sandbox = new GlslCanvas(canvas);


const calcSize =  () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dpi = window.devicePixelRatio;

    const size = Math.max(windowHeight, windowWidth);
    canvas.width = size * dpi;
    canvas.height = size * dpi;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
} 

calcSize()

window.addEventListener('resize', () => calcSize());

sandbox.load(frag);

const images = ["trails.jpg", "flowers.jpg", "light.jpg"];
let current = 0;

canvas.addEventListener('click', () => {
    current++;
    if(current >= images.length) current = 0;

    sandbox.setUniform("image",`assets/${images[current]}`);
    
})

sandbox.setUniform("image",`assets/${images[current]}`);


