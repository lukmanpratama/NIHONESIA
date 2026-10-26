# Nehonesia — Belajar Bahasa Jepang untuk Orang Indonesia

<img src="assets/icon-192.png" alt="Logo Nehonesia" width="96">

**Nehonesia** adalah aplikasi web untuk belajar bahasa Jepang dari nol sampai tingkat lanjut, dengan penjelasan dalam **bahasa Indonesia**. Semua materi ada dalam **satu file `index.html`**. Tidak perlu install, tidak perlu server, dan tetap bisa dipakai tanpa internet setelah dibuka.

Aplikasi ini dibuat terutama untuk pekerja dan pelajar Indonesia di Jepang. Selain materi umum JLPT N5–N1, ada juga kosakata dan percakapan untuk **dunia kerja pabrik** dan **inspeksi kualitas**.

---

## Navigasi

Aplikasi punya **navigasi bawah** dengan lima tab:

| Tab | Isi |
|---|---|
| 🏠 **Beranda** | **Jalur belajar ala Duolingo** dari materi paling mudah sampai sulit, per level **N5 → N4 → N3 → N2 → N1** (plus Kerja pabrik). Total **849 pelajaran**: N5 142, N4 152, N3 268, N2 262, N1 12, Kerja 13. Setiap unit berisi 6 pelajaran (kosakata 語, kanji 漢, bunpo 法, kalimat 文), 🎁 peti hadiah (+20 XP), dan 🏆 ulangan unit. Pelajaran terbuka berurutan; lulus jika benar minimal 60% (★ 60%, ★★ 80%, ★★★ 100%). Ada balon **MULAI**, animasi tombol 3D, maskot, dan 📖 panduan unit berisi semua materi unit beserta suaranya. |
| 📚 **Materi** | **日本語学習 (Nihongo Gakushū)**: kartu menu **Kotoba** dan **Bunpō** (masing-masing membuka 8 kartu sub materi), ditambah kartu Hiragana, Katakana, Bilangan, Bun, Kaiwa, dan Teka-teki (lihat di bawah). |
| ⚔️ **Quiz** | Kuis cepat per level: Kosakata, Kanji, Bunpo, Kalimat, atau Campuran, dengan pilihan jumlah soal dan tingkat. |
| 🔁 **Review** | Ulangi soal yang pernah salah, dan ulas materi dari pelajaran Beranda yang sudah selesai. |
| 📈 **Progres** | Streak, XP, akurasi, kemajuan jalur per level, riwayat kuis, pengaturan suara, dan hapus progres. |

## Struktur materi: 日本語学習

| A. Kotoba 言葉 — belajar kosakata | B. Bunpō 文法 — belajar tata bahasa |
|---|---|
| 1. Kosakata berdasarkan tema (24 tema, ditentukan otomatis dari kanji pada kata) | 1. Struktur kalimat (urutan S–O–P, kata penjelas, kalimat majemuk) |
| 2. Kosakata berdasarkan jenis kata (15 jenis) | 2. Partikel (22 fungsi partikel + kuis isi partikel) |
| 3. Kanji dan kosakata kanji (554 kanji, cara menulis, family tree) | 3. Katsuyō / perubahan kata (500 kata kerja, 15 bentuk) |
| 4. Onomatope (53: perasaan, keadaan, suara, kerja) | 4. Pola kalimat dasar (18 pola) |
| 5. Idiom dan peribahasa (20 慣用句 + 20 ことわざ) | 5. Bentuk waktu dan aspek (17 pola: ている, てしまう, たところ, …) |
| 6. Sinonim dan antonim (20 + 35 pasangan) | 6. Kalimat tanya, perintah, ajakan (15 pola) |
| 7. Kosakata formal dan slang (27 pasangan keigo + 20 bahasa gaul) | 7. Sebab-akibat dan pengandaian (15 pola: から, ので, たら, ば, と, なら, …) |
| 8. Kosakata JLPT N5–N1 (5.083 kata per level) | 8. Bunpō JLPT N5–N1 (273 pola per level) |

Setiap submodul punya kuisnya sendiri. Submodul Bunpō 1, 2, dan 4–7 berisi penjelasan dan contoh kalimat untuk setiap pola, dengan mode kuis *Pola → arti*, *Arti → pola*, *Arti contoh kalimat*, *Susun kalimat*, dan *Mendengar*.

**Dasar & Latihan:** Hiragana, Katakana, Bilangan, Bun (ungkapan sehari-hari), Kaiwa (percakapan), dan Teka-teki.

## Fitur utama per menu

