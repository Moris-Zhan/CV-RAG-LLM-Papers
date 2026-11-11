# QA 報告（繁體中文版）— GraphRAG（arXiv:2404.16130v2, 2024）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：methods（problem-to-solution）；方法論文，附 LLM 評審式評測設計
- 投影片數：22（正文 20 頁 + 備用頁 2 頁）；內嵌圖片：4；原生表格 6、原生圖表 1；講者備註：22 頁
- 方法段由 5 頁擴充為 11 頁（slide 3–13），補上附錄 E 的 prompt 結構、§3.1.3 建圖規則、§3.1.5 community summary 組裝流程、§3.1.6 map-reduce 與附錄 C 的 context 視窗實驗
- 技術分享前修訂（OpenSpec change `refine-graphrag-deck-and-add-code-notes`）：改寫 AI 腔用詞、修正 3 處與原文不符的說法、統一術語、補足方法深度，並新增 2 頁備用頁（slide 21–22，不播放）
- 術語依 `GLOSSARY.md`：community summary、community answer 沿用原文英文；「社群報告」只用於 slide 10 描述 JSON 格式

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查，第一版（14 頁，以下頁碼為舊版）發現並修正：
  - high：slide 4、11 標題過長換行，壓到分隔線與圖片 → 縮短標題
  - medium：slide 6、10 圖說貼近底部重點帶 → 縮小圖片最大高度
  - medium：slide 8 範例底框留白過多 → 縮短底框
  - low：slide 9 表格說明欄置中不易閱讀 → 改為靠左
- 擴充方法段後再次逐頁渲染檢查：修正 slide 12 標題換行（high），收緊 slide 7、10、12 面板留白（low）
- 技術分享前修訂：
  - 用詞：改寫 8 處口號式或推測意圖的句子（slide 3–7、20 的重點帶與 slide 20 標題、slide 16 備註），並移除 slide 14、19 的「刻意」
  - 事實（high）：slide 17 改為「全域方法中成本最低」並在備註寫出 SS 的 8k 上限；slide 19 不再推論局部問題的表現；slide 8 標題改為「實驗取 C0–C3 四層」
  - 深度：slide 11 區分 summary 份數與 map 呼叫次數；slide 8 備註補 Leiden／modularity 背景；新增 slide 21（原文未說明的 8 項）、slide 22（勝率計分與成本）
  - 版面：修正改用英文術語後 slide 3、9、11、20 的標題換行（high），以及 slide 3 步驟標題壓到說明文字（medium）
  - 以腳本掃描全份文字與備註：「社群摘要」「社群答案」「部分答案」0 次，「社群報告」只在 slide 10
- 數字逐筆對照原文：Figure 2 勝率區間、Table 2 全部 30 格、Table 3 全部 12 格、§4.1 資料集 chunk 數、§5.1 圖規模、§5.2 的 47,075 claims 與 78% / 69–70% 一致率

## 與原文不一致或需保留的地方

- 附錄 E.3（Community Answer Generation）與 E.4（Global Answer Generation）的標題，依 prompt 內容判斷看似與 §3.1.6 的 map／reduce 對調：要求輸出 0–100 有用度分數的是 E.4，接收「依有用度排序」報告的是 E.3。slide 12 依功能呈現並加註，此為報告者觀察。
- E.1 prompt 會輸出 relationship strength，但 §3.1.3 的邊權重是同一關係的重複次數；slide 5 講者備註已區分兩者。
- slide 7、9 的流程圖與節點示意為報告者依原文描述繪製，已標註「整理自」；NeoChip 擷取結果為中譯。

- PDF 首頁標示「Preprint. Under review.」；索引只列 arXiv 編號，不標註會議。
- 「C0 只用 TS 約 2–3% tokens」取自 Table 2 的 % Max（2.6、2.3）；正文寫「over 97% fewer」，兩者一致。
- 「C0 對 SS 72% / 62%」為正文原句，作者以兩資料集中較低者表述。
- slide 2 的 NeoChip 局部問題為報告者依原文擷取範例改寫的示意，已標註「示意」。
- slide 19「評測問題只涵蓋全域型，未檢驗局部事實問答」為報告者補充，已標示；其餘限制來自原文 §6.1 與方法、結果段落。
- slide 11 的 map 呼叫次數為報告者推算：ceil(該層 Table 2 tokens ÷ 8,000)，假設區塊大小等於 8k context（原文只寫 pre-specified token size），未計 prompt 本身，故標為「推算・約略下限」。
- slide 8 備註的 Leiden／modularity 背景為報告者補充的一般知識，已在備註標示「非原文內容」。
- slide 21 列出的 8 項「原文未說明」逐項對照原文確認；slide 22 的計分方式取自附錄 F.1 與附錄 G 的 Table 6 說明。
- slide 3 提到的既有階層式摘要方法，原文引用 Kim et al. 2023 與 Sarthi et al. 2024（RAPTOR）；投影片不點名，僅在講者備註提及。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 51（詳見 `pptx_audit_zh-TW.md`），皆為對齊微差（`alignment_near_miss`）
- 另以 python-pptx 重新開啟，確認形狀皆在投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示；在 PowerPoint 中字寬略有差異。
- Figure 2 為 8 個熱圖的組合，投影時數字偏小；講者備註已列出關鍵數字，右側重點欄也重述主要勝率。
- 附錄 Table 4（多樣性分群數）與 Table 6（統計檢定）未放上投影片，僅在講者備註摘述。
