# NIHONESIA — Belajar Bahasa Jepang untuk Orang Indonesia

**NIHONESIA** adalah aplikasi web untuk belajar bahasa Jepang dari nol sampai tingkat lanjut, dengan penjelasan dalam **bahasa Indonesia**. Semua materi ada dalam **satu file `index.html`**. Tidak perlu install, tidak perlu server, dan tetap bisa dipakai tanpa internet setelah dibuka.

Aplikasi ini dibuat terutama untuk pekerja dan pelajar Indonesia di Jepang. Selain materi umum JLPT N5–N1, ada juga kosakata dan percakapan untuk **dunia kerja pabrik** dan **inspeksi kualitas**.

---

## Fitur utama

| Menu | Isi | Kuis |
|---|---|---|
| **あ Hiragana** | Tabel dasar (46), dakuon ゛ (20), handakuon ゜ (5), dan yōon (33). Ketuk huruf untuk mendengar suaranya. | Huruf → romaji, romaji → huruf, ✍️ menulis |
| **ア Katakana** | Sama seperti Hiragana, untuk kata serapan. | Huruf → romaji, romaji → huruf, ✍️ menulis |
| **漢 Kanji** | **554 kanji** dalam 21 kategori, level N5–N2. Setiap kanji punya animasi **urutan goresan**, kun'yomi dan on'yomi (kana + romaji), kotak latihan menulis, dan contoh kata. | Kanji → arti, arti → kanji, bacaan, ✍️ menulis |
| **語 Kotoba** | **5.083 kosakata** (N5, N4, N3, N2, dan kosakata kerja pabrik) dengan jenis kata. Bisa dicari dan difilter per level dan jenis. | Jepang → arti, arti → Jepang, campuran, ✍️ menulis |
| **活 Katsuyō** | **500 kata kerja** dengan **15 bentuk perubahan** (ます, ません, ました, ない, た, なかった, て, たい, potensial, ajakan, ば, perintah, pasif, kausatif), masing-masing lengkap dengan kanji, kana, romaji, dan **arti**. Ada juga penjelasan Katsuyō vs Bunpō dan aturan per kelompok (Godan, Ichidan, tidak beraturan). | Ubah bentuk, arti bentuk, kelompok kata kerja |
| **法 Bunpo** | **273 pola tata bahasa N5–N1**, masing-masing dengan **contoh kalimat** (kanji, romaji, arti). Ada juga perbandingan pola yang mirip dan panduan urutan belajar. | Pola → arti, arti → pola, **isi kalimat** (isi bagian yang kosong ala Duolingo), isi partikel |
| **文 Bun** | **274 kalimat sehari-hari** dalam 15 kategori: salam, perkenalan, tempat kerja, belanja, makan, transportasi, kesehatan, telepon, darurat, dan lain-lain. | Jepang → arti, **arti → Jepang**, 🧩 susun kalimat |
| **話 Kaiwa** | **43 dialog** dalam 10 kategori: perkenalan, telepon, pekerjaan, sekolah, liburan, makan, belanja, tempat umum, sehari-hari, dan darurat. | Arti kalimat, kalimat berikutnya |
| **🧩 Teka-teki** | **Susun ala Duolingo**: susun ubin menjadi jawaban untuk Hiragana, Katakana, Kotoba (cara baca kanji), Katsuyō, Bunpo, Kaiwa, dan Bun. Ada juga tebak teka-teki Jepang. | Semua mode susun |

### Fitur di semua menu

- **Romaji ON/OFF.** Satu tombol di setiap halaman untuk menampilkan atau menyembunyikan romaji. Matikan untuk latihan membaca kana tanpa bantuan.
- **Suara.** Ketuk 🔊 untuk mendengar pengucapan Jepang (memakai suara bawaan perangkat).
- **Jumlah soal bisa diatur:** 10, 15, 20, sampai 50 soal per kuis.
- **Kuis menulis ✍️**, dengan dua mode:
  - **Bebas:** tulis seluruh jawaban di kanvas, lihat jawaban dan diagram urutan goresan, lalu nilai sendiri ✗/✓. Ada tombol *Jiplak* dan *Panduan goresan*.
  - **Cek otomatis:** setiap goresan dicek posisi, arah, dan urutannya.
