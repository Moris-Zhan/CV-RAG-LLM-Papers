# Design

## Context

動機見 proposal.md。影響做法的現況：

- 論文整理庫共 12 篇，分屬 `CV`（3）、`LLM`（3）、`RAG`（4）、`Speech`（2）；README 的論文索引已為每篇標上 5 種標籤中的若干個，Speech 兩篇沒有標籤。
- `Contest/` 對外只有 4 處引用：`README.md` 第 24、88 行，`GLOSSARY-MAP.md` 第 6、10 行。`Contest/` 內的 Markdown 沒有任何相對連結指向目錄外；`build_deck.js` 的輸出路徑由參數決定，沒有寫死 `Contest/`。
- 根目錄的 `GLOSSARY.md` 已定義「領域」「標籤」，尚無「Survey 方向」「封存區」。

## Goals / Non-Goals

**Goals:**

- 搬移後 git 能把每個檔案認成同一檔案的改名，`git log --follow` 可追溯歷史。
- 讀者在 README 第一屏內能看到研究焦點與方向清單。

**Non-Goals:**

- 不重新整理、刪減或改寫封存內容，包括 16 個版本的 iRent 提案簡報。
- 不新增或修改標籤，也不為 Speech 論文補標籤。
- 不更動任何論文資料夾與論文索引的既有列。

## Decisions

### D1：用 `git mv` 整包搬到 `archive/2026-contests/`

使用者已選「移到 archive/ 目錄」。子目錄用 `<年份>-<主題>` 命名，方便日後有其他封存項目時並列。

- 替代方案：用 git 標籤保存再從 main 刪除、或壓成 zip。前者要切換標籤才看得到，後者無法在 GitHub 瀏覽，使用者皆未選。
- 不在 `archive/2026-contests/` 內改寫原 `README.md` 的標題（仍為「Contest｜…」），以符合「內容完全相同」的規格；封存脈絡統一寫在 `archive/README.md`。

### D2：Survey 方向以既有標籤為骨幹，加一個語音方向

方向不另創一套分類：每個標籤對應一個方向，再加一個沒有標籤可依的語音方向。這樣方向和標籤之間可以互相追溯，新增論文時只要看標籤就知道歸屬。

- 替代方案：把 10 篇評測相關論文合併成一個大方向。太粗，讀者看不出差異；放棄。
- 替代方案：為 Speech 新增標籤。會改動標籤體系，超出本次範圍；列為非目標。

整體焦點句：「以『如何為 LLM／VLM 建構可靠的評測資料』為主軸，延伸到檢索與 RAG 系統的評估，另收錄語音辨識與分離的資料集論文。」

方向與論文對應（依 README 論文索引的標籤推得）：

| 方向 | 研究問題 | 對應標籤 | 論文 ID |
|---|---|---|---|
| 選擇題評測基準的建構與強化 | 怎麼建出不易被猜中、能真正鑑別模型能力的選擇題評測 | `MCQ-Benchmark` | CV/2024_RightThisWay、CV/2024_UncertaintyVLM、CV/2025_AutoConverter、LLM/2025_COLING-MCQGen、LLM/2025_WiCkeD、RAG/2025_AutoMCQA |
| 干擾選項自動生成 | 怎麼自動產生合理又具誘答力的錯誤選項 | `Distractor-Gen` | CV/2025_AutoConverter、LLM/2025_COLING-MCQGen、LLM/2025_D-GEN |
| 問答資料自動合成 | 怎麼從語料或影像自動合成高品質問答，包含多跳問題 | `QA-Synthesis` | CV/2024_RightThisWay、LLM/2025_COLING-MCQGen、RAG/2025_AutoMCQA、RAG/2026_HopWeaver |
| 檢索與 RAG 系統評估 | 檢索器與檢索來源如何影響生成，以及如何細緻診斷 RAG 的錯誤 | `Retrieval` | RAG/2024_RAGChecker、RAG/2025_AutoMCQA、RAG/2026_HopWeaver、RAG/2026_STAIR |
| LLM 擔任評審 | 以 LLM 評分或驗證時的可靠度與用法 | `LLM-as-Judge` | CV/2025_AutoConverter、LLM/2025_COLING-MCQGen、LLM/2025_D-GEN、RAG/2024_RAGChecker |
| 語音資料集 | 會議多人對話、中英語碼轉換等場景的語音資料如何建置與評測 | （無，依 `Speech` 領域） | Speech/2021_AISHELL-4、Speech/2022_ASCEND |

12 篇全部至少屬於一個方向，符合 specs/survey-directions 的涵蓋要求。

### D3：README 的呈現方式

在「分類規則」之後、「論文索引」之前新增「Survey 方向」段落：焦點句加上 D2 的表格，論文 ID 用連結指向資料夾。目錄樹中的 `Contest/` 改為 `archive/`，「非論文資料與工具」段落的 Contest 項目改為封存說明連結。新增論文步驟第 5 步之後加一步「歸入 Survey 方向」。

### D4：用語寫進 GLOSSARY.md

新增「Survey 方向」與「封存區」兩個用語，並在「標籤」定義中註明方向是由標籤組成的閱讀分組，避免和「領域」「標籤」混用。不另立 ADR：搬移可以隨時用 `git mv` 還原，不符合「難以回復」的條件。

## Risks / Trade-offs

- [方向表是依標籤推得，若某篇標籤原本就標錯，方向也會跟著錯] → 實作時對照每篇的 `qa_report_zh-TW.md` 摘要確認研究問題描述，發現不符先回報，不自行改標籤。
- [外部書籤或其他 session 仍使用 `Contest/` 路徑] → 在 `archive/README.md` 寫明舊路徑對應的新路徑；commit 訊息也註明搬移。
- [方向與標籤一對一，看起來像重複] → 方向表多了「研究問題」與跨領域的論文清單，是給讀者的入口；標籤仍是索引上的細標記。

## Migration Plan

1. `git mv Contest archive/2026-contests`，確認 `git status` 全數顯示為 rename。
2. 新增 `archive/README.md`，更新 README、GLOSSARY-MAP、GLOSSARY。
3. 驗證：搜尋封存區以外的 `Contest/` 應為零筆、檢查所有 Markdown 相對連結、核對方向表涵蓋 12 篇。
4. 回復方式：`git revert` 該 commit，或 `git mv archive/2026-contests Contest` 並還原三份文件。
