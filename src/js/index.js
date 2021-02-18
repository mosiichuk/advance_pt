import SVGInject from '@iconfu/svg-inject';
import Accordion from './accordion';
import lottie from 'lottie-web';
import stars from './stars.json';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".our-services .info", {y: 0}));

document.addEventListener('DOMContentLoaded', () => {
    gsap.utils.toArray(".section-header").forEach(text => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: text,
                start: '-400px 40%',
                toggleActions: 'play none none none',
            },
        });

        timeline.from(text, {
            x: -100,
            opacity: 0,
            duration: 1,
        });
    });

    gsap.utils.toArray(".img-left").forEach(img => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                start: '-300px 40%',
                toggleActions: 'play none none none',
            },
        });

        timeline.from(img, {
            x: -200,
            opacity: 0,
            duration: 1.5
        });
    });

    gsap.utils.toArray(".img-right").forEach(img => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                start: '-30% 40%',
                toggleActions: 'play none none none',
            },
        });

        timeline.from(img, {
            x: 200,
            opacity: 0,
            duration: 1.5
        });
    });

    const starsList = [...document.querySelectorAll('.stars')].map(element => {
        return lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: stars,
        });
    });

    ScrollTrigger.create({
        trigger: '.testimonials',
        start: '-40% 55%',
        onEnter: () => {
            starsList.forEach(element => {
                element.goToAndPlay(1, false);
            });
        },
    });

    ScrollTrigger.batch(".our-services .info", {
        start: "-300px 75%",
        end: "bottom top",
        onEnter: (elements) => gsap.timeline()
            .set(elements, {opacity: 0, y: -100, overwrite: true})
            .from(elements, {y: 100, opacity: 0, stagger: 0.15, overwrite: true, duration: 1}),
        onLeave: batch => gsap.to(batch, {opacity: 0, y: -100, overwrite: true, duration: 1}),
        onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true, duration: 1}),
    });

    SVGInject(document.querySelectorAll("img.injectable"));

    new Accordion({
        element: 'accordion',
        oneOpen: true
    });
});
