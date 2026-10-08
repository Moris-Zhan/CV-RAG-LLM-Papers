// 2026 AI 黑客松競賽情報簡報：ASUS UGen AI League × 2026 和泰 AI 黑客松
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.SKILL + "/scripts/apply_theme.js");
const OUT = process.argv[2] || "deck.pptx";

const F = "Microsoft JhengHei";
const THEME = {
  name: "Hackathon Brief",
  headFontFace: F,
  bodyFontFace: F,
  colors: {
    dk1: "1B1F2A", lt1: "FFFFFF", dk2: "14213D", lt2: "EEF2F7",
    accent1: "FF7A1A", accent2: "0E9AA7", accent3: "D7263D",
    accent4: "5B6C8F", accent5: "F4C542", accent6: "2E8B57",
    hlink: "0E9AA7", folHlink: "5B6C8F",
  },
};
const H = THEME.colors;
const NAVY = H.dk2, INK = H.dk1, ORANGE = H.accent1, TEAL = H.accent2, RED = H.accent3,
  SLATE = H.accent4, GOLD = H.accent5, GREEN = H.accent6, PALE = H.lt2, WHITE = "FFFFFF",
  MUTED = "5F6B7A", TEAL_T = "E3F4F5", RED_T = "FBE6E9", ORANGE_T = "FFF0E3";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "2026 AI 黑客松競賽情報";
pres.author = "CV-RAG-LLM-Papers";
pres.theme = { headFontFace: F, bodyFontFace: F };

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: WHITE },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 10.6, h: 0.85, fontFace: F, fontSize: 30, bold: true, color: NAVY, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "tag", type: "body", x: 11.0, y: 0.5, w: 1.75, h: 0.45, fontFace: F, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 }, text: "" } },
    { text: { text: "2026 AI 黑客松競賽情報｜資料來源：競賽官方網站（擷取於 2026/10/08）", options: { x: 0.6, y: 7.02, w: 9, h: 0.3, fontFace: F, fontSize: 9, color: MUTED, margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 7.0, w: 0.55, h: 0.3, fontFace: F, fontSize: 9, color: MUTED, align: "right" },
});
pres.defineSlideMaster({
  title: "DARK",
  background: { color: NAVY },
  objects: [],
});

const shadow = () => ({ type: "outer", color: "1B1F2A", opacity: 0.12, blur: 6, offset: 2, angle: 90 });
function T(s, text, x, y, w, h, o = {}) {
  s.addText(text, { x, y, w, h, fontFace: F, fontSize: 14, color: INK, valign: "top", margin: 0.05, isTextBox: true, ...o });
}
function card(s, x, y, w, h, fill = PALE, o = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.12, shadow: o.shadow === false ? undefined : shadow(), ...o.extra });
}
function dot(s, x, y, d, fill, label, fs = 14) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  T(s, label, x, y, d, d, { fontSize: fs, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
}
function bullets(items, o = {}) {
  return items.map((t, i) => {
    const run = typeof t === "string" ? { text: t } : t;
    return { text: run.text, options: { bullet: { indent: 14 }, breakLine: i < items.length - 1, paraSpaceAfter: 5, ...(run.options || {}), ...o } };
  });
}
function content(section, title, tag, tagColor) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  if (tag) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 11.0, y: 0.5, w: 1.75, h: 0.45, fill: { color: tagColor }, line: { color: tagColor }, rectRadius: 0.22 });
    s.addText(tag, { placeholder: "tag" });
  }
  return s;
}
function table(s, rows, x, y, w, colW, o = {}) {
  const head = o.headFill || NAVY;
  const data = rows.map((r, ri) => r.map((c) => {
    const cell = typeof c === "object" && c.text !== undefined ? c : { text: String(c) };
    return { text: cell.text, options: {
      fontFace: F, fontSize: o.fontSize || 12, color: ri === 0 ? WHITE : INK, bold: ri === 0 || !!cell.bold,
      fill: { color: ri === 0 ? head : (cell.fill || (ri % 2 ? WHITE : "F6F8FB")) }, valign: "middle",
      margin: [4, 6, 4, 6], ...(cell.options || {}) } };
  }));
  s.addTable(data, { x, y, w, colW, border: { type: "solid", pt: 0.5, color: "D5DBE3" }, rowH: o.rowH, autoPage: false });
}

/* ====================== 封面 ====================== */
pres.addSection({ title: "封面與總覽" });
let s = pres.addSlide({ masterName: "DARK", sectionTitle: "封面與總覽" });
T(s, "COMPETITION BRIEF · 2026", 0.8, 0.9, 8, 0.4, { fontSize: 14, bold: true, color: GOLD, charSpacing: 4 });
T(s, "2026 AI 黑客松競賽情報", 0.8, 1.45, 11.5, 1.1, { fontSize: 46, bold: true, color: WHITE });
T(s, "ASUS UGen AI League 創新黑客松  ×  2026 和泰 AI 黑客松", 0.8, 2.6, 11.5, 0.6, { fontSize: 22, color: "CADCFC" });
card(s, 0.8, 3.75, 5.6, 2.55, "1F3157", { shadow: false });
card(s, 6.9, 3.75, 5.6, 2.55, "1F3157", { shadow: false });
dot(s, 1.1, 4.05, 0.7, TEAL, "A", 22);
dot(s, 7.2, 4.05, 0.7, RED, "B", 22);
T(s, "ASUS UGen AI League", 2.0, 4.05, 4.2, 0.4, { fontSize: 18, bold: true, color: WHITE });
T(s, "主辦 ASUS｜協辦 Intel、Hailo\nEdge AI／Agentic AI 軟硬整合\n總獎金池逾 USD 20,000", 2.0, 4.5, 4.3, 1.6, { fontSize: 14, color: "D9E2F2", paraSpaceAfter: 4 });
T(s, "2026 和泰 AI 黑客松", 8.1, 4.05, 4.2, 0.4, { fontSize: 18, bold: true, color: WHITE });
T(s, "主辦 和泰汽車｜7 道集團企業命題\nGenAI × 大數據 × 移動服務\n總獎金逾新台幣 100 萬元", 8.1, 4.5, 4.3, 1.6, { fontSize: 14, color: "D9E2F2", paraSpaceAfter: 4 });
T(s, "資料擷取日 2026/10/08｜兩項賽事 Stage I／初賽皆於 2026/10/14 截止", 0.8, 6.65, 11.5, 0.4, { fontSize: 12, color: GOLD });

