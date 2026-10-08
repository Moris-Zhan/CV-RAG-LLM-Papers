# Asset manifest — HopWeaver (ACL 2026 / aclanthology.org/2026.acl-long.1295)

All 4 assets are cropped directly from the paper's own PDF (`https://aclanthology.org/2026.acl-long.1295.pdf`)
with PyMuPDF. One figure (Figure 2) is the paper's own embedded raster image, extracted whole.
The other three (Figures 1, 3, 4) are native vector/matplotlib drawings in the PDF, so each was
isolated by rendering only its bounding-box region at high zoom (6–7x) rather than downscaling
a full-page screenshot — this keeps every label, legend, and axis crisp at slide scale.

```text
asset: fig1_motivating_example.png
source: Figure 1, p.1 (motivating example: Bridge vs. Comparison question)
slide: 3
method: PyMuPDF page.get_pixmap(clip=Rect(298,217,538,425), matrix=Matrix(6,6)) on page index 0
crop_qa: pass — both sub-figures (green Bridge box, blue Comparison box), all entity/relation
         labels, both Q/A lines, and the bottom Relation/Entity/Value legend are fully preserved;
         no caption text included (caption rewritten in Chinese on slide)
notes: native vector figure spanning the right column of page 1; cropped tightly to the figure's
       own bounding box using text-anchor coordinates ("Bridge Multi-Hop Question" title to the
       "Value" legend line) to avoid clipping any label

asset: fig2_pipeline.png
source: Figure 2, p.4 (HopWeaver: Question Synthesis Framework)
slide: 4
method: PyMuPDF page.get_images() full extraction, xref 682, page index 3 (0-based)
crop_qa: pass — original embedded raster image, full resolution (2064x739), no cropping applied;
         all stage boxes, step-number badges, and the Polishing/Validation outcome icons preserved
notes: this is the paper's own embedded bitmap, not a vector drawing, so it required no bounding-
       box search — just a straight xref extraction

asset: fig3_fine_tuning_reranker.png
source: Figure 3, p.5 (Fine-Tuning Reranker)
slide: 7
method: PyMuPDF page.get_pixmap(clip=Rect(58,612,296,693), matrix=Matrix(7,7)) on page index 4
crop_qa: pass — all icons (corpus, generate, negative/positive document stacks, reranker, fire
         icon) and both branch labels ("Failed Doc." / "Successful Doc.") preserved
notes: small vector diagram in the left column; clip box tuned to start just below the section
       heading and end just above the "Figure 3:" caption line, confirmed via text-search anchors

asset: fig4_radar_evaluation.png
source: Figure 4, p.7 (Multi-Dimensional Evaluation Across Datasets — radar chart)
slide: 11
method: PyMuPDF page.get_pixmap(clip=Rect(298,172,566,391), matrix=Matrix(6,6)) on page index 6
crop_qa: pass — chart title, all 9 axis labels, the [3.0, 4.5] scale ring labels, and the full
         7-series legend (2wiki/HotpotQA/MuSiQue/Gemini/QwQ/GLM/Qwen14B bridge) all preserved
notes: native matplotlib vector chart in the right column; clip box anchored from the chart's own
       title text down to just above the "Figure 4:" caption
```

## Natively recreated content (not screenshotted)

- **Table 1 (main quality evaluation, p.4)** — retyped verbatim as a native table on slide 10;
  the 4 HopWeaver-generator rows are tinted light green to visually group them against the 3
  human-dataset baseline rows, mirroring the paper's own two-block table structure without
  replicating its merged-header LaTeX layout.
- **Table 2 (answerability/difficulty, p.6)** — split into two native 5-column mini-tables
  (Bridge / Comparison) placed side by side on slide 12, instead of one 9-column table, to keep
  each column wide enough to stay legible at slide scale.
- **Table 3 (evidence-accessibility, p.6)** — retyped as one native 8-column table on slide 13;
  the Support F1 column is highlighted in the accent color to draw attention to the paper's own
  "individually accessible, jointly hard to complete" finding.
- **Table 4 (RAG systems end-to-end, p.6)** — retyped as a native table on slide 14; each
  percentage-change annotation (e.g. "↓29%") is reproduced exactly as printed in the paper.
- **Table 5 (reranker ablation, p.7–8)** and **Table 6 (Polisher ablation, p.8)** — both retyped
  as native tables side by side on slide 15 (Table 5 narrow on the left, Table 6 wider on the
  right, reflecting their very different column counts).
- **Table 7 (pipeline rejection statistics, p.8)** and **Appendix Table 9/10 (human validation)
  and Appendix D (cost analysis)** — not rebuilt as tables; the specific percentages and dollar
  figures needed for slide 16's narrative and metric cards were transcribed individually from
  the source text, to avoid stacking a fifth and sixth full table in one deck.
