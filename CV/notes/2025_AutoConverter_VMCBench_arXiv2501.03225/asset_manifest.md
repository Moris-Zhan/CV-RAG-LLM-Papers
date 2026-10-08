# Asset manifest — Automated Generation of Challenging Multiple-Choice Questions for Vision Language Model Evaluation（AutoConverter / VMCBench, arXiv:2501.03225v2）

所有素材皆取自論文原始 PDF，未經 OCR、重繪或修改資料內容。

```text
asset: fig2_openended_eval_challenges.png
source: Figure 2, p.3
slide: 2
method: PyMuPDF 頁面裁切渲染，clip=(56,70,556,214)，zoom 5
size: 2500 x 720 px
crop_qa: pass
preserved: 兩個子圖標題、座標軸、Spearman 標註與圖例完整；未含原文圖說

asset: fig3a_autoconverter_framework.png
source: Figure 3a, p.4
slide: 4
method: PyMuPDF 頁面裁切渲染，clip=(57,70,306,257)，zoom 5
size: 1245 x 935 px
crop_qa: pass
preserved: Increase Difficulty／Ensure Correctness 兩區與所有代理人標籤完整；刻意排除被截半的子圖說「(a) AutoConverter framework」

asset: fig4_vs_human_distractors.png
source: Figure 4, p.5
slide: 6
method: PyMuPDF 原始內嵌點陣圖完整擷取（xref 304）
size: 2952 x 1063 px
crop_qa: pass
preserved: 圖例、三個子圖、座標軸與 Spearman 值完整

asset: fig5_qualitative_examples.png
source: Figure 5, p.6
slide: 8
method: PyMuPDF 頁面裁切渲染，clip=(57,70,557,231)，zoom 5
size: 2500 x 805 px
crop_qa: pass
preserved: 表頭與三列範例完整；小字在投影片尺寸下偏小，關鍵例子已在重點帶與備註中重述

asset: fig6_vmcbench_overview.png
source: Figure 6, p.7
slide: 9
method: PyMuPDF 頁面裁切渲染，clip=(56,68,556,274)，zoom 5
size: 2500 x 1030 px
crop_qa: pass
preserved: 左側旭日圖與右側八個範例完整；資料集名稱小字偏小，已在重點帶與備註列出

```

## 原生重建的表格與圖表

Figure 3b 消融表（slide 7）、Table 1 全部 33 個模型（slide 11，數值以 PyMuPDF 文字座標程式化擷取，非人工轉抄）、Figure 9 相關係數（slide 3）、§4.2 正確性分數統計（slide 5）以原生表格／圖表呈現。
