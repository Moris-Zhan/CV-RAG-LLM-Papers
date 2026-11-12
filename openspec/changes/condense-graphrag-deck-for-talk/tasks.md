# Tasks

## 1. 原文基準

- [ ] 1.1 以 PyMuPDF 從 `RAG/2024_GraphRAG/paper.pdf` 抽出全文到 scratchpad（不進 repo），正規化空白與連字號斷行；驗證全文含 §3.1.1–§3.1.6、Table 2、Fig. 2 等段落，且能搜尋到 8,564、1,014,611、47,075 等數字

## 2. 正文 12 頁

- [ ] 2.1 依 design D1 改寫建置腳本的正文順序：保留新 1、3、6、7、10、11（舊 1、3、13、14、21、22），改寫新 4（舊 5 加入核心想法）；驗證頁序與 D1 表一致
- [ ] 2.2 新建正文第 5 頁（NeoChip 三段流程圖，kicker 標 `extract_graph`）、第 8 頁（準備 → Map → Reduce，kicker 標 `global_search`）、第 9 頁（六種條件表）、第 12 頁（證據／成本／限制表），內容只取自原文；驗證每頁只有一個主視覺、條列不超過 3 點
- [ ] 2.3 依 design D1 把第 3–12 頁的標題改為結論式且一行內完成；渲染後驗證沒有任何標題換行

## 3. 備忘稿

- [ ] 3.1 依 design D3 為第 3–12 頁撰寫四段式備忘稿（【重點】【講稿】【技術細節】【可能追問】），把舊頁 4、5–18、19–20、23–25 的要點依 D1「來源」欄併入【技術細節】，每點附原文出處；驗證 10 頁都有四段標記，且【技術細節】每一點都有出處
- [ ] 3.2 依 design D4 執行溯源檢查：抽出第 3–12 頁備忘稿的所有數字，比對 1.1 的原文全文；不在原文、也不在標示「推算」句中的數字逐一修正；驗證最後的不符清單為空
- [ ] 3.3 抽查「移出的內容不遺失」：chunk 600／100 與兩倍、gleaning 的 logit bias 100、claim 定義、8k 與 58.1%、47,075 claims 與 78%，都出現在對應正文頁的備忘稿或備用頁；驗證每一項都找得到

## 4. 備用頁與目錄

- [ ] 4.1 依 design D2 把 14 頁移到第 13–26 頁，kicker 改為「備用頁 · 不播放 · 主題 · workflow」，內容不變；驗證結論頁之後每頁 kicker 都以「備用頁 · 不播放」開頭，且 6 個論文有對應的 workflow 仍出現在 kicker
- [ ] 4.2 改寫第 2 頁目錄：列出 12 頁正文與 14 頁備用頁的新頁碼；以腳本比對每個頁碼與目標頁的標題或 kicker，驗證全部一致

## 5. 驗證與文件

- [ ] 5.1 重建簡報並以 LibreOffice 渲染逐頁檢查；驗證：
  - 共 26 頁；
  - `audit_pptx_quality.py` 結果 high = 0、medium = 0；
  - Open XML SDK 驗證 0 錯誤；
  - 整數 EMU 檢查通過；
  - 可見文字中 § 與附錄為 0 筆；
  - 「開源實作」「預設值」「code_notes」為 0 筆；
  - 「社群摘要」「社群答案」「部分答案」為 0 筆，「社群報告」只出現在描述 JSON 格式的備用頁
- [ ] 5.2 更新 `qa_report_zh-TW.md`（頁數、修訂紀錄、溯源檢查結果）、`pptx_audit_zh-TW.md`，以及 `asset_manifest.md` 的頁碼（Fig. 1／4／2／3 → 第 4／6／10／16 頁，以及原生表格與自繪圖頁）；驗證文件頁碼與重建後的簡報一致
- [ ] 5.3 執行 `openspec validate condense-graphrag-deck-for-talk --strict`，並逐條核對 delta spec 的每個 Scenario；驗證全部成立
- [ ] 5.4 顯示 diff 摘要給使用者確認後，以英文 conventional commit 提交，並推送到 `claude/nice-knuth-5v7f3y`

## Workflow follow-up

- 使用者確認後開 PR，以 squash 合併到 main（會一併帶入 `align-graphrag-deck-with-workflows` 的成果）。
- 合併後先封存 `align-graphrag-deck-with-workflows`，再封存本 change，讓兩者新增的 requirement 依序併入 `talk-ready-slides`。
