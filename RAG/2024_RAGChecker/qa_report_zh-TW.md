# QA 報告（繁體中文版）— RAGChecker（arXiv:2408.08067v2, 2024）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：methods（problem-to-solution）；評估框架，附改造的評測基準
- 投影片數：11；內嵌圖片：1；講者備註：11 頁

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查；縮小 Figure 1 避免圖說壓到重點帶，下移 Table 1 的圖說避免與表格重疊
- 數字逐筆對照原文：Table 1 題數合計 300 + 280 + 6 × 500 + 511 + 71 = 4,162；Table 2 整體評估 Pearson；Table 3 全部 8 列；§4.4 的調參數字
- 投影片 8 的「F1 提高 2.4–3.9 分」由 Table 3 相減得出（GPT-4 +2.4、Llama3-8B +2.9、Llama3-70B +3.9、Mixtral +2.8）

## 與原文不一致或需保留的地方

- PDF 首頁標示「Preprint. Under review.」；索引只列 arXiv 編號，不標註會議。
- §4.4 的調參數字來自 Appendix F 的子實驗（3 個系統 × Writing、Finance、KIWI 三個領域），與 Table 3 的 10 領域平均不同；投影片 10 已註明。
- 「評估成本較高」為報告者補充，非作者列出的限制；投影片已標示。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 11（詳見 `pptx_audit_zh-TW.md`），皆為對齊微差

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示。
