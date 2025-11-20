let templates = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      templates = data;
      console.log("Data loaded:", templates.length, "templates");
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });

  const input = document.getElementById("keywordInput");
  const btn = document.getElementById("generateBtn");
  const error = document.getElementById("error-text");
  const grid = document.getElementById("output-grid");
  const toast = document.getElementById("toast");

  const tones = [
    { value: "all", label: "Semua Nada", icon: "fas fa-list" },
    { value: "funny", label: "Lucu", icon: "fas fa-laugh-squint" },
    { value: "formal", label: "Resmi", icon: "fas fa-briefcase" },
    { value: "casual", label: "Santai", icon: "fas fa-coffee" },
    { value: "inspirational", label: "Inspiratif", icon: "fas fa-lightbulb" },
  ];

  let selectedTone = "all";

  const toneContainer = document.getElementById("toneContainer");
  tones.forEach((tone) => {
    const btn = document.createElement("button");
    btn.className = `tone-btn p-3  border-2 rounded-xl transition-all cursor-pointer ${
      selectedTone === tone.value ? "border-sky-500 bg-sky-50" : "bg-white/50"
    }`;
    btn.innerHTML = `<i class="${tone.icon} text-lg mb-1"></i><br><span class="text-sm font-medium">${tone.label}</span>`;
    btn.addEventListener("click", () => {
      selectedTone = tone.value;
      document.querySelectorAll(".tone-btn").forEach((b) => b.classList.remove("border-sky-500", "bg-sky-50"));
      btn.classList.add("border-sky-500", "bg-sky-50");
    });
    toneContainer.appendChild(btn);
  });

  const scrollBtn = document.getElementById("scroll-to-generator");
  scrollBtn.addEventListener("click", () => {
    document.getElementById("generator").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".ornament").forEach((ornament) => {
    const size = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    if (ornament.classList.contains("shape-triangle")) {
      const scale = size / 60;
      ornament.style.borderLeftWidth = `${30 * scale}px`;
      ornament.style.borderRightWidth = `${30 * scale}px`;
      ornament.style.borderBottomWidth = `${52 * scale}px`;
    } else {
      ornament.style.width = `${size}px`;
      ornament.style.height = `${size}px`;
    }
  });

  const cards = document.querySelectorAll("#home > div.absolute");
  const textContainer = document.querySelector("#home .container");
  const textRect = textContainer.getBoundingClientRect();
  cards.forEach((card) => {
    let top,
      left,
      attempts = 0,
      overlaps;
    do {
      top = Math.random() * 70 + 10;
      left = Math.random() * 80 + 10;
      card.style.top = `${top}%`;
      card.style.left = `${left}%`;
      const cardRect = card.getBoundingClientRect();
      overlaps = !(
        cardRect.right < textRect.left ||
        cardRect.left > textRect.right ||
        cardRect.bottom < textRect.top ||
        cardRect.top > textRect.bottom
      );
      attempts++;
    } while (overlaps && attempts < 100);
  });

  const sanitize = (str) => str.trim().replace(/\b\w/g, (l) => l.toUpperCase());

  const getCategoryIcon = (category) => {
    const icons = {
      funny: "fas fa-laugh-squint",
      formal: "fas fa-briefcase",
      casual: "fas fa-coffee",
      inspirational: "fas fa-lightbulb",
    };
    return icons[category] || "fas fa-tag";
  };

  btn.addEventListener("click", () => {
    console.log("Generate button clicked");
    const keyword = sanitize(input.value);
    if (!keyword) {
      input.classList.add("shake");
      error.classList.remove("hidden");
      setTimeout(() => input.classList.remove("shake"), 500);
      return;
    }
    error.classList.add("hidden");
    btn.classList.add("loading");
    btn.querySelector("span").textContent = "Menghasilkan...";
    grid.innerHTML = "";
    for (let i = 0; i < 15; i++) {
      const skeleton = document.createElement("div");
      skeleton.className =
        "relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-sky-400/30 card-hover";
      skeleton.innerHTML = `
      <div class="mb-4">
        <div class="skeleton h-4 w-20 rounded-full"></div>
      </div>
      <div class="skeleton h-16 w-full rounded mb-4"></div>
      <div class="skeleton h-8 w-16 rounded"></div>
    `;
      grid.appendChild(skeleton);
    }
    setTimeout(() => {
      let filteredTemplates = templates;
      if (selectedTone !== "all") {
        filteredTemplates = templates.filter((t) => t.tone === selectedTone);
      }
      const numToSelect = Math.floor(Math.random() * 6) + 10;
      const selected = [];
      const shuffled = [...filteredTemplates].sort(() => 0.5 - Math.random());
      for (let i = 0; i < Math.min(numToSelect, shuffled.length); i++) {
        selected.push(shuffled[i]);
      }
      const outputs = selected.map((t) => ({
        text: t.template.replace("{keyword}", keyword),
        category: t.category,
      }));
      grid.innerHTML = "";
      outputs.forEach((out) => {
        const card = document.createElement("div");
        card.className =
          "relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-sky-400/30 card-hover";
        card.innerHTML = `
        <div class="mb-4">
          <span class="inline-flex items-center bg-linear-to-r from-sky-400 to-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
            <i class="${getCategoryIcon(out.category)} mr-1"></i>
            ${out.category}
          </span>
        </div>
        <p class="text-gray-700 mb-4 leading-relaxed">${out.text}</p>
        <button class="copy-btn bg-linear-to-r from-sky-400 to-blue-700 text-white px-4 py-2 rounded-lg button-hover shadow-md flex items-center space-x-2 cursor-pointer">
          <i class="fas fa-copy"></i>
          <span>Salin</span>
        </button>
      `;
        grid.appendChild(card);
      });
      document.querySelectorAll(".copy-btn").forEach((copyBtn) => {
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
          toast.classList.remove("opacity-0");
          setTimeout(() => toast.classList.add("opacity-0"), 2000);
          setTimeout(() => toast.classList.add("hidden"), 2300);
        });
      });
      btn.classList.remove("loading");
      btn.querySelector("span").textContent = "Hasilkan";
    }, 600);
  });
});
