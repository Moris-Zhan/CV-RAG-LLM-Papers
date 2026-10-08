# CV-RAG-LLM-Papers

整理已讀論文的個人知識庫：每篇論文保存原文與報告用的投影片，並依領域與標籤分類。

## 分類

**領域（Domain）**：
論文所屬的第一層資料夾，只有 `CV`、`RAG`、`LLM` 三個值；每篇論文恰好屬於一個領域。
_Avoid_: 類別、分類、主題（主題請用「標籤」）

**主要貢獻（Primary contribution）**：
論文改進或評測的核心對象，用來決定領域：涉及影像輸入或評測 VLM 為 CV，核心在檢索器、檢索來源或 RAG 流程為 RAG，其餘為 LLM。
_Avoid_: 研究方向、應用場景

**標籤（Tag）**：
跨領域的研究主題，一篇論文可有多個；只記錄在 README 的論文索引，不出現在資料夾名稱。
_Avoid_: 子分類、關鍵字

## 論文

**論文 ID（Paper ID）**：
論文的唯一識別名稱，格式為 `<年份>_<簡稱>`，同時也是論文資料夾的名稱，例如 `2025_WiCkeD`。
_Avoid_: 檔名、代號、slug

**論文資料夾（Paper folder）**：
`<領域>/<論文 ID>/`，存放同一篇論文的原文與所有衍生產物。
_Avoid_: notes 資料夾、papers 資料夾

**原文（Paper）**：
論文的正式 PDF，固定命名為 `paper.pdf`。
_Avoid_: 論文檔、source

## 產物

**簡報（Slides）**：
依論文內容整理、可用於組會報告的投影片檔，檔名帶語言代碼，例如 `slides_zh-TW.pptx`。
_Avoid_: deck、PPT、final_presentation

**精讀簡報（Deep-read slides）**：
比一般簡報更逐步拆解方法細節的長版簡報，檔名為 `slides_deepread_<語言>.pptx`。
_Avoid_: 詳細版、完整版

**語言代碼（Language code）**：
產物檔名後綴，目前使用 `zh-TW`（繁體中文，主要版本）與 `zh-CN`（簡體中文）。
_Avoid_: tw、cn、zh_tw

**品質報告（QA report）**：
記錄某一份簡報的自我審查、程式化檢查結果，以及與原文不一致之處，檔名為 `qa_report_<語言>.md`。
_Avoid_: 檢查紀錄、審查報告

**素材清單（Asset manifest）**：
列出簡報所用圖片的出處頁碼、擷取方式與裁切檢查結果，檔名為 `asset_manifest.md`。
_Avoid_: 圖片清單、figure list

## 標籤定義

**MCQ-Benchmark**：
建置、改造或評估選擇題（multiple-choice）形式的評測基準。

**Distractor-Gen**：
自動生成選擇題的錯誤選項（干擾選項）。
_Avoid_: 錯誤選項生成、wrong-answer generation

**QA-Synthesis**：
從語料自動合成問答資料（題目與答案）。
_Avoid_: 自動出題、data augmentation

**Retrieval**：
以檢索器或檢索來源本身為研究對象。

**LLM-as-Judge**：
以 LLM 擔任評分者或驗證者，評估生成內容的品質。
_Avoid_: 自動評審、AI 評分
