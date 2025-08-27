// Debug log helper
function log(msg) {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML += "<br>" + msg;
    logDiv.scrollTop = logDiv.scrollHeight;
    console.log(msg);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector("a-scene");
    const logoModel = document.querySelector("#logoModel");
  
    // AR system events
    sceneEl.addEventListener("loaded", () => {
      log("Scene loaded, MindAR system ready");
    });
  
    sceneEl.addEventListener("arReady", () => {
      log("MindAR is ready");
    });
  
    // AR target events
    const target = sceneEl.querySelector("[mindar-image-target]");
    target.addEventListener("targetFound", () => {
      log("Target Found!");
  
      // Scale up animation
      logoModel.setAttribute("animation__scale", {
        property: "scale",
        to: "0.15 0.15 0.15",
        dur: 1000,
        easing: "easeOutElastic"
      });
  
      logoModel.addEventListener("animationcomplete__scale", () => {
        log("Scale complete → Moving left...");
        logoModel.setAttribute("animation__move", {
          property: "position",
          to: "-0.5 0 0",
          dur: 1000,
          easing: "easeInOutSine"
        });
      });
  
      logoModel.addEventListener("animationcomplete__move", () => {
        log("Move complete → Playing idle animation");
        logoModel.setAttribute("animation-mixer", {
          clip: "Idle", // replace with actual GLB animation name
          loop: "repeat"
        });
      });
    });
  
    target.addEventListener("targetLost", () => {
      log("Target Lost!");
      logoModel.removeAttribute("animation__scale");
      logoModel.removeAttribute("animation__move");
      logoModel.removeAttribute("animation-mixer");
      logoModel.setAttribute("scale", "0 0 0");
      logoModel.setAttribute("position", "0 0 0");
    });
  
    // Buttons
    const call = document.querySelector("#call");
    const mail = document.querySelector("#mail");
    const site = document.querySelector("#site");
    const pin = document.querySelector("#pin");
  
    call.addEventListener("click", () => {
      log("Call clicked");
      window.location.href = "tel:7358063881";
    });
  
    mail.addEventListener("click", () => {
      log("Mail clicked");
      window.location.href = "mailto:contact@worlyventure.com";
    });
  
    site.addEventListener("click", () => {
      log("Site clicked");
      window.location.href = "https://worlyventure.com";
    });
  
    pin.addEventListener("click", () => {
      log("Pin clicked");
      window.location.href = "https://worlyventure.com";
    });
  });