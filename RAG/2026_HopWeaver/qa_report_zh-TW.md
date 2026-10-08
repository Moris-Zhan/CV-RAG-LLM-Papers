# QA report（繁體中文版）— HopWeaver: Cross-Document Synthesis of High-Quality and Authentic Multi-Hop Questions（ACL 2026 Long, pp. 28078–28109）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）；簡體版 `slides_zh-CN.pptx` 保留不變
- 論文類型：methods（problem-to-solution）
- 投影片數：14；內嵌圖片：4；講者備註：14 頁
- 圖片沿用本資料夾既有 `assets/figures/`（見 `asset_manifest.md`），未重新裁切

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查；修正過長標題、表格欄寬與重點帶長度
- 數字逐筆對照原文表格頁面的渲染圖；與正文敘述不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- Table 4 中 HotpotQA 與 2WikiMultiHopQA 的分數取自 FlashRAG 發表數值，非作者在同一環境重跑；投影片備註已說明。
- Figure 4 雷達圖的圖例字體在投影片尺寸下偏小，關鍵結論已在重點帶說明。
- 主要品質分數來自 LLM 評審（人工一致率 94%），slide 13 以「報告者補充」標示此限制。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 9（詳見 `pptx_audit_zh-TW.md`）
- 另以 python-pptx 重新開啟，確認形狀皆在投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以文泉驛正黑替代。
