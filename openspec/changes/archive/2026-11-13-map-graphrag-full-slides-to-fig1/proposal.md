# Proposal

## Why

使用者在 `claude/nice-knuth-5v7f3y` 手動上傳了 `RAG/2024_GraphRAG/graph-rag-full-slides_zh-TW.pptx`，這是精簡為 15 分鐘報告版之前的完整版簡報（27 頁），希望與精簡版 `slides_zh-TW.pptx` 一起放在 main。

完整版有 12 張「方法細節」頁，但聽眾看到某一張細節頁時，不容易知道它落在「方法總覽 · Figure 1」管線的哪一段。另外，「論文步驟與 workflow 對照」目前排在第 6 頁、所有方法細節之前，引用的頁碼聽眾還沒看過；放到方法細節之後當作回顧比較順。

## What Changes

- **方法細節頁加 Figure 1 階段標籤**：方法細節 1–12 的標題列右上角加一個小標籤，寫出該頁對應的 Figure 1 階段轉換（論文英文原名，例如 `Text Chunks → Entities & Relationships`）。
- **方法總覽頁加對應表**：「方法總覽 · Figure 1」右欄改成「階段轉換 → 方法細節（頁碼）」對應表；原右欄的索引／查詢時間說明保留在備忘稿，「唯一的非 LLM 步驟」那行保留。原圖不疊加任何標記。
- **對應單位**：以論文方法小節標題（也就是 Figure 1 的 6 段箭頭）為單位。節點 degree 依論文歸在 `Graph Communities → Community Summaries`。
- **搬移對照頁**：「論文步驟與 workflow 對照」移到方法細節 12 之後（新第 18 頁），方法細節變成第 6–17 頁；目錄新增「方法回顧」分組，並更新目錄、對照頁頁碼欄與備忘稿中的頁碼。
- **檔名與共存**：完整版保留原檔名 `graph-rag-full-slides_zh-TW.pptx`，與精簡版共存；README 檔名規則與索引、`GLOSSARY.md`（新增「完整版簡報」）同步更新。
- **不動**：精簡版 `slides_zh-TW.pptx` 與它的 QA 文件。

## Capabilities

### New Capabilities

- `graphrag-full-slides`：GraphRAG 完整版簡報的結構需求，包含 Figure 1 對應、對照頁位置與目錄頁碼一致性。

### Modified Capabilities

（無）

## Impact

- **新增到 main**：`RAG/2024_GraphRAG/graph-rag-full-slides_zh-TW.pptx`（修改後版本，27 頁）。
- **修改**：`README.md`（檔名規則與索引連結）、`GLOSSARY.md`（完整版簡報條目，「精讀簡報」的 _Avoid_ 移除「完整版」）。
- **依據**：論文 Figure 1 與 §3.1 各小節標題；degree 的歸類依 §3.1.5（Graph Communities → Community Summaries）。
- **建置**：以產生 `3346fc2` 版簡報的 build script 重建（已確認除內嵌試算表時間戳外，所有投影片 XML 與上傳檔相同）。
