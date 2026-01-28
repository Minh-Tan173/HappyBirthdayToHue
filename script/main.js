// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    Swal.fire({
        title: 'Bạn của tôi, có muốn bật nhạc nền không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
        }
        animationTimeline();
    });
});

// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.querySelector(".hbd-chatbox");
    const hbd = document.querySelector(".wish-hbd");

    // Phần chatbox vẫn tách từng ký tự như cũ (vì là lời nhắn dài, hiệu ứng chữ chạy đẹp)
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    // Phần wish-hbd: TÁCH THEO TỪ thay vì từng ký tự → giữ khoảng cách tự nhiên
    // Mỗi từ được bọc trong <span>, dấu cách vẫn được giữ nguyên
    const wishText = hbd.innerHTML.trim();
    const words = wishText.split(/\s+/); // tách theo khoảng trắng (1 hoặc nhiều space)
    hbd.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    };

    // timeline
    const tl = gsap.timeline();

    tl.to(".container", { visibility: "visible", duration: 0.6 })
      .from(".one", { opacity: 0, y: 10, duration: 0.7 })
      .from(".two", { opacity: 0, y: 10, duration: 0.4 })
      .to(".one", { opacity: 0, y: 10, duration: 0.7 }, "+=3.5")
      .to(".two", { opacity: 0, y: 10, duration: 0.7 }, "-=1")
      .from(".three", { opacity: 0, y: 10, duration: 0.7 })
      .to(".three", { opacity: 0, y: 10, duration: 0.7 }, "+=3")
      .from(".four", { scale: 0.2, opacity: 0, duration: 0.7 })
      .from(".fake-btn", { scale: 0.2, opacity: 0, duration: 0.3 })
      .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
      .to(".chat-image", { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 2, ease: "power1.inOut" }, "-=2")
      .to(".fake-btn", { backgroundColor: "rgb(127, 206, 248)", duration: 0.1 }, "+=0.5")
      .to(".four", { scale: 0.2, opacity: 0, y: -150, duration: 0.5 }, "+=1")
      .from(".idea-1", { ...ideaTextTrans, duration: 0.7 })
      .to(".idea-1", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
      .from(".idea-2", { ...ideaTextTrans, duration: 0.7 })
      .to(".idea-2", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
      .from(".idea-3", { ...ideaTextTrans, duration: 0.7 })
      .to(".idea-3 strong", { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff", duration: 0.5 })
      .to(".idea-3", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
      .from(".idea-4", { ...ideaTextTrans, duration: 0.7 })
      .to(".idea-4", { ...ideaTextTransLeave, duration: 0.7 }, "+=2.5")
      .from(".idea-5", { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0, duration: 0.7 }, "+=1.5")
      .to(".idea-5 span", { rotation: 90, x: 8, duration: 0.7 }, "+=1.4")
      .to(".idea-5", { scale: 0.2, opacity: 0, duration: 0.7 }, "+=2")
      .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: "expo.out" }, 0.2)
      .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: "expo.out" }, 0.2, "+=1.5")
      .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)

      // Hiện slideshow + hat + wish text (pháo hoa bắt đầu từ đây)
      .from(".memory-slideshow", {
        scale: 0.4,
        opacity: 0,
        rotationZ: -15,
        y: 80,
        duration: 1.2,
        ease: "back.out(1.7)",
        onComplete: () => {
          // KHỞI ĐỘNG SLIDESHOW + PHÁO HOA
          const slides = document.querySelectorAll(".memory-slide");
          if (slides.length < 2) return;

          let current = 0;

          function fireConfetti() {
            confetti({
              particleCount: 100,
              spread: 60,
              startVelocity: 40,
              origin: { y: 0.6 },
              colors: ['#ff69b4', '#ffd700', '#00ffff', '#ff3366', '#33ccff'],
              ticks: 200
            });
          }

          fireConfetti();

          const interval = setInterval(() => {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
            fireConfetti();
          }, 3000);
        }
      }, "-=2")

      .from(".hat", { x: -100, y: 350, rotation: -180, opacity: 0, duration: 0.6 }, "-=1.8")

      // Animation cho wish-hbd: stagger từng từ (vẫn đẹp, mượt mà)
      .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: "elastic.out(1,0.5)" }, 0.15)
      .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: "expo.out" }, 0.15, "party")
      .from(".wish h5", { opacity: 0, y: 10, skewX: "-15deg", duration: 0.5 }, "party")

      .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
      .to(".six", { opacity: 0, y: 30, zIndex: "-1", duration: 0.5 })
      .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
      .to(".last-smile", { rotation: 90, duration: 0.5 }, "+=1");

    // Restart Animation on click
    document.getElementById("replay").addEventListener("click", () => {
        tl.restart();
    });
};