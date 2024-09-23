// import {frag} from "./frag.js"

const frag = `

#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 32.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D image;

varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv -= 1.0;
	
		// make mouse
		vec2 mouse = u_mouse / u_resolution;
    
    // get angle and radius
    float radius = length(uv) * mix(1.0, 2.0, mouse.x);
    float angle = atan(uv.y, uv.x);
    
    // get a segment
    angle /= PI * 2.0;
    angle *= SEGMENTS;
    
    // repeat segment
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    
    angle += u_time * 0.1;
		angle += mouse.y;
    
    // unsquash segment
    angle /= SEGMENTS;
    angle *= PI * 2.0;
        
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
		point *= vec2(1.0, 1000.0 / 1500.0);
    point = fract(point);
    
    vec4 color = texture2D(image, point);
    
    gl_FragColor = color;
}

`

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


