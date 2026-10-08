# QA report（繁體中文版）— D-GEN: Automatic Distractor Generation and Evaluation for Reliable Assessment of Generative Models (arXiv:2504.13439v2)

## 交付狀態

- 主檔：`final_presentation_zh_tw.pptx`（16:9，繁體中文，含講者備註）
- 原始論文：2025_DGEN_DistractorGeneration_arXiv2504.13439.pdf
- 論文類型：methods（problem-to-solution）
- 投影片數：13；內嵌圖片：4；講者備註：13 頁
- 產生工具：python-pptx（原生文字框、表格與圖表）；字型：Microsoft JhengHei（中文）＋ Calibri（英數）

## 自我審查與修正

第一版產生後以 LibreOffice headless 轉 PDF 渲染全部投影片，逐頁檢查後修正：

- 標題過長換行（以字寬估算自動檢查）→ 縮短標題；共用函式在仍會換行時降為 24pt
- 多行文字在方框內對齊不一致 → 共用函式改為每行獨立段落
- 圖形繼承佈景主題陰影 → 移除 shape style
- 版面下半部留白過多、圖說與重點帶重疊 → 調整字級、間距或改為上下堆疊版面
- 數字與原文逐筆比對；與原文正文不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- 正文寫 Kendall τ 範圍為 0.8862–0.9297（僅四個領域）；Table 2 的 Overall 為 0.9413，投影片兩者皆列出並在備註說明。
- Table 3 準確率差的單位未標示（推測為 0–1 比例）；投影片照原值呈現，備註中標明為推測。
- Figure 4（分數分布堆疊圖）與 Table 1（21 模型 × 4 領域熱圖）未放入，前者以 Table 7 取代，後者以排名相關結果代表。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 5（詳見 `pptx_audit.md`）
- low 類別：alignment_near_miss（多為刻意對齊至不同參考線所致，不影響閱讀）
- 另以 python-pptx 重新開啟檔案，確認所有形狀皆位於投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，改以文泉驛正黑替代；在 PowerPoint 中字寬可能略有差異，已預留邊距。
- 原始圖片中的英文小字維持原樣，未翻譯。
