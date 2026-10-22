// Cara pakai:  node build.js        (tambahkan -v untuk melihat daftar kata duplikat)
// Menggabungkan src/template.html + semua file src/vocab/*.txt + src/kanji.txt menjadi index.html (satu file, siap upload).
//
// Format file kosakata (src/vocab/*.txt):
//   @N5              -> level untuk baris-baris berikutnya
//   #Kata benda      -> jenis kata untuk baris-baris berikutnya
//   // komentar      -> diabaikan
//   漢字|かな|arti    -> kata dengan kanji
//   かな|arti         -> kata tanpa kanji (hiragana / katakana)
// Romaji dibuat otomatis dari kana.
const fs = require('fs'), path = require('path');
const ROOT = __dirname, VDIR = path.join(ROOT, 'src', 'vocab');

const B = {あ:'a',い:'i',う:'u',え:'e',お:'o',か:'ka',き:'ki',く:'ku',け:'ke',こ:'ko',が:'ga',ぎ:'gi',ぐ:'gu',げ:'ge',ご:'go',
  さ:'sa',し:'shi',す:'su',せ:'se',そ:'so',ざ:'za',じ:'ji',ず:'zu',ぜ:'ze',ぞ:'zo',た:'ta',ち:'chi',つ:'tsu',て:'te',と:'to',
  だ:'da',ぢ:'ji',づ:'zu',で:'de',ど:'do',な:'na',に:'ni',ぬ:'nu',ね:'ne',の:'no',は:'ha',ひ:'hi',ふ:'fu',へ:'he',ほ:'ho',
  ば:'ba',び:'bi',ぶ:'bu',べ:'be',ぼ:'bo',ぱ:'pa',ぴ:'pi',ぷ:'pu',ぺ:'pe',ぽ:'po',ま:'ma',み:'mi',む:'mu',め:'me',も:'mo',
  や:'ya',ゆ:'yu',よ:'yo',ら:'ra',り:'ri',る:'ru',れ:'re',ろ:'ro',わ:'wa',を:'o',ん:'n',ゔ:'vu'};
const SMALL = {ぁ:'a',ぃ:'i',ぅ:'u',ぇ:'e',ぉ:'o'}, YO = {ゃ:'a',ゅ:'u',ょ:'o'};
function rom(s) {
  s = s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 96));
  const cs = [...s], out = [];
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i], n = cs[i + 1];
    if (c === 'っ') { out.push('\u0001'); continue; }
    if (c === 'ー') { const m = out.join('').match(/[aiueo](?=[^aiueo]*$)/); out.push(m ? m[0] : ''); continue; }
    if (c === '・' || c === ' ' || c === '　') { out.push(' '); continue; }
    if (c === '〜') { out.push('~'); continue; }
    let r = B[c];
    if (r === undefined) r = SMALL[c] || YO[c] || c;
    if (n && YO[n] && B[c]) {
      r = /^(shi|chi|ji)$/.test(r) ? r.slice(0, -1) + YO[n] : r.slice(0, -1) + 'y' + YO[n]; i++;
    } else if (n && SMALL[n] && B[c]) {
      const v = SMALL[n];
      if (r === 'te' || r === 'de') r = r[0] + v;
      else if (/^(shi|chi|ji)$/.test(r)) r = r.slice(0, -1) + v;
      else if (r === 'u') r = 'w' + v;
      else if (r.endsWith('u')) r = r.slice(0, -1) + v;
      else r = r + v;
      i++;
    }
    out.push(r);
  }
  let o = '';
  for (let i = 0; i < out.length; i++) {
    const r = out[i];
    if (r === '\u0001') { const nx = out[i + 1] || ''; o += nx.startsWith('ch') ? 't' : (nx[0] && /[a-z]/.test(nx[0]) ? nx[0] : ''); continue; }
    if (r === 'n' && i > 0 && out[i + 1] && /^[aiueoy]/.test(out[i + 1])) { o += "n'"; continue; }
    o += r;
  }
  return o;
}
function romWord(k) {
  if (k.length > 2 && k.endsWith('する')) return rom(k.slice(0, -2)) + ' suru';
  return rom(k);
}

const files = fs.readdirSync(VDIR).filter(f => f.endsWith('.txt')).sort();
const types = [], levels = [], rows = [], seen = new Map(), dups = [], bad = [];
const idx = (arr, v) => { let i = arr.indexOf(v); if (i < 0) { arr.push(v); i = arr.length - 1; } return i; };
for (const f of files) {
  let lv = 'N5', ty = 'Kata benda';
  fs.readFileSync(path.join(VDIR, f), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    if (line[0] === '@') { lv = line.slice(1).trim(); return; }
    if (line[0] === '#') { ty = line.slice(1).trim(); return; }
    const p = line.split('|').map(x => x.trim());
    let j, k, a;
    if (p.length === 2) [j, a] = p, k = j; else if (p.length === 3) [j, k, a] = p;
    else { bad.push(`${f}:${ln + 1} format salah: ${line}`); return; }
    if (!j || !k || !a || a === '-' || !/^[぀-ヿー〜・ ]+$/.test(k)) { bad.push(`${f}:${ln + 1} kana tidak valid: ${line}`); return; }
    const r = romWord(k);
    if (/[^\x20-\x7e]/.test(r)) { bad.push(`${f}:${ln + 1} romaji gagal: ${line} -> ${r}`); return; }
    const key = j + '|' + k;
    if (seen.has(key)) { dups.push(`${f}:${ln + 1} ${j} (${k}) sudah ada di ${seen.get(key)}`); return; }
    seen.set(key, `${f}:${ln + 1}`);
    rows.push([j, k, r, a.replace(/\|/g, '/'), idx(types, ty), idx(levels, lv)].join('|'));
  });
}

