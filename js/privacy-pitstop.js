// Privacy Pitstop (Privacy Policy Page) JavaScript
;(() => {
  // No JSON loading for this page as per requirements
  // Just add some basic animations

  const sections = document.querySelectorAll(".privacy-subtitle")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateX(0)"
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateX(-20px)"
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(section)
  })
})()
