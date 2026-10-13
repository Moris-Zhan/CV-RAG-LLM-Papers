# QA 報告（繁體中文版）— ASCEND（LREC 2022, pp. 7259–7268）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：resource（workflow-to-validation）
- 投影片數：12；內嵌圖片：4；講者備註：12 頁

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查；放大投影片 9 的 Figure 7，並重新排列 Figure 8–9 與要點文字
- 數字逐筆對照原文 Table 2–12 的渲染頁面：12,314 句、10.62 小時、Table 5 語言分布、Table 7 各主題比例、Table 11 詞彙大小、Table 12 基線結果

## 與原文不一致或需保留的地方

- 前言寫「collect 26 dialogue sessions」，但 §3.2 與 Table 2 為 13 組 × 最多 4 場 = 49 場、98 個音檔；投影片以 49 場為準，並在投影片 4、12 與講者備註註明。
- §2 的參考錯誤率（MER 24.2%、CER 29.30%）為作者引用的既有研究，不是 ASCEND 的結果。
- 驗證與測試集「各僅 2–3 位說話者」是報告者從 Figure 1 長條圖讀出的估計，原文未列確切人數。
- 「哲學類只有 4 場、樣本少」以及「測試集 CER 中文與英文模型僅差 0.09 個百分點」為報告者補充，講者備註已標明。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 2、low = 6（詳見 `pptx_audit_zh-TW.md`）
- 兩個 medium 為投影片 9 的 Figure 8–9（`small_evidence_image`）。這兩張是並排的輔助分布圖，要點已用文字列出；渲染後座標軸與長條可清楚辨識，因此接受。
- low 皆為 3–7 pt 的對齊微差。

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示。
