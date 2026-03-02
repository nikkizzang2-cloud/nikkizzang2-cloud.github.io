document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll("nav > div");
  const web = document.querySelector(".web");
  const about = document.querySelector(".about");
  const contact = document.querySelector(".contact");
  const nameBox = document.querySelector(".name"); // lee가 들어 있는 div
  const lee = document.querySelector(".lee");
  const her = document.querySelector(".her");

  const attachDetailsFixed = (container, fixedClassTarget) => {
    if (!container) return;
    const details = container.querySelector("details");
    if (!details) return;

    details.addEventListener("toggle", () => {
      if (details.open) {
        fixedClassTarget.classList.add("fixed");
      } else {
        fixedClassTarget.classList.remove("fixed");
      }
      updateNavOpacity();
    });
  };

  attachDetailsFixed(web, web);
  attachDetailsFixed(about, about);
  attachDetailsFixed(contact, contact);

  // ✅ lee: her 상태에 맞춰 fixed 제어 + opacity 업데이트
  if (lee && her && nameBox) {
    lee.addEventListener("click", () => {
      const isHidden = getComputedStyle(her).display === "none";

      // 1) her 토글
      her.style.display = isHidden ? "block" : "none";

      // 2) her가 보일 때만 이미지 고정, 숨길 때는 해제
      if (isHidden) {
        // 지금까지는 숨겨져 있었으니까 → 이제 보이게 됨
        lee.classList.add("fixed");
      } else {
        // 지금까지는 보이고 있었으니까 → 이제 숨김
        lee.classList.remove("fixed");
      }

      updateNavOpacity();
    });
  }


   const updateNavOpacity = () => {
    containers.forEach(div => {
      div.style.opacity = "1";
    });

    const openWeb = web?.querySelector("details")?.open;
    const openAbout = about?.querySelector("details")?.open;
    const openContact = contact?.querySelector("details")?.open;

    // ✅ her가 보이는 상태도 active로 취급
    const herVisible = her && getComputedStyle(her).display !== "none";

    if (!openWeb && !openAbout && !openContact && !herVisible) return;

    let active = null;
    if (openWeb) active = web;
    if (openAbout) active = about;
    if (openContact) active = contact;
    if (herVisible) active = nameBox;

    if (!active) return;

    containers.forEach(div => {
      if (div !== active) {
        div.style.opacity = "0.2";
      }
    });
  };

  updateNavOpacity();
});


// ===== 베를린 코드 =====
const berlin = document.querySelector('.berlin');
const bg = document.querySelector('.fullscreen-bg');

if (berlin && bg) {
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  if (!isTouchDevice) {
    // PC: 기존 hover 유지
    berlin.addEventListener('mouseenter', () => {
      bg.style.opacity = '1';
      bg.style.backgroundImage = 'url("img/frame.png")';
    });

    berlin.addEventListener('mouseleave', () => {
      bg.style.opacity = '0';
      // 필요하면 bg.style.backgroundImage = 'none';
    });
  } else {
    // 모바일: 탭으로 토글
    let active = false;

    berlin.addEventListener('click', (e) => {
      // 링크 바로 타지 않게 하고 싶으면 이 줄 유지
      e.preventDefault();

      active = !active;

      if (active) {
        bg.style.opacity = '1';
        bg.style.backgroundImage = 'url("img/frame.png")';
      } else {
        bg.style.opacity = '0';
        // 필요하면 bg.style.backgroundImage = 'none';
      }
    });
  }
}




// ===== 여기부터 footer 토글 전용 코드 =====
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");
  const name11 = document.querySelector(".name11");
  const fullscreenBg = document.querySelector(".fullscreen-bg");

  const faceImg = document.querySelector(".tip-img6");
  const tearImg = document.querySelector(".tip-img7");

  const stroke1 = document.querySelector(".tip-img");
  const stroke2 = document.querySelector(".tip-img2");
  const stroke3 = document.querySelector(".tip-img3");
  const stroke4 = document.querySelector(".tip-img4");
  const stroke5 = document.querySelector(".tip-img5");

  if (
    !footer || !name11 || !fullscreenBg ||
    !faceImg || !tearImg ||
    !stroke1 || !stroke2 || !stroke3 || !stroke4 || !stroke5
  ) {
    return;
  }

  let footerActive = false;

  // 원래 상태 저장
  const originalBodyColor = getComputedStyle(document.body).color;
  const originalBgImage = getComputedStyle(fullscreenBg).backgroundImage;

  const originalFaceSrc = faceImg.getAttribute("src");
  const originalTearSrc = tearImg.getAttribute("src");

  const originalStroke1 = stroke1.getAttribute("src");
  const originalStroke2 = stroke2.getAttribute("src");
  const originalStroke3 = stroke3.getAttribute("src");
  const originalStroke4 = stroke4.getAttribute("src");
  const originalStroke5 = stroke5.getAttribute("src");

  // footer 클릭: 폰트 + 이미지 + body 클래스 토글
  footer.addEventListener("click", () => {
    footerActive = !footerActive;

    if (footerActive) {
      // 1) 전체 폰트색 보라
      document.body.style.color = "#7120e5";
      document.querySelectorAll("*").forEach(el => {
        el.style.color = "#7120e5";
      });

      // 2) face / tear 교체
      faceImg.src = "img/face2.png";
      tearImg.src = "img/tear2.png";

      // 3) stroke 이미지들 교체
      stroke1.src = "img/stroke12.png";
      stroke2.src = "img/stroke22.png";
      stroke3.src = "img/stroke32.png";
      stroke4.src = "img/stroke42.png";
      stroke5.src = "img/stroke52.png";

      // 4) ::after 이미지들은 body에 클래스만 추가해서 CSS로 처리
      document.body.classList.add("crayon-on");

    } else {
      // 1) 폰트색 원래대로
      document.body.style.color = originalBodyColor;
      document.querySelectorAll("*").forEach(el => {
        el.style.color = "";
      });

      // 2) face / tear 원복
      faceImg.src = originalFaceSrc;
      tearImg.src = originalTearSrc;

      // 3) stroke 원복
      stroke1.src = originalStroke1;
      stroke2.src = originalStroke2;
      stroke3.src = originalStroke3;
      stroke4.src = originalStroke4;
      stroke5.src = originalStroke5;

      // 4) ::after 이미지용 클래스 제거 → CSS 기본값으로 복귀
      document.body.classList.remove("crayon-on");

      // 5) 배경 초기화
      fullscreenBg.style.opacity = "0";
      fullscreenBg.style.backgroundImage = "none";
    }
  });

  // name11 hover 시 배경
  name11.addEventListener("mouseenter", () => {
    fullscreenBg.style.opacity = "1";

    if (footerActive) {
      fullscreenBg.style.backgroundImage = 'url("img/back2.png")';
    } else {
      fullscreenBg.style.backgroundImage =
        originalBgImage && originalBgImage !== "none"
          ? originalBgImage
          : 'url("img/back.png")';
    }
  });

  name11.addEventListener("mouseleave", () => {
    fullscreenBg.style.opacity = "0";
    fullscreenBg.style.backgroundImage = "none";
  });
});






