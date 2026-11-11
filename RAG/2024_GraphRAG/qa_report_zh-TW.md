# QA 報告（繁體中文版）— GraphRAG（arXiv:2404.16130v2, 2024）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：methods（problem-to-solution）；方法論文，附 LLM 評審式評測設計
- 投影片數：14；內嵌圖片：4；原生表格 2、原生圖表 1；講者備註：14 頁

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查，第一版發現並修正：
  - high：slide 4、11 標題過長換行，壓到分隔線與圖片 → 縮短標題
  - medium：slide 6、10 圖說貼近底部重點帶 → 縮小圖片最大高度
  - medium：slide 8 範例底框留白過多 → 縮短底框
  - low：slide 9 表格說明欄置中不易閱讀 → 改為靠左
- 數字逐筆對照原文：Figure 2 勝率區間、Table 2 全部 30 格、Table 3 全部 12 格、§4.1 資料集 chunk 數、§5.1 圖規模、§5.2 的 47,075 claims 與 78% / 69–70% 一致率

## 與原文不一致或需保留的地方

- PDF 首頁標示「Preprint. Under review.」；索引只列 arXiv 編號，不標註會議。
- 「C0 只用 TS 約 2–3% tokens」取自 Table 2 的 % Max（2.6、2.3）；正文寫「over 97% fewer」，兩者一致。
- 「C0 對 SS 72% / 62%」為正文原句，作者以兩資料集中較低者表述。
- slide 2 的 NeoChip 局部問題為報告者依原文擷取範例改寫的示意，已標註「示意」。
- slide 13「評測問題偏向全域型，未檢驗局部事實問答」為報告者補充，已標示；其餘限制來自原文 §6.1 與方法、結果段落。
- slide 3 提到的既有階層式摘要方法，原文引用 Kim et al. 2023 與 Sarthi et al. 2024（RAPTOR）；投影片不點名，僅在講者備註提及。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 30（詳見 `pptx_audit_zh-TW.md`），皆為對齊微差（`alignment_near_miss`）
- 另以 python-pptx 重新開啟，確認形狀皆在投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示；在 PowerPoint 中字寬略有差異。
- Figure 2 為 8 個熱圖的組合，投影時數字偏小；講者備註已列出關鍵數字，右側重點欄也重述主要勝率。
- 附錄 Table 4（多樣性分群數）與 Table 6（統計檢定）未放上投影片，僅在講者備註摘述。
