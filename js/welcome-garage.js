// Welcome Garage (Homepage) JavaScript
(async () => {
  try {
    // Fetch content from JSON
    const response = await fetch("json/welcome-garage.json");
    const data = await response.json();

    // Update meta tags
    document.title = data.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", data.meta.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = data.meta.description;
      document.head.appendChild(meta);
    }

    // Update hero section
    document.querySelector(".hero-title").textContent = data.hero.title;
    document.querySelector(".hero-description").textContent =
      data.hero.description;

    // Update game flow section
    document.querySelector("#game-flow .section-title").textContent =
      data.gameFlow.title;

    const flowContainer = document.querySelector(".flow-container");
    data.gameFlow.steps.forEach((step, index) => {
      const flowItem = document.createElement("div");
      flowItem.className = "flow-item";
      flowItem.innerHTML = `
                <div class="flow-number">${index + 1}</div>
                <h3 class="flow-title">${step.title}</h3>
                <p class="flow-description">${step.description}</p>
            `;
      flowContainer.appendChild(flowItem);
    });

    // Update testimonials section
    const testimonialsContainer = document.querySelector(
      ".testimonials-container"
    );
    data.testimonials.forEach((testimonial) => {
      const gender = Math.random() > 0.5 ? "men" : "women";
      const index = Math.floor(Math.random() * 100); // от 0 до 99
      const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
      const testimonialItem = document.createElement("div");
      testimonialItem.className = "testimonial-item";
      testimonialItem.innerHTML = `
                <div class="testimonial-content">
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <div class="author-avatar" style="background-image: url(${avatarUrl})"></div>
                        <div class="author-info">
                            <div class="author-name">${testimonial.author}</div>
                            <div class="author-title">${testimonial.title}</div>
                        </div>
                    </div>
                </div>
            `;
      testimonialsContainer.appendChild(testimonialItem);
    });

    // Update Garage Insights section
    const garageInsightsSection = document.querySelector(".garage-insights");
    if (garageInsightsSection && data.garageInsights) {
      const title = garageInsightsSection.querySelector(".section-title");
      title.textContent = data.garageInsights.title;

      const list = garageInsightsSection.querySelector(".insights-list");

      data.garageInsights?.items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "insight-item";
        li.innerHTML = `
            <h3 class="insight-title">${item.title}</h3>
            <p class="insight-description">${item.description}</p>
          `;
        list.appendChild(li);
      });
    }

    const achievementsSection = document.querySelector(".player-achievements");
    if (achievementsSection && data.playerAchievements) {
      const title = achievementsSection.querySelector(".section-title");
      title.textContent = data.playerAchievements.title;

      const list = achievementsSection.querySelector(".achievements-list");

      data.playerAchievements.items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "achievement-item";
        li.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
        list.appendChild(li);
      });

      const achievementItems = list.querySelectorAll(".achievement-item");
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      achievementItems.forEach((item) => {
        observer.observe(item);
      });
    }

    // Add animation to game flow items
    const flowItems = document.querySelectorAll(".flow-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    flowItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(item);
    });
  } catch (error) {
    console.error("Error loading homepage content:", error);
  }
})();
