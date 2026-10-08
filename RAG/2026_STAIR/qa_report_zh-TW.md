# QA report（繁體中文版）— STAIR (STructure Aware Information Retriever) / SearchTome（arXiv:2609.03874v1, 2026）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）；簡體版 `slides_zh-CN.pptx` 保留不變
- 論文類型：methods（problem-to-solution），含 resource（SearchTome）
- 投影片數：11；內嵌圖片：4；講者備註：11 頁
- 圖片沿用本資料夾既有 `assets/figures/`（見 `asset_manifest.md`），未重新裁切

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查；修正過長標題、表格欄寬與重點帶長度
- 數字逐筆對照原文表格頁面的渲染圖；與正文敘述不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- 摘要與結論稱 STAIR 比 DSI 好 7.4%，為相對提升（82.6 / 76.9）；絕對差距為 5.7 個百分點，投影片兩者皆說明。
- Table 4 含 Haiku（Claude Haiku 4.5）一列，但正文 baseline 段落未說明其使用方式；投影片標示此點。
- §8 中 Mistral 的 26.81% 為「錯誤中」的比例，與 DSI、STAIR 的分母不同；投影片表格已標註。
- SearchTome 的 Education 領域含《Open Music Theory》、Social Sciences 含《Foundations of Aural Skills》，分類依原文。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 4（詳見 `pptx_audit_zh-TW.md`）
- 另以 python-pptx 重新開啟，確認形狀皆在投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以文泉驛正黑替代。
