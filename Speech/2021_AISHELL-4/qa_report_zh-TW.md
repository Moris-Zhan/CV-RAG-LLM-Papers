# QA 報告（繁體中文版）— AISHELL-4（arXiv:2104.03603v4, 2021）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：resource（workflow-to-validation）
- 投影片數：11；內嵌圖片：1；講者備註：11 頁

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查；修正過長標題與表格欄寬
- 數字逐筆對照原文 Table 1–3 的渲染頁面：120 小時（訓練 107.50、評估 12.72）、211 場（191 + 20）、重疊率 19.04% / 9.31%、字錯率 32.56 / 41.55 與 30.49 / 39.86

## 與原文不一致或需保留的地方

- 「評估集偏向低重疊」與「分離模組未使用真實重疊語音」是報告者依 Table 2 與 §4.2 的觀察，不是原文結論；投影片與講者備註皆標明。
- 原文 Speaker Independent 任務使用標準答案的語句邊界，投影片照實說明，避免與 Speaker Dependent 結果直接比較。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 11（詳見 `pptx_audit_zh-TW.md`），皆為 3–7 pt 的對齊微差，不影響閱讀

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示。
