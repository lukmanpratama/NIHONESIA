# Nehonesia — Belajar Bahasa Jepang untuk Orang Indonesia

<img src="assets/icon-192.png" alt="Logo Nehonesia" width="96">

**Nehonesia** adalah aplikasi web untuk belajar bahasa Jepang dari nol sampai tingkat lanjut, dengan penjelasan dalam **bahasa Indonesia**. Semua materi ada dalam **satu file `index.html`**. Tidak perlu install, tidak perlu server, dan tetap bisa dipakai tanpa internet setelah dibuka.

Aplikasi ini dibuat terutama untuk pekerja dan pelajar Indonesia di Jepang. Selain materi umum JLPT N5–N1, ada juga kosakata dan percakapan untuk **dunia kerja pabrik** dan **inspeksi kualitas**.

---

## Navigasi

Aplikasi punya **navigasi bawah** dengan lima tab:

| Tab | Isi |
|---|---|
| 🏠 **Beranda** | **Jalur belajar ala Duolingo** dari materi paling mudah sampai sulit, per level **N5 → N4 → N3 → N2 → N1** (plus Kerja pabrik). Total **1.045 pelajaran**: N5 156, N4 163, N3 270, N2 296, N1 144, Kerja 16. Setiap unit berisi 6 pelajaran (kosakata 語, kanji 漢, bunpo 法, kalimat 文), 🎁 peti hadiah (+20 XP), dan 🏆 ulangan unit. Pelajaran terbuka berurutan; lulus jika benar minimal 60% (★ 60%, ★★ 80%, ★★★ 100%). Ada balon **MULAI**, animasi tombol 3D, maskot, dan 📖 panduan unit berisi semua materi unit beserta suaranya. |
| 📚 **Materi** | **日本語学習 (Nihongo Gakushū)**: kartu Hiragana & Katakana, Kanji, **Kotoba**, **Bunpō**, **Kaiwa**, Bun, dan Bilangan. Di dalam setiap kartu, submenu tampil sebagai **tab berikon** yang menempel di bawah header saat di-scroll; Kotoba, Bunpō, dan Kaiwa juga punya pilihan **level N5–N1** (lihat di bawah). |
| ⚔️ **Quiz** | Kuis cepat per level: Kosakata, Kanji, Bunpo, Kalimat, atau Campuran, dengan pilihan jumlah soal dan tingkat. |
| 🔁 **Review** | Ulangi soal yang pernah salah, dan ulas materi dari pelajaran Beranda yang sudah selesai. |
| 📈 **Progres** | Streak, XP, akurasi, kemajuan jalur per level, riwayat kuis, pengaturan suara, dan hapus progres. |

## Struktur materi: 日本語学習

Kotoba, Bunpō, dan Kaiwa disusun **per level N5–N1**. Di bawah header ada navigasi yang **tetap terlihat saat halaman di-scroll**:

1. **Tab berikon** (ikon di atas, garis aksen di bawah tab aktif). Bilah tab bisa digeser ke samping jika tabnya banyak.
2. **Pilihan level Semua · N5 · N4 · N3 · N2 · N1**. Level ini dipakai bersama oleh Kotoba, Bunpō, dan Kaiwa, jadi cukup dipilih sekali. **Semua** menampilkan materi seluruh level sekaligus, dengan label level di tiap pola atau dikelompokkan per level. Tab yang belum punya materi di level terpilih tampil pudar.
3. **Keterangan tab** (di Bunpō): satu baris penjelasan isi tab di bawah navigasi.

| Kotoba 言葉 | Bunpō 文法 | Kaiwa 会話 |
|---|---|---|
| **Kamus**: daftar kata per level atau **Semua** level, cari, filter tema dan jenis kata | **Pola JLPT**: pola tata bahasa N5–N1 dengan rumus, contoh, dan latihan. Bagian **Daftar pola** (N5 59, N4 44, N3 56, N2 55, N1 59, masing-masing 3 contoh), **Pola dasar** (41), dan **Panduan & perbandingan** pola mirip | **Unit**: 20 unit percakapan per level (100 unit), masing-masing dengan tujuan, 5 kosakata dari dialognya, pola, dialog 7–9 baris bergaya chat, dan roleplay sesuai tema |
| **Tema**: 24 tema, jumlah kata per level | **Struktur Kalimat** (37 pola): chip Susunan kata · Jenis kalimat · Frasa · Klausa | **Dialog**: 500 dialog per situasi dalam 16 kategori, disaring per level, bergaya chat |
| **Jenis kata**: 15 jenis, jumlah kata per level | **Partikel** (66 pola + kuis isi partikel): chip Penanda fungsi kata · Penghubung · Pembatas & penegas · Akhir kalimat · Partikel majemuk · **Perbandingan partikel** (は vs が, に vs で, …) | |
| **Sama bunyi**: 247 kelompok kata dengan bunyi sama, beda arti (同音異義語) | **Katsuyō**: konjugasi **kata kerja** (15 bentuk), **kata sifat-i** (15), **kata sifat-na** (15), dan **kata benda + だ/です** (13), sampai 150 kata per jenis per level | |
| **Onomatope** (53) · **Idiom** & peribahasa (40) | **Ekspresi**: chip Waktu (32) · Sebab-akibat (13) · Tujuan (13) · Kondisi (16) · Perbandingan (18) · Pertentangan (14) · Tanya & ajakan (30) | |
| **Sinonim** & antonim (55 pasangan) | | |
| **Formal** & slang (47) | | |

