# 圖片出處清單 — GraphRAG

所有圖片以 PyMuPDF 從 `arXiv:2404.16130v2` PDF 依頁面座標以 300 dpi 渲染裁切，未經 OCR、重繪或修改資料。

| 素材 | 原文出處 | 投影片 | 方法 | 裁切檢查 |
|---|---|---|---|---|
| `fig1_pipeline.png` | Figure 1, p.4 | 4 | 頁面裁切（向量圖，clip 125,66–482,284 pt） | 通過：保留全部 8 個節點、箭頭標註與 Indexing / Query Time 圖例 |
| `fig3_self_reflection.png` | Figure 3, p.18（附錄 A.2） | 16（備用頁） | 頁面裁切（向量圖，clip 104,494–512,634 pt） | 通過：保留兩軸刻度、軸標題與三條曲線圖例 |
| `fig4_communities.png` | Figure 4, p.19（附錄 B） | 6 | 頁面裁切（兩張內嵌點陣圖與 (a)(b) 子圖標籤，clip 110,68–526,296 pt） | 通過：保留 (a)(b) 子圖標籤；原圖無座標軸 |
| `fig2_winrates.png` | Figure 2, p.10 | 10 | 頁面裁切（向量圖，clip 104,64–508,334 pt） | 通過：保留兩個資料集標題、4 個指標標題、全部列欄標籤與數值 |

## 以原生表格／圖表重建

頁碼為 26 頁版（正文 1–12、備用頁 13–26）。

- Table 2：slide 11 原生表格；Table 3：slide 24 原生長條圖（座標軸 ID 改寫為正整數）；數值依原文逐筆輸入。
- 六種比較條件：slide 9（正文）與 slide 23（備用頁）原生表格；Algorithm 1 與 Table 1：slide 22。
- 附錄 E.1–E.4 的 prompt：slide 15、19、20 以原生文字節錄關鍵英文原句，未截圖。
- 報告者依原文方法說明以原生圖形繪製，皆已標示「示意」或「整理自」：
  - slide 5：NeoChip 建圖流程；
  - slide 7：community summary 組裝流程；
  - slide 8：map-reduce 三步驟；
  - slide 18：節點 degree 與邊顯著度示意圖。
- slide 2（目錄）、slide 13（workflow 總覽）為原生文字與圖形。
- 依原文數值輸入的原生表格：slide 14（chunk 切分設定）、slide 18（建圖規模）、slide 21（附錄 C 與實驗設定）、slide 12（結論與限制）、slide 25（原文未說明的項目）；slide 17 的 3 條 claim 為原文英文原句。
