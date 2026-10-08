# QA report — Automated MCQA Benchmarking at Scale（推理軌跡檢索）論文簡報

**Source:** arXiv:2509.10744v1 [cs.CL], "Automated MCQA Benchmarking at Scale: Evaluating
Reasoning Traces as Retrieval Sources for Domain Adaptation of Small Language Models"
(Ozan Gokdemir et al., Argonne National Laboratory / University of Chicago; accepted at
SC'25, Nov 2025)
**Paper type:** methods（RAG / benchmark-generation framework for SLM domain adaptation）→
problem-to-solution arc
**Output language:** 繁體中文（依使用者指定；技術名詞、模型名稱、資料集名稱、數值皆保留英文/阿拉伯數字原文）
**Deliverable:** `output/final_presentation_cn.pptx` — 14 張投影片，16:9，全數附中文備忘稿

## PPTX creation status

✅ 使用 `python-pptx` 從零建構（未使用使用者提供的範本）。配色採克制的 Nature 風格淺色調：
海軍藍 `#1B3A5C`（標題／結構）、橙色 `#D9752B`（推理軌跡 RAG-RT／重點增益，呼應論文圖表本身的橙色長條）、
藍色 `#2E6E9E`（基線／原文片段檢索的對照色，呼應論文圖表的藍色長條）、灰色 `#6B7280`（說明文字／來源標示）。
中文字型指定「微軟正黑體」，英文/數字使用 Calibri，透過 OOXML `<a:ea>` 明確設定東亞字型，避免 PowerPoint
以預設拉丁字型渲染中文。

## Slide count & content

14 張投影片，依 methods 類型論文的「problem-to-solution」敘事弧：
1. 封面 → 2. 研究背景/瓶頸 → 3. 核心問題（claim-led）→ 4. 方法總覽（Fig.1，全寬流程圖）→
5. 關鍵設計一：MCQ 生成與品質過濾（Fig.2）→ 6. 關鍵設計二：推理軌跡萃取（Fig.3）→
7. 評測設置（Table 1 原生表格 + 協定說明）→ 8. 合成基準主要結果（Table 2 原生表格）→
9. 合成基準可視化（Fig.4 + 數據卡）→ 10. ASTRO 全題外部驗證（Fig.5 + 數據卡，含負例）→
11. ASTRO 無數學子集（Fig.6 + 數據卡）→ 12. 推理模式比較（討論）→
13. 方法優勢與局限（雙欄對照）→ 14. 結論與未來方向。

## Figures inserted

6 張圖片全部嵌入完成（詳見 `output/asset_manifest.md`）：`fig1_workflow.png`（投影片4）、
`fig2_mcqa_schema.png`（投影片5）、`fig3_reasoning_trace_schema.png`（投影片6）、
`fig4_synthetic_improvement.png`（投影片9）、`fig5_astro_all_improvement.png`（投影片10）、
`fig6_astro_nomath_improvement.png`（投影片11）。全部是論文 PDF 中原生嵌入的點陣圖，以
PyMuPDF 完整擷取原始解析度，未經任何裁切、重繪或 OCR；標題、圖例、座標軸、百分比標籤全數保留。
無缺漏或佔位圖片。

## Figure-crop QA results

6 張圖片均為整張擷取（無需裁切子面板），逐一核對圖名、圖例、座標軸標籤、資料標籤是否完整——
全數通過。詳細方法與 xref 記錄於 `asset_manifest.md`。

## Natively recreated content (not screenshotted)

- 投影片 7：Table 1（8 個模型的參數量／年份／上下文視窗）逐字轉為原生表格。
- 投影片 8：Table 2（8 模型 × 5 種條件的合成基準準確率）轉為原生表格，並以橙色標示每列最佳值，
  對應論文原表的粗體慣例；建表前已用 Python 重新計算每列最大值以確認標示位置正確。
- 投影片 10、11：未將 Table 3／Table 4 整張轉為表格，而是把關鍵的 baseline / RAG-Chunks / RAG-RT
  準確率數字，逐一與 Figure 5、Figure 6 的百分比增益標籤交叉核對後，做成資料型的重點卡片，
  避免整份簡報重複四次相同表格版式。

## Alignment checks

`scripts/audit_pptx_quality.py` 執行結果（修正備忘稿用字後重跑，見下）：
**high=0, medium=0, low=14**，全部是 `alignment_near_miss`（3.6–5.8pt），
來源是「數據卡片」元件內部（外框 + 左側色條 + 文字框）刻意保留的一致內縮留白，
與 `STAIR_ToC_Retriever` 那份簡報中相同性質的低嚴重度發現一致——屬有意且一致的設計選擇，
依嚴重度規則（low = 外觀性、不影響理解）不需修正。完整記錄見 `output/pptx_audit.md`。

## De-template language scan

以程式掃描全部投影片文字與備忘稿中的禁用樣板語（一句話總結、最有價值的後續方向、
不是……而是……、不只是……更是……、值得注意的是、總的來說、從某種意義上、提供了新的視角、
具有重要意義、未來可以進一步探索）：**首輪發現 1 處**（投影片 12 備忘稿中的「值得注意的是」），
已刪除該片語並重新生成簡報；複查確認全數 0 命中。所有論述均綁定具體圖表、章節與數值。

## Traditional Chinese script check

以簡繁字元對照表（為/國/說/這/來/後/對/時/會/過/問/題/學/經/實/應/還/長/發/處/繼/專/樣/內/該/
與/於/產/設/準/標/際/導/態/構/顯/統/測/驗/庫/練/網/絡/術/變/確/麼/個/們/現/動/間/門/電 等 50+ 組）
掃描建構腳本全文：**首輪發現 1 處簡體字**（投影片 12 取材文字中的「实」，應為「實」，
出現在「這一觀察對实務部署有意義」），已修正為「實」並重新生成；複查確認全數 0 命中。

## Self-review defects found & corrected

1. **Medium→已修正：** 備忘稿中出現禁用樣板語「值得注意的是」（投影片12）——已刪除。
2. **Medium→已修正：** 誤植 1 個簡體字「实」（投影片12 重點提示文字）——已改為「實」。
3. **Low（保留不動）：** 數據卡片元件的內部近距離對齊（3.6–5.8pt）——判斷為刻意、一致的內縮留白，
   非意外偏移，依規則不需修正（見上「Alignment checks」）。

首輪與複查均未發現高嚴重度（high）缺陷。

## Text overflow / text-fit checks

未使用自動縮字（auto-fit）；所有文字框皆以明確換行與保守邊界手動排版。逐頁檢查文字框尺寸與
內容長度，確認：標題單行可容納；一般投影片維持 2–4 條要點；表格儲存格皆為單行短字串，
行高（Table 1 約 0.48in／列、Table 2 約 0.39in／列）足夠容納 12.5–13pt 字型不換行。
程式化稽核（`audit_pptx_quality.py`）亦未回報任何 `text_overflow_risk` 高／中嚴重度項目。

## Design-rhythm / anti-template review

14 張投影片刻意安排了不同構圖：封面（純文字型）、純論述型背景/問題頁（投影片2，搭配資料卡而非
裝飾性圖示）、claim-led 主張頁（投影片3）、全寬流程圖（投影片4）、直式圖表+說明欄（投影片5、6，
欄寬依圖片直向比例各自調整而非套用同一比例）、表格+說明欄（投影片7）、全寬原生表格（投影片8）、
主圖+資料卡的證據型佈局（投影片9、10、11，三頁的圖表寬高不同，卡片數字皆取自論文原表而非裝飾）、
開放式討論頁（投影片12）、雙欄對照頁（投影片13）、文字主導的總結頁（投影片14）。
全部 14 頁中，同一種構圖家族（主圖+資料卡）最多重複 3 次（投影片9、10、11），未超過設計規則
「五頁以上重複同一構圖需重新設計」的門檻。

## Verification method after revision

1. 重新執行 `scripts/audit_pptx_quality.py`：high=0, medium=0, low=14（皆為前述數據卡內縮留白）。
2. 以 `python-pptx` 重新開啟 `final_presentation_cn.pptx`：確認 14 張投影片、6 張嵌入圖片、
   14/14 張投影片皆有非空白備忘稿；逐一檢查所有圖形物件座標，確認皆落在 16:9（13.333in×7.5in）
   投影片範圍內，無超出邊界。
3. 以程式掃描全文，確認簡繁字元與禁用樣板語兩項複查皆為 0 命中。

## Known limitations

- 目前執行環境未安裝 LibreOffice/soffice，無法產生逐頁渲染截圖做最終視覺複核；已改用
  「資產抽取品質檢查 + `audit_pptx_quality.py` 程式化稽核 + 逐投影片文字/座標人工檢查」
  的替代自評流程（依 `references/self-review.md` 對渲染工具不可用情境的規定執行），
  並在此處明確記錄此限制。若使用者的環境已安裝 PowerPoint 或 LibreOffice，建議開啟後
  快速目視複核一次版面。
- 論文摘要聲稱「部分小模型的推理軌跡檢索表現超越 GPT-4」，但本文並未給出 GPT-4 在
  ASTRO 考題或合成基準上的具體準確率數字（僅以引用 [5] 帶過），故投影片13與備忘稿中
  僅轉述此宣稱本身，未杜撰任何 GPT-4 的百分比數值。
- 論文貢獻列表（Section 1）寫的合成基準題數為「16,679 題」，但摘要、方法與結果章節
  （含 Table 2 標題）反覆使用「16,680 題」——這是原始論文本身的數字出入，並非本簡報
  轉錄錯誤；簡報全篇統一採用出現頻率較高、且與主要結果表格一致的「16,680」。
- 未建立 `output/rendered/` 目錄（因無渲染器可用而未產生任何渲染截圖）；若使用者之後以
  LibreOffice 或 PowerPoint 自行匯出截圖，可另存於該路徑供留存。
