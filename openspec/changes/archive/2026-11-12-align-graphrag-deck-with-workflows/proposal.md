# Proposal

## Why

`RAG/2024_GraphRAG/slides_zh-TW.pptx` 的方法段依論文章節編排。報告者想把它對照到 `code_notes_zh-TW.md` 整理的 9 個 standard workflow，讓聽眾知道每段方法落在實作的哪一步。目前簡報有三個缺口：

- 只有 3 個 workflow 有對應頁；
- 可見文字散布約 20 處「§x.x.x」「附錄 X」章節標號；
- 沒有目錄頁，難以從論文的各個討論面向找到對應頁。

## What Changes

- **新增第 2 頁目錄頁**：依論文的 7 個討論面向分組，列出每組的小主題與頁碼；備用頁另列一行，標「不播放」。
- **新增 workflow 總覽頁**：放在 Fig. 1 管線頁之後。
  - 依實作順序列出 9 個 standard workflow，以及各自對應的論文步驟；
  - 論文沒有的 `create_final_documents`、`create_final_text_units`、`generate_text_embeddings` 只列名稱，不加說明；
  - 右側另列「查詢階段：global search」；
  - 註明 workflow 名稱依 `microsoft/graphrag` `34b2b67`（3.3.0）。
- **補齊方法專頁**：讓論文有對應的 6 個 workflow 都有專頁，新增 3 頁：
  - `create_base_text_units`：chunk 大小的取捨；
  - `finalize_graph`：節點 degree 與邊的顯著度；
  - `extract_covariates`：claim。
- **方法頁 kicker 加上對應 workflow 標籤**：例如「方法細節 1 · 元素擷取 prompt · `extract_graph`」。查詢階段 3 頁標 `global_search`。
- **刪除章節標號**：所有可見文字中的「§x.x.x」「附錄 X」都刪掉；保留 Fig.／Table／Algorithm 來源標註；講者備註保留章節號。
- **不放程式碼內容**：實作行為、預設值、與論文的差異一律不寫進簡報（正文、備註、備用頁都不放）。第 21 頁「補充開源實作做法／預設值不同」那句刪除，不另補說明。
- **頁數**：從 22 頁變成 27 頁；同步更新 QA 報告、程式化檢查結果與圖片出處清單的頁碼。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `talk-ready-slides`：新增四條要求：
  - 簡報須有目錄頁；
  - 程式碼識別字只能作為 workflow 標籤與總覽，不得陳述實作行為；
  - 可見文字不含章節標號；
  - 論文有對應的每個 workflow 都有專頁。

  既有 4 條 requirement 不變。

## Impact

- **修改**：
  - `RAG/2024_GraphRAG/slides_zh-TW.pptx`（22 → 27 頁）；
  - `qa_report_zh-TW.md`、`pptx_audit_zh-TW.md`、`asset_manifest.md`（頁碼）。
- **不修改**：
  - `code_notes_zh-TW.md` 與 `GLOSSARY.md`，內容已足夠；
  - `paper-code-notes` 規格：總覽頁只列 workflow 名稱，不涉及 local search、DRIFT search、dynamic community selection，與「筆記與簡報的範圍分開」的要求一致。
- **假設**：使用者說「程式碼註記通通拿掉」，指的是實作行為與預設值這類註記；workflow 名稱是這次對齊的目的，保留在 kicker 標籤與總覽頁。
- **與進行中 change 的關係**：`archive-contest-and-document-survey-directions` 不改這份簡報，兩者沒有檔案衝突。
