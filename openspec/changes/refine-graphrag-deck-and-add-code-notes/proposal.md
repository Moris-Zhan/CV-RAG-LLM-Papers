# Proposal

## Why

`RAG/2024_GraphRAG/slides_zh-TW.pptx` 之後會拿去做技術分享，但目前有三類風險：

- **用詞**：重點帶與標題帶有口號式、超出原文的 AI 腔句子。
- **與原文不符**：有 3 處說法與原文不一致，例如稱 C0「成本最低」，但 SS 每題只用 8k context，其實更少。
- **方法深度不足**：被追問時容易講錯，例如 map 呼叫次數不等於社群數，以及勝率的計分方式。

另外，這個整理庫目前沒有把論文對應到開源實作 `microsoft/graphrag` 的筆記。現行程式碼（v3.3.0）有多處預設值與行為和論文不同，直接照論文理解去改 code 很容易誤判。

## What Changes

- **改寫 AI 腔用詞**：依 grilling Q1 的對照表改寫 8 處，涵蓋第 3、4、5、6、7、20 頁的重點帶與第 20 頁標題，以及第 16 頁的講者備註。
- **修正 3 處與原文不符的說法**：第 17 頁「成本最低」改為「全域方法中成本最低」；第 19 頁不再推論局部問題的表現；第 8 頁改成「實驗取 C0–C3 四層」。
- **補足方法深度**：
  - 第 11 頁表格改為區分「community summary 份數」與「map 呼叫次數（推算值，標明假設）」；
  - 第 8 頁備註補上 Leiden／modularity 的基本概念與 projected downwards；
  - 新增 2 頁備用頁（Q&A 預備）：「原文未說明的項目」，以及「勝率計分方式、索引成本與查詢成本」。
- **術語統一**：投影片正文統一使用原文的 `community summary` 與 `community answer`，取代混用的「社群摘要／社群報告」與「社群答案／部分答案」。「報告」只在描述 prompt 的 JSON 格式時使用。
- **新增論文術語表**：`RAG/2024_GraphRAG/GLOSSARY.md`，並在根目錄 `GLOSSARY-MAP.md` 登記為新的 context。
- **新增程式碼對照筆記**：`RAG/2024_GraphRAG/code_notes_zh-TW.md`，內容涵蓋：
  - 論文各步驟對應的模組與檔案；
  - 論文設定與程式碼預設值的差異；
  - 修改程式碼時要注意的地方；
  - 釘選的版本。
- **更新 README**：命名規則加入 `GLOSSARY.md` 與 `code_notes_<語言>.md` 兩種論文資料夾內的選用檔案。
- **更新 QA 報告與程式化檢查結果**。

## Capabilities

### New Capabilities

- `talk-ready-slides`：可直接用於技術分享的論文簡報要符合的條件：
  - 不含超出原文的推論與口號式用詞；
  - 報告者補充須標示；
  - 術語前後一致；
  - 以備用頁準備原文未說明的項目。
- `paper-code-notes`：論文對照開源實作的筆記，規範：
  - 放置位置與釘選版本；
  - 論文步驟對應程式碼的方式；
  - 預設值差異與修改注意事項的呈現。
- `paper-term-glossary`：單篇論文的技術名詞表，規範：
  - 放置位置；
  - 在 `GLOSSARY-MAP.md` 的登記方式；
  - 與根目錄 `GLOSSARY.md`（整理庫用語）的分工。

### Modified Capabilities

（無。`openspec/specs/` 目前沒有任何既有 capability。）

## Impact

- **修改**：
  - `RAG/2024_GraphRAG/slides_zh-TW.pptx`，總頁數從 20 頁增為 22 頁；
  - `qa_report_zh-TW.md`、`pptx_audit_zh-TW.md`、`asset_manifest.md`（頁碼）；
  - `README.md`（命名規則）；
  - `GLOSSARY-MAP.md`。
- **新增**：
  - `RAG/2024_GraphRAG/GLOSSARY.md`；
  - `RAG/2024_GraphRAG/code_notes_zh-TW.md`。
- **外部依據**：
  - `microsoft/graphrag` 的 v3.3.0（main `34b2b67`，2026-11-01）。只讀取，不納入 repo；
  - 筆記中的檔案路徑與預設值以此版本為準。
- **與進行中 change 的關係**：`archive-contest-and-document-survey-directions` 會修改 `README.md` 與 `GLOSSARY-MAP.md` 的其他段落。兩者改的是不同段落，但先合併的一方會讓另一方需要處理 merge。
- **不受影響**：其他論文資料夾、`Contest/`、`docs/adr/`。