/* 總覽比較 */
s = content("封面與總覽", "兩項賽事一頁比較");
table(s, [
  ["項目", "ASUS UGen AI League 創新黑客松", "2026 和泰 AI 黑客松"],
  ["主辦／協辦", "華碩電腦；協辦 Intel、Hailo", "和泰汽車；合作夥伴 Google Cloud；承辦 獎金獵人"],
  ["核心命題", "Creator／Workplace／Everyday AI，搭配兩種運算平台", "7 道集團品牌真實命題（TOYOTA、LEXUS、HINO、iRent、yoxi、去趣）"],
  ["資格", "全球年滿 18 歲大專生、研究生、開發者與專業人士", "高中職、大專生及社會人士；隊長須具中華民國國籍"],
  ["隊伍人數", "1–5 人（可個人）", "2–5 人（不可個人）＋最多 2 位指導老師"],
  ["初賽截止", { text: "2026/10/14（三）17:00", bold: true }, { text: "2026/10/14（三）13:00", bold: true }],
  ["初賽繳件", "英文提案簡報 ≤ 20 頁＋英文影片 ≤ 3 分鐘", "PDF 簡報 ≤ 15 頁＋說明影片 ≤ 3 分鐘"],
  ["決賽", "2026/12/19 ASUS 總部（線上組遠端評選）", "2026/11/21 現場簡報＋ Prototype Demo"],
  ["獎金", "總獎金池 > USD 20,000（冠軍最高 USD 5,000＋加碼）", "總獎金 > NT$1,000,000（冠軍 NT$300,000）"],
], 0.6, 1.4, 12.1, [2.1, 5.0, 5.0], { fontSize: 12, rowH: 0.56 });

/* 倒數 */
s = content("封面與總覽", "時間只剩 6 天：兩項初賽同日截止");
card(s, 0.6, 1.5, 3.9, 4.9, NAVY);
T(s, "6", 0.6, 1.8, 3.9, 2.2, { fontSize: 140, bold: true, color: GOLD, align: "center", valign: "middle" });
T(s, "天（自 10/08 起算）", 0.6, 4.1, 3.9, 0.5, { fontSize: 18, color: WHITE, align: "center" });
T(s, "兩項賽事初賽都在\n2026/10/14（三）", 0.6, 4.75, 3.9, 1.2, { fontSize: 16, color: "CADCFC", align: "center" });
card(s, 4.9, 1.5, 3.75, 4.9, RED_T);
dot(s, 5.2, 1.8, 0.65, RED, "和");
T(s, "和泰 AI 黑客松", 6.0, 1.85, 2.5, 0.55, { fontSize: 17, bold: true, color: RED, valign: "middle" });
T(s, "13:00", 5.2, 2.65, 3.2, 0.9, { fontSize: 44, bold: true, color: INK });
T(s, bullets(["隊長登入「投稿紀錄」上傳 PDF 簡報", "附 3 分鐘 YouTube（不公開）影片連結", "步驟一＋步驟二須皆於截止前完成", "截止後才統一審核資格"]), 5.2, 3.6, 3.3, 2.6, { fontSize: 13 });
card(s, 8.95, 1.5, 3.75, 4.9, TEAL_T);
dot(s, 9.25, 1.8, 0.65, TEAL, "A");
T(s, "ASUS UGen AI League", 10.05, 1.85, 2.6, 0.55, { fontSize: 15, bold: true, color: TEAL, valign: "middle" });
T(s, "17:00", 9.25, 2.65, 3.2, 0.9, { fontSize: 44, bold: true, color: INK });
T(s, bullets(["英文提案簡報（正文 ≤ 20 頁）", "英文展演影片 ≤ 3 分鐘，YouTube 知道連結者可看", "附 GitHub 原始碼專案連結", "比賽時區 Asia/Taipei"]), 9.25, 3.6, 3.3, 2.6, { fontSize: 13 });

/* ====================== A. ASUS ====================== */
const SA = "A｜ASUS UGen AI League";
pres.addSection({ title: SA });
s = pres.addSlide({ masterName: "DARK", sectionTitle: SA });
dot(s, 0.8, 2.3, 1.1, TEAL, "A", 36);
T(s, "ASUS UGen AI League 創新黑客松", 2.2, 2.25, 10, 0.8, { fontSize: 36, bold: true, color: WHITE });
T(s, "從具體痛點出發，打造可運行、可驗證的 AI 應用原型", 2.2, 3.1, 10, 0.5, { fontSize: 18, color: "CADCFC" });
T(s, "contest.bhuntr.com/tw/39jg9vimiynrhlksze/home/", 2.2, 3.8, 10, 0.4, { fontSize: 13, color: GOLD });

s = content(SA, "競賽緣起：從 AI 能跑，到 AI 落地", "ASUS", TEAL);
T(s, bullets([
  "終端算力躍升、模型輕量化、部署工具成熟：開發者可依效能、資料架構、隱私與情境，自由選擇雲端、裝置端或混合架構",
  "硬體效能不再是瓶頸，下一步是把多元 AI 技術變成「直擊痛點」的落地應用",
  "期待團隊從一個具體痛點出發，打造可運行、可驗證的原型；無論 Edge AI 或 Enterprise AI，最終孵化成具商業價值的解決方案",
]), 0.6, 1.5, 7.4, 4.7, { fontSize: 18, paraSpaceAfter: 14 });
card(s, 8.5, 1.5, 4.2, 2.2, TEAL_T);
T(s, "主辦單位", 8.8, 1.7, 3.6, 0.4, { fontSize: 13, bold: true, color: TEAL });
T(s, "華碩電腦股份有限公司\nASUSTeK Computer Inc.", 8.8, 2.1, 3.7, 1.2, { fontSize: 16, bold: true });
card(s, 8.5, 4.0, 4.2, 2.2, PALE);
T(s, "協辦單位", 8.8, 4.2, 3.6, 0.4, { fontSize: 13, bold: true, color: SLATE });
T(s, "Intel Corporation\nHailo Technologies Ltd.", 8.8, 4.6, 3.7, 1.2, { fontSize: 16, bold: true });

s = content(SA, "三大主題方向：任一主題可搭配任一運算平台", "ASUS", TEAL);
[["Creator AI", "創作體驗", "讓創作靈感更即時地轉化為成果", "智慧影像處理與即時渲染、資料整理、使用者或物件屬性的情境感知", ORANGE],
 ["Workplace AI", "工作場域", "提升工作場域的效率與安全", "訪客監控、安全帽偵測、實驗室樣本溫度分析、視覺品質檢測", TEAL],
 ["Everyday AI", "日常生活", "將低功耗智慧落實於居家與日常", "兒童與寵物行為偵測、智慧穿搭建議、姿勢監測等個人化工具", GREEN]]
  .forEach(([en, zh, core, ex, c], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.5, 3.8, 4.7, PALE);
    dot(s, x + 0.3, 1.8, 0.7, c, String(i + 1), 20);
    T(s, en, x + 0.3, 2.65, 3.3, 0.5, { fontSize: 22, bold: true, color: c });
    T(s, zh, x + 0.3, 3.15, 3.3, 0.4, { fontSize: 15, bold: true, color: MUTED });
    T(s, core, x + 0.3, 3.65, 3.3, 0.8, { fontSize: 15, bold: true });
    T(s, "發想舉例：" + ex, x + 0.3, 4.5, 3.3, 1.5, { fontSize: 13, color: MUTED });
  });
