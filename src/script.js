let templates = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      templates = data;
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });

  const input = document.getElementById("keywordInput");
  const btn = document.getElementById("generateBtn");
  const error = document.getElementById("error-text");
  const grid = document.getElementById("cardsGrid");
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
    btn.className = `tone-btn p-3 border-2 rounded-xl transition-all cursor-pointer ${
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

  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        navToggle.innerHTML = '<i class="fas fa-times text-xl"></i>';
        navToggle.setAttribute("aria-expanded", "true");
      } else {
        mobileMenu.classList.add("hidden");
        navToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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
    const keyword = sanitize(input.value);
    if (!keyword) {
      input.classList.add("shake");
      error.classList.remove("hidden");
      setTimeout(() => input.classList.remove("shake"), 500);
      return;
    }
    error.classList.add("hidden");
    btn.classList.add("loading");
    btn.disabled = true;
    const loader = document.createElement("div");
    loader.className = "loader ml-3";
    btn.appendChild(loader);
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
        card.className = "idea-card glass-card p-6 rounded-2xl relative group cursor-pointer";
        card.innerHTML = `
        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
          <i class="fas fa-copy"></i>
        </div>
        <div class="mb-2">
          <span class="text-[10px] font-bold tracking-wider uppercase text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full">${out.category}</span>
        </div>
        <h3 class="text-xl font-lg text-slate-800 mb-2 leading-tight transition-colors">${out.text}</h3>
        <p class="text-gray-700 mb-4 leading-relaxed">&nbsp;</p>
        <button class="copy-btn bg-linear-to-r from-sky-400 to-blue-700 text-white px-4 py-2 rounded-lg button-hover shadow-md flex items-center space-x-2 cursor-pointer">
          <i class="copy-icon fas fa-copy"></i>
          <i class="copied fas fa-check text-white"></i>
          <span>Salin</span>
        </button>
      `;
        grid.appendChild(card);
      });
      document.querySelectorAll(".copy-btn").forEach((copyBtn) => {
        copyBtn.addEventListener("click", () => {
          const card = copyBtn.closest(".relative");
          const title = card.querySelector("h3")?.textContent || "";
          const desc = card.querySelector("p")?.textContent || "";
          navigator.clipboard.writeText(`${title}\n\n${desc}`);
          toast.style.transform = "translateX(0)";
          setTimeout(() => {
            toast.style.transform = "translateX(120%)";
          }, 2000);
          copyBtn.classList.add("copied");
          setTimeout(() => copyBtn.classList.remove("copied"), 1400);
        });
      });
      btn.classList.remove("loading");
      btn.querySelector("span").textContent = "Hasilkan";
      btn.disabled = false;
      if (loader && loader.parentNode === btn) btn.removeChild(loader);
      // show results container
      const resultsContainer = document.getElementById("resultsContainer");
      const resultCountText = document.getElementById("resultCountText");
      if (resultsContainer && resultCountText) {
        resultCountText.textContent = `Ditemukan ${outputs.length} ide untuk "${keyword}"`;
        resultsContainer.classList.remove("hidden");
        resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 600);
  });

  const clearBtn = document.getElementById("clearResults");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      grid.innerHTML = "";
      const resultsContainer = document.getElementById("resultsContainer");
      if (resultsContainer) resultsContainer.classList.add("hidden");
    });
  }

  document.querySelectorAll(".ripple").forEach((r) => {
    r.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const circle = document.createElement("span");
      circle.style.position = "absolute";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      circle.style.background = "rgba(255,255,255,0.35)";
      circle.style.borderRadius = "50%";
      circle.style.transform = "scale(0)";
      circle.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      circle.style.pointerEvents = "none";
      this.appendChild(circle);
      requestAnimationFrame(() => (circle.style.transform = "scale(1)"));
      setTimeout(() => {
        circle.style.opacity = "0";
        setTimeout(() => circle.remove(), 500);
      }, 350);
    });
  });
});
