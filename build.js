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
  return { s: strokes.map(x => x[1]), n: nums, p: kvgParts(svg, strokes.length) };
}
// Komponen kanji dari pengelompokan KanjiVG (kvg:element, kvg:position, kvg:radical, kvg:phon).
// Hasil: [[elemen, bentuk asli, posisi, tanda (r = radikal/bushu, p = petunjuk bunyi), [nomor goresan 0-based...], sub-komponen], ...]
// Bagian yang terpisah (kvg:part="1"/"2", mis. 囗 pada 回) digabung menjadi satu komponen.
function kvgParts(svg, total) {
  const root = { kids: [], own: [] }, st = [];
  for (const m of svg.matchAll(/<g\b([^>]*)>|<\/g>|<path\b([^>]*?)\/?>/g)) {
    if (m[0] === '</g>') { st.pop(); continue; }
    if (m[1] !== undefined) {
      const a = m[1], at = n => (a.match(new RegExp(`kvg:${n}="([^"]*)"`)) || [])[1] || '';
      const isRoot = /id="kvg:[0-9a-f]+"/.test(a), node = { e: at('element'), o: at('original'), pos: at('position'), rad: at('radical'), phon: at('phon'), part: at('part'), kids: [], own: [] };
      const top = st[st.length - 1];
      if (isRoot) st.push(root); else { if (top) top.kids.push(node); st.push(top ? node : { kids: [], own: [] }); }
      continue;
    }
    const id = m[2].match(/id="kvg:[0-9a-f]+-s(\d+)"/);
    if (id && st.length) st[st.length - 1].own.push(+id[1] - 1);
  }
  const all = n => [...n.own, ...n.kids.flatMap(all)].sort((a, b) => a - b);
  const conv = list => {
    const out = [];
    for (const n of list) {
      const s = all(n);
      if (!s.length) continue;
      const prev = n.part && out.find(x => x[0] === n.e && x[0]);
      if (prev) { prev[4] = [...prev[4], ...s].sort((a, b) => a - b); prev[5].push(...conv(n.kids)); continue; }
      out.push([n.e || '?', n.o, n.pos, (/general|tradit/.test(n.rad) ? 'r' : '') + (n.phon ? 'p' : ''), s, conv(n.kids)]);
    }
    return out;
  };
  let top = root;
  while (top.kids.length === 1 && !top.own.length && all(top.kids[0]).length === total) top = top.kids[0];
  const parts = conv(top.kids);
  if (top.own.length) parts.push(['?', '', '', '', top.own, []]);
  return parts.length > 1 ? parts : [];
}

// kanji.txt + kanji-n*.txt (tambahan per level), digabung berurutan
const kanjiSrc = () => fs.readdirSync(path.join(ROOT, 'src')).filter(f => /^kanji(-n\d\w*)?\.txt$/.test(f)).sort((a, b) => a === 'kanji.txt' ? -1 : b === 'kanji.txt' ? 1 : a.localeCompare(b)).map(f => fs.readFileSync(path.join(ROOT, 'src', f), 'utf8')).join('\n');
async function buildKanji() {
  const cats = [], klv = [], list = [], seenK = new Set();
  let cat = 'Lain-lain';
  kanjiSrc().split(/\r?\n/).forEach((line, ln) => {
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
      catch (e) { bad.push(`kanji ${it.k}: data goresan tidak tersedia (${e.message})`); it.s = []; it.n = []; it.p = []; }
      // validasi: komponen harus mencakup setiap goresan tepat satu kali
      const cov = (it.p || []).flatMap(x => x[4]).sort((a, b) => a - b);
      if (cov.length && cov.join() !== it.s.map((_, j) => j).join()) bad.push(`kanji ${it.k}: komponen KanjiVG tidak mencakup semua goresan`);
    }));
  }
  return { cats, klv, list, fetched };
}

