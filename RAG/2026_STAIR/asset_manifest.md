# Asset manifest — STAIR (SearchTome)

All assets extracted from `arXiv:2609.03874v1` PDF with PyMuPDF page-region clipping at 5x zoom (~360 dpi equivalent). No OCR or manual redraw was used; all crops preserve the original vector/raster content exactly as published.

```text
asset: fig1_toc_example.png
source: Figure 1, p.2 (motivating example)
slide: 3
method: pdf page clip, page index 2 (1-based), rect (65,65,530,298) at zoom 5.0
crop_qa: pass
preserved: full embedded figure image (ToC screenshot + query/content box + highlighted entry), no paper caption included (caption rewritten in Chinese on slide)
notes: original single embedded raster image (xref 491); bbox matched exactly with 5-10pt margin

asset: fig2_pipeline.png
source: Figure 2, p.5 (pipeline overview)
slide: 4
method: pdf page clip of vector drawing region, page index 5 (1-based), rect (65,76,520,296) at zoom 5.0
crop_qa: pass
preserved: all 3 stage group boxes, stage labels, all node boxes and arrows
notes: figure is native vector (42 drawing primitives), not a raster image; bbox derived by filtering drawings above the "Figure 2:" caption line and unioning with stage-label text bboxes

asset: fig3_hallucination.png
source: Figure 3, p.8 (left column)
slide: 10
method: pdf page clip, page index 8 (1-based), rect (65,218,294,403) at zoom 5.0
crop_qa: pass
preserved: title, both curve labels (DSI/STAIR legend), x/y axis labels, tick labels
notes: embedded raster image (xref 508), cropped to image bbox + small margin; paper's own caption text (English) not included, rewritten in Chinese on slide

asset: fig4_recall_leaf.png
source: Figure 4, p.8 (right column)
slide: 11
method: pdf page clip, page index 8 (1-based), rect (301,230,529,400) at zoom 5.0
crop_qa: pass
preserved: legend (DSI/STAIR), y-axis label and ticks, x-axis label
notes: embedded raster image (xref 509), cropped to image bbox + small margin

asset: table4_main_results.png
source: Table 4, p.8 (top, full width)
slide: 8
method: pdf page clip, page index 8 (1-based), rect (65,68,528,172) at zoom 5.0
crop_qa: pass
preserved: table title, all column headers (6 domains + Avg), all 6 system rows, bold STAIR row
notes: used as image rather than a rebuilt native table to avoid transcription risk on 42 slash-separated triples; kept at native aspect ratio so all digits stay legible at slide scale
```

## Not extracted as images (recreated natively instead)

- **Table 1 (SearchTome book/domain statistics, p.4)** — the 18-row per-book table was too dense to read at slide scale. Slide 6 instead shows a domain-level rollup (3 books/domain; total pages, ToC leaf count, train/dev/test question counts) computed by summing the paper's own per-book numbers in Table 1. Sums were computed in Python, not by hand, to avoid arithmetic error.
- **Table 2 (sample training example, p.5)** — short enough to retype verbatim as native text on slide 5 (prompt template + completion), preserving the exact wording from the paper.
- **Table 3 (qualitative examples, p.7)** — Example 1 (preschool "Initiative vs. Guilt" query) retyped verbatim as a native comparison table on slide 12; the paper's per-system predictions are quoted exactly.

## 繁體中文版（slides_zh-TW.pptx）使用的素材

| 素材 | 投影片 |
|---|---|
| `fig1_toc_example.png` | 3 |
| `fig2_pipeline.png` | 6 |
| `fig3_hallucination.png` | 9 |
| `fig4_recall_leaf.png` | 9 |

Table 1 依領域加總（slide 4）、Table 4 平均值與各領域 Recall@1（slide 7）、baseline 比較（slide 8）、§8 錯誤率（slide 9）、Table 3 第一個範例（slide 10）以原生表格／圖表呈現；table4_main_results.png 未在繁中版使用。
