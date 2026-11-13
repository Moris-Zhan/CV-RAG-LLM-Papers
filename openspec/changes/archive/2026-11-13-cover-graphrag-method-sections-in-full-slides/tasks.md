# Tasks

## 1. 建置

- [x] 1.1 在 build script 中依 design D2，把五段補充句接到第 9、12、13、15、20 頁備忘稿的末尾
- [x] 1.2 依 design D1，把目錄分組標題改為「評測設計（屬論文方法章）」，並在第 19、20 頁備忘稿開頭各補一句方法章對應說明
- [x] 1.3 重建 `graph-rag-full-slides_zh-TW.pptx`，複製到 `RAG/2024_GraphRAG/`

## 2. 驗證

- [x] 2.1 依 design D3 撰寫並執行 `verify_method_coverage.py`；先在修改前的檔案上執行，確認「未寫」的項目會失敗，再確認修改後全部通過
- [x] 2.2 執行 `verify_full.py`（未讀取分組標題，不需調整），Open XML SDK 0 錯誤、整數 EMU 通過、`audit_pptx_quality.py` high = 0、medium = 0
- [x] 2.3 以 LibreOffice 渲染第 2 頁，確認分組標題在一行內、右欄未超出頁尾
- [x] 2.4 執行 `openspec validate cover-graphrag-method-sections-in-full-slides --strict`，逐條核對 Scenario

## 3. 提交

- [x] 3.1 顯示 diff 摘要後，以英文 conventional commit 提交並推送到 `claude/nice-knuth-5v7f3y`

## Workflow follow-up

- 使用者確認後開 PR，以 squash 合併到 main。
- 合併後執行 `/opsx:archive cover-graphrag-method-sections-in-full-slides`。