// ===== KANJI (src/kanji.txt) + urutan goresan dari KanjiVG =====
// KanjiVG (https://kanjivg.tagaini.net) oleh Ulrich Apel, lisensi CC BY-SA 3.0.
// File SVG diunduh sekali lalu disimpan di src/kanjivg/ (cache), jadi build berikutnya tidak perlu internet.
const KVG_TAG = 'r20260714', KVG_DIR = path.join(ROOT, 'src', 'kanjivg');
const kvgName = ch => ch.codePointAt(0).toString(16).padStart(5, '0') + '.svg';
async function kvgSvg(ch) {
  const file = path.join(KVG_DIR, kvgName(ch));
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  let res = await fetch(`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@${KVG_TAG}/kanji/${kvgName(ch)}`);
  // cadangan: langsung dari GitHub jika CDN menolak
  if (!res.ok) res = await fetch(`https://raw.githubusercontent.com/KanjiVG/kanjivg/${KVG_TAG}/kanji/${kvgName(ch)}`);
  if (!res.ok) throw new Error(`KanjiVG ${ch}: HTTP ${res.status}`);
  const svg = await res.text();
  fs.mkdirSync(KVG_DIR, { recursive: true });
  fs.writeFileSync(file, svg);
  return svg;
}
function kvgParse(svg) {
  const strokes = [];
  for (const m of svg.matchAll(/<path\b[^>]*>/g)) {
    const id = m[0].match(/id="kvg:[0-9a-f]+-s(\d+)"/), d = m[0].match(/\sd="([^"]+)"/);
    if (id && d) strokes.push([+id[1], d[1]]);
  }
  strokes.sort((a, b) => a[0] - b[0]);
  const nums = [...svg.matchAll(/<text transform="matrix\(1 0 0 1 ([\d.]+) ([\d.]+)\)">(\d+)<\/text>/g)]
    .sort((a, b) => a[3] - b[3]).map(m => [+(+m[1]).toFixed(1), +(+m[2]).toFixed(1)]);
  return { s: strokes.map(x => x[1]), n: nums };
}

async function buildKanji() {
  const cats = [], klv = [], list = [], seenK = new Set();
  let cat = 'Lain-lain';
  fs.readFileSync(path.join(ROOT, 'src', 'kanji.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    if (line[0] === '@') { cat = line.slice(1).trim(); return; }
    const p = line.split('|').map(x => x.trim());
    if (p.length !== 5 || [...p[0]].length !== 1) { bad.push(`kanji.txt:${ln + 1} format salah: ${line}`); return; }
    if (seenK.has(p[0])) { bad.push(`kanji.txt:${ln + 1} kanji ganda: ${p[0]}`); return; }
    seenK.add(p[0]);
    const kun = p[1] === '-' ? [] : p[1].split(','), on = p[2] === '-' ? [] : p[2].split(',');
    if (kun.some(x => !/^[ぁ-ゖ.]+$/.test(x)) || on.some(x => !/^[ァ-ヶー]+$/.test(x))) { bad.push(`kanji.txt:${ln + 1} bacaan tidak valid: ${line}`); return; }
    list.push({ k: p[0], kun, on, a: p[3], c: idx(cats, cat), l: idx(klv, p[4]) });
  });
  let fetched = 0;
  for (let i = 0; i < list.length; i += 16) {   // unduh paralel per 16 file
    await Promise.all(list.slice(i, i + 16).map(async it => {
      const cached = fs.existsSync(path.join(KVG_DIR, kvgName(it.k)));
      try { Object.assign(it, kvgParse(await kvgSvg(it.k))); if (!cached) fetched++; }
      catch (e) { bad.push(`kanji ${it.k}: data goresan tidak tersedia (${e.message})`); it.s = []; it.n = []; }
    }));
  }
  return { cats, klv, list, fetched };
}

// ===== KAIWA (src/kaiwa.txt) =====
function buildKaiwa() {
  const out = []; let cat = 'Lain-lain', cur = null;
  fs.readFileSync(path.join(ROOT, 'src', 'kaiwa.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    if (line[0] === '@') { cat = line.slice(1).trim(); return; }
    if (line[0] === '#') { cur = [cat, line.slice(1).trim(), []]; out.push(cur); return; }
    const p = line.split('|').map(x => x.trim());
    if (!cur || p.length !== 4 || p.some(x => !x)) { bad.push(`kaiwa.txt:${ln + 1} format salah: ${line}`); return; }
    if (/[^\x20-\x7e]/.test(p[2])) { bad.push(`kaiwa.txt:${ln + 1} romaji berisi huruf Jepang: ${line}`); return; }
    cur[2].push(p);
  });
  out.filter(d => d[2].length < 2).forEach(d => bad.push(`kaiwa.txt: dialog "${d[1]}" kurang dari 2 kalimat`));
  return out;
}