Bunpō terdiri dari 5 tab: Pola JLPT, Struktur Kalimat, Partikel, Katsuyō, dan Ekspresi. Setiap tab berisi materi di **setiap level N5–N1**, dan setiap pola punya **3 contoh kalimat** (topik Bunpō: 280 pola, 840 contoh). Dialog Kaiwa tampil seperti percakapan chat: pembicara pertama di kiri, lawan bicara di kanan, dan tombol **Putar seluruh dialog** membacakan percakapan dengan nada suara berbeda per pembicara sambil menandai kalimat yang sedang diucapkan.

Kosakata: N5 724, N4 648, N3 1.614, N2 1.981, **N1 536** (total 5.503; kosakata kerja pabrik 124 kata dipakai di jalur Beranda dan tidak ditampilkan di Kotoba). Level onomatope, idiom, sinonim, keigo, dan topik bunpō ditulis di file sumber. Level dialog Kaiwa diperkirakan otomatis dari pola tata bahasa dan keigo yang dipakai (sebagian besar N5–N4), dan bisa ditulis manual.

Setiap submenu punya kuisnya sendiri. Dari tab **Quiz**, kuis Kotoba, Kaiwa, dan Katsuyō memakai semua level; kuis Bunpō memakai level yang sedang dipilih (termasuk **Semua**).

**Menu lain:** Hiragana & Katakana (segmen あ/ア + 5 tab), Kanji (bilah tab Kamus · Struktur · Membaca yang juga tampil di sub halaman; level Semua/N5–N1 di tab Kamus), Bun (tab Kalimat, Teka-teki, Struktur, Pola dasar), dan Bilangan. Tab Quiz juga memakai tab berikon *Berdasarkan materi* / *Level N5–N1*.

## Fitur utama per menu

