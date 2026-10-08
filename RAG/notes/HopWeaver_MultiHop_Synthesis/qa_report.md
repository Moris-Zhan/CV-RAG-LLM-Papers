# QA report — HopWeaver（跨文件多跳問題合成）論文簡報

**Source:** ACL 2026 (Volume 1: Long Papers), "HopWeaver: Cross-Document Synthesis of
High-Quality and Authentic Multi-Hop Questions" (Zhiyu Shen et al., Sun Yat-sen University /
Hong Kong Metropolitan University; aclanthology.org/2026.acl-long.1295,
doi:10.18653/v1/2026.acl-long.1295)
**Paper type:** methods（全自動跨文件多跳問答資料集合成框架）→ problem-to-solution arc
**Output language:** 繁體中文（依使用者指定；模型名稱、資料集名稱、公式符號、數值皆保留英文/阿拉伯數字原文）
**Deliverable:** `output/final_presentation_cn.pptx` — 17 張投影片，16:9，全數附中文備忘稿

## PPTX creation status

✅ 使用 `python-pptx` 從零建構（未使用使用者提供的範本）。配色沿用本專案 Nature 風格淺色調，
並額外依論文自身 Figure 1 的顏色語言擴充雙軌配色：海軍藍 `#1B3A5C`（標題／結構）、
綠色 `#3E8E5B`（Bridge 問題軌道，呼應 Figure 1 的綠色 Bridge 方框）、
藍色 `#2E6E9E`（Comparison 問題軌道，呼應 Figure 1 的藍色 Comparison 方框）、
橙色 `#D9752B`（一般重點／數據亮點）、灰色 `#6B7280`（說明文字／來源標示）。
中文字型「微軟正黑體」，英文/數字/公式符號使用 Calibri，透過 OOXML `<a:ea>` 明確設定東亞字型。

## Slide count & content

17 張投影片，依 methods 類型論文的「problem-to-solution」敘事弧：
1. 封面 → 2. 研究背景/兩難 → 3. 核心貢獻與範例（Fig.1）→ 4. 方法總覽（Fig.2，全寬流程圖）→
5. Bridge 問題關鍵設計（含 Eq.1）→ 6. Comparison 問題關鍵設計 →
7. 對比學習微調 Reranker（Fig.3 + Eq.2）→ 8. Polishing & Validation 四态守門 →
9. 三維評估系統設計 → 10. 主要結果一：品質評估（Table 1）→ 11. 主要結果二：多維雷達圖（Fig.4）→
12. 主要結果三：可答性與難度（Table 2，拆為 Bridge/Comparison 雙表）→
13. 主要結果四：證據可達性（Table 3）→ 14. RAG 系統端到端挑戰（Table 4）→
15. 消融實驗：Reranker 與 Polisher（Table 5+6）→ 16. 管線效率、成本與人工驗證（Table 7 + 附錄 C/D）→
17. 侷限、可擴展性與結論。

17 張略高於預設 12–16 張的建議上限，屬有意為之：本篇論文的實證章節（§5.1–5.6）
與附錄驗證（Appendix C、D）內容遠比一般 methods 論文豐富，若強行壓縮到 16 張以內，
需要犧牲至少一組獨立的量化證據（可答性難度、證據可達性、或人工驗證三者之一），
因此依核心原則「以論文的科學論證為投影片主軸」保留完整的七項實證結果。

## Figures inserted

4 張圖片全部嵌入完成（詳見 `output/asset_manifest.md`）：`fig1_motivating_example.png`
（投影片3）、`fig2_pipeline.png`（投影片4）、`fig3_fine_tuning_reranker.png`（投影片7）、
`fig4_radar_evaluation.png`（投影片11）。Figure 2 是論文原生嵌入點陣圖，以 PyMuPDF 完整
擷取原始解析度；Figure 1、3、4 是論文中的向量繪圖（非點陣圖片），改以文字錨點定位邊界框
後，用 6–7 倍縮放對該區域做精確裁切，確保所有標籤、圖例、座標軸在投影片尺度下依然清晰。
無缺漏或佔位圖片。

