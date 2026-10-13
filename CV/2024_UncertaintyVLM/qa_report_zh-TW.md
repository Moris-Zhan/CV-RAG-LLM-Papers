# QA 報告（繁體中文版）— Uncertainty-Aware Evaluation for Vision-Language Models（arXiv:2402.14418v2, 2024）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：resource（workflow-to-validation）；評測基準
- 投影片數：9；內嵌圖片：2；講者備註：9 頁

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查；放大 Figure 3 雷達圖，縮短投影片 5 過長的頁尾
- Table I 為彩色表格，PDF 文字擷取順序混亂，改以 150 dpi 渲染頁面逐格讀取並核對：10 個模型的 Coverage、Acc、SS、UAcc 平均值與名次
- 與正文交叉核對：Monkey-Chat Acc 第 2 / SS 第 9 / UAcc 第 7；MoE-LLaVA Acc 第 8 / SS 第 4 / UAcc 第 4；OODCV 準確率範圍 54.22–74.82、AI2D 53.55–73.67

## 與原文不一致或需保留的地方

- 摘要寫「20+ VLMs」、貢獻段寫「20 VLMs」與「9 個 VLM 系列」，主表 Table I 只列 LLM 2.7B–13B 的 10 個模型；投影片照實說明。
- Figure 3 圖說與正文寫「LLaVA1.6 不同大小」，但圖例為 llava-v1.6-34b、llava-v1.5-13b、llava-v1.5-7b；投影片照原圖呈現並在圖說標註。
- 「需要 logits、不適用只提供文字輸出的模型」為報告者補充，非作者列出的限制。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 6（詳見 `pptx_audit_zh-TW.md`），皆為對齊微差

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示。
