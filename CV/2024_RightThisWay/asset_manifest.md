# 圖片出處清單 — Right this way

所有圖片以 PyMuPDF 從 `arXiv:2411.00394v1` PDF 以頁面區域裁切渲染（zoom 5，約 360 dpi），未經 OCR 或重繪。原文圖說未包含在裁切內，改以中文圖說呈現。

| 素材 | 原文出處 | 投影片 | 方法 | 裁切檢查 |
|---|---|---|---|---|
| `fig1_task_examples.png` | Figure 1, p.2 | 2 | 頁面裁切，page index 1，clip (100, 66, 512, 176) | 通過：三組問答與對話框完整 |
| `fig2_trainset_generation.png` | Figure 2, p.5 | 5 | 頁面裁切，page index 4，clip (100, 66, 512, 170) | 通過：流程、標籤與圖例完整 |
| `fig3_direction_distribution.png` | Figure 3, p.7 | 4 | 頁面裁切，page index 6，clip (100, 70, 512, 200) | 通過：圓餅圖、四張範例與問題文字完整 |
| `fig4_heatmaps.png` | Figure 4, p.7 | 7 | 頁面裁切，page index 6，clip (100, 226, 512, 467) | 通過：8 張熱圖、標題、色階與零樣本／微調分隔完整 |

## 以原生表格／圖表重建

- §4.2 評測集組成（slide 4）、Table 1（slide 8 長條圖、slide 9 表）、Table 2（slide 9 表）以原生物件重建，數值逐筆對照原文。
