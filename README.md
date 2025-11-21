# KreatifKit

KreatifKit adalah generator ide konten front-end ringan yang menggunakan prompt berbasis template untuk membuat ide konten dan hook yang dapat dibagikan. Ini adalah aplikasi statis, client-side yang dibangun dengan Vite dan Tailwind CSS — tidak memerlukan server atau backend.

> Catatan: UI dalam proyek ini dilokalkan dalam Bahasa Indonesia; aplikasi itu sendiri tidak bergantung pada framework atau backend.

---

## Daftar Isi

- [KreatifKit](#kreatifkit)
  - [Daftar Isi](#daftar-isi)
  - [Fitur ✅](#fitur-)
  - [Demo (lokal) 💡](#demo-lokal-)
  - [Instalasi 🔧](#instalasi-)
  - [Penggunaan ✨](#penggunaan-)
  - [Struktur Proyek 📁](#struktur-proyek-)
  - [Cara Kerja ⚙️](#cara-kerja-️)
  - [Kustomisasi ✨](#kustomisasi-)
  - [Kontribusi 🤝](#kontribusi-)
  - [Lisensi 📄](#lisensi-)

---

## Fitur ✅

- Generator konten berbasis template dengan kategori pra-bangun (Hook Viral, Pendidikan, Jualan Halus, Penceritaan, dll.)
- Pemilihan nada (Funny, Formal, Casual, Inspirational) untuk menyesuaikan konten yang dihasilkan
- Menghasilkan beberapa output per permintaan dan memungkinkan Anda menyalin ke clipboard
- Ringan: client-side JS + data JSON statis (`data.json`) — tidak ada API atau server
- Dibangun dengan Vite, Tailwind CSS, dan tools frontend modern untuk development cepat

---

## Demo (lokal) 💡

Jalankan dev server dan buka <http://localhost:5173/> (port default Vite), lalu coba ketik kata kunci di generator dan pilih nada.

---

## Instalasi 🔧

Prasyarat:

- Node.js (direkomendasikan: 18+)
- Atau, Bun jika Anda lebih suka

Instal dan mulai proyek dengan package manager favorit Anda:

Menggunakan npm:

```bash
git clone https://github.com/Jars44/KreatifKit.git
cd KreatifKit
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

Bangun untuk production:

```bash
npm run build
```

Pratinjau build production:

```bash
npm run preview
```

---

## Penggunaan ✨

1. Ketik kata kunci ke dalam kolom input.
2. Pilih nada dari tombol nada (atau gunakan "Semua Nada").
3. Klik `Hasilkan` untuk menghasilkan ide konten.
4. Klik `Salin` pada kartu mana pun untuk menyalin konten ke clipboard Anda.

Generator mengambil template dari `public/data.json` dan menukar placeholder `{keyword}` Anda.

---

## Struktur Proyek 📁

- `index.html` — HTML aplikasi, layout, dan markup elemen utama
- `src/style.css` — Tailwind + gaya kustom
- `src/script.js` — logika UI utama dan kode generator (memuat `data.json`, menerapkan filter, dan merender kartu)
- `src/main.js` — placeholder (saat ini kosong)
- `public/data.json` — database template (array objek dengan `category`, `tone`, dan `template`)
- `package.json` — dependensi proyek dan skrip (Vite, Tailwind)
- `tailwind.config.js`, `postcss.config.js` — konfigurasi Tailwind

---

## Cara Kerja ⚙️

1. Saat dimuat, `script.js` mengambil `data.json` dan menyimpan template di memori.
2. Saat Anda klik `Hasilkan`, aplikasi memfilter template berdasarkan nada yang dipilih (atau menggunakan semua) dan memilih set acak.
3. Token `{keyword}` dari setiap template diganti dengan input Anda untuk membuat teks akhir.
4. Output muncul sebagai kartu (kategori + konten) dengan tombol `Salin` untuk menyalin.
5. Aplikasi sekarang hanya menggunakan template client-side (`public/data.json`) untuk menghasilkan ide; integrasi AI sudah dihapus.

Catatan: Aplikasi ini menggunakan template client-side (`public/data.json`) untuk menghasilkan ide konten kreatif tanpa koneksi ke model atau API eksternal.

---

## Kustomisasi ✨

- Tambah/edit template: Buka `public/data.json` dan tambahkan objek baru dengan `id`, `category`, `tone`, dan `template`. Gunakan `{keyword}` sebagai placeholder untuk input pengguna.
- Tambah nada baru: Update array `tones` di `src/script.js` untuk menambah tombol nada baru. Jangan lupa tambahkan template yang cocok dengan nada itu di `public/data.json`.
  \- Integrasi AI telah dihapus — gunakan hanya `public/data.json` untuk template.
- Edit teks UI dan layout: Update `index.html`.
- Update gaya: Edit `src/style.css` atau konfigurasi Tailwind.

Contoh objek template (dari `public/data.json`):

```json
{
  "id": 101,
  "category": "Hook Viral",
  "tone": "casual",
  "template": "Lo tau ga kalau {keyword} bisa bikin hidup lo lebih keren? Ini lagi booming nih!"
}
```

---

## Kontribusi 🤝

Kontribusi diterima! Berikut caranya:

1. Buka issue untuk menyarankan perubahan besar atau fitur baru.
2. Fork repo, buat perubahan Anda di branch baru, lalu kirim PR dengan deskripsi jelas.
3. Jaga perubahan kecil dan fokus; sertakan screenshot jika Anda tweak UI.

---

## Lisensi 📄

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.