| Menu | Isi | Kuis |
|---|---|---|
| **あ Hiragana** | Tabel dasar (46), dakuon ゛ (20), handakuon ゜ (5), dan yōon (33). Ketuk huruf untuk melihat **cara menulis** (animasi urutan goresan), mendengar suaranya, latihan menulis, dan contoh kata. | Huruf → romaji, romaji → huruf, ✍️ menulis |
| **ア Katakana** | Sama seperti Hiragana (termasuk cara menulis), untuk kata serapan. | Huruf → romaji, romaji → huruf, ✍️ menulis |
| **漢 Kanji** | **🌳 Kanji Family Tree**: pohon hubungan antar kanji (komponen penyusun → kanji → kanji turunan → generasi berikutnya); ketuk lingkaran untuk menjelajah. **554 kanji** dalam 21 kategori, level N5–N2. Bisa **dicari** dengan huruf kanji, arti, bacaan (kana atau romaji), komponen (mis. 氵), atau jumlah goresan. Setiap kanji punya tiga animasi: **✍️ Goresan** (urutan goresan dengan tombol putar/jeda, maju/mundur per goresan, kecepatan 0.5×–2×, nomor goresan, warna per komponen), **🧩 Komponen** (komponen datang dari arah posisinya lalu menyatu seperti LEGO, mis. 氵 + 青 = 清; bisa lebih dari 2 komponen dengan pilihan **Utama/Rinci**, mis. 働 = 亻 + 重 + 力, 漢 = 氵 + 艹 + 口 + 夫, lengkap dengan bushu, petunjuk makna, dan petunjuk bunyi), **🌳 Family Tree**, dan **🖼️ Ilustrasi** (gambar berubah menjadi kanji, untuk 13 kanji piktogram seperti 木 山 川 日 月). Ada juga kun'yomi dan on'yomi (kana + romaji), bushu, jenis kanji (keisei, piktogram, gabungan), **keluarga kanji** (kanji lain dengan komponen atau bunyi yang sama), kotak latihan menulis, dan contoh kata. | Kanji → arti, arti → kanji, bacaan, ✍️ menulis |
| **語 Kotoba** | **5.083 kosakata** (N5, N4, N3, N2, dan kosakata kerja pabrik) dengan jenis kata. Bisa dicari dan difilter per level dan jenis. | Jepang → arti, arti → Jepang, campuran, ✍️ menulis |
| **活 Katsuyō** | **500 kata kerja** dengan **15 bentuk perubahan** (ます, ません, ました, ない, た, なかった, て, たい, potensial, ajakan, ば, perintah, pasif, kausatif), masing-masing lengkap dengan kanji, kana, romaji, dan **arti**. Ada juga penjelasan Katsuyō vs Bunpō dan aturan per kelompok (Godan, Ichidan, tidak beraturan). | Ubah bentuk, arti bentuk, kelompok kata kerja |
| **法 Bunpo** | **273 pola tata bahasa N5–N1**, masing-masing dengan **contoh kalimat** (kanji, romaji, arti). Ada juga perbandingan pola yang mirip dan panduan urutan belajar. | Pola → arti, arti → pola, **isi kalimat** (isi bagian yang kosong ala Duolingo), isi partikel |
| **文 Bun** | **274 kalimat sehari-hari** dalam 15 kategori: salam, perkenalan, tempat kerja, belanja, makan, transportasi, kesehatan, telepon, darurat, dan lain-lain. | Jepang → arti, **arti → Jepang**, 🧩 susun kalimat (ada romaji di setiap ubin) |
| **話 Kaiwa** | **500 dialog** (1.801 kalimat) dalam 16 kategori: perkenalan, hubungan & perasaan, telepon, pekerjaan, sekolah, wawancara & administrasi, liburan & wisata, transportasi, makan & minum, belanja, tempat umum, kesehatan, sehari-hari, cuaca & musim, hobi, dan darurat. | Arti kalimat, arti → Jepang, kalimat berikutnya (arti soal & jawaban ditampilkan), lengkapi kalimat, 🎧 dengarkan, 🧩 susun |
| **数 Bilangan** | Angka Jepang dari 0 sampai jutaan: dasar 0–10, **belasan**, **puluhan**, **ratusan**, **ribuan**, puluhan & ratusan ribu (satuan 万), dan **jutaan** (百万, 千万, 億). Bunyi khusus (さんびゃく, ろっぴゃく, はっぴゃく, さんぜん, はっせん) ditandai. Ada **pengubah angka**: ketik angka apa saja untuk melihat kanji, kana, romaji, dan uraiannya. | Jepang → angka, angka → Jepang, susun bacaan, ketik angka, ketik bacaan, bicara, mendengar, ✍️ menulis kanji angka |
| **🧩 Teka-teki** | **Susun ala Duolingo**: susun ubin menjadi jawaban untuk Hiragana, Katakana, Kotoba (cara baca kanji), Katsuyō, Bunpo, Kaiwa, dan Bun. | Semua mode susun |

