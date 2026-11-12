# Tasks

## 1. 實作對照內容

- [ ] 1.1 依 design D1 在建置腳本中為第 13–21 頁加上「實作對照」窄條（版面依 D2），第 13 頁原本的版本註記併入窄條；渲染後驗證 9 頁的窄條都在一行內，且與圖說、表格、重點帶不重疊
- [ ] 1.2 依 design D1 在第 13–21 頁的講者備註最後加上「【實作對照（版本見第 13 頁）】」段，列出完整路徑與常數；第 13 頁另寫明 `graphrag/` 的簡寫規則；驗證既有備註內容保持不變，只在末尾新增

## 2. 驗證

- [ ] 2.1 依 design D3 第 1、2 點，以腳本擷取第 13–21 頁的所有 `.py` 路徑與常數名稱，在 `34b2b67` 驗證每個路徑都存在、每個常數都有定義；驗證不存在的清單為空
- [ ] 2.2 依 design D3 第 3–5 點驗證：
  - 正文第 1–12 頁沒有 `.py`、`graphrag/` 與 prompt 常數名稱；
  - 全份「開源實作」「預設值」「預設關閉」「code_notes」為 0；
  - `verify_condense.py` 全部通過；
  - Open XML SDK 0 錯誤；
  - 整數 EMU 檢查通過；
  - `audit_pptx_quality.py` high = 0、medium = 0
- [ ] 2.3 更新 `qa_report_zh-TW.md`（修訂紀錄與驗證結果）與 `pptx_audit_zh-TW.md`；執行 `openspec validate add-code-refs-to-graphrag-backup-slides --strict`，並逐條核對 delta spec 的 Scenario；驗證全部成立
- [ ] 2.4 顯示 diff 摘要給使用者確認後，以英文 conventional commit 提交，並推送到 `claude/nice-knuth-5v7f3y`

## Workflow follow-up

- 使用者確認後開 PR，以 squash 合併到 main。
- 合併後執行 `/opsx:archive add-code-refs-to-graphrag-backup-slides`，把修改後的 requirement 同步進 `openspec/specs/talk-ready-slides/spec.md`。
