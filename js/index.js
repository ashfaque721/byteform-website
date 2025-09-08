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
window.addEventListener("mousedown", () => {
	gsap.to(cursorDot, {
		duration: 0.3,
		scale: 0.5, // scale up
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
window.addEventListener("mouseup", () => {
	gsap.to(cursorDot, {
		duration: 0.3,
		scale: 1, // reset
		ease: "power1.inOut",
	});
});

const navbar = document.querySelector(".header");
const linksNav = document.querySelectorAll(".main-nav__list");

ScrollTrigger.create({
	trigger: [".section__intro"],
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
		start: "top bottom", // start when section enters viewport
		end: "bottom top", // end when section leaves viewport
		scrub: 1, // smooth scroll binding
	},
});

tl.to(".service", {
	yPercent: -1, // slowly move up
	ease: "linear", // keep linear movement
});

tl.to(".service__item", {
	height: "20rem",
	paddingBottom: 0,
	stagger: 0.5,
});

// Work Animation

let tl_work = gsap.timeline({
	scrollTrigger: {
		trigger: ".section__works",
		start: "top top",
		end: "bottom center",
		scrub: true,
		pin: true,
		pinSpacing: false, // This is the magic line that removes the gap
		invalidateOnRefresh: true,
	},
});

// Your existing animation stays exactly the same
tl_work.fromTo(".works-grid", { y: 0 }, { y: "-450rem", ease: "none" });

// Teams Animation

const teams = document.querySelectorAll(".team__wrapper .team");
const images = document.querySelectorAll(".team__image img");

// Make the first member active right away
images[0].classList.add("active");
teams[0].classList.add("active");

// Pin section and control switching
ScrollTrigger.create({
	trigger: ".section__team",
	start: "top 10%",
	end: "+=300%",
	pin: true,
	scrub: true,
	snap: {
		snapTo: [0, 0.33, 0.66, 1], // snap points
		duration: 0.2, // smooth snap
		delay: 0.05,
		ease: "power1.inOut",
	},
	onUpdate: (self) => {
		let index = Math.floor(self.progress * 3);
		setActive(index);
	},
});

function setActive(index) {
	teams.forEach((t) => t.classList.remove("active"));
	images.forEach((img) => img.classList.remove("active"));

	teams[index].classList.add("active");
	images[index].classList.add("active");
}