T(s, "每隊選一個主題 + 一個運算平台（賽道），僅能以一件作品報名一個運算平台", 0.6, 6.4, 12, 0.4, { fontSize: 13, bold: true, color: TEAL });

s = content(SA, "兩大賽道：依算力需求選擇運算平台", "ASUS", TEAL);
[["Battlefield Lightning", "輕量運算組", "ASUS UGen300 AI Accelerator（M.2 或 USB）", [
  "搭載 Hailo-10H AI 晶片", "最高 40 TOPS（INT4）＋ 8GB 專屬記憶體", "支援 150+ 種預訓練模型", "適合本地推論、影像辨識、情境感知等 Edge AI",
  "Stage II：每隊獲贈一台 UGen300，賽後無須歸還"], ORANGE, ORANGE_T],
 ["Battlefield Thunderstorm", "高效開發組", "ASUS UGen Intel Arc Pro B70 32GB", [
  "最高 367 TOPS（INT8）", "32GB 記憶體", "適合高算力、大型代理式 AI（Agentic AI）工作負載",
  "Stage II：主辦提供虛擬主機，透過 SDV 系統開發驗證", "實體組可另約 ASUS 總部測試空間實機驗證"], TEAL, TEAL_T]]
  .forEach(([name, zh, hw, pts, c, bg], i) => {
    const x = 0.6 + i * 6.15;
    card(s, x, 1.45, 5.95, 5.0, bg);
    T(s, name, x + 0.3, 1.65, 5.4, 0.5, { fontSize: 22, bold: true, color: c });
    T(s, zh + "｜" + hw, x + 0.3, 2.15, 5.4, 0.7, { fontSize: 14, bold: true });
    T(s, bullets(pts), x + 0.3, 2.95, 5.4, 3.3, { fontSize: 14 });
  });
T(s, "完整硬體規格、系統需求、開發工具與資源取得方式，見競賽網站「運算平台說明」專頁", 0.6, 6.55, 12, 0.35, { fontSize: 11, color: MUTED });

s = content(SA, "參賽資格、組隊規則與兩種參賽形式", "ASUS", TEAL);
T(s, "參加資格", 0.6, 1.45, 4.4, 0.4, { fontSize: 16, bold: true, color: TEAL });
T(s, "開放全球年滿 18 歲之大專院校學生、研究生、開發者及各領域專業人士；國籍不限。需具備 AI 模型佈署與軟硬體整合基本能力，以完成 Stage II 實機／指定環境驗證。", 0.6, 1.9, 4.4, 1.9, { fontSize: 13 });
T(s, "組隊規則", 0.6, 3.9, 4.4, 0.4, { fontSize: 16, bold: true, color: TEAL });
T(s, bullets(["每隊 1–5 人，個人或團體皆可", "歡迎跨背景、跨專業、跨院校組隊", "每人限一件作品，不得重複報名"]), 0.6, 4.35, 4.4, 1.8, { fontSize: 13 });
table(s, [
  ["", "國際線上組 Global Online", "實體競賽組 Onsite"],
  ["決賽形式", "提案簡報＋實機展演影片＋GitHub 遠端評選", "另須於 ASUS 總部現場提案、問答與實機展演"],
  ["是否到場", "無須到場", "2026/12/19（六）親赴 ASUS 總部"],
  ["入圍名額", "每賽道前 5 隊", "每賽道前 5 隊"],
], 5.4, 1.5, 7.3, [1.4, 2.95, 2.95], { fontSize: 12, rowH: 0.75, headFill: TEAL });
card(s, 5.4, 4.85, 7.3, 1.35, ORANGE_T, { shadow: false });
T(s, "報名限制：每隊只能選一個賽道，並在該賽道下擇一參賽形式；不得跨賽道、跨組別或重複報名。參賽形式只影響決賽繳交與評選方式。", 5.65, 5.0, 6.85, 1.1, { fontSize: 13, valign: "middle" });

s = content(SA, "賽程：兩階段，從方案海選到實機決賽", "ASUS", TEAL);
const tlA = [["9/4（五）", "線上徵件開跑"], ["9/30（三）", "ASUS × Hailo、ASUS × Intel 技術線上說明會"], ["10/14（三）", "Stage I 提案截止 17:00"],
  ["10/26（一）", "公布入圍；寄送 UGen300、開放 SDV 與總部測試空間預約"], ["11/6–12/4", "Stage II 開發期"], ["12/4（五）", "國際線上組決賽提交截止"],
  ["12/10（四）", "實體組決賽簡報截止"], ["12/19（六）", "決賽暨頒獎典禮（ASUS 總部立功大樓）"]];
s.addShape(pres.shapes.LINE, { x: 0.9, y: 3.0, w: 11.6, h: 0, line: { color: "C5CEDA", width: 2 } });
tlA.forEach(([d, e], i) => {
  const x = 0.6 + i * 1.5, hi = i === 2;
  dot(s, x + 0.45, 2.78, 0.44, hi ? RED : TEAL, String(i + 1), 12);
  T(s, d, x, 1.85, 1.4, 0.7, { fontSize: 13, bold: true, color: hi ? RED : NAVY, align: "center", valign: "bottom" });
  T(s, e, x, 3.4, 1.4, 1.8, { fontSize: 12, align: "center", color: hi ? RED : INK, bold: hi });
});
card(s, 0.6, 5.3, 5.9, 1.45, TEAL_T, { shadow: false });
T(s, "Stage I｜方案海選：繳交企劃書與設計概念架構，不限指定硬體（筆電、SBC、虛擬主機皆可模擬）。每賽道選 10 隊（線上 5＋實體 5），共 20 隊晉級。", 0.8, 5.4, 5.5, 1.25, { fontSize: 12, valign: "middle" });
card(s, 6.8, 5.3, 5.9, 1.45, ORANGE_T, { shadow: false });
T(s, "Stage II｜實機開發與決賽：必須使用所選賽道的指定平台與主辦開發環境，完成原型開發、軟硬體整合與效能驗證，依參賽形式繳交成果。", 7.0, 5.4, 5.5, 1.25, { fontSize: 12, valign: "middle" });

