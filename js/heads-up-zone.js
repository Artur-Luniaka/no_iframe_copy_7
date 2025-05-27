// Heads-Up Zone (Disclaimer Page) JavaScript
;(async () => {
  try {
    // Fetch content from JSON
    const response = await fetch("json/heads-up-zone.json")
    const data = await response.json()

    // Update meta tags
    document.title = data.meta.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", data.meta.description)
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = data.meta.description
      document.head.appendChild(meta)
    }

    // Update disclaimer content
    document.querySelector(".disclaimer-title").textContent = data.title

    const disclaimerContent = document.querySelector(".disclaimer-content")
    data.sections.forEach((section) => {
      const sectionElement = document.createElement("div")
      sectionElement.className = "disclaimer-section"

      let sectionHTML = `<h2 class="disclaimer-subtitle">${section.title}</h2>`

      section.paragraphs.forEach((paragraph) => {
        sectionHTML += `<p class="disclaimer-text">${paragraph}</p>`
      })

      if (section.list && section.list.length > 0) {
        sectionHTML += '<ul class="disclaimer-list">'
        section.list.forEach((item) => {
          sectionHTML += `<li class="disclaimer-list-item">${item}</li>`
        })
        sectionHTML += "</ul>"
      }

      sectionElement.innerHTML = sectionHTML
      disclaimerContent.appendChild(sectionElement)
    })

    // Add animation to sections
    const sections = document.querySelectorAll(".disclaimer-section")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }, index * 200)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(20px)"
      section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      observer.observe(section)
    })
  } catch (error) {
    console.error("Error loading disclaimer content:", error)
  }
})()