### Fitur di semua menu

- **Satu tombol ▶ Mulai Kuis** yang mengambang di bawah setiap menu. Tombol ⚙️ di sebelahnya membuka **pengaturan kuis**: mode kuis, tingkat, dan jumlah soal.
- **Mode kuis** (boleh pilih lebih dari satu; jika lebih dari satu, soalnya campuran seperti di Duolingo): **Jepang → Arti**, **Arti → Jepang**, **Susun kata**, **Ketik arti**, **Ketik Jepang** (kana, kanji, atau romaji diterima), **🎤 Bicara** (pengenalan suara, butuh Chrome/Edge dan izin mikrofon), dan **🎧 Mendengar**. Beberapa menu punya mode tambahan, misalnya Menulis, Bacaan, Ubah bentuk, Kelompok, Isi kalimat, Isi partikel, Kalimat berikutnya, dan Lengkapi kalimat.
- Jawaban ketik toleran terhadap salah ketik kecil (ditandai "Hampir benar"), kecuali di kuis Bilangan yang harus persis.
- **Romaji di ubin susun kalimat** (Bun, Bunpo, Kaiwa, Teka-teki). Romaji tiap ubin diambil dari romaji asli kalimat, jadi partikel tetap benar (wa, o, e). Romaji ubin ikut tombol Romaji ON/OFF dan disembunyikan di tingkat Sulit.

- **Romaji ON/OFF.** Satu tombol di setiap halaman untuk menampilkan atau menyembunyikan romaji. Matikan untuk latihan membaca kana tanpa bantuan.
- **Suara.** Ketuk 🔊 untuk mendengar pengucapan Jepang (memakai suara bawaan perangkat).
- **Kuis ala Duolingo:** progress bar, pilih jawaban lalu **Periksa**, panel hasil hijau/merah yang naik dari bawah beserta arti dan romaji, tombol **Lewati** kalau tidak tahu jawabannya, streak 🔥, suara efek, dan layar selesai dengan XP, akurasi, waktu, serta confetti.
- **Tingkat kesulitan:** **Mudah** (3 pilihan, sedikit ubin pengecoh, panduan jiplak aktif), **Sedang** (4 pilihan), dan **Sulit** (6 pilihan, romaji soal disembunyikan, ada batas waktu per soal).
- **Jumlah soal bisa diatur:** 10, 15, 20, sampai 50 soal per kuis.
- **Kuis menulis ✍️**, dengan dua mode:
  - **Bebas:** tulis seluruh jawaban di kanvas, lihat jawaban dan diagram urutan goresan, lalu nilai sendiri ✗/✓. Ada tombol *Jiplak* dan *Panduan goresan*.
  - **Cek otomatis:** setiap goresan dicek posisi, arah, dan urutannya.
- **Skor & Progres.** Menyimpan total XP, hari belajar berturut-turut, jumlah soal, persentase benar, rekor tiap kuis, dan daftar **soal yang salah untuk diulang**. Data tersimpan di browser perangkat masing-masing.
- **Tampilan nyaman di HP.** Header dan tombol kuis menempel saat di-scroll, dan ada mode gelap otomatis.

---

## Cara memakai

1. Buka `index.html` di browser (Chrome, Safari, Edge, atau Firefox).
2. Pilih menu, pelajari materinya, lalu tekan tombol kuis di bawah layar.

### Publikasi (Cloudflare Pages, GitHub Pages, dll.)

Upload **`index.html`**. Semua data (kosakata, kanji, urutan goresan, dialog) dan ikon sudah ada di dalam file itu. Supaya aplikasi bisa **dipasang ke layar utama HP** dengan ikon Nehonesia, upload juga `manifest.webmanifest` dan folder `assets/`.

---

## Untuk pengembang: menambah atau mengubah materi

