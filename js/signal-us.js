// Signal Us (Contact Page) JavaScript
;(async () => {
  try {
    // Fetch content from JSON
    const response = await fetch("json/signal-us.json")
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

    // Update contact info
    document.querySelector(".address").textContent = data.contactInfo.address
    const phoneElement = document.querySelector(".phone")
    phoneElement.textContent = data.contactInfo.phone
    phoneElement.href = `tel:${data.contactInfo.phone.replace(/\s/g, "")}`

    // Add Google Maps iframe
    const mapContainer = document.querySelector(".map-container")
    mapContainer.innerHTML = data.contactInfo.mapEmbed

    // Form validation
    const contactForm = document.getElementById("contactForm")

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true

      // Validate name
      const nameInput = document.getElementById("name")
      const nameError = document.getElementById("nameError")
      if (nameInput.value.trim() === "") {
        showError(nameInput, nameError, "Name is required")
        isValid = false
      } else {
        hideError(nameInput, nameError)
      }

      // Validate email
      const emailInput = document.getElementById("email")
      const emailError = document.getElementById("emailError")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, emailError, "Please enter a valid email address")
        isValid = false
      } else {
        hideError(emailInput, emailError)
      }

      // Validate subject
      const subjectInput = document.getElementById("subject")
      const subjectError = document.getElementById("subjectError")
      if (subjectInput.value.trim() === "") {
        showError(subjectInput, subjectError, "Subject is required")
        isValid = false
      } else {
        hideError(subjectInput, subjectError)
      }

      // Validate message
      const messageInput = document.getElementById("message")
      const messageError = document.getElementById("messageError")
      if (messageInput.value.trim() === "") {
        showError(messageInput, messageError, "Message is required")
        isValid = false
      } else {
        hideError(messageInput, messageError)
      }

      if (isValid) {
        // Form is valid, show success message
        contactForm.innerHTML = `
                    <div class="success-message">
                        <h3>Thank you for your message!</h3>
                        <p>We'll get back to you as soon as possible.</p>
                    </div>
                `
      }
    })

    function showError(input, errorElement, message) {
      input.classList.add("error")
      errorElement.textContent = message
      errorElement.classList.add("visible")
    }

    function hideError(input, errorElement) {
      input.classList.remove("error")
      errorElement.classList.remove("visible")
    }
  } catch (error) {
    console.error("Error loading contact content:", error)
  }
})()
