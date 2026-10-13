# 圖片出處清單 — Uncertainty-Aware Evaluation for VLMs

圖片以 PyMuPDF 從 `arXiv:2402.14418v2` PDF 擷取，未經 OCR 或重繪。

| 素材 | 原文出處 | 投影片 | 方法 | 裁切檢查 |
|---|---|---|---|---|
| `fig1_confidence_examples.png` | Figure 1, p.1 | 2 | 原始內嵌點陣圖完整擷取（xref 134） | 通過：題目、模型與機率分布三列完整 |
| `fig3_llava_scale_radar.png` | Figure 3, p.6 | 7 | 頁面裁切渲染，page index 5，clip (100, 300, 520, 470)，zoom 5 | 通過：三張雷達圖、刻度與圖例完整；原文圖說改寫為中文 |

## 以原生表格／圖表重建

- §IV 資料集處理（slide 4）、Table I（slide 5 表、slide 6 長條圖）、§VI-D 的 ECE／MCE 數值（slide 8）以原生物件重建，數值逐筆對照原文。
