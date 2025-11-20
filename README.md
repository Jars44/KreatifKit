<!--
  KreatifKit
  README generated/updated by GitHub Copilot (Raptor mini preview) for the user.
-->

# KreatifKit

KreatifKit adalah generator ide konten front-end ringan yang menggunakan prompt berbasis template untuk menghasilkan ide konten dan hook yang dapat dibagikan. Ini adalah aplikasi statis, sisi-klien yang dibangun dengan Vite dan Tailwind CSS — tidak memerlukan server atau backend.

> Catatan: UI dalam proyek ini dilokalkan dalam Bahasa Indonesia; aplikasi itu sendiri tidak bergantung pada framework atau backend.

---

## Daftar Isi

- Fitur
- Demo (lokal)
- Instalasi
- Penggunaan
- Struktur Proyek
- Cara Kerja
- Kustomisasi
- Tips Pengembangan
- Kontribusi
- Lisensi
- Ucapan Terima Kasih

---

## Fitur ✅

- Generator konten berbasis template dengan kategori pra-bangun (Hook Viral, Pendidikan, Jualan Halus, Penceritaan, dll.)
- Pemilihan nada (Funny, Formal, Casual, Inspirational) untuk menyesuaikan konten yang dihasilkan
- Menghasilkan beberapa output per permintaan dan mendukung penyalinan ke clipboard
- Ringan: JS sisi-klien + data JSON statis (`data.json`) — tidak ada API atau server
- Dibangun dengan Vite, Tailwind CSS, dan tooling frontend modern untuk pengembangan cepat

---

## Demo (lokal) 💡

Jalankan server dev dan buka <http://localhost:5173/> (port Vite default), lalu coba masukkan kata kunci di generator dan pilih nada.

---

## Instalasi 🔧

Prasyarat:

- Node.js (direkomendasikan: 18+)
- Atau, Bun didukung jika Anda lebih suka

Instal dan mulai proyek menggunakan package manager pilihan Anda:

Menggunakan npm:

```bash
git clone https://github.com/Jars44/KreatifKit.git
cd KreatifKit1
npm install
npm run dev
```

Menggunakan Yarn:

```bash
yarn
yarn dev
```

Menggunakan Bun:

```bash
bun install
bun run dev
```

Bangun untuk produksi:

```bash
npm run build
```

Pratinjau bangunan produksi:

```bash
npm run preview
```

---

## Penggunaan ✨

1. Ketik kata kunci ke dalam kolom input.
2. Pilih nada dari tombol nada (atau pilih "Semua Nada").
3. Klik `Hasilkan` untuk menghasilkan ide konten.
4. Klik `Salin` pada kartu apa pun untuk menyalin konten ke clipboard.

Generator menggunakan template dari `data.json` dan mengganti placeholder `{keyword}` dengan input Anda.

---

## Struktur Proyek 📁

- `index.html` — HTML aplikasi, layout, dan markup elemen utama
- `src/style.css` — Tailwind + gaya kustom
- `script.js` — logika UI utama dan kode generator (memuat `data.json`, menerapkan filter, dan merender kartu)
- `main.js` — placeholder (saat ini kosong)
- `data.json` — database template (array objek dengan `category`, `tone`, dan `template`)
- `package.json` — dependensi proyek dan skrip (Vite, Tailwind)
- `tailwind.config.js`, `postcss.config.js` — konfigurasi Tailwind

---

## Cara Kerja ⚙️

1. Saat dimuat, `script.js` mengambil `data.json` dan menyimpan template di memori.
2. Saat Anda klik `Hasilkan`, aplikasi memfilter template berdasarkan nada yang dipilih (atau menggunakan semua) dan memilih sekumpulan template secara acak.
3. Token `{keyword}` dari setiap template diganti dengan input pengguna untuk menghasilkan output teks akhir.
4. Output ditampilkan sebagai kartu (kategori + konten) dengan tombol `Salin` untuk menyalin konten.

Catatan: Meskipun UI menyebutkan "AI-Powered" di teks hero, repo ini saat ini menggunakan template sisi-klien dan tidak terhubung ke model atau API jaringan untuk generasi.

---

## Kustomisasi ✨

- Tambah / edit template: buka `data.json` dan tambahkan objek baru dengan `id`, `category`, `tone`, dan `template`. Gunakan `{keyword}` sebagai placeholder untuk input pengguna.
- Tambah nada baru: update array `tones` di `script.js` untuk menambah tombol nada baru. Ingat untuk menambah template yang cocok dengan nada itu di `data.json`.
- Edit salinan UI dan layout: update `index.html`.
- Update gaya: edit `src/style.css` atau konfigurasi Tailwind.

Contoh objek template (dari `data.json`):

```json
{
  "id": 101,
  "category": "Hook Viral",
  "tone": "casual",
  "template": "Lo tau ga kalau {keyword} bisa bikin hidup lo lebih keren? Ini lagi booming nih!"
}
```

---

## Tips Pengembangan 🧪

- Hot reload: Server dev Vite menyediakan live reload. Secara default berjalan di port 5173.
- ESLint / Prettier: Tidak disertakan; pertimbangkan menambahkannya untuk konsistensi.
- Testing: Tidak ada framework test yang dikonfigurasi — jika Anda ingin test otomatis, pertimbangkan menambah Jest atau Playwright untuk test UI end-to-end.
- Aksesibilitas: Gunakan HTML semantik di mana memungkinkan dan periksa navigasi keyboard dan atribut ARIA untuk teknologi bantu.

---

## Kontribusi 🤝

Kontribusi diterima! Silakan:

1. Buka issue untuk mengusulkan perubahan atau fitur besar.
2. Fork repositori, tambahkan perubahan Anda di branch baru, lalu buat PR dengan deskripsi jelas.
3. Jaga perubahan kecil dan fokus; sertakan screenshot jika Anda mengubah UI.

---

## Lisensi 📄

Repositori ini tidak menyertakan file lisensi. Jika Anda ingin membagikan proyek ini secara publik, tambahkan file `LICENSE` (misalnya, MIT) atau pilih lisensi yang sesuai dengan tujuan Anda.

---

## Ucapan Terima Kasih

- Dibangun dengan Vite + Tailwind CSS
- Ikon dibuat dengan Font Awesome CDN
- Inspirasi template berdasarkan generator konten dunia nyata

---

Jika Anda mau, saya juga bisa:

- Tambahkan CONTRIBUTING.md kecil yang menguraikan alur kerja PR dan issue
- Tambahkan file LICENSE (MIT) atau lisensi lain pilihan Anda
- Tambahkan workflow GitHub Action cepat untuk test atau build saat push

Silakan beri tahu saya mana dari itu yang Anda inginkan selanjutnya.