## Figure-crop QA results

4 張圖片逐一核對圖題、圖例、座標軸標籤、節點文字是否完整——全數通過。
其中 Figure 1 與 Figure 4 的裁切邊界框，皆先以 `page.search_for()` 定位圖題文字與圖例文字的
精確座標，再據此設定裁切矩形，避免憑肉眼估計導致邊緣文字被切掉。詳細座標與方法記錄於
`asset_manifest.md`。

## Natively recreated content (not screenshotted)

- 投影片 10：Table 1（4 個 HopWeaver 生成來源 + 3 個人工資料集，共 7 列 × 4 個品質指標）
  轉為原生表格，並以淺綠底色標示 HopWeaver 各列，對應論文原表的兩區塊分組。
- 投影片 12：Table 2（4 模型 × Q-Only/Q+Docs × EM/F1，原為 9 欄單表）拆成 Bridge／Comparison
  兩張並排的 5 欄小表，避免單一表格欄位過窄導致數字擁擠。
- 投影片 13：Table 3（3 種檢索器 × 7 個檢索指標）轉為原生 8 欄表格，Support F1 欄位以橙色
  標示，呼應論文正文對「個別可尋、整體難齊」現象的強調。
- 投影片 14：Table 4（5 種 RAG 方法 × 4 個資料集的 F1，含百分比變化標註）轉為原生表格，
  百分比變化（如"↓29%"）逐一與原文核對後照抄，未重新計算或四捨五入。
- 投影片 15：Table 5（Reranker 消融，4 列 × 3 欄）與 Table 6（Polisher 消融，8 列 × 5 欄）
  並排轉為兩張原生表格，寬窄比例依各自欄數調整。
- 投影片 16：Table 7（管線拒絕統計）與附錄 Table 9／10（人工驗證）、附錄 D（成本分析）
  未整張轉為表格，改為將關鍵百分比與美元金額個別轉錄為條列重點與數據卡，避免同一份簡報
  堆疊第五、第六張完整表格。

## Alignment checks

`scripts/audit_pptx_quality.py` 執行結果：**high=0, medium=0, low=26**，全部是
`alignment_near_miss`（2.2–7.2pt），來源是本簡報重複使用的「結果卡片」元件（外框 + 標籤文字
+ 內文文字框）內部一致的內縮留白，與另外兩份論文簡報中相同性質的低嚴重度發現一致——
屬有意且跨投影片一致套用的設計選擇，依嚴重度規則（low = 外觀性、不影響理解）不需修正。
完整記錄見 `output/pptx_audit.md`。

## De-template language scan

以程式掃描全部投影片文字與備忘稿中的禁用樣板語（一句話總結、最有價值的後續方向、
不是……而是……、不只是……更是……、值得注意的是、總的來說、從某種意義上、提供了新的視角、
具有重要意義、未來可以進一步探索）：**0 命中**。所有論述均綁定具體圖表、章節、公式與數值。

## Traditional Chinese script check

以簡繁字元對照表（60+ 組常見簡繁差異字，涵蓋為/國/說/這/來/後/對/時/會/過/問/題/學/經/實/
應/還/長/發/處/繼/專/樣/內/該/與/於/產/設/準/標/際/導/態/構/顯/統/測/驗/庫/練/網/絡/術/變/確/
麼/個/們/現/動/間/門/電/關/識/檢/詳/負/輕/總/組/結/續/單/邊/誤/擇/類/質/級 等）掃描建構腳本
全文：**0 命中**，未發現簡體字誤植。

## Self-review defects found & corrected

首輪程式化掃描（禁用樣板語、簡體字、`audit_pptx_quality.py`）與人工檢查表格數字（逐一與
原文 Table 1–7、Appendix Table 9–11 核對）均未發現需要修正的缺陷。未發現高或中嚴重度問題，
因此本次未觸發修正—重建循環；`output/pptx_audit.md` 的 26 項低嚴重度發現經判斷為刻意的
元件內縮留白，予以保留。

