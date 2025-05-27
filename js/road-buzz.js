// Road Buzz (News Page) JavaScript
(async () => {
  try {
    // Fetch content from JSON
    const response = await fetch("json/road-buzz.json");
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

    // Update news items
    const newsContainer = document.querySelector(".news-container");
    data.newsItems.forEach((item) => {
      const newsItem = document.createElement("article");
      newsItem.className = "news-item";
      newsItem.innerHTML = `
                <div class="news-image" style="background-image: url(${item.image})"></div>
                <div class="news-content">
                    <span class="news-date">${item.date}</span>
                    <h2 class="news-item-title">${item.title}</h2>
                    <p class="news-excerpt">${item.excerpt}</p>
                </div>
            `;
      newsContainer.appendChild(newsItem);
    });

    // Add animation to news items
    const newsItems = document.querySelectorAll(".news-item");
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

    newsItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(item);
    });
  } catch (error) {
    console.error("Error loading news content:", error);
  }
})();