s = content(SA, "Stage I 初賽繳件規範（10/14 截止）", "ASUS", TEAL);
card(s, 0.6, 1.45, 6.6, 5.2, PALE);
dot(s, 0.9, 1.7, 0.6, TEAL, "1");
T(s, "提案簡報", 1.65, 1.72, 5, 0.55, { fontSize: 20, bold: true, valign: "middle" });
T(s, "全份英文；正文 ≤ 20 頁（附錄不計）。必須涵蓋：", 0.9, 2.45, 6.1, 0.5, { fontSize: 14 });
T(s, bullets(["情境背景與問題定義", "解決方案（採用之工具、技術與方法論）", "軟硬體架構設計與系統規劃", "預期效益與產出成果", "參考文獻與 GitHub 原始碼專案連結"]), 0.9, 3.0, 6.1, 3.4, { fontSize: 15 });
card(s, 7.5, 1.45, 5.2, 5.2, PALE);
dot(s, 7.8, 1.7, 0.6, ORANGE, "2");
T(s, "實機展演影片", 8.55, 1.72, 4, 0.55, { fontSize: 20, bold: true, valign: "middle" });
T(s, bullets(["英文說明為主", "建議 3 分鐘以內", "說明提案構想與功能操作", "上傳 YouTube，設定「知道連結者可觀看」", "繳件時提供網址"]), 7.8, 2.45, 4.7, 3.9, { fontSize: 15 });

s = content(SA, "決賽繳件：線上組 vs. 實體組", "ASUS", TEAL);
card(s, 0.6, 1.45, 6.0, 5.2, TEAL_T);
T(s, "國際線上組｜12/4 截止", 0.9, 1.65, 5.5, 0.5, { fontSize: 19, bold: true, color: TEAL });
T(s, bullets(["英文決賽簡報", "實機展演影片 ≤ 10 分鐘，英文說明",
  "Lightning：須呈現 UGen300 實際運作畫面", "Thunderstorm：須呈現虛擬環境／SDV 系統實際操作與驗證",
  "完整 GitHub：系統架構圖、README、模型資訊、效能驗證資料", "結果 12/19 與實體組同步公布"]), 0.9, 2.25, 5.5, 4.2, { fontSize: 14 });
card(s, 6.9, 1.45, 5.8, 5.2, ORANGE_T);
T(s, "實體競賽組｜12/19 現場", 7.2, 1.65, 5.3, 0.5, { fontSize: 19, bold: true, color: ORANGE });
T(s, bullets(["英文決賽簡報 12/10 前繳交", "舞台提案說明、評審問答、成果展演（口說不限英文）",
  "技術審核：提交 GitHub 文件，評審可抽驗程式邏輯、README 與硬體整合細節", "地點：ASUS 總部立功大樓（臺北市北投區立德路 115 號）", "得獎結果現場公布，同日頒獎"]), 7.2, 2.25, 5.3, 4.2, { fontSize: 14 });

s = content(SA, "評分標準：商業潛力與可行性最重", "ASUS", TEAL);
s.addChart(pres.charts.BAR, [{ name: "比重", labels: ["商業潛力與可行性", "創新與創意", "實用價值", "敘事表達與展現力"], values: [35, 30, 25, 10] }], {
  x: 0.6, y: 1.4, w: 6.6, h: 5.2, barDir: "bar", chartColors: [TEAL], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"',
  dataLabelFontFace: "+mn-lt", dataLabelFontSize: 14, dataLabelColor: INK, catAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: 13, catAxisLabelColor: INK,
  valAxisHidden: true, valAxisMaxVal: 40, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, catAxisOrientation: "maxMin", barGapWidthPct: 60,
});
const critA = [["商業潛力與可行性 35%", "軟硬體架構是否可實施、預期成果是否可達成"], ["創新與創意 30%", "概念原創性，以及硬體整合方案的獨特性"],
  ["實用價值 25%", "所解決問題的實質意義與終端使用者採用可能性"], ["敘事表達與展現力 10%", "說明的感染力、流暢度與視覺傳達"]];
critA.forEach(([h, d], i) => {
  T(s, h, 7.6, 1.5 + i * 1.2, 5.1, 0.4, { fontSize: 15, bold: true, color: TEAL });
  T(s, d, 7.6, 1.9 + i * 1.2, 5.1, 0.7, { fontSize: 13 });
});
T(s, "評審：UGen AI League Committee（ASUS、Intel、Hailo AI 專家）", 7.6, 6.35, 5.1, 0.4, { fontSize: 11, color: MUTED });

s = content(SA, "獎項與獎金：總獎金池逾 USD 20,000", "ASUS", TEAL);
table(s, [
  ["獎項", "Battlefield Lightning", "Battlefield Thunderstorm", "實體組加碼"],
  ["冠軍", "USD 4,500", "USD 5,000", "+ USD 1,000"],
  ["最佳創新獎", "USD 1,500", "USD 1,700", "+ USD 200"],
  ["最佳硬體整合獎", "USD 1,500", "USD 1,700", "+ USD 200"],
  ["最佳商業潛力獎", "USD 1,500", "USD 1,700", "+ USD 200"],
], 0.6, 1.5, 7.6, [2.0, 1.95, 2.15, 1.5], { fontSize: 14, rowH: 0.62, headFill: TEAL });
card(s, 8.6, 1.5, 4.1, 3.1, NAVY);
T(s, "USD 6,000", 8.8, 1.75, 3.7, 0.9, { fontSize: 36, bold: true, color: GOLD });
T(s, "單一隊伍最高可得：\nThunderstorm 冠軍 USD 5,000＋實體組加碼 USD 1,000", 8.8, 2.7, 3.7, 1.6, { fontSize: 13, color: WHITE });
T(s, bullets(["同賽道的線上組與實體組合併評選、共同競逐獎項", "每位獲獎者另獲 ASUS Certificate of Achievement", "作品不足或未達標準，得由過半數評審決議從缺或調整"]), 0.6, 4.95, 12, 1.8, { fontSize: 13 });

s = content(SA, "作品規範、智財授權與稅務", "ASUS", TEAL);
[["原創與權利擔保", ["限未曾公開發表、參賽、展出或獲獎之作品", "須合法擁有圖片、文字、程式碼、模型、資料等素材使用權", "不得含暴力、色情、侵權、詆毀或無關廣告", "作品概不退還，請自行備份"]],
 ["作品授權", ["著作人格權歸參賽者", "得獎作品著作財產權永久、無償授權主辦及 Intel、Hailo 國內外使用，並可再授權", "未獲獎作品超出成果展示範圍之使用，另行簽約", "附件：著作財產權授權暨肖像授權同意書（.docx）"]],
 ["稅務與領獎", ["境內居住者年度獎項 > NT$1,000 開扣繳憑單", "≥ NT$20,010 須先繳 10% 機會中獎稅", "非境內居住者一律先扣 20%", "逾期未回覆或資料錯誤視同放棄"]]]
  .forEach(([h, pts], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.45, 3.8, 5.2, PALE);
    T(s, h, x + 0.3, 1.65, 3.3, 0.5, { fontSize: 18, bold: true, color: TEAL });
    T(s, bullets(pts), x + 0.3, 2.25, 3.3, 4.2, { fontSize: 14.5, paraSpaceAfter: 8 });
  });