Materi disimpan sebagai file teks di folder `src/`, lalu digabung menjadi `index.html` oleh `build.js` (butuh [Node.js](https://nodejs.org) 18 atau lebih baru):

```bash
node build.js
```

| File | Isi | Format satu baris |
|---|---|---|
| `src/vocab/*.txt` | Kosakata (Kotoba). `@N5` = level, `#Kata benda` = jenis kata. | `漢字\|かな\|arti` atau `かな\|arti` |
| `src/kanji.txt` | Kanji. `@Kategori` = kategori. Urutan goresan dan komponen diambil otomatis dari KanjiVG. | `漢\|kun.yomi\|ON,YOMI\|arti\|N5` |
| `src/bunpo.txt` | Pola tata bahasa. `@N5\|judul\|fokus`, `#Bagian`. Bagian pola dalam contoh ditandai `{…}`. | `pola\|romaji\|arti\|contoh {pola}。\|romaji\|arti` |
| `src/bun.txt` | Kalimat sehari-hari. `@Kategori`. | `日本語。\|romaji\|arti` |
| `src/kotoba-plus.txt` | Submodul Kotoba 4–7. `@id\|judul\|keterangan`, `#Kategori` (akhiri dengan ⇔ untuk pasangan kata). | entri `jepang\|kana\|romaji\|arti` (boleh ditambah contoh), pasangan `jp1\|kana1\|arti1\|jp2\|kana2\|arti2` |
| `src/bunpo-topik.txt` | Submodul Bunpō 1, 2, 4–7. `@id\|judul\|ringkasan`, baris `- penjelasan`. | `pola\|romaji\|arti\|contoh\|romaji contoh\|arti contoh` |
| `src/kaiwa/*.txt` | Dialog, dibagi per file. `@Kategori`, `#Judul dialog`. | `Pembicara\|日本語。\|romaji\|arti` |
| `src/template.html` | Tampilan dan logika aplikasi. | — |

Catatan:
- Romaji untuk kosakata dibuat otomatis dari kana. Romaji untuk kalimat (Bunpo, Bun, Kaiwa) ditulis manual supaya partikel benar: は = *wa*, を = *o*, へ = *e*.
- Perubahan kata kerja di Katsuyō dihitung otomatis dari kosakata, jadi kata kerja baru di `src/vocab/` ikut masuk.
- `build.js` memeriksa format, duplikat, dan romaji, lalu melaporkan baris yang bermasalah.
- Data urutan goresan diunduh sekali dari KanjiVG lalu disimpan di `src/kanjivg/`, jadi build berikutnya tidak perlu internet.

### Menambah kanji (tanpa mengubah mesin animasi)

1. Tambahkan satu baris di `src/kanji.txt`, lalu jalankan `node build.js`.
2. Urutan goresan, posisi nomor goresan, dan **komponen** (bushu, petunjuk bunyi, posisi kiri/kanan/atas/bawah) diambil otomatis dari KanjiVG. Animasi Goresan, Komponen (LEGO), dan Keluarga kanji langsung tersedia.
3. `build.js` memeriksa bahwa komponen mencakup setiap goresan tepat satu kali. Jika tidak, kanji itu dilaporkan.
4. Opsional, di `src/template.html`:
   - `RADN`: nama dan arti radikal yang belum ada, mis. `'氵':['さんずい','air']`.
   - `PICT`: ilustrasi untuk kanji piktogram, berisi penjelasan dan isi gambar SVG dalam kotak 109×109. Tab 🖼️ Ilustrasi muncul otomatis untuk kanji yang punya entri.

Bentuk goresan tidak pernah dibuat sendiri. Kanji yang tidak ada di KanjiVG ditampilkan dengan pesan "Data urutan goresan tidak tersedia".

---

## Struktur folder

```
index.html          ← aplikasi jadi (file yang di-upload)
manifest.webmanifest← nama & ikon saat dipasang di HP
assets/             ← logo & ikon aplikasi (192, 512, 180, favicon)
build.js            ← penggabung materi → index.html
src/
  template.html     ← tampilan & logika
  vocab/*.txt       ← kosakata N5–N2 + kerja pabrik
  kanji.txt         ← daftar kanji per kategori
  bunpo.txt         ← pola tata bahasa N5–N1 + contoh
  bun.txt           ← kalimat sehari-hari
  kotoba-plus.txt   ← onomatope, idiom & peribahasa, sinonim & antonim, formal & slang
  bunpo-topik.txt   ← topik bunpō: struktur, partikel, pola dasar, waktu, tanya, sebab-akibat
  kaiwa/*.txt       ← 500 dialog percakapan per kategori
  kanjivg/          ← cache data urutan goresan (KanjiVG)
```

---

## Catatan & kredit

- **Level JLPT hanya perkiraan.** JLPT tidak menerbitkan daftar resmi kosakata, kanji, maupun tata bahasa per level. Pengelompokan di sini mengikuti yang umum dipakai buku persiapan JLPT.
- Arti, contoh kalimat, dan dialog disusun untuk pembelajar Indonesia. Kalau menemukan kesalahan, silakan perbaiki file di `src/` lalu jalankan `node build.js`.
- **Data urutan goresan dan komponen** kanji dan kana berasal dari [KanjiVG](https://kanjivg.tagaini.net) oleh Ulrich Apel, dengan lisensi [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- Pemotongan kalimat untuk mode susun memakai `Intl.Segmenter` bawaan browser.

がんばってください！ *Ganbatte kudasai!* — Semangat belajar!