// ===== KAIWA (src/kaiwa/*.txt) → [[kategori, judul, [[pembicara, jp, romaji, arti]], level]] =====
// Level dialog: tulis manual di judul (#Judul|N4); jika tidak ada, diperkirakan dari penanda tata bahasa & keigo.
// Regex sengaja ketat supaya tidak salah tangkap (とても ≠ ても, さようなら ≠ なら, 駅の前に ≠ る前に).
const LVRE = /^N[1-5]$/;
const KWM = {
  N1: /におかれまして|かたがた|をもちまして|所存|ご査収|ならでは|を禁じ得|に足る|をよそに|いかんによらず|ご高配|ご愛顧/g,
  N2: /させていただ|いたしかね|かねます|申し上げ|存じ|恐れ入|差し支え|ざるを得|わけにはいか|にもかかわらず|に際し|次第|ものの|かねない|に違いな|とは限ら|ばかりか|[たる]上で|[たる]うえで|につき|おそれがあ|に沿|をもとに|に基づ|ご遠慮|ご了承|お手数/g,
  N3: /いらっしゃ(?!いませ)|おっしゃ|召し上が|拝見|伺|参りま|申します|おります|いたしま|ございま|かしこまりました|ようにし|ようにな|ことにな|ことにし|ばかりで|たばかり|はずで|はずだ|らしい|によって|として|に対して|(?<!う)ずに|っけ|わけで|わけじゃ|ところで(?!す)|ているところ|たところ|させて|させられ|られました|(?<![もそ])のに|おかげで|せいで|ように言|ように頼|ために/g,
  N4: /(?<!と)ても|[いきしちにひみりぎじびえけせてねめれげべ]そうで|[いきしちにひみりぎじびえけせてねめれげべ]そうだ|ので|たら|れば|(?<![たそ]う?い)えば|けば|げば|せば|てば|めば|べば|と思|たことが|てもいい|ても大丈夫|てはいけ|なければ|なきゃ|なくても|ことができ|られます|られる|すぎ|やすい|にくい|かもしれ|つもり|てしま|ちゃっ|ちゃい|ておき|ておい|てみ|てあげ|てくれ|てもら|てから|ながら|[うくぐすつぬぶむる]前に|た後で|(?<![あぴっふ])たり|(?<!よう)なら|ほうがいい|方がいい|かどうか|ように|(?<!と)とき(?!どき)|時に|(?<![見聞])みたい/g
};
// ungkapan baku yang dihafal sejak awal tidak dihitung sebagai keigo/tata bahasa lanjut
const KW_EXCL = /いらっしゃいませ|申し訳|よろしくお願い|お願いします|お疲れ様|ありがとうございま|おはようございま|おめでとうございま|失礼します|失礼しました/g;
function kwLevel(lines) {
  const txt = lines.map(l => l[1]).join(' ').replace(KW_EXCL, '');
  const n = L => new Set(txt.match(KWM[L]) || []).size;
  const n1 = n('N1'), n2 = n('N2'), n3 = n('N3'), n4 = n('N4');
  if (n1) return 'N1';
  if (n2 >= 2 || (n2 && n3 >= 2)) return 'N2';
  if (n2 + n3 >= 2) return 'N3';
  if (n4 || n3 || n2) return 'N4';
  return 'N5';
}
function buildKaiwa() {
  const out = [], dir = path.join(ROOT, 'src', 'kaiwa'), titles = new Set();
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.txt')).sort()) {
    let cat = 'Lain-lain', cur = null;
    fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/).forEach((line, ln) => {
      line = line.trim();
      if (!line || line.startsWith('//')) return;
      if (line[0] === '@') { cat = line.slice(1).trim(); return; }
      if (line[0] === '#') {
        const h = line.slice(1).split('|').map(x => x.trim()), t = h[0], lv = h[1] || '';
        if (lv && !LVRE.test(lv)) bad.push(`kaiwa/${f}:${ln + 1} level harus N5–N1: ${line}`);
        if (titles.has(cat + '|' + t)) bad.push(`kaiwa/${f}:${ln + 1} judul dialog ganda di ${cat}: ${t}`);
        titles.add(cat + '|' + t); cur = [cat, t, [], LVRE.test(lv) ? lv : '']; out.push(cur); return;
      }
      const p = line.split('|').map(x => x.trim());
      if (!cur || p.length !== 4 || p.some(x => !x)) { bad.push(`kaiwa/${f}:${ln + 1} format salah: ${line}`); return; }
      if (/[^\x20-\x7e]/.test(p[2])) { bad.push(`kaiwa/${f}:${ln + 1} romaji berisi huruf Jepang: ${line}`); return; }
      cur[2].push(p);
    });
  }
  out.filter(d => d[2].length < 2).forEach(d => bad.push(`kaiwa: dialog "${d[1]}" kurang dari 2 kalimat`));
  out.forEach(d => { if (!d[3]) d[3] = kwLevel(d[2]); });
  // dialog dikelompokkan per kategori (urutan kategori = kemunculan pertama)
  const cats = [...new Set(out.map(d => d[0]))];
  return cats.flatMap(c => out.filter(d => d[0] === c));
}