s = content(SA, "其他注意事項與聯絡方式", "ASUS", TEAL);
T(s, bullets(["預留上傳與檢查時間；是否完成繳件以系統後台收件紀錄為準", "系統異常：截止前將問題說明與畫面截圖寄至賽務信箱", "主辦得檢視偽造、詐欺、冒名、利用系統漏洞等行為並取消資格", "主辦得取消、終止、修改或暫停活動，以網站公告為準",
  "投稿後「待審核」狀態可自行修改；通過審核後需聯繫主辦", "保存投稿序號（SID）信件以便查詢", "目前「最新公告」尚無內容"]), 0.6, 1.5, 7.2, 5.2, { fontSize: 14 });
card(s, 8.2, 1.5, 4.5, 4.4, NAVY);
T(s, "賽務小組", 8.5, 1.75, 4, 0.4, { fontSize: 14, bold: true, color: GOLD });
T(s, "asus_aihackathon@bhuntr.com", 8.5, 2.2, 4, 0.5, { fontSize: 15, bold: true, color: WHITE });
T(s, "02-7730-7613", 8.5, 2.75, 4, 0.5, { fontSize: 20, bold: true, color: WHITE });
T(s, "獎金獵人客服：contest@bhuntr.com\nLINE@ @bhuntr", 8.5, 3.45, 4, 0.9, { fontSize: 13, color: "CADCFC" });
T(s, "報名：競賽頁「馬上報名」\n說明／公告／Q&A 三個分頁", 8.5, 4.6, 4, 1.0, { fontSize: 13, color: "CADCFC" });

/* ====================== B. 和泰 ====================== */
const SB = "B｜2026 和泰 AI 黑客松";
pres.addSection({ title: SB });
s = pres.addSlide({ masterName: "DARK", sectionTitle: SB });
dot(s, 0.8, 2.3, 1.1, RED, "B", 36);
T(s, "2026 和泰 AI 黑客松", 2.2, 2.25, 10, 0.8, { fontSize: 36, bold: true, color: WHITE });
T(s, "以 AI 為核心動力，讓創意成為可落地的解決方案", 2.2, 3.1, 10, 0.5, { fontSize: 18, color: "CADCFC" });
T(s, "ht-hackathon.tw/tw/home/", 2.2, 3.8, 10, 0.4, { fontSize: 13, color: GOLD });

s = content(SB, "AI First：以集團真實營運場景為舞台", "和泰", RED);
const evo = [["2022", "MaaS 數據黑客松", "數據探索啟動創新"], ["2024", "MaaS 黑客松", "深入 MaaS 生態圈實踐"], ["2026", "AI 黑客松", "AI First，GenAI＋大數據"]];
evo.forEach(([y, n, d], i) => {
  const x = 0.6 + i * 2.55;
  card(s, x, 1.5, 2.35, 2.2, i === 2 ? RED : PALE);
  T(s, y, x + 0.2, 1.65, 2, 0.7, { fontSize: 30, bold: true, color: i === 2 ? WHITE : RED });
  T(s, n, x + 0.2, 2.4, 2, 0.45, { fontSize: 14, bold: true, color: i === 2 ? WHITE : INK });
  T(s, d, x + 0.2, 2.85, 2, 0.7, { fontSize: 12, color: i === 2 ? "FFE3E7" : MUTED });
});
T(s, bullets(["和泰汽車攜手集團品牌共同出題：顧客服務、售後體驗、共享出行、商用車聯網、跨境通訊、品牌行銷", "每一道題目都來自企業真實需求", "兩階段：初賽重策略思維與提案邏輯；決賽經工作坊深化技術與可行性，現場以實作成果與 Prototype 展示"]), 0.6, 4.0, 7.5, 2.8, { fontSize: 14 });
card(s, 8.6, 1.5, 4.1, 5.2, NAVY);
T(s, "總獎金", 8.9, 1.75, 3.5, 0.4, { fontSize: 14, color: "CADCFC" });
T(s, "NT$100 萬+", 8.9, 2.15, 3.6, 0.9, { fontSize: 34, bold: true, color: GOLD });
T(s, "最高獎金", 8.9, 3.3, 3.5, 0.4, { fontSize: 14, color: "CADCFC" });
T(s, "NT$30 萬", 8.9, 3.7, 3.6, 0.9, { fontSize: 34, bold: true, color: WHITE });
T(s, "決賽入圍 15 隊\n17 隊得獎（含佳作）", 8.9, 4.9, 3.6, 1.0, { fontSize: 15, color: "CADCFC" });

s = content(SB, "七道企業挑戰題目", "和泰", RED);
const ch = [["TOYOTA", "智能轉型：AI 助攻油轉電 TOYOTA EV 新生活"], ["TOYOTA", "運用 AI 再造 TOYOTA 下一代顧客售後服務體驗"], ["LEXUS", "AI 流失風險洞察與智慧溝通：打造 Lexus 車主忠誠度的終極防線"],
  ["HINO", "HINO x GenAI：運用商用車車聯網大數據，發展商用車頭家的智慧夥伴"], ["iRent", "運用 AI 打造 iRent 智能車況管家：優化租還車體驗與營運效率"], ["yoxi", "不搭車，也打開 yoxi：打造高頻互動的 AI 出行夥伴"], ["去趣 eSIM", "打造去趣 eSIM 全旅程智能銷售與服務體驗"]];
ch.forEach(([b, t], i) => {
  const col = i % 4, row = Math.floor(i / 4), x = 0.6 + col * 3.07, y = 1.45 + row * 2.6;
  const hi = b === "iRent";
  card(s, x, y, 2.87, 2.35, hi ? RED : PALE);
  T(s, String(i + 1).padStart(2, "0") + "｜" + b, x + 0.2, y + 0.18, 2.5, 0.45, { fontSize: 15, bold: true, color: hi ? WHITE : RED });
  T(s, t, x + 0.2, y + 0.7, 2.5, 1.5, { fontSize: 13, bold: true, color: hi ? WHITE : INK });
});
card(s, 0.6 + 3 * 3.07, 1.45 + 2.6, 2.87, 2.35, ORANGE_T, { shadow: false });
T(s, "每題限投一件；每隊最多投 7 件（一案一報名），同一提案不可重複或混合投稿", 0.6 + 3 * 3.07 + 0.2, 1.45 + 2.6 + 0.2, 2.5, 1.95, { fontSize: 13, color: INK, valign: "middle" });

