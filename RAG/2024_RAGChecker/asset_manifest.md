# 圖片出處清單 — RAGChecker

所有圖片以 PyMuPDF 從 `arXiv:2408.08067v2` PDF 擷取原始內嵌點陣圖，未經 OCR 或重繪。

| 素材 | 原文出處 | 投影片 | 方法 | 裁切檢查 |
|---|---|---|---|---|
| `fig1_metrics.png` | Figure 1, p.4 | 4 | 原始內嵌點陣圖完整擷取（xref 310，2004 × 2005 px） | 通過：完整保留文氏圖、片段分類、圖例與三組指標公式；原文圖說改寫為中文 |

## 以原生表格／圖表重建

- Table 1（slide 6 節錄表）、Table 2（slide 7 長條圖，Overall Pearson）、Table 3（slide 8 完整表、slide 9 雜訊敏感度長條圖）、§4.4 調參結果（slide 10）以原生物件重建，數值逐筆對照原文。