// ===== BUNPO (src/bunpo.txt) → [{l, t, f, s:[[bagian, [[pola, romaji, arti, contoh, romaji, arti, [contoh tambahan]]...]]], ex:[[jp, romaji, arti]]}] =====
function buildBunpo() {
  const out = []; let lv = null, sec = null;
  fs.readFileSync(path.join(ROOT, 'src', 'bunpo.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim());
    if (line[0] === '@') { lv = { l: p[0].slice(1), t: p[1] || '', f: p[2] || '', s: [], ex: [] }; out.push(lv); sec = null; return; }
    if (!lv) { bad.push(`bunpo.txt:${ln + 1} di luar level: ${line}`); return; }
    if (line[0] === '#') { sec = [line.slice(1).trim(), []]; lv.s.push(sec); return; }
    if (line[0] === '+') {
      const r = sec && sec[1][sec[1].length - 1], e = line.slice(1).split('|').map(x => x.trim());
      if (!r || !r[3]) { bad.push(`bunpo.txt:${ln + 1} contoh tambahan tanpa pola di atasnya`); return; }
      if (e.length !== 3 || e.some(x => !x) || !/{.+?}/.test(e[0])) { bad.push(`bunpo.txt:${ln + 1} format contoh tambahan salah (perlu bagian {…}): ${line}`); return; }
      (r[6] = r[6] || []).push(e); return;
    }
    if (p[0] === '!contoh') { if (p.length !== 4) bad.push(`bunpo.txt:${ln + 1} format contoh salah`); else lv.ex.push(p.slice(1)); return; }
    if (!sec || (p.length !== 3 && p.length !== 6) || p.some(x => !x)) { bad.push(`bunpo.txt:${ln + 1} format salah: ${line}`); return; }
    if (p.length === 6 && !/\{.+?\}/.test(p[3])) { bad.push(`bunpo.txt:${ln + 1} contoh tanpa bagian {…}: ${line}`); return; }
    sec[1].push(p);
  });
  return out;
}

// ===== BUN (src/bun.txt) → [[kategori, jepang, romaji, arti], ...] =====
function buildBun() {
  const out = [], seen = new Set(); let cat = 'Lain-lain';
  fs.readFileSync(path.join(ROOT, 'src', 'bun.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    if (line[0] === '@') { cat = line.slice(1).trim(); return; }
    const p = line.split('|').map(x => x.trim());
    if (p.length !== 3 || p.some(x => !x)) { bad.push(`bun.txt:${ln + 1} format salah: ${line}`); return; }
    if (seen.has(p[0])) { bad.push(`bun.txt:${ln + 1} kalimat ganda: ${p[0]}`); return; }
    seen.add(p[0]); out.push([cat, ...p]);
  });
  return out;
}