## Text overflow / text-fit checks

未使用自動縮字（auto-fit）；所有文字框皆以明確換行與保守邊界手動排版。逐頁檢查文字框尺寸與
內容長度：標題單行可容納；一般投影片維持 3–4 條要點；密集表格（投影片 10、14、15 右側）
採 10.5–12.5pt 字型並手動設定欄寬，確認最長字串（如「HopWeaver · 2WikiMultiHopQA」
「Diverse+Rerank (FT，本文)」）在指定欄寬下不需換行或截斷。程式化稽核未回報任何
`text_overflow_risk` 高／中嚴重度項目。

## Design-rhythm / anti-template review

17 張投影片刻意安排了不同構圖：封面（純文字型）、背景/問題頁搭配兩張「根本限制」對照卡
（投影片2）、圖片主導的動機範例頁（投影片3，Figure 1 + 兩張說明卡）、全寬流程圖（投影片4）、
純文字條列頁搭配公式卡（投影片5、6，分別用綠／藍二色區分兩條合成軌道）、圖文並置頁
（投影片7，公式卡 + 流程圖）、四張真實類別卡（投影片8，PASS/ADJUST/REWORKED/REJECTED
是論文自身的四種分類結果，非裝飾性填充）、三張評估維度卡（投影片9）、原生表格頁
（投影片10、13、14）、主圖+數據卡的證據型佈局（投影片11，唯一與另一份簡報共享的構圖家族，
僅出現 1 次）、雙表並排頁（投影片12、15）、文字+數據卡混合頁（投影片16）、
文字主導的總結頁（投影片17）。全部 17 頁中，沒有任何一種構圖家族重複超過 3 次，
未觸及設計規則「五頁以上重複同一構圖需重新設計」的門檻。

## Verification method after revision

1. 執行 `scripts/audit_pptx_quality.py`：high=0, medium=0, low=26（皆為前述卡片內縮留白，
   判斷為刻意設計，未觸發修正）。
2. 以 `python-pptx` 重新開啟 `final_presentation_cn.pptx`：確認 17 張投影片、4 張嵌入圖片、
   17/17 張投影片皆有非空白備忘稿；逐一檢查所有圖形物件座標，確認皆落在 16:9
   （13.333in×7.5in）投影片範圍內，無超出邊界。
3. 以程式掃描全文，確認簡繁字元與禁用樣板語兩項複查皆為 0 命中。

## Known limitations

- 目前執行環境未安裝 LibreOffice/soffice，無法產生逐頁渲染截圖做最終視覺複核；已改用
  「圖片裁切品質檢查（含文字錨點定位）+ `audit_pptx_quality.py` 程式化稽核 + 逐投影片
  文字/座標人工檢查」的替代自評流程（依 `references/self-review.md` 對渲染工具不可用情境
  的規定執行）。若使用者的環境已安裝 PowerPoint 或 LibreOffice，建議開啟後快速目視複核一次
  版面，特別是投影片 12、15 的雙表並排排版與投影片 5、7 的公式卡文字對齊。
- Table 2、Table 5、Table 6、Table 7、Appendix Table 9/10/11 的原始表格皆保留於論文 PDF
  中；本簡報依內容密度選擇性地將部分表格轉為條列重點或數據卡而非逐一重建全表
  （詳見 `asset_manifest.md`「Natively recreated content」一節的完整取捨說明），
  所有引用數字均可在對應章節中逐一核對。
- 論文 Table 8（Appendix B 資料集統計比較）與 Figure 5、Figure 6（Appendix E 的
  Bridge／Comparison 問題完整範例）未納入本簡報，因其屬於補充材料而非主要論證證據，
  且投影片3 的 Figure 1 已涵蓋兩類問題的代表性範例；如需要，可依現有的頁面設計風格
  另行擴充一張「範例詳解」投影片。
