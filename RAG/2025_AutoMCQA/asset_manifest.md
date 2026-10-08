# Asset manifest — Automated MCQA Benchmarking at Scale (arXiv:2509.10744)

All 6 assets are the paper's own embedded raster figures, extracted directly from the arXiv
PDF (`https://arxiv.org/pdf/2509.10744`) with PyMuPDF's `page.get_images()` + `Pixmap`
(exact original resolution, no re-rendering, no re-drawing, no OCR). No cropping was
necessary — each figure is a single self-contained embedded image in the source PDF, so the
full original image (including titles, legends, axis labels, and captions baked into the
figure itself) was extracted as-is.

```text
asset: fig1_workflow.png
source: Figure 1, p.2 (workflow overview)
slide: 4
method: PyMuPDF page.get_images() full extraction, xref 283, page index 1 (0-based)
native size: 960 x 540 px
crop_qa: pass — full diagram (corpus → parsing → chunking → MCQ/RAG/reasoning-trace stages) preserved, no crop applied
notes: placed full-width (~8.1in) on a process-wide slide layout

asset: fig2_mcqa_schema.png
source: Figure 2, p.2 (MCQA JSON schema)
slide: 5
method: PyMuPDF full extraction, xref 284, page index 1 (0-based)
native size: 1124 x 1241 px
crop_qa: pass — all schema fields and the box border preserved, no crop applied
notes: tall/portrait image placed in a ~4.8in-wide right-hand panel next to the design bullets

asset: fig3_reasoning_trace_schema.png
source: Figure 3, p.3 (reasoning-trace JSON schema)
slide: 6
method: PyMuPDF full extraction, xref 285, page index 2 (0-based)
native size: 1375 x 1734 px
crop_qa: pass — all three reasoning-mode sub-schemas (detailed/focused/efficient) and the footnote preserved, no crop applied
notes: very tall image, placed in a narrower ~4.3in right-hand panel to keep text legible at slide scale

asset: fig4_synthetic_improvement.png
source: Figure 4, p.4 (percent accuracy improvement, synthetic benchmark)
slide: 9
method: PyMuPDF full extraction, xref 288, page index 3 (0-based)
native size: 1979 x 1182 px
crop_qa: pass — title, legend, log-scale axis, all 8 model labels and percentage data labels preserved
notes: hero figure at ~8.4in wide; three data-carrying metric cards on the right restate the chart's key values (not decorative)

asset: fig5_astro_all_improvement.png
source: Figure 5, p.4 (percent accuracy improvement, ASTRO exam — all questions)
slide: 10
method: PyMuPDF full extraction, xref 289, page index 3 (0-based)
native size: 1979 x 880 px
crop_qa: pass — title, legend, axis, all 8 model labels and +/- percentage labels preserved
notes: hero figure at ~8.7in wide; rail highlights the Llama-3-8B negative-gain exception directly from Table 3

asset: fig6_astro_nomath_improvement.png
source: Figure 6, p.4 (percent accuracy improvement, ASTRO exam — no-math subset)
slide: 11
method: PyMuPDF full extraction, xref 290, page index 4 (0-based)
native size: 1979 x 880 px
crop_qa: pass — title, legend, axis, all 8 model labels and percentage labels preserved
notes: hero figure at ~8.7in wide; rail restates Table 4 values (SmolLM3 89.4% accuracy, Qwen tie on RAG-Chunks vs. baseline)
```

## Natively recreated content (not screenshotted)

- **Table 1 (evaluated SLM overview, p.2)** — retyped verbatim as a native PowerPoint table on
  slide 7 (model / params / release year / context window for all 8 models); all values
  transcribed directly, no computation involved.
- **Table 2 (synthetic benchmark accuracy, p.3)** — retyped as a native table on slide 8
  (8 models × 5 conditions); the best value per row is highlighted in the accent color,
  reproducing the paper's own per-row bolding convention. Values were cross-checked against
  the paper's own Figure 4 percentage-improvement figures during authoring (all consistent).
- **Table 3 / Table 4 (ASTRO exam accuracy, p.4)** — not retyped as full tables; the specific
  baseline/RAG-Chunks/RAG-RT accuracy figures needed for the slide 10–11 callouts were
  transcribed individually from the paper text and cross-checked against Figures 5–6's
  percentage-improvement labels (all consistent), then presented as data-carrying metric
  cards rather than a third and fourth full table, to avoid repeating the same table format
  four times in the deck.