s = content(SB, "題目 05｜iRent 智能車況管家（我方選題）", "和泰", RED);
T(s, "營運痛點", 0.6, 1.45, 3.8, 0.4, { fontSize: 15, bold: true, color: RED });
T(s, "後台需大量人力即時查看取還車照片，難以第一時間攔截車損、髒亂等異常", 0.6, 1.85, 3.8, 1.1, { fontSize: 13 });
T(s, "體驗痛點", 0.6, 3.05, 3.8, 0.4, { fontSize: 15, bold: true, color: RED });
T(s, "用戶拍攝角度錯誤、照片模糊，或承接上一手髒亂車輛，造成不良體驗與客訴", 0.6, 3.45, 3.8, 1.1, { fontSize: 13 });
card(s, 0.6, 4.7, 3.8, 2.0, RED_T, { shadow: false });
T(s, "解題資源（報名後次一工作日 17:00 前寄出）：iRent 小學堂取車認證／付款還車流程；車外車內照片上傳清單、有／無索賠車輛照片；取還車拍照流程圖", 0.8, 4.8, 3.45, 1.8, { fontSize: 11.5, valign: "middle" });
[["環節一", "即時防呆介入", "上傳當下判斷照片品質：位置是否正確、模糊、未拍到車牌、角度不對、太遠太近、太髒等"],
 ["環節二", "AI 車況辨識", "車身照比對本次租用的「新車損」並預警；車內照分類「髒汙（須立即清潔）／普通／乾淨」，髒汙即預警；具後台預警與通知機制"],
 ["環節三", "營運即時調度", "設計流程或機制，讓客服與營運人員即時得知車況（清潔或車損），安排後續整備與清潔"]]
  .forEach(([k, h, d], i) => {
    const y = 1.45 + i * 1.75;
    card(s, 4.8, y, 7.9, 1.55, PALE);
    dot(s, 5.05, y + 0.42, 0.7, RED, String(i + 1), 20);
    T(s, k + "｜" + h, 6.0, y + 0.12, 6.5, 0.4, { fontSize: 15, bold: true, color: RED });
    T(s, d, 6.0, y + 0.52, 6.5, 0.95, { fontSize: 12.5 });
  });
T(s, "加分：在基本功能之上提出創新服務流程或 UX 優化，展現超越純技術實現的價值", 4.8, 6.75, 7.9, 0.3, { fontSize: 11, bold: true, color: RED });

s = content(SB, "其他六題：核心任務與解題資源", "和泰", RED);
table(s, [
  ["題目", "核心任務", "主辦提供／可用資源"],
  ["TOYOTA 油轉電", "為油車車主設計個人化 AI 工具：需求診斷、情境模擬、顧問式推薦（以 bZ4X 為入門），定義通路、User Journey 與 KPI", "第三方市調報告與原始資料、型錄配備表、去個資化 CDP 會員資料"],
  ["TOYOTA 售後服務", "提升服務專員維修解說品質與效率、重塑客休等待體驗，找出「品牌高峰體驗」", "車主指南網站、LINE 預約手冊、回廠流程手冊；可假設串接保養紀錄、行車與 APP 數據"],
  ["LEXUS 流失風險", "爬梳 PTT／Dcard／Mobile01 輿情，建構 Persona、辨識流失風險，產出 AI 溝通計畫與流程", "Lexus 保修服務網頁、車主手冊；自行蒐集社群公開資料"],
  ["HINO 商用車", "整合 iTRAQ 車聯網數據與 GenAI，打造「AI 節能夥伴」或「AI 安全駕駛教練」並量化效益", "iTRAQ 官網、4,000+ 輛商用車車聯網大數據"],
  ["yoxi 出行夥伴", "設計讓用戶「不搭車也每天打開 yoxi」的日常互動服務，含商業轉換、技術架構與成效驗證", "去識別化叫車時段頻率、POI、熱門上下車點、交通樞紐與活動熱點"],
  ["去趣 eSIM", "以 GenAI 打造行前個人化行銷與病毒式導購，提出完整 GenAI 行銷方案（日韓中港澳市場）", "現行行銷管道：數位投廣、部落客、社群、和泰車主管道"],
], 0.6, 1.4, 12.1, [2.0, 5.5, 4.6], { fontSize: 11.5, headFill: RED, rowH: 0.78 });

s = content(SB, "參賽資格與提案規則", "和泰", RED);
[["參賽對象", "高中職、大專院校學生及社會人士，不限科系，可混合組隊。未滿 18 歲須附法定代理人同意書。", "1"],
 ["團隊人數", "每隊 2–5 人，不開放個人及跨隊。可增設至多 2 位指導老師（不限教授，不計人數），但提案須由成員主導。", "2"],
 ["隊長", "每隊一名隊長，須具中華民國國籍，負責與主辦聯繫、上傳提案與代表領獎。", "3"],
 ["利益迴避", "和泰汽車及其關係企業（含和運租車、和雲行動服務等數十家）任職人員不得參賽。", "4"]]
  .forEach(([h, d, n], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = 0.6 + col * 6.15, y = 1.45 + row * 2.6;
    card(s, x, y, 5.95, 2.35, PALE);
    dot(s, x + 0.3, y + 0.3, 0.6, RED, n);
    T(s, h, x + 1.1, y + 0.32, 4.5, 0.55, { fontSize: 18, bold: true, valign: "middle" });
    T(s, d, x + 0.3, y + 1.0, 5.4, 1.25, { fontSize: 15 });
  });

s = content(SB, "初賽繳交內容：15 頁簡報＋3 分鐘影片", "和泰", RED);
card(s, 0.6, 1.45, 3.4, 2.4, RED);
T(s, "15 頁", 0.85, 1.6, 3, 0.9, { fontSize: 40, bold: true, color: WHITE });
T(s, "內解決方案 PDF 簡報，建議依官方「初賽簡報模板」", 0.85, 2.55, 3, 1.1, { fontSize: 13, color: WHITE });
card(s, 0.6, 4.1, 3.4, 2.6, NAVY);
T(s, "3 分鐘", 0.85, 4.25, 3, 0.9, { fontSize: 40, bold: true, color: GOLD });
T(s, "方案說明影片，YouTube「不公開」，連結須維持可看至 11/21", 0.85, 5.2, 3, 1.3, { fontSize: 13, color: WHITE });
T(s, "七大必要架構（順序與美編可自由）", 4.4, 1.45, 8, 0.45, { fontSize: 16, bold: true, color: RED });
["提案概述", "目標對象與痛點分析", "解決方案設計", "AI 應用方法", "獨特優勢與差異化", "預期效益與落地評估", "補充資料"].forEach((t, i) => {
  const col = i % 2, row = Math.floor(i / 2), x = 4.4 + col * 4.15, y = 2.0 + row * 0.75;
  dot(s, x, y, 0.5, i % 2 ? SLATE : RED, String(i + 1), 13);
  T(s, t, x + 0.65, y, 3.4, 0.5, { fontSize: 15, bold: true, valign: "middle" });
});
card(s, 4.4, 5.15, 8.3, 1.55, ORANGE_T, { shadow: false });
T(s, "影片標題格式：出題企業_作品名稱_2026 和泰 AI 黑客松\n例：iRent_智慧車況管家_2026 和泰 AI 黑客松｜每案限單一挑戰主題；決賽須展示完整 Prototype 或 Demo", 4.6, 5.25, 7.9, 1.35, { fontSize: 13, valign: "middle" });

