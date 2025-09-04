// Lenis Smooth Scrolling
gsap.registerPlugin("ScrollTrigger");
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Cursor
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
	const posX = e.clientX;
	const posY = e.clientY;

	cursorDot.style.left = `${posX}px`;
	cursorDot.style.top = `${posY}px`;

	// cursorOutline.style.left = `${posX}px`;
	// cursorOutline.style.top = `${posY}px`;

	cursorOutline.animate(
		{
			left: `${posX}px`,
			top: `${posY}px`,
		},
		{ duration: 500, fill: "forwards" }
	);
});

const links = document.querySelectorAll("a");

links.forEach((link) => {
	link.addEventListener("mouseenter", () => {
		gsap.to(cursorOutline, {
			duration: 0.3,
			scale: 2, // scale up
			ease: "power1.inOut",
		});
	});

	link.addEventListener("mouseleave", () => {
		gsap.to(cursorOutline, {
			duration: 0.3,
			scale: 1, // reset
			ease: "power1.inOut",
		});
	});
});

window.addEventListener("mousedown", () => {
	gsap.to(cursorOutline, {
		duration: 0.3,
		scale: 2, // scale up
		ease: "power1.inOut",
	});
});

window.addEventListener("mouseup", () => {
	gsap.to(cursorOutline, {
		duration: 0.3,
		scale: 1, // reset
		ease: "power1.inOut",
	});
});

const navbar = document.querySelector(".header");
const linksNav = document.querySelectorAll(".main-nav__list");

ScrollTrigger.create({
	trigger: ".section__intro",
	start: "top top",
	end: "bottom 10%",
	toggleClass: {
		targets: [".header a", ".cursor-dot", ".cursor-outline"],
		className: "white-mode",
	},
});

const tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".service",
		pin: true,
		start: "top top",
		end: "bottom top",
		scrub: 1,
		ease: "linear",
	},
});

tl.to(".service__item", {
	height: "20rem",
	paddingBottom: 0,
	stagger: 0.5,
});
