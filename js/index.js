// Lenis Smooth Scrolling
gsap.registerPlugin(ScrollTrigger, SplitText);
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

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

const mm = gsap.matchMedia();

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

document.addEventListener("DOMContentLoaded", () => {
	document.fonts.ready.then(() => {
		const headers = document.querySelectorAll(".heading-hero");

		headers.forEach((h1) => {
			// Split text into lines
			const split = new SplitText(h1, { type: "lines", linesClass: "line" });

			// Set initial state for each line
			gsap.set(split.lines, { y: 100, opacity: 0 });

			// Animate each line from bottom on page load
			gsap.to(split.lines, {
				y: 0,
				opacity: 1,
				stagger: 0.2, // each line animates slightly after the previous
				duration: 1,
				ease: "power3.out",
			});
		});

		const paragraphs = document.querySelectorAll(".text-anim");

		paragraphs.forEach((p) => {
			// Split paragraph into words using SplitText
			const split = new SplitText(p, { type: "words" });

			// Set initial opacity and y offset
			gsap.set(split.words, { opacity: 0, y: 40 });

			// Animate words on scroll
			gsap.to(split.words, {
				opacity: 1,
				y: 0,
				stagger: 0.2,
				duration: 1,
				scrollTrigger: {
					trigger: p,
					start: "top 80%",
					end: "top 50%",
					scrub: true,
				},
			});
		});
	});
});

ScrollTrigger.create({
	trigger: [".section__intro"],
	start: "top top",
	end: "bottom 10%",
	toggleClass: {
		targets: [".header a", ".cursor-dot", ".cursor-outline"],
		className: "white-mode",
	},
});

mm.add("(min-width: 770px)", () => {
	// Create a fresh timeline inside
	let tl_service = gsap.timeline({
		scrollTrigger: {
			trigger: ".service",
			start: "top bottom",
			end: "bottom top",
			scrub: 1,
		},
	});

	tl_service.to(".service", {
		yPercent: -1,
		ease: "linear",
	});

	tl_service.to(".service__item", {
		height: "20rem",
		paddingBottom: 0,
		stagger: 0.5,
	});

	// Return cleanup function
	return () => {
		tl.kill();
		ScrollTrigger.refresh();
	};
});
// Work Animation

mm.add("(min-width: 1024px)", () => {
	// timeline inside media query
	let tl_work = gsap.timeline({
		scrollTrigger: {
			trigger: ".section__works",
			start: "top top",
			end: "bottom center",
			scrub: true,
			pin: true,
			pinSpacing: false,
			invalidateOnRefresh: true,
		},
	});

	tl_work.fromTo(".works-grid", { y: 0 }, { y: "-450rem", ease: "none" });

	return () => {
		// cleanup when breakpoint is left
		tl_work.kill();
		ScrollTrigger.refresh();
	};
});

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
	end: "+=90%",
	pin: true,
	scrub: true,
	snap: {
		snapTo: [0, 0.33, 0.66, 1], // snap points
		duration: 0.2, // smooth snap
		delay: 0.05,
		ease: "power1.inOut",
	},
	onUpdate: (self) => {
		let index = Math.floor(self.progress * teams.length);
		if (index >= teams.length) index = teams.length - 1;
		setActive(index);
	},
});

function setActive(index) {
	teams.forEach((t) => t.classList.remove("active"));
	images.forEach((img) => img.classList.remove("active"));

	teams[index].classList.add("active");
	images[index].classList.add("active");
}

// Testimonial Animation

// duplicate cards for seamless infinite scroll
const track = document.querySelector(".testimonials__track");
track.innerHTML += track.innerHTML; // duplicate content

// create GSAP tween
const scrollAnim = gsap.to(".testimonials__track", {
	xPercent: -50,
	ease: "linear",
	repeat: -1,
	duration: 15,
});

// pause on hover
document.querySelectorAll(".testimonial__card").forEach((card) => {
	card.addEventListener("mouseenter", () => scrollAnim.pause());
	card.addEventListener("mouseleave", () => scrollAnim.resume());
});

const footer = document.querySelector(".footer");

footer.addEventListener("mouseenter", () => {
	cursorDot.classList.add("white-mode");
	cursorOutline.classList.add("white-mode");
});

footer.addEventListener("mouseleave", () => {
	cursorDot.classList.remove("white-mode");
	cursorOutline.classList.remove("white-mode");
});
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav__link");

if (window.innerWidth <= 768) {
	gsap.set(navLinks, { opacity: 0, y: 20 });
}

const tlNav = gsap.timeline({ paused: true, reversed: true });

tlNav.to(".main-nav", { right: 0, duration: 0.4, ease: "power2.out" }).to(
	navLinks,
	{
		opacity: 1,
		y: 0,
		stagger: 0.15,
		duration: 0.5,
		ease: "power2.out",
	},
	"-=0.2"
);

hamburger.addEventListener("click", () => {
	if (window.innerWidth <= 768) {
		hamburger.classList.toggle("active");
		if (tlNav.reversed()) {
			tlNav.play();
			nav.classList.add("active");
		} else {
			tlNav.reverse();
			nav.classList.remove("active");
		}
	}
});
