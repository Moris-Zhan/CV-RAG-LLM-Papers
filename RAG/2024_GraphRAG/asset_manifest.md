# 圖片出處清單 — GraphRAG

所有圖片以 PyMuPDF 從 `arXiv:2404.16130v2` PDF 依頁面座標以 300 dpi 渲染裁切，未經 OCR、重繪或修改資料。

| 素材 | 原文出處 | 投影片 | 方法 | 裁切檢查 |
|---|---|---|---|---|
| `fig1_pipeline.png` | Figure 1, p.4 | 4 | 頁面裁切（向量圖，clip 125,66–482,284 pt） | 通過：保留全部 8 個節點、箭頭標註與 Indexing / Query Time 圖例 |
| `fig3_self_reflection.png` | Figure 3, p.18（附錄 A.2） | 6 | 頁面裁切（向量圖，clip 104,494–512,634 pt） | 通過：保留兩軸刻度、軸標題與三條曲線圖例 |
| `fig4_communities.png` | Figure 4, p.19（附錄 B） | 8 | 頁面裁切（兩張內嵌點陣圖與 (a)(b) 子圖標籤，clip 110,68–526,296 pt） | 通過：保留 (a)(b) 子圖標籤；原圖無座標軸 |
| `fig2_winrates.png` | Figure 2, p.10 | 16 | 頁面裁切（向量圖，clip 104,64–508,334 pt） | 通過：保留兩個資料集標題、4 個指標標題、全部列欄標籤與數值 |

## 以原生表格／圖表重建

- Table 2（slide 17 原生表格；slide 11 節錄 Units 列）、Table 3（slide 18 原生長條圖）依原文數值逐筆輸入。
- Algorithm 1 與 Table 1（slide 14）、六種比較條件（slide 15）以原生圖形與表格重建，Table 1 範例保留原文英文。
- 附錄 E.1–E.4 的 prompt（slide 5、10、12）以原生文字節錄關鍵英文原句，未截圖。
- slide 7（NeoChip 建圖示意）、slide 9（社群摘要組裝流程）為報告者依 §3.1.2–3.1.5 以原生圖形繪製。
- 附錄 C 的 context 視窗勝率與 §4.1 實驗設定（slide 13）以原生文字與表格呈現。
