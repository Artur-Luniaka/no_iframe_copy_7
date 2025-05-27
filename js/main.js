// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  console.log("Crazy Parking Jam website loaded!");

  // Import page-specific JavaScript
  const currentPage = window.location.pathname;

  if (currentPage.includes("index.html") || currentPage.endsWith("/")) {
    import("./welcome-garage.js");
  } else if (currentPage.includes("road-buzz.html")) {
    import("./road-buzz.js");
  } else if (currentPage.includes("heads-up-zone.html")) {
    import("./heads-up-zone.js");
  } else if (currentPage.includes("signal-us.html")) {
    import("./signal-us.js");
  } else if (currentPage.includes("privacy-pitstop.html")) {
    import("./privacy-pitstop.js");
  } else if (currentPage.includes("cookie-controls.html")) {
    import("./cookie-controls.js");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("cookie-bar");
  const btn = document.getElementById("cookie-accept");

  if (!localStorage.getItem("cookieAccepted")) {
    bar.style.display = "flex";
  }

  btn.addEventListener("click", () => {
    localStorage.setItem("cookieAccepted", "true");
    bar.style.display = "none";
  });
});