| Menu | Isi | Kuis |
|---|---|---|
| **あ Hiragana** | Tabel dasar (46), dakuon ゛ (20), handakuon ゜ (5), dan yōon (33). Ketuk huruf untuk melihat **cara menulis** (animasi urutan goresan), mendengar suaranya, latihan menulis, dan contoh kata. | Huruf → romaji, romaji → huruf, ✍️ menulis |
| **ア Katakana** | Sama seperti Hiragana (termasuk cara menulis), untuk kata serapan. | Huruf → romaji, romaji → huruf, ✍️ menulis |
| **漢 Kanji** | **🌳 Kanji Family Tree**: pohon hubungan antar kanji (komponen penyusun → kanji → kanji turunan → generasi berikutnya); ketuk lingkaran untuk menjelajah. **554 kanji** dalam 21 kategori, level N5–N2. Bisa **dicari** dengan huruf kanji, arti, bacaan (kana atau romaji), komponen (mis. 氵), atau jumlah goresan. Setiap kanji punya tiga animasi: **✍️ Goresan** (urutan goresan dengan tombol putar/jeda, maju/mundur per goresan, kecepatan 0.5×–2×, nomor goresan, warna per komponen), **🧩 Komponen** (komponen datang dari arah posisinya lalu menyatu seperti LEGO, mis. 氵 + 青 = 清; bisa lebih dari 2 komponen dengan pilihan **Utama/Rinci**, mis. 働 = 亻 + 重 + 力, 漢 = 氵 + 艹 + 口 + 夫, lengkap dengan bushu, petunjuk makna, dan petunjuk bunyi), **🌳 Family Tree**, dan **🖼️ Ilustrasi** (gambar berubah menjadi kanji, untuk 13 kanji piktogram seperti 木 山 川 日 月). Ada juga kun'yomi dan on'yomi (kana + romaji), bushu, jenis kanji (keisei, piktogram, gabungan), **keluarga kanji** (kanji lain dengan komponen atau bunyi yang sama), kotak latihan menulis, dan contoh kata. | Kanji → arti, arti → kanji, bacaan, ✍️ menulis |
| **語 Kotoba** | **5.503 kosakata** N5–N1 dengan jenis kata. Kamus bisa ditampilkan per level atau semua level, dicari, dan difilter per tema dan jenis. Ada tab **Sama bunyi** untuk kata dengan bunyi sama tetapi arti berbeda. | Jepang → arti, arti → Jepang, campuran, ✍️ menulis |
| **活 Katsuyō** | **752 kata kerja** (sampai 150 per level, N5–N1 + kerja) dengan **15 bentuk perubahan** (ます, ません, ました, ない, た, なかった, て, たい, potensial, ajakan, ば, perintah, pasif, kausatif), ditambah **249 kata sifat-i**, **298 kata sifat-na**, dan **849 kata benda** (negatif, lampau, sopan, て, なる, syarat, そう, すぎる, penjelas な/の), masing-masing lengkap dengan kanji, kana, romaji, dan **arti**. Ada juga penjelasan Katsuyō vs Bunpō dan aturan per jenis kata. | Ubah bentuk, arti bentuk, kelompok kata kerja |
| **法 Bunpo** | **273 pola tata bahasa N5–N1**, masing-masing dengan **3 contoh kalimat** (819 contoh; kanji, romaji, arti). Soal kuis berbasis kalimat memakai salah satu contoh secara acak. Ada juga perbandingan pola yang mirip dan panduan urutan belajar. | Pola → arti, arti → pola, **isi kalimat** (isi bagian yang kosong ala Duolingo), isi partikel |
| **文 Bun** | **274 kalimat sehari-hari** dalam 15 kategori: salam, perkenalan, tempat kerja, belanja, makan, transportasi, kesehatan, telepon, darurat, dan lain-lain. | Jepang → arti, **arti → Jepang**, 🧩 susun kalimat (ada romaji di setiap ubin) |
| **話 Kaiwa** | **100 unit** percakapan (20 per level N5–N1, 799 kalimat dialog) dan **500 dialog** (1.801 kalimat, level N5–N3) dalam 16 kategori: perkenalan, hubungan & perasaan, telepon, pekerjaan, sekolah, wawancara & administrasi, liburan & wisata, transportasi, makan & minum, belanja, tempat umum, kesehatan, sehari-hari, cuaca & musim, hobi, dan darurat. | Arti kalimat, arti → Jepang, kalimat berikutnya (arti soal & jawaban ditampilkan), lengkapi kalimat, 🎧 dengarkan, 🧩 susun |
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
- **Tampilan nyaman di HP.** Header dan navigasi submenu (tab berikon + level) menempel saat di-scroll, dan ada mode gelap otomatis.

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
| `src/bunpo.txt` | Pola tata bahasa. `@N5\|judul\|fokus`, `#Bagian`. Bagian pola dalam contoh ditandai `{…}`. Contoh tambahan ditulis tepat di bawah pola dengan awalan `+`. | `pola\|romaji\|arti\|contoh {pola}。\|romaji\|arti` lalu `+ contoh {pola}。\|romaji\|arti` |
| `src/bun.txt` | Kalimat sehari-hari. `@Kategori`. | `日本語。\|romaji\|arti` |
| `src/kotoba-plus.txt` | Tab Sinonim, Idiom, Onomatope, Formal. `@id\|judul\|keterangan`, `#Kategori` (akhiri dengan ⇔ untuk pasangan kata). Setiap baris diakhiri level. | entri `jepang\|kana\|romaji\|arti\|N3` (boleh ditambah contoh sebelum level), pasangan `jp1\|kana1\|arti1\|jp2\|kana2\|arti2\|N4` |
| `src/bunpo-topik.txt` | Tab Bunpō Struktur Kalimat, Partikel, Pola dasar (di Pola JLPT), dan topik tab Ekspresi (waktu, sebab, tujuan, kondisi, banding, lawan, tanya). `@id\|judul\|ringkasan`, baris `- penjelasan`, `#Kategori` opsional (tampil sebagai chip). Contoh tambahan dengan awalan `+` di bawah pola. | `pola\|romaji\|arti\|contoh\|romaji contoh\|arti contoh\|N5` lalu `+ contoh\|romaji\|arti` |
| `src/kaiwa/*.txt` | Dialog, dibagi per file. `@Kategori`, `#Judul dialog` (opsional `#Judul dialog\|N3` untuk menetapkan level; tanpa itu level diperkirakan otomatis). | `Pembicara\|日本語。\|romaji\|arti` |
| `src/template.html` | Tampilan dan logika aplikasi. | — |

Catatan:
- Romaji untuk kosakata dibuat otomatis dari kana. Romaji untuk kalimat (Bunpo, Bun, Kaiwa) ditulis manual supaya partikel benar: は = *wa*, を = *o*, へ = *e*.
- Perubahan kata kerja, kata sifat, dan kata benda di Katsuyō dihitung otomatis dari kosakata, jadi kata baru di `src/vocab/` ikut masuk.
- `build.js` memeriksa format, duplikat, romaji, dan level, lalu melaporkan baris yang bermasalah. Ringkasan di konsol menampilkan jumlah materi per level.
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
  vocab/*.txt       ← kosakata N5–N1 + kerja pabrik
  kanji.txt         ← daftar kanji per kategori
  bunpo.txt         ← pola tata bahasa N5–N1 + contoh
  bun.txt           ← kalimat sehari-hari
  kotoba-plus.txt   ← onomatope, idiom & peribahasa, sinonim & antonim, formal & slang
  bunpo-topik.txt   ← topik bunpō: struktur, partikel, pola dasar, dan ekspresi (waktu, sebab, tujuan, kondisi, banding, lawan, tanya)
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