// ===== KANA-KATA (src/kana-kata.txt) → {hira:[[kata, romaji, arti],...], kata:[...]} =====
function buildKanaKata() {
  const out = { hira: [], kata: [] }, seen = new Set(); let cur = null;
  fs.readFileSync(path.join(ROOT, 'src', 'kana-kata.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    if (line[0] === '@') { cur = line.slice(1).trim() === 'Katakana' ? 'kata' : 'hira'; return; }
    const p = line.split('|').map(x => x.trim());
    const re = cur === 'kata' ? /^[ァ-ヺーぁ-ゖ]+$/ : /^[ぁ-ゖー]+$/;
    if (!cur || p.length !== 3 || p.some(x => !x)) { bad.push(`kana-kata.txt:${ln + 1} format salah: ${line}`); return; }
    if (!re.test(p[0])) { bad.push(`kana-kata.txt:${ln + 1} bukan ${cur === 'kata' ? 'katakana' : 'hiragana'}: ${p[0]}`); return; }
    if (seen.has(p[0])) { bad.push(`kana-kata.txt:${ln + 1} kata ganda: ${p[0]}`); return; }
    seen.add(p[0]); out[cur].push(p);
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

// ===== KOTOBA PLUS (src/kotoba-plus.txt): onomatope, idiom & peribahasa, sinonim & antonim, formal & slang =====
// → [{id, t, d, cats:[{c, pair, rows}]}]; entri: [jp, kana, romaji, arti, contoh, romaji contoh, arti contoh]
//   pasangan: [jp1, kana1, romaji1, arti1, jp2, kana2, romaji2, arti2]
function buildKotobaPlus() {
  const out = [], KANA = /^[぀-ヿー〜・ ]+$/; let mod = null, cat = null;
  fs.readFileSync(path.join(ROOT, 'src', 'kotoba-plus.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim()), at = `kotoba-plus.txt:${ln + 1}`;
    if (line[0] === '@') { mod = { id: p[0].slice(1), t: p[1] || '', d: p[2] || '', cats: [] }; out.push(mod); cat = null; return; }
    if (!mod) { bad.push(`${at} di luar submodul`); return; }
    if (line[0] === '#') { const pair = /⇔$/.test(line); cat = { c: line.slice(1).replace(/⇔$/, '').trim(), pair, rows: [], lv: [] }; mod.cats.push(cat); return; }
    if (!cat) { bad.push(`${at} di luar kategori`); return; }
    // level N5–N1 di akhir baris, mis. ...|N3
    const lv = LVRE.test(p[p.length - 1]) ? p.pop() : '';
    if (!lv) { bad.push(`${at} level N5–N1 belum ditulis di akhir baris: ${line}`); return; }
    if (cat.pair) {
      if (p.length !== 6 || p.some(x => !x) || !KANA.test(p[1]) || !KANA.test(p[4])) { bad.push(`${at} format pasangan salah: ${line}`); return; }
      cat.rows.push([p[0], p[1], romWord(p[1]), p[2], p[3], p[4], romWord(p[4]), p[5]]); cat.lv.push(lv);
    } else {
      if ((p.length !== 4 && p.length !== 7) || p.some(x => !x) || !KANA.test(p[1])) { bad.push(`${at} format entri salah: ${line}`); return; }
      if (p[2] === '-') p[2] = romWord(p[1]);
      cat.rows.push(p); cat.lv.push(lv);
    }
  });
  return out;
}
// ===== BUNPO TOPIK (src/bunpo-topik.txt) → [{id, t, d, ex:[penjelasan], rows:[[pola, romaji, arti, contoh, romaji contoh, arti contoh, [contoh tambahan]]]}] =====
function buildBunpoTopik() {
  const out = []; let tp = null, cat = '';
  fs.readFileSync(path.join(ROOT, 'src', 'bunpo-topik.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim());
    if (line[0] === '@') { tp = { id: p[0].slice(1), t: p[1] || '', d: p[2] || '', ex: [], rows: [], lv: [], c: [] }; cat = ''; out.push(tp); return; }
    if (!tp) { bad.push(`bunpo-topik.txt:${ln + 1} di luar topik`); return; }
    if (line[0] === '#') { cat = line.slice(1).trim(); return; }
    if (line.startsWith('- ')) { tp.ex.push(line.slice(2)); return; }
    if (line[0] === '+') {
      const r = tp.rows[tp.rows.length - 1], e = line.slice(1).split('|').map(x => x.trim());
      if (!r) { bad.push(`bunpo-topik.txt:${ln + 1} contoh tambahan tanpa pola di atasnya`); return; }
      if (e.length !== 3 || e.some(x => !x)) { bad.push(`bunpo-topik.txt:${ln + 1} format contoh tambahan salah: ${line}`); return; }
      (r[6] = r[6] || []).push(e); return;
    }
    const lv = LVRE.test(p[p.length - 1]) ? p.pop() : '';
    if (!lv) { bad.push(`bunpo-topik.txt:${ln + 1} level N5–N1 belum ditulis di akhir baris: ${line}`); return; }
    if (p.length !== 6 || p.some(x => !x)) { bad.push(`bunpo-topik.txt:${ln + 1} format salah: ${line}`); return; }
    tp.rows.push(p); tp.lv.push(lv); tp.c.push(cat);
  });
  // kategori hanya disimpan bila topik memakainya
  out.forEach(t => { if (!t.c.some(Boolean)) delete t.c; });
  return out;
}
// ===== KALIMAT DASAR (src/kalimat-dasar.txt) → [[kategori, jepang, romaji, arti], ...] =====
function buildKalimatDasar() {
  const out = []; let cat = 'Dasar';
  fs.readFileSync(path.join(ROOT, 'src', 'kalimat-dasar.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    if (line[0] === '@') { cat = line.slice(1).trim(); return; }
    const p = line.split('|').map(x => x.trim());
    if (p.length !== 3 || p.some(x => !x)) { bad.push('kalimat-dasar.txt:' + (ln + 1) + ' format salah: ' + line); return; }
    out.push([cat, ...p]);
  });
  return out;
}

// ===== KAIWA UNIT (src/kaiwa-unit.txt) → {lv:[{l,n,t,e:[[jp,rom,arti]]}], u:[{no,t,l,g,v,p,d,r}]} =====
function buildKaiwaUnit() {
  const lv = [], u = []; let L = null, cur = null;
  fs.readFileSync(path.join(ROOT, 'src', 'kaiwa-unit.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim());
    if (line[0] === '@') { L = { l: p[0].slice(1), n: p[1], t: p[2], e: [] }; lv.push(L); cur = null; return; }
    if (line[0] === '#') { cur = { no: p[0].slice(1), t: p[1], l: L && L.l, g: '', v: [], p: null, d: [], r: '' }; u.push(cur); return; }
    const k = p[0], a = p.slice(1);
    if (k === 'E' && L && !cur) { L.e.push(a); return; }
    if (!cur) { bad.push('kaiwa-unit.txt:' + (ln + 1) + ' di luar unit: ' + line); return; }
    if (k === 'G') cur.g = a.join('|');
    else if (k === 'V' && a.length === 4) cur.v.push(a);
    else if (k === 'P' && a.length === 3) cur.p = a;
    else if (k === 'D' && a.length === 4) cur.d.push(a);
    else if (k === 'R') cur.r = a.join('|');
    else bad.push('kaiwa-unit.txt:' + (ln + 1) + ' format salah: ' + line);
  });
  u.forEach(x => { if (x.d.length < 2 || x.v.length < 1 || !x.p) bad.push('kaiwa-unit: unit ' + x.no + ' tidak lengkap'); });
  return { lv, u };
}
// ===== KANJI FAMILY (src/kanji-family.txt) → [{j,jt,jd,fam:[{t,d,i,k:[[kanji,arti,on,kun,asal]],w:[[kata,romaji,arti]],s:[[jp,rom,arti]],n}]}] =====
function buildKanjiFamily() {
  const out = []; let J = null, F = null;
  fs.readFileSync(path.join(ROOT, 'src', 'kanji-family.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim());
    if (line[0] === '@') { J = { j: p[0].slice(1), t: p[1], d: p[2] || '', fam: [] }; out.push(J); F = null; return; }
    if (line[0] === '#') { if (!J) { bad.push('kanji-family.txt:' + (ln + 1) + ' di luar jilid'); return; } F = { t: p[0].slice(1), d: p[1] || '', i: p[2] || '', k: [], w: [], s: [], n: '' }; J.fam.push(F); return; }
    if (!F) { bad.push('kanji-family.txt:' + (ln + 1) + ' di luar keluarga: ' + line); return; }
    const k = p[0], a = p.slice(1);
    if (k === 'K' && a.length === 5) F.k.push(a);
    else if (k === 'W' && a.length === 3) F.w.push(a);
    else if (k === 'S' && a.length === 3) F.s.push(a);
    else if (k === 'N') F.n = a.join('|');
    else bad.push('kanji-family.txt:' + (ln + 1) + ' format salah: ' + line);
  });
  return out;
}
// ===== JALUR N5 (src/jalur-n5.txt) → [{u, t, g, ls:[{no, n, j, f, s, x, W, S, Q, C, T, K}]}] =====
// Kurikulum Learning Path N5 di Beranda: 12 unit × 20 pelajaran. Lihat format di kepala file.
const JALUR_FMT = new Set(('r2j j2r dengar susun lengkap baca ketik cocok tulis ujian beda ident gambar kalimat input dikte ungkap arti '
  + 'respons susunS isi angka angkaK bacaan dengarN hitung dengarA tanya dbuild kaiwa kArti kBaca j2k k2h kosa konjug ubah teks teksDengar '
  + 'respDengar info role bicara pilgan final kj2r kr2j').split(' '));
function buildJalur() {
  const out = []; let U = null, L = null, T = null;
  const err = (ln, m) => bad.push(`jalur-n5.txt:${ln + 1} ${m}`);
  fs.readFileSync(path.join(ROOT, 'src', 'jalur-n5.txt'), 'utf8').split(/\r?\n/).forEach((line, ln) => {
    line = line.trim();
    if (!line || line.startsWith('//')) return;
    const p = line.split('|').map(x => x.trim()), k = p[0];
    if (k[0] === '@') { U = { u: k.slice(1), t: p[1], g: p[2] || '', ls: [] }; out.push(U); L = T = null; return; }
    if (k[0] === '#') {
      if (!U) return err(ln, 'pelajaran di luar unit');
      L = { no: +k.slice(1), n: p[1], j: p[2], f: p[3], s: p[4] || '', x: '', W: [], S: [], Q: [], C: [], T: [], K: {} }; T = null;
      if (!JALUR_FMT.has(L.f)) err(ln, `format soal tidak dikenal: ${L.f}`);
      U.ls.push(L); return;
    }
    if (!L) return err(ln, 'baris di luar pelajaran: ' + line);
    const a = p.slice(1);
    if (k === '>') L.x = a.join('|');
    else if (k === 'W' && a.length >= 4) {
      const [j, kana, r, arti, ic = '', ket = ''] = a, kn = kana || j;
      L.W.push([j, kn, r || romWord(kn.replace(/^〜/, '')), arti, ic, ket]);
    }
    else if (k === 'S' && a.length >= 3) { if (a[3] && !/\{.+?\}/.test(a[0])) err(ln, 'pengecoh tanpa bagian {…}'); L.S.push(a.slice(0, 5)); }
    else if (k === 'Q' && a.length === 6) L.Q.push(a);
    else if (k === 'C' && a.length === 4) L.C.push(a);
    else if (k === 'T' && a.length === 4) { T = { t: a[0], j: a[1], r: a[2], a: a[3], q: [] }; L.T.push(T); }
    else if (k === '?' && a.length === 3 && T) T.q.push([a[0], a[1], a[2].split(';').map(x => x.trim()).filter(Boolean)]);
    else if (k === 'K' && a.length >= 2) L.K[a[0]] = [a[1], a[2] || ''];
    else err(ln, 'format salah: ' + line);
  });
  const nos = out.flatMap(u => u.ls.map(l => l.no));
  if (out.length !== 12 || out.some(u => u.ls.length !== 20)) bad.push(`jalur-n5: harus 12 unit × 20 pelajaran (sekarang ${out.map(u => u.ls.length).join(',')})`);
  // sumber gab: (rangkaian huruf) hanya di unit huruf 01–04
  out.forEach((u, ui) => u.ls.forEach(l => { if (/gab:/.test(l.s) && ui > 3) bad.push(`jalur-n5: #${l.no} memakai gab: di luar unit huruf`); if (/gab:/.test(l.s) && !/gab:(\d|kata)/.test(l.s)) bad.push(`jalur-n5: #${l.no} sumber gab tidak dikenal`); }));
  nos.forEach((n, i) => { if (n !== i + 1) bad.push(`jalur-n5: nomor pelajaran ${n} seharusnya ${i + 1}`); });
  return out;
}
// ikon aplikasi dimasukkan sebagai data URI supaya index.html tetap bisa dipakai sebagai satu file
const dataUri = f => 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'assets', f)).toString('base64');

(async () => {
  const K = await buildKanji();
  const KW = buildKaiwa();
  const KN = await buildKana();
  const BP = buildBunpo();
  const KP = buildKotobaPlus();
  const BT = buildBunpoTopik();
  const KD = buildKalimatDasar();
  const BN = buildBun();
  const KK = buildKanaKata();
  const KU = buildKaiwaUnit(), KF = buildKanjiFamily(), JN = buildJalur();
  const data = JSON.stringify({ t: types, l: levels, d: rows.join('\n') });
  const kdata = JSON.stringify({ c: K.cats, l: K.klv, d: K.list.map(x => [x.k, x.kun.join(','), x.on.join(','), x.a, x.c, x.l, x.s, x.n, x.p]) });
  let tpl = fs.readFileSync(path.join(ROOT, 'src', 'template.html'), 'utf8');
  const inject = { '/*VOCAB*/null': data, '/*KANJI*/null': kdata, '/*KAIWA*/null': JSON.stringify(KW), '/*KANA*/null': JSON.stringify(KN.out), '/*BUNPO*/null': JSON.stringify(BP), '/*BUN*/null': JSON.stringify(BN), '/*KANAKATA*/null': JSON.stringify(KK), '/*KAIWAUNIT*/null': JSON.stringify(KU), '/*KFAMILY*/null': JSON.stringify(KF), '/*KPLUS*/null': JSON.stringify(KP), '/*BTOPIK*/null': JSON.stringify(BT), '/*KDASAR*/null': JSON.stringify(KD), '/*JALUR*/null': JSON.stringify(JN),
    '__FAVICON__': dataUri('favicon-64.png'), '__LOGO__': dataUri('apple-touch-icon.png') };
  for (const [m, v] of Object.entries(inject)) {
    if (!tpl.includes(m)) throw new Error(`Penanda ${m} tidak ditemukan di template`);
    tpl = tpl.split(m).join(v);
  }
  fs.writeFileSync(path.join(ROOT, 'index.html'), tpl);

  const byLv = {}; rows.forEach(r => { const l = levels[+r.split('|')[5]]; byLv[l] = (byLv[l] || 0) + 1; });
  console.log(`index.html dibuat: ${rows.length} kata`, byLv);
  console.log(`Kanji: ${K.list.length} dalam ${K.cats.length} kategori` + (K.fetched ? ` (${K.fetched} data goresan baru diunduh)` : ''));
  const per = a => ['N5', 'N4', 'N3', 'N2', 'N1'].map(l => `${l}=${a.filter(x => x === l).length}`).join(' ');
  console.log(`Kaiwa: ${KW.length} dialog, ${KW.reduce((s, d) => s + d[2].length, 0)} kalimat, ${new Set(KW.map(d => d[0])).size} kategori · level ${per(KW.map(d => d[3]))}`);
  console.log(`Kotoba plus: ${KP.map(m => `${m.t}=${m.cats.reduce((s, c) => s + c.rows.length, 0)}`).join(', ')} · level ${per(KP.flatMap(m => m.cats.flatMap(c => c.lv)))}`);
  console.log(`Kalimat dasar: ${KD.length} kalimat`);
  console.log(`Jalur N5: ${JN.length} unit, ${JN.reduce((s, u) => s + u.ls.length, 0)} pelajaran`);
  console.log(`Kaiwa unit: ${KU.u.length} unit, ${KU.u.reduce((s, u) => s + u.d.length, 0)} kalimat dialog · level ${per(KU.u.map(u => u.l))}`);
  console.log(`Bunpo topik: ${BT.map(x => `${x.t}=${x.rows.length}`).join(', ')} · ${BT.reduce((a, t) => a + t.rows.reduce((b, r) => b + 1 + (r[6] || []).length, 0), 0)} contoh · level ${per(BT.flatMap(x => x.lv))}`);
  console.log(`Kana-kata: hiragana=${KK.hira.length}, katakana=${KK.kata.length}`);
  console.log(`Bun: ${BN.length} kalimat, ${new Set(BN.map(b => b[0])).size} kategori`);
  console.log(`Bunpo: ${BP.map(l => `${l.l}=${l.s.reduce((a, s) => a + s[1].length, 0)}`).join(', ')} pola · ${BP.reduce((a, l) => a + l.s.reduce((b, s) => b + s[1].reduce((c, r) => c + (r[3] ? 1 : 0) + (r[6] || []).length, 0), 0), 0)} contoh`);
  console.log(`Kana dengan data goresan: ${Object.keys(KN.out).length}` + (KN.fetched ? ` (${KN.fetched} baru diunduh)` : '') + (KN.missing.length ? ` · tidak tersedia: ${KN.missing.join('')}` : ''));
  if (dups.length) console.log(`${dups.length} kata duplikat dilewati` + (process.argv.includes('-v') ? ':\n  ' + dups.join('\n  ') : ' (jalankan dengan -v untuk melihat)'));
  if (bad.length) { console.log(`${bad.length} baris bermasalah:\n  ` + bad.join('\n  ')); process.exitCode = 1; }
})().catch(e => { console.error(e); process.exitCode = 1; });