// ===== BUNPO (src/bunpo.txt) → [{l, t, f, s:[[bagian, [[pola, romaji, arti]...]]], ex:[[jp, romaji, arti]]}] =====
function buildBunpo() {
  const out = []; let lv = null, sec = null;
  fs.readFileSync(path.join(ROOT, 'src', 'bunpo.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim());
    if (line[0] === '@') { lv = { l: p[0].slice(1), t: p[1] || '', f: p[2] || '', s: [], ex: [] }; out.push(lv); sec = null; return; }
    if (!lv) { bad.push(`bunpo.txt:${ln + 1} di luar level: ${line}`); return; }
    if (line[0] === '#') { sec = [line.slice(1).trim(), []]; lv.s.push(sec); return; }
    if (p[0] === '!contoh') { if (p.length !== 4) bad.push(`bunpo.txt:${ln + 1} format contoh salah`); else lv.ex.push(p.slice(1)); return; }
    if (!sec || p.length !== 3 || p.some(x => !x)) { bad.push(`bunpo.txt:${ln + 1} format salah: ${line}`); return; }
    sec[1].push(p);
  });
  return out;
}

// ===== Goresan kana (untuk kuis menulis hiragana/katakana/kotoba) =====
async function buildKana() {
  const chars = [];
  for (let c = 0x3041; c <= 0x3096; c++) chars.push(String.fromCodePoint(c));
  for (let c = 0x30a1; c <= 0x30fa; c++) chars.push(String.fromCodePoint(c));
  chars.push('ー');
  const out = {}, missing = []; let fetched = 0;
  for (let i = 0; i < chars.length; i += 16) {
    await Promise.all(chars.slice(i, i + 16).map(async ch => {
      const cached = fs.existsSync(path.join(KVG_DIR, kvgName(ch)));
      try { const s = kvgParse(await kvgSvg(ch)).s; if (s.length) out[ch] = s; if (!cached) fetched++; }
      catch (e) { missing.push(ch); }
    }));
  }
  return { out, missing, fetched };
}

(async () => {
  const K = await buildKanji();
  const KW = buildKaiwa();
  const KN = await buildKana();
  const BP = buildBunpo();
  const data = JSON.stringify({ t: types, l: levels, d: rows.join('\n') });
  const kdata = JSON.stringify({ c: K.cats, l: K.klv, d: K.list.map(x => [x.k, x.kun.join(','), x.on.join(','), x.a, x.c, x.l, x.s, x.n]) });
  let tpl = fs.readFileSync(path.join(ROOT, 'src', 'template.html'), 'utf8');
  const inject = { '/*VOCAB*/null': data, '/*KANJI*/null': kdata, '/*KAIWA*/null': JSON.stringify(KW), '/*KANA*/null': JSON.stringify(KN.out), '/*BUNPO*/null': JSON.stringify(BP) };
  for (const [m, v] of Object.entries(inject)) {
    if (!tpl.includes(m)) throw new Error(`Penanda ${m} tidak ditemukan di template`);
    tpl = tpl.split(m).join(v);
  }
  fs.writeFileSync(path.join(ROOT, 'index.html'), tpl);

  const byLv = {}; rows.forEach(r => { const l = levels[+r.split('|')[5]]; byLv[l] = (byLv[l] || 0) + 1; });
  console.log(`index.html dibuat: ${rows.length} kata`, byLv);
  console.log(`Kanji: ${K.list.length} dalam ${K.cats.length} kategori` + (K.fetched ? ` (${K.fetched} data goresan baru diunduh)` : ''));
  console.log(`Kaiwa: ${KW.length} dialog, ${KW.reduce((s, d) => s + d[2].length, 0)} kalimat, ${new Set(KW.map(d => d[0])).size} kategori`);
  console.log(`Bunpo: ${BP.map(l => `${l.l}=${l.s.reduce((a, s) => a + s[1].length, 0)}`).join(', ')} pola`);
  console.log(`Kana dengan data goresan: ${Object.keys(KN.out).length}` + (KN.fetched ? ` (${KN.fetched} baru diunduh)` : '') + (KN.missing.length ? ` · tidak tersedia: ${KN.missing.join('')}` : ''));
  if (dups.length) console.log(`${dups.length} kata duplikat dilewati` + (process.argv.includes('-v') ? ':\n  ' + dups.join('\n  ') : ' (jalankan dengan -v untuk melihat)'));
  if (bad.length) { console.log(`${bad.length} baris bermasalah:\n  ` + bad.join('\n  ')); process.exitCode = 1; }
})().catch(e => { console.error(e); process.exitCode = 1; });