- **Skor & Progres.** Menyimpan hari belajar berturut-turut, jumlah soal, persentase benar, rekor tiap kuis, dan daftar **soal yang salah untuk diulang**. Data tersimpan di browser perangkat masing-masing.
- **Tampilan nyaman di HP.** Header dan tombol kuis menempel saat di-scroll, dan ada mode gelap otomatis.

---

## Cara memakai

1. Buka `index.html` di browser (Chrome, Safari, Edge, atau Firefox).
2. Pilih menu, pelajari materinya, lalu tekan tombol kuis di bawah layar.

### Publikasi (Cloudflare Pages, GitHub Pages, dll.)

Cukup upload **`index.html`** saja. Semua data (kosakata, kanji, urutan goresan, dialog) sudah ada di dalam file itu.

---

## Untuk pengembang: menambah atau mengubah materi

Materi disimpan sebagai file teks di folder `src/`, lalu digabung menjadi `index.html` oleh `build.js` (butuh [Node.js](https://nodejs.org) 18 atau lebih baru):

```bash
node build.js
```

| File | Isi | Format satu baris |
|---|---|---|
| `src/vocab/*.txt` | Kosakata (Kotoba). `@N5` = level, `#Kata benda` = jenis kata. | `漢字\|かな\|arti` atau `かな\|arti` |
| `src/kanji.txt` | Kanji. `@Kategori` = kategori. | `漢\|kun.yomi\|ON,YOMI\|arti\|N5` |
| `src/bunpo.txt` | Pola tata bahasa. `@N5\|judul\|fokus`, `#Bagian`. Bagian pola dalam contoh ditandai `{…}`. | `pola\|romaji\|arti\|contoh {pola}。\|romaji\|arti` |
| `src/bun.txt` | Kalimat sehari-hari. `@Kategori`. | `日本語。\|romaji\|arti` |
| `src/kaiwa.txt` | Dialog. `@Kategori`, `#Judul dialog`. | `Pembicara\|日本語。\|romaji\|arti` |
| `src/template.html` | Tampilan dan logika aplikasi. | — |

Catatan:
- Romaji untuk kosakata dibuat otomatis dari kana. Romaji untuk kalimat (Bunpo, Bun, Kaiwa) ditulis manual supaya partikel benar: は = *wa*, を = *o*, へ = *e*.
- Perubahan kata kerja di Katsuyō dihitung otomatis dari kosakata, jadi kata kerja baru di `src/vocab/` ikut masuk.
- `build.js` memeriksa format, duplikat, dan romaji, lalu melaporkan baris yang bermasalah.
- Data urutan goresan diunduh sekali dari KanjiVG lalu disimpan di `src/kanjivg/`, jadi build berikutnya tidak perlu internet.

---

## Struktur folder

```
index.html          ← aplikasi jadi (file yang di-upload)
build.js            ← penggabung materi → index.html
src/
  template.html     ← tampilan & logika
  vocab/*.txt       ← kosakata N5–N2 + kerja pabrik
  kanji.txt         ← daftar kanji per kategori
  bunpo.txt         ← pola tata bahasa N5–N1 + contoh
  bun.txt           ← kalimat sehari-hari
  kaiwa.txt         ← dialog percakapan
  kanjivg/          ← cache data urutan goresan (KanjiVG)
```

---

## Catatan & kredit

- **Level JLPT hanya perkiraan.** JLPT tidak menerbitkan daftar resmi kosakata, kanji, maupun tata bahasa per level. Pengelompokan di sini mengikuti yang umum dipakai buku persiapan JLPT.
- Arti, contoh kalimat, dan dialog disusun untuk pembelajar Indonesia. Kalau menemukan kesalahan, silakan perbaiki file di `src/` lalu jalankan `node build.js`.
- **Data urutan goresan** kanji dan kana berasal dari [KanjiVG](https://kanjivg.tagaini.net) oleh Ulrich Apel, dengan lisensi [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- Pemotongan kalimat untuk mode susun memakai `Intl.Segmenter` bawaan browser.

がんばってください！ *Ganbatte kudasai!* — Semangat belajar!