s = content(SB, "活動時程", "和泰", RED);
const tlB = [["05–06", "校園創新巡迴講座"], ["6/24", "線上說明會（已有錄影）"], ["7/08", "AI 應用分享會：創意成形"], ["8/05", "AI 應用分享會：技術轉譯"],
  ["8/15", "AI 創新體驗日 @Google TPKD"], ["8/31 13:00", "早鳥：完成步驟一"], ["10/14 13:00", "初賽報名繳件截止"], ["10/28 13:00", "公布決賽 15 隊"],
  ["11/07", "決賽工作坊（業師一對一）"], ["11/18 23:59", "最終提案 ≤ 30 頁 PDF"], ["11/21", "成果發表暨頒獎"]];
tlB.forEach(([d, e], i) => {
  const done = i < 6, hi = i === 6;
  const col = i < 6 ? i : i - 6, row = i < 6 ? 0 : 1;
  const x = 0.6 + col * 2.05 + (row ? 1.0 : 0), y = 1.55 + row * 2.6;
  card(s, x, y, 1.85, 2.15, hi ? RED : done ? "F1F3F6" : RED_T, { shadow: !done });
  T(s, d, x + 0.12, y + 0.15, 1.65, 0.5, { fontSize: 14, bold: true, color: hi ? WHITE : done ? MUTED : RED });
  T(s, e, x + 0.12, y + 0.7, 1.65, 1.3, { fontSize: 12.5, color: hi ? WHITE : done ? MUTED : INK, bold: hi });
});
T(s, "灰色＝已過（以 10/08 計）｜決賽入圍隊伍須過半隊員出席 11/07 工作坊（4 人隊至少 3 人），否則取消資格由後位遞補", 0.6, 6.5, 12, 0.4, { fontSize: 11.5, color: MUTED });

s = content(SB, "報名兩步驟與參賽加碼", "和泰", RED);
[["步驟 1", "填寫團隊基本資料", ["官網「我要報名」線上填寫，送出後寄「報名成功通知信」至隊長信箱（含 SID）", "完成後可領 Google Cloud Skills Boost USD 150 Learning Credits（須滿 18 歲）", "未滿 18 歲隊員於此步驟上傳法定代理人同意書", "解題資源信件：次一工作日 17:00 前另寄，留意垃圾信件匣"]],
 ["步驟 2", "繳交初賽提案", ["10/14 13:00 前隊長登入 → 頭像 →「投稿紀錄」→「前往修改」", "上傳 PDF 簡報＋3 分鐘影片連結 → 送出「請求更新」", "截止前可反覆修改，以最後一次為準", "已備妥可與步驟一同時完成"]]]
  .forEach(([k, h, pts], i) => {
    const x = 0.6 + i * 4.35;
    card(s, x, 1.45, 4.15, 5.25, PALE);
    T(s, k, x + 0.3, 1.6, 3.5, 0.45, { fontSize: 14, bold: true, color: RED });
    T(s, h, x + 0.3, 2.05, 3.6, 0.5, { fontSize: 19, bold: true });
    T(s, bullets(pts), x + 0.3, 2.7, 3.6, 3.9, { fontSize: 12.5 });
  });
card(s, 9.3, 1.45, 3.4, 5.25, NAVY);
T(s, "狀態說明", 9.55, 1.6, 3, 0.4, { fontSize: 14, bold: true, color: GOLD });
T(s, bullets(["確認參賽資格：等待審核", "確認參賽資格（已修改）：步驟二已送出", "請求修改：依指示補件", "通過審核：進入初賽評審"]), 9.55, 2.05, 2.95, 2.6, { fontSize: 12, color: WHITE });
T(s, "務必完成獎金獵人帳號驗證，否則收不到任何競賽通知", 9.55, 4.8, 2.95, 1.0, { fontSize: 12, bold: true, color: GOLD });
T(s, "早鳥 8/31 已過", 9.55, 5.9, 2.95, 0.5, { fontSize: 12, color: "CADCFC" });

s = content(SB, "評審標準：初賽重主題連結，決賽重落地", "和泰", RED);
const chartOpt = (c) => ({
  barDir: "bar", chartColors: [c], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelFontFace: "+mn-lt", dataLabelFontSize: 13, dataLabelColor: INK,
  catAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: 12, catAxisLabelColor: INK, valAxisHidden: true, valAxisMaxVal: 36, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  showLegend: false, catAxisOrientation: "maxMin", barGapWidthPct: 55, showTitle: true, titleFontFace: "+mn-lt", titleFontSize: 15, titleColor: NAVY,
});
s.addChart(pres.charts.BAR, [{ name: "初賽", labels: ["主題連結度", "創意表現", "提案可行性", "AI 應用整合性"], values: [30, 25, 25, 20] }], { x: 0.6, y: 1.4, w: 5.9, h: 2.9, title: "初賽｜線上書面評審", ...chartOpt(RED) });
s.addChart(pres.charts.BAR, [{ name: "決賽", labels: ["提案可行性", "AI 應用整合性", "商業應用價值", "作品完成度", "簡報表達"], values: [25, 20, 20, 20, 15] }], { x: 6.8, y: 1.4, w: 5.9, h: 2.9, title: "決賽｜現場 Demo＋Prototype", ...chartOpt(NAVY) });
T(s, bullets(["主題連結度：緊扣命題核心、真實對應品牌營運痛點，避免答非所問", "創意表現：跳脫既有框架、令人耳目一新的切入角度", "提案可行性：技術路徑、資源需求與落地方式清楚可執行", "AI 應用整合性：AI 角色是否關鍵、帶來實質價值"]), 0.6, 4.5, 5.9, 2.4, { fontSize: 12 });
T(s, bullets(["AI 整合：能否串成完整可運作的應用流程", "商業價值：效率提升、成本降低或新營收", "作品完成度：Prototype 完成度與穩定性、可實際操作", "簡報表達：清晰度、邏輯與時間掌握"]), 6.8, 4.5, 5.9, 2.4, { fontSize: 12 });

