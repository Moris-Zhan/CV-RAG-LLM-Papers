# Proposal

## Why

使用者希望下列內容直接出現在完整版簡報 `RAG/2024_GraphRAG/graph-rag-full-slides_zh-TW.pptx` 的畫面上，而不是只放在講者備忘稿：

- 論文 §3.1.1–3.1.6 各小節的內容；
- §3.2 的 Algorithm 1；
- §4.1 Experiment 1 的資料集、比較條件與設定；
- §4.2 Experiment 2 的 claim-based 指標。

另外，`code_notes_zh-TW.md`「論文 → 程式碼對照表」引用的 7 個 prompt 檔，也要從 `microsoft/graphrag` 的原始碼取出，補進簡報。

目前的缺口：

- 方法細節依 workflow 順序排列，同一個 Figure 1 階段的頁面不連續，因此無法逐節對照論文；
- 上一輪補上的 5 個論點只在備忘稿；
- Algorithm 1 的本體、實驗 2 的方法都沒有出現在畫面上；
- 實作 prompt 只在精簡版備用頁列出檔名。

## What Changes

- **方法細節依論文順序重排**：claim 移到建構知識圖譜之前，階層式社群移到節點 degree 之前，重新編號 1–12。同步更新 kicker、Fig. 1 標籤對應、workflow 對照頁的頁碼欄，以及備忘稿中的交叉引用。
- **新增 6 張章節總覽頁**：每個 Figure 1 階段前插入一頁，以中文要點逐段整理該節論文內容，並列出延伸的方法細節頁。畫面不出現 §、附錄、章節編號。
- **新增 Algorithm 1 頁**：接在問題生成頁之後，以英文原文列出虛擬碼，並附中文說明。
- **新增實驗 2 方法頁**：接在實驗 2 結果頁之前，說明 factual claim 的定義與例句、Claimify 步驟、兩個指標與分群方式。
- **新增「實驗 1 對應」小條**：放在方法細節 2、10、12 與「評測設計 2」頁的底部，補上論文 §4.1 的實驗設定。
- **新增附錄「實作 prompt」7 頁**：版本為 `microsoft/graphrag` `34b2b67`（3.3.0）。畫面上整理結構，並逐字節錄關鍵段落；備忘稿放完整原文。只描述 prompt 本身，不與論文比較。
- **目錄維持一頁**：方法段只列 6 個 Figure 1 階段與頁碼範圍；新增 Algorithm 1、實驗 2 方法與「附錄 · 實作 prompt」項目。
- **方法總覽頁對應表**：每段改列「總覽頁＋方法細節頁」的頁碼。
- **總頁數**：27 頁增為 42 頁。
- **不動**：精簡版 `slides_zh-TW.pptx`。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `graphrag-full-slides`：
  - 修改四項既有需求：Figure 1 標籤的對應、總覽頁對應表、對照頁位置與目錄、論文方法章逐段可追溯（改為畫面可見）；
  - 新增四項需求：章節總覽頁、Algorithm 1 與實驗 2 方法頁、實驗 1 對應小條、附錄實作 prompt。

## Impact

- **修改**：`RAG/2024_GraphRAG/graph-rag-full-slides_zh-TW.pptx`（27 → 42 頁）。
- **已更新**：`RAG/2024_GraphRAG/GLOSSARY.md`，新增 factual claim 並與 Claim 區分（已於討論時提交）。
- **依據**：
  - 論文 §3.1–3.3、Algorithm 1、§4.1、§4.2 原文；
  - `microsoft/graphrag` `34b2b67` 的 7 個 prompt 檔（MIT License）。
- **限制**：
  - 不陳述實作與論文的差異；
  - 不寫「預設值」或實作行為；
  - 方法細節 1–12 的畫面內容不新增程式碼識別字，kicker 的 workflow 標籤維持原狀。
