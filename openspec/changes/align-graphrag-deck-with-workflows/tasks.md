# Tasks

## 1. 方法專頁與 workflow 標籤

- [ ] 1.1 在建置腳本新增第 7 頁「chunk 切分」（kicker：方法細節 1 · `create_base_text_units`），內容依 design D2，含 Podcast／News 的 chunk 數原生表格；驗證內容只引用原文數字（600／100 tokens、1,669／3,197 chunks、600 vs 2400 約兩倍）
- [ ] 1.2 新增第 11 頁「claim」（kicker：方法細節 5 · `extract_covariates`），含 NeoChip 3 條 claim 英文原句；驗證 3 條原句逐字對照原文
- [ ] 1.3 新增第 12 頁「節點 degree 與邊顯著度」（kicker：方法細節 6 · `finalize_graph`），示意圖標「示意」，建圖規模表列 8,564／20,691 與 15,754／19,520；驗證數字逐字對照原文
- [ ] 1.4 依 design D1 把既有方法頁的 kicker 改成「方法細節 N · 主題 · `workflow`」，並重新編號為 1–12，查詢 3 頁標 `global_search`；驗證 6 個論文有對應的 workflow 都出現在 kicker，3 個沒有對應的都不出現

## 2. 目錄頁與總覽頁

- [ ] 2.1 依 design D3 新增第 6 頁 workflow 總覽：依實作順序列出 1–9，論文沒有的 3 個整列灰色、只列名稱；右側列查詢階段，底部註明 `34b2b67`（3.3.0）；驗證 9 個名稱與 `code_notes_zh-TW.md` 第 2 節的順序一致
- [ ] 2.2 依 design D4 新增第 2 頁目錄頁（7 組小主題加頁碼，備用頁一行標「不播放」）；建置後以腳本比對每個頁碼與目標頁的 kicker 或標題，驗證全部一致

## 3. 刪除章節標號與程式碼文字

- [ ] 3.1 依 design D5 替換所有可見文字中的「§」「附錄」標號（kicker、圖說、正文、表格），保留 Fig.／Table／Algorithm 來源標註與講者備註；以腳本掃描可見文字，驗證「§」「附錄」為 0 筆
- [ ] 3.2 依 design D5 修改封面的「開源實作」與第 26 頁的重點帶和備註；以腳本掃描全份文字與備註，驗證「開源實作」「預設值」「code_notes」為 0 筆

## 4. 重建與文件

- [ ] 4.1 重建簡報並以 LibreOffice 渲染逐頁檢查，修正換行、重疊與留白；執行 `audit_pptx_quality.py`，驗證 27 頁、high = 0、medium = 0，且每頁都有講者備註
- [ ] 4.2 更新 `qa_report_zh-TW.md`（頁數、修訂紀錄、示意圖說明）、`pptx_audit_zh-TW.md`，以及 `asset_manifest.md` 的頁碼（Fig. 1／3／4／2 → 第 5／9／13／21 頁，原生表格與自繪圖頁一併更新）；驗證文件頁碼與重建後的簡報一致
- [ ] 4.3 執行 `openspec validate align-graphrag-deck-with-workflows --strict`，並逐條核對 delta spec 的每個 Scenario；驗證全部成立
- [ ] 4.4 顯示 diff 摘要給使用者確認後，以英文 conventional commit 提交，並推送到 `claude/nice-knuth-5v7f3y`

## Workflow follow-up

- 使用者確認後開 PR，以 squash 合併到 main。
- 合併後執行 `/opsx:archive`，把新增的 4 條 requirement 同步進 `openspec/specs/talk-ready-slides/spec.md`。
