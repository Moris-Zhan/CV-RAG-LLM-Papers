# Proposal

## Why

`RAG/2024_GraphRAG/slides_zh-TW.pptx` 的備用頁（第 13–26 頁）是用來回答追問的。被問到「這一步在程式碼的哪裡」時，報告者目前得另外翻 `code_notes_zh-TW.md` 才找得到。

使用者希望把 code notes 裡的主要模組與 prompt 補到相關的備用頁上。但現行規格 `talk-ready-slides` 規定程式碼識別字只能出現在 kicker 標籤與 workflow 總覽頁，所以要先修改這條規格，才能在備用頁放模組與 prompt 名稱。

## What Changes

- **第 13–21 頁新增「實作對照」窄條**：放在每頁底部、重點帶上方，灰底、等寬字體，列出 1–2 個主要模組檔案，以及 prompt 的檔案與常數名稱。
- **講者備註補完整路徑**：同一頁的講者備註列出完整檔案路徑與相關的 prompt 常數，路徑以 `graphrag/…` 開頭。
- **版本只標一次**：只在第 13 頁標 `microsoft/graphrag` `34b2b67`（3.3.0）；其他頁的窄條寫「版本見第 13 頁」。
- **不寫的內容**：不寫程式碼與論文的差異，也不寫預設值；只說明「在哪裡」，不說明「怎麼做」。
- **不動的頁面**：
  - 正文第 1–12 頁與它們的備忘稿；
  - 備用頁第 22–26 頁：評測流程不在開源 repo 內，另兩頁是 Q&A 預備。
- **同步更新**：QA 報告、程式化檢查結果；簡報須維持 Open XML SDK 0 錯誤、程式化檢查 high = 0、medium = 0。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `talk-ready-slides`：修改「程式碼識別字只作為對照標籤」：
  - 允許在備用頁加「實作對照」，列出模組檔案與 prompt 的檔案和常數名稱；
  - 正文與正文的備忘稿仍禁止出現程式碼識別字（kicker 的 workflow 標籤除外）；
  - 全份簡報仍禁止陳述實作行為、預設值，以及實作與論文的差異。

## Impact

- **修改**：
  - `RAG/2024_GraphRAG/slides_zh-TW.pptx`（頁數不變，26 頁）；
  - `qa_report_zh-TW.md`、`pptx_audit_zh-TW.md`。
- **不修改**：`code_notes_zh-TW.md`（作為來源）、`GLOSSARY.md`、`asset_manifest.md`（沒有新圖片）。
- **依據**：
  - `code_notes_zh-TW.md` 第 2 節的對照表；
  - 每個路徑與常數名稱都要在 `microsoft/graphrag` `34b2b67` 確認存在。
- **前置條件**：`align-graphrag-deck-with-workflows` 與 `condense-graphrag-deck-for-talk` 已封存，它們的規格已併入 `openspec/specs/talk-ready-slides/spec.md`。
