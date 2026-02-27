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

