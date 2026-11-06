# Proposal

## Why

2026 AI 黑客松（ASUS、和泰）沒有獲選，`Contest/` 不再更新，卻仍在根目錄和論文領域並列，佔了 16MB 和一半以上的檔案數，模糊了這個 repo「以 paper survey 為主」的定位。另外，README 目前只有逐篇論文索引和標籤表，讀者無法一眼看出這個整理庫實際在 survey 哪些研究方向。

## What Changes

- 把 `Contest/` 整個目錄原封不動移到 `archive/2026-contests/`，保留內部結構與 git 歷史；根目錄不再有 `Contest/`。
- 在 `archive/` 放一份說明，標明封存日期、封存原因（未獲選）、內容清單，並註明其中的文獻調查（車損／整潔，14 篇）為提案服務，不屬於論文整理庫。
- 更新所有指向 `Contest/` 的連結：README 的目錄結構與「非論文資料與工具」段落、`GLOSSARY-MAP.md` 的 iRent 脈絡（標註為已封存）。
- 在 README 新增「Survey 方向」段落，放在論文索引之前：列出目前整理庫涵蓋的研究方向，每個方向說明在研究什麼問題，並列出歸屬的論文 ID。比賽文獻不列入，只在封存說明中提一句。
- 在 `GLOSSARY.md` 新增「Survey 方向」與「封存區」兩個用語，與既有的「領域」「標籤」區分。

## Capabilities

### New Capabilities

- `archive`：已結束、不再更新的非論文資料如何封存：放置位置、封存說明的內容，以及封存後原有連結的處理規則。
- `survey-directions`：README 如何呈現論文整理庫的研究方向：方向的定義、每個方向需包含的資訊，以及與論文索引、標籤的一致性。

### Modified Capabilities

（無。`openspec/specs/` 目前沒有任何既有 capability。）

## Impact

- **搬移**：`Contest/` 共 46 個檔案、約 16MB，含 iRent 提案簡報 v1–v16、競賽情報簡報、`build_deck.js`、iRent 的 GLOSSARY 與 ADR。
- **文件**：`README.md`、`GLOSSARY.md`、`GLOSSARY-MAP.md`，以及新增的 `archive/README.md`。
- **不受影響**：`CV/`、`Speech/`、`RAG/`、`LLM/` 的論文資料夾、`docs/adr/`、`tools/`、`openspec/`、`.claude/`。
- **相容性**：舊的 `Contest/...` 路徑會失效；外部書籤需改用 `archive/2026-contests/...`。`Contest/` 內部沒有指向目錄外的相對連結，搬移後內部連結維持有效。
