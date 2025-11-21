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

  const showToast = (title = "Disalin!", subtitle = "Tersimpan di clipboard.", ms = 1800) => {
    if (!toast) return;
    const titleEl = toast.querySelector(".font-semibold");
    const subEl = toast.querySelector(".text-xs");
    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;
    toast.classList.remove("opacity-0", "translate-x-full", "pointer-events-none");
    toast.classList.add("opacity-0", "translate-x-full");
    toast.classList.add("pointer-events-none");
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-x-full");
      toast.classList.add("pointer-events-none");
    }, ms);
  };

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
    btn.className = `tone-btn p-3 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 h-28 w-28 transition-all duration-200 ${
      selectedTone === tone.value ? "active" : ""
    }`;
    btn.innerHTML = `<i class="${tone.icon} text-lg mb-1"></i><br><span class="text-sm font-medium">${tone.label}</span>`;
    btn.addEventListener("click", () => {
      selectedTone = tone.value;
      document.querySelectorAll(".tone-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
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
      const isVisible = mobileMenu.classList.contains("show");
      // show menu (remove hidden & add show for animation)
      if (!isVisible) {
        mobileMenu.classList.remove("hidden");
        // Force a frame then add show for transition
        requestAnimationFrame(() => mobileMenu.classList.add("show"));
        navToggle.innerHTML = '<i class="fas fa-times text-xl"></i>';
        navToggle.setAttribute("aria-expanded", "true");
      } else {
        // hide with animation then add hidden after transition
        mobileMenu.classList.remove("show");
        setTimeout(() => mobileMenu.classList.add("hidden"), 260);
        navToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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
    setTimeout(async () => {
      let outputs = [];
      const usedMode = { type: "templates" };

      if (!outputs || outputs.length === 0) {
        let filteredTemplates = templates;
        const rawKeyword = input.value || "";
        const normKeyword = rawKeyword
          .toLowerCase()
          .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        if (selectedTone !== "all") {
          filteredTemplates = templates.filter((t) => t.tone === selectedTone);
        }

        const normalize = (str) =>
          (str || "")
            .toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const tokenMatchScore = (text, tokens) => {
          let score = 0;
          tokens.forEach((tok) => {
            if (!tok) return;
            if (text.includes(` ${tok} `) || text.startsWith(`${tok} `) || text.endsWith(` ${tok}`)) score += 15;
            else if (text.includes(tok)) score += 6;
          });
          return score;
        };

        const tokens = normKeyword
          .split(" ")
          .map((s) => s.trim())
          .filter(Boolean);
        const scored = filteredTemplates.map((t) => {
          const txt = normalize(t.template);
          const cat = normalize(t.category);
          let score = 0;
          if (normKeyword && txt.includes(normKeyword)) score += 60;
          if (normKeyword && cat.includes(normKeyword)) score += 80;
          score += tokenMatchScore(txt, tokens) + tokenMatchScore(cat, tokens) * 1.5;
          score += Math.random() * 6;
          return { t, score };
        });

        let candidates = scored
          .filter((s) => s.score > 0)
          .sort((a, b) => b.score - a.score)
          .map((s) => s.t);

        if (candidates.length === 0) {
          const numToSelect = Math.floor(Math.random() * 6) + 10;
          const shuffled = [...filteredTemplates].sort(() => 0.5 - Math.random());
          candidates = shuffled.slice(0, Math.min(numToSelect, shuffled.length));
        }

        const seenTexts = new Set();
        const unique = [];
        for (const tpl of candidates) {
          const normalizedTpl = tpl.template.trim();
          if (!seenTexts.has(normalizedTpl)) {
            seenTexts.add(normalizedTpl);
            unique.push(tpl);
          }
        }

        const numToReturn = Math.min(15, unique.length);
        const selected = unique.slice(0, numToReturn);

        outputs = selected.map((t) => ({ text: t.template.replace("{keyword}", keyword), category: t.category }));
        usedMode.type = "templates";
      }
      grid.innerHTML = "";
      outputs.forEach((out) => {
        const card = document.createElement("div");
        card.className = "idea-card glass-card p-6 rounded-2xl relative group cursor-pointer z-20";
        const categoryKey = (out.category || "").toString().toLowerCase().replace(/\s+/g, "-");
        const chipClass = `chip-${categoryKey || "default"}`;
        card.innerHTML = `
          <button class="card-copy" aria-label="Salin ide" title="Salin ide"><i class="fas fa-copy cursor-pointer"></i></button>
          <div class="mb-2">
            <span class="category-chip ${chipClass} text-[10px] tracking-wider uppercase">${out.category}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">${out.text}</h3>
          <p class="text-slate-500 text-sm mb-4 leading-relaxed">&nbsp;</p>
          <div class="flex items-center justify-between">
            <div class="text-xs text-slate-400 italic">${out.category}</div>
          </div>
        `;
        card.addEventListener("click", async () => {
          const title = card.querySelector("h3")?.textContent || "";
          const desc = card.querySelector("p")?.textContent || "";
          try {
            await navigator.clipboard.writeText(`${title}\n\n${desc}`);
            showToast("Disalin!", "Tersimpan di clipboard.");
          } catch (err) {
            showToast("Gagal menyalin", "Silakan salin secara manual");
          }
        });

        const copyBtn = card.querySelector(".card-copy");
        if (copyBtn) {
          copyBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const title = card.querySelector("h3")?.textContent || "";
            const desc = card.querySelector("p")?.textContent || "";
            try {
              await navigator.clipboard.writeText(`${title}\n\n${desc}`);
              showToast("Disalin!", "Tersimpan di clipboard.");
              copyBtn.classList.add("copied");
              setTimeout(() => copyBtn.classList.remove("copied"), 1200);
            } catch (err) {
              showToast("Gagal menyalin", "Silakan salin secara manual");
            }
          });
        }
        grid.appendChild(card);
      });
      document.querySelectorAll(".copy-btn").forEach((copyBtn) => {
        copyBtn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const card = copyBtn.closest(".relative");
          const title = card.querySelector("h3")?.textContent || "";
          const desc = card.querySelector("p")?.textContent || "";
          const text = `${title}\n\n${desc}`;
          try {
            await navigator.clipboard.writeText(text);
            showToast("Disalin!", "Tersimpan di clipboard.");
          } catch (err) {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            try {
              document.execCommand("copy");
              showToast("Disalin!", "Tersimpan di clipboard.");
            } catch (err2) {
              showToast("Gagal menyalin", "Silakan salin secara manual");
            }
            ta.remove();
          }
          copyBtn.classList.add("copied");
          setTimeout(() => copyBtn.classList.remove("copied"), 1400);
        });
      });
      btn.classList.remove("loading");
      btn.querySelector("span").textContent = "Hasilkan";
      btn.disabled = false;
      if (loader && loader.parentNode === btn) btn.removeChild(loader);
      const resultsContainer = document.getElementById("resultsContainer");
      const resultCountText = document.getElementById("resultCountText");
      if (resultsContainer && resultCountText) {
        const modeLabel = usedMode.type === "ai" ? "AI" : "Template";
        resultCountText.textContent = `Ditemukan ${outputs.length} ide untuk "${keyword}" — mode: ${modeLabel}`;
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
