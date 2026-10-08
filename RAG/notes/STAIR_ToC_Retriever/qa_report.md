# QA report — STAIR (SearchTome) 論文簡報

**Source:** arXiv:2609.03874v1 [cs.AI], "STAIR (STructure Aware Information Retriever): A novel dataset and LLM based retriever for document structure augmentation" (Vineet Kumar et al., IBM)
**Paper type:** methods（LLM-based retrieval method + new benchmark）→ problem-to-solution arc
**Output language:** 繁體中文（依使用者指定）
**Deliverable:** `output/final_presentation_cn.pptx` — 14 張投影片，16:9，含逐頁備忘稿

## PPTX creation status

✅ Built successfully with `python-pptx` (no template supplied; built from scratch with a restrained Nature-style light palette: navy `#1F355C` for structure/titles, amber `#D9762B` as the STAIR/highlight accent — matching the paper's own orange STAIR curves — muted blue `#3B6FA0` for baseline references, gray `#747B87` for captions/sources).

## Slide count & content

14 slides following the problem-to-solution arc for methods papers:
1. 封面 → 2. 研究背景/瓶頸 → 3. 動機（Fig.1）→ 4. 方法總覽（Fig.2, 全寬流程圖）→ 5. 關鍵設計（訓練樣本, Table 2）→ 6. 新基準 SearchTome（Table 1 領域彙總）→ 7. 實驗設置（基線/指標/微調參數）→ 8. 主要結果（Table 4）→ 9. 統計顯著性 → 10. 消融一：幻覺（Fig.3）→ 11. 消融二：低資源（Fig.4）→ 12. 案例分析（Table 3, Example 1）→ 13. 適用邊界/限制 → 14. 結論與未來方向。

## Figures inserted

5 image assets embedded (see `output/asset_manifest.md` for full extraction/crop-QA record):
- `fig1_toc_example.png` (slide 3), `fig2_pipeline.png` (slide 4), `fig3_hallucination.png` (slide 10), `fig4_recall_leaf.png` (slide 11), `table4_main_results.png` (slide 8).

No missing or placeholder figures. All crops preserve titles, axes, legends, panel content, and table headers — no scientific context was cut off (verified against the original PDF page renders before cropping).

## Figure-crop QA results

All 5 crops passed the crop QA hard gate (panel/axis/legend/label preservation, safety margin, readability at slide scale). Details and method (PyMuPDF clip rectangles, exact coordinates) recorded per-asset in `asset_manifest.md`. Figure 2 required special handling because it is native vector art (not a raster image); its bounding box was derived by filtering PDF drawing primitives and stage-label text boxes rather than an image xref.

## Natively recreated content (not screenshotted)

- Slide 5: Table 2 sample training example retyped verbatim (monospace card).
- Slide 6: Table 1's 18-book table rolled up to 6 domain rows; sums computed in Python from the paper's own per-book numbers (not by hand).
- Slide 8: Table 4 kept as an image (not retyped) to avoid transcription risk on 42 slash-separated triples; all digits verified legible in the rendered preview.
- Slide 12: Table 3 Example 1 retyped as a comparison table, predictions quoted exactly from the paper.

## Alignment checks

`scripts/audit_pptx_quality.py` run before and after the self-review revision (full output in `pptx_audit.md`): **0 high, 0 medium, 21 low** findings, all `alignment_near_miss` from a consistent ~4–6pt internal text-inset used across metric-chip components (padded label text vs. a centered number above it) — a deliberate, uniformly-applied design choice rather than accidental drift, so no fix was required per the severity rules (low = cosmetic).

## De-template language scan

Manually scanned all slide text and speaker notes against the banned-phrase list (一句話總結, 最有價值的後續方向, 不是……而是……, 值得注意的是, 總的來說, 從某種意義上, 提供了新的視角, 具有重要意義, 未來可以進一步探索, etc.) — none present. All claims are paper-specific and evidence-bound (tied to named figures/tables/sections).

## Traditional Chinese script check

Ran an automated Simplified→Traditional diff (`opencc` `s2t`) over every CJK text run in the build script. Found and fixed 1 genuine simplified character (说明→說明) and 1 unrelated typo (幻覈→幻覺). Two remaining diffs (分布→分佈) were left unchanged because 分布 is standard, correctly-used Traditional-Chinese statistical terminology, not a simplified-character error.

## Self-review defects found & corrected

1. **Medium (fixed):** Slides 9 and 13 (originally pure text-argument slides) left a large unstructured blank region between the bullets and the bottom takeaway band, per the page-fullness rule. Fixed by adding an evidence-grounded support layer: slide 9 got a 6-domain "p < 0.05 ✓" chip row (each domain's significance result, not decoration); slide 13 got a two-box "已驗證規模 → 未來待驗證規模" scope comparison reusing numbers already established on slide 6 and slide 13's own bullets (no new figures invented).
2. **Low:** 1 simplified character and 1 typo in speaker notes (see above) — fixed.
3. **Low:** Metric-chip internal alignment near-misses (~4–6pt) — reviewed, judged intentional/consistent padding, not corrected (see Alignment checks above).

No high-severity issues were found in either review pass.

## Text overflow / text-fit checks

Every slide was rendered to PDF via headless LibreOffice (`soffice --headless --convert-to pdf`) and inspected page-by-page at slide scale. No text exceeds or is clipped by its box; no overlap between text, figures, captions, or takeaway bands; all bullets stay within the ~2–4 item / short-sentence budget; the monospace training-example card (slide 5) was measured to fit its box before insertion.

## Design-rhythm / anti-template review

Composition varied deliberately across the 14 slides: cover (typographic), pure-claim/background (×2), figure-dominant hero (×4: slides 3, 8, 10, 11), full-width process diagram (slide 4), code-card + interpretation rail (slide 5), native data table + metric chips (slide 6, 8), three-column comparison (slide 7), comparison table (slide 12), and text-led synthesis with closing metric chips (slide 14). No more than 4 slides share the same composition family, and the recurring metric-chip element is reused as a data-carrying element (not decorative padding) each time.

## Verification method after revision

1. Re-ran `scripts/audit_pptx_quality.py` after the slide 9/13 revision — findings stayed at 0 high / 0 medium (see Alignment checks above).
2. Reopened the saved `.pptx` with `python-pptx`: confirmed 14 slides, 5 embedded pictures, 14/14 slides carry non-empty speaker notes.
3. Re-rendered the revised slides to PNG via LibreOffice and visually re-inspected — both now read as complete, evidence-backed compositions.

## Known limitations

- No check was made against a Traditional-Chinese font actually installed in the end user's PowerPoint — the deck specifies `微軟正黑體` (Microsoft JhengHei) as the CJK typeface with `Calibri` as the Latin companion, both Office-standard fonts; if unavailable, PowerPoint will substitute automatically without breaking layout (text boxes are sized with margin, not auto-fit-dependent).
- Table 4 main-results numbers are delivered as a cropped image rather than an editable native table, by deliberate choice (see "Natively recreated content" above) — if the user later wants an editable version, the exact figures are already reproduced in slide 8's metric chips and could be rebuilt as a native table on request.
- `output/rendered/` retains the full converted PDF and the two re-rendered PNGs (slides 9, 13) from the QA pass, kept for traceability rather than deleted.