s = content(SB, "獎項：17 隊得獎，總獎金逾 NT$100 萬", "和泰", RED);
s.addChart(pres.charts.BAR, [{ name: "單隊獎金（萬元）", labels: ["冠軍 ×1", "亞軍 ×1", "季軍 ×1", "潛力新星獎 ×4", "佳作 ×8"], values: [30, 25, 20, 5, 1] }], {
  x: 0.6, y: 1.4, w: 7.4, h: 5.2, barDir: "col", chartColors: [RED], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"萬"', dataLabelFontFace: "+mn-lt", dataLabelFontSize: 14, dataLabelColor: INK,
  catAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: 13, catAxisLabelColor: INK, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 50,
  showTitle: true, title: "各獎項單隊獎金（新台幣萬元）", titleFontFace: "+mn-lt", titleFontSize: 15, titleColor: NAVY,
});
card(s, 8.4, 1.5, 4.3, 2.4, NAVY);
T(s, "NT$103 萬", 8.65, 1.7, 3.9, 0.9, { fontSize: 34, bold: true, color: GOLD });
T(s, "30＋25＋20＋5×4＋1×8 萬\n冠亞季另頒獎盃乙座", 8.65, 2.6, 3.9, 1.1, { fontSize: 13, color: WHITE });
T(s, bullets(["每位得獎成員及指導老師皆有獎狀", "獎金為含稅金額，≥ NT$1,000 列入綜所稅；依法須先繳扣繳稅額", "獎金由隊長代表領取，全體團員須簽授權同意書", "未達標準得由過半評審決議從缺"]), 8.4, 4.15, 4.3, 2.7, { fontSize: 12.5 });

s = content(SB, "重要注意事項：資料、智財與授權", "和泰", RED);
[["解題數據", "僅供本競賽使用，不得外流或另作他用；競賽結束後須銷毀所有資料及衍生物，違者除名並負法律責任"],
 ["智財權", "作品智財歸團隊；入圍者同意無償非營利授權主辦使用作品及說明（不含團隊產出之程式、軟體、系統）"],
 ["優先洽談", "入圍名單公布後，主辦對作品、提案與衍生智財之轉讓或授權享有優先洽談權"],
 ["原創性", "須為未公開發表的原創作品，不得為市售或具商業用途之創作；違者取消資格並追回獎金"],
 ["肖像授權", "同意主辦拍攝並使用肖像、姓名、聲音於宣傳；決賽入圍與得獎者須簽授權同意書"],
 ["收件時間", "以主辦電腦收件時間為準；系統問題須於截止前連同截圖寄至客服信箱，否則不受理"]]
  .forEach(([h, d], i) => {
    const col = i % 3, row = Math.floor(i / 3), x = 0.6 + col * 4.1, y = 1.45 + row * 2.65;
    card(s, x, y, 3.85, 2.4, PALE);
    T(s, h, x + 0.25, y + 0.2, 3.4, 0.45, { fontSize: 17, bold: true, color: RED });
    T(s, d, x + 0.25, y + 0.7, 3.4, 1.6, { fontSize: 14 });
  });

s = content(SB, "報名資料下載與聯絡方式", "和泰", RED);
T(s, "報名資料下載區（官網首頁）", 0.6, 1.45, 7, 0.45, { fontSize: 16, bold: true, color: RED });
["著作財產權授權暨肖像授權同意書.pdf", "參賽注意事項.pdf", "法定代理人同意書.pdf", "初賽簡報模板.pptx（Google Slides 版亦可）", "企業挑戰題目.pdf（7 頁）"].forEach((t, i) => {
  dot(s, 0.6, 2.05 + i * 0.75, 0.5, i === 3 ? ORANGE : SLATE, String(i + 1), 13);
  T(s, "2026和泰AI黑客松＿" + t, 1.25, 2.05 + i * 0.75, 6.4, 0.5, { fontSize: 14, valign: "middle", bold: i === 3 });
});
T(s, "歷屆賽事：2022 MaaS 數據黑客松、2024 MaaS 黑客松｜最新公告含 Gemini 3.6／Gemini Omni 活動與 Google Cloud 點數說明", 0.6, 5.95, 7.3, 0.8, { fontSize: 12, color: MUTED });
card(s, 8.2, 1.5, 4.5, 4.6, NAVY);
T(s, "賽務小組", 8.5, 1.75, 4, 0.4, { fontSize: 14, bold: true, color: GOLD });
T(s, "ht-hackathon@bhuntr.com", 8.5, 2.2, 4, 0.5, { fontSize: 16, bold: true, color: WHITE });
T(s, "02-6604-3004 #57", 8.5, 2.8, 4, 0.5, { fontSize: 20, bold: true, color: WHITE });
T(s, "諮詢時間 週一至週五 10:00–19:00", 8.5, 3.45, 4, 0.5, { fontSize: 13, color: "CADCFC" });
T(s, "爭議適用中華民國法律，臺灣臺北地方法院為第一審管轄法院", 8.5, 4.3, 3.9, 1.2, { fontSize: 12, color: "CADCFC" });

/* ====================== 結語 ====================== */
pres.addSection({ title: "結語" });
s = pres.addSlide({ masterName: "DARK", sectionTitle: "結語" });
T(s, "接下來 6 天的行動清單", 0.8, 0.7, 11, 0.8, { fontSize: 34, bold: true, color: WHITE });
[["今天", "完成和泰步驟一報名（取得 SID 與 iRent 解題資源），全員完成獎金獵人帳號驗證", RED],
 ["10/09–10/10", "研讀 iRent 照片清單、索賠案例與拍照流程圖；確立痛點、Persona 與三環節方案架構", ORANGE],
 ["10/11–10/12", "依官方模板撰寫 15 頁簡報（七大架構）；準備 AI 模型選型、資料流程與 KPI", GOLD],
 ["10/13", "錄製 3 分鐘影片並依命名規範上傳 YouTube（不公開）；全員交叉審稿", TEAL],
 ["10/14 13:00 前", "隊長上傳 PDF＋影片連結並送出「請求更新」，截圖存證", GREEN]]
  .forEach(([d, t, c], i) => {
    const y = 1.75 + i * 1.0;
    dot(s, 0.8, y, 0.6, c, String(i + 1), 16);
    T(s, d, 1.6, y, 2.4, 0.6, { fontSize: 16, bold: true, color: c, valign: "middle" });
    T(s, t, 4.0, y, 8.6, 0.6, { fontSize: 15, color: WHITE, valign: "middle" });
  });
T(s, "若另投 ASUS：英文提案＋影片＋GitHub 須於 10/14 17:00 前完成，與和泰同日截止，需評估人力", 0.8, 6.85, 11.8, 0.4, { fontSize: 12, color: GOLD });

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
