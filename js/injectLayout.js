// Function to inject header and footer
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Inject header
    const headerResponse = await fetch("header.html")
    const headerHtml = await headerResponse.text()
    document.getElementById("header-container").innerHTML = headerHtml

    // Inject footer
    const footerResponse = await fetch("footer.html")
    const footerHtml = await footerResponse.text()
    document.getElementById("footer-container").innerHTML = footerHtml

    // Set current year in footer
    const currentYearElement = document.getElementById("currentYear")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }

    // Handle Game Flow link click
    const gameFlowLink = document.querySelector('a[href="index.html#game-flow"]')
    if (gameFlowLink) {
      gameFlowLink.addEventListener("click", (e) => {
        const currentPath = window.location.pathname
        if (!currentPath.includes("index.html") && !currentPath.endsWith("/")) {
          e.preventDefault()
          window.location.href = "index.html#game-flow"
        }
      })
    }
  } catch (error) {
    console.error("Error injecting layout:", error)
  }
})
