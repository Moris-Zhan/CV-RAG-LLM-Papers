# Design

## Context

完整版簡報由 scratchpad 的 build script 建置；上一個變更的版本是 27 頁。這次改動牽涉重排、插頁與附錄，因此改寫 build script 後整份重建，不手動編輯 pptx。所有新內容只取自論文原文，以及 `microsoft/graphrag` `34b2b67` 的 prompt 原始碼。

## Decisions

### D1：頁面配置（36 頁）

| 頁 | 內容 |
|---|---|
| 1–5 | 封面、目錄、研究背景、核心想法、方法總覽 · Figure 1 |
| 6 | 方法細節 1.1 chunk 切分 |
| 7–9 | 方法細節 2.1 元素擷取 prompt、2.2 自我反思、2.3 claim |
| 10 | 方法細節 3.1 建構知識圖譜 |
| 11 | 方法細節 4.1 階層式社群 |
| 12–14 | 方法細節 5.1 節點 degree、5.2 context 組裝、5.3 JSON 格式 |
| 15–17 | 方法細節 6.1 map-reduce、6.2 回答 prompt、6.3 context 視窗 |
| 18 | 論文步驟與 workflow 對照 |
| 19–21 | 評測設計 1 問題生成、Algorithm 1（新）、評測設計 2 評分與比較條件 |
| 22–25 | 實驗 1 勝率、成本、實驗 2 方法（新）、實驗 2 結果 |
| 26–29 | 限制、總結、備用頁 × 2 |
| 30–36 | 附錄 · 實作 prompt 1–7（新） |

### D2：重排、x.y 編號與交叉引用

- build script 中「claim」區塊移到「建構知識圖譜」之前，「階層式社群」區塊移到「節點 degree」之前。
- 內部仍以 1–12 作為識別碼，另以對照表轉成 x.y 顯示；`new_slide` 以「方法細節 x.y」辨識方法細節頁，並畫出「Fig. 1 階段 x · <階段轉換>」標籤。
- 交叉引用：chunk 頁「見方法細節 2.2」；claim 頁圖說「實體與關係見方法細節 3.1」；附錄 prompt 頁 kicker 的「對應方法細節 x.y」。
- workflow 對照頁頁碼欄：`create_base_text_units` 6；`extract_graph` 7–8、10；`finalize_graph` 12；`extract_covariates` 9；`create_communities` 11；`create_community_reports` 13–14；查詢階段 15／16／17；備忘稿頁碼一併更新。

### D3：論文本節重點（備忘稿）

- 不設章節總覽頁。每個階段第一張方法細節頁（1.1、2.1、3.1、4.1、5.1、6.1）的備忘稿開頭加「【論文本節重點】」段，逐條列出使用者確認過的要點草稿，每條結尾標註 § 出處；原有備忘稿接在後面。
- 方法總覽頁對應表每列為「細節 x.1–x.n（第 P–Q 頁）」，單頁的階段寫「細節 x.1（第 P 頁）」；備忘稿說明 x.y 編號的意義。
- 目錄方法段的項目前面加上階段序號，例如「2 Text Chunks → Entities & Relationships」。

### D4：Algorithm 1 頁

- **左側**：等寬字體逐行列出論文 Algorithm 1 的英文原文（Input、Output、procedure 1–6、end procedure）。
- **右側**：逐步的中文說明。
- **底部重點帶**：「K = N = M = 5 → 每個資料集 125 題」。

### D5：實驗 2 方法頁

分三欄：

- **定義**：可驗證事實陳述（Ni et al.）；附英文原文例句，並拆成 2 條 claim。
- **擷取**：Claimify 三步驟；共 47,075 條，平均每答 31 條。
- **指標**：全面性 = 平均 claim 數；多樣性 = 凝聚式分群、complete linkage、1 − ROUGE-L、多個門檻。

### D6：實驗 1 對應小條

- **位置與樣式**：y = 5.97 in，高 0.34 in；標籤「實驗 1 對應」，文字 10.5 pt 單行。與小條重疊的元素沿用精簡版「實作對照」的縮高規則。
- **各頁內容**：

| 頁 | 小條內容 |
|---|---|
| 7 | 實驗建圖用通用的實體與關係擷取 prompt，實體類型與 few-shot 範例依資料領域調整 |
| 15 | 對照條件 TS 用同一套方法，但打散、切塊的是原文 chunk，不是 community summary |
| 17 | community summary、community answer、全域答案都用 8k context；建圖環境為 16GB RAM 虛擬機（Xeon Platinum 8171M） |
| 21 | Podcast：Behind the Tech with Kevin Scott 訪談逐字稿；News：2013/9–2023/12 新聞，涵蓋娛樂、商業、運動、科技、健康、科學 |

### D7：附錄實作 prompt

| 頁 | 常數 | 對應方法細節 | 畫面節錄 |
|---|---|---|---|
| 30 | `GRAPH_EXTRACTION_PROMPT` | 2.1 | `-Steps-` 段 1–4 |
| 31 | extract_graph 與 extract_claims 的 `CONTINUE_PROMPT`／`LOOP_PROMPT` | 2.2、2.3 | 四個常數全文 |
| 32 | `EXTRACT_CLAIMS_PROMPT` | 2.3 | `-Steps-` 段的欄位清單與格式 |
| 33 | `SUMMARIZE_PROMPT` | 3.1 | 指示段全文 |
| 34 | `COMMUNITY_REPORT_PROMPT` | 5.3 | `# Report Structure` 段 |
| 35 | `MAP_SYSTEM_PROMPT` | 6.1、6.2 | key point 的元素與 0–100 評分段 |
| 36 | `REDUCE_SYSTEM_PROMPT`、`GENERAL_KNOWLEDGE_INSTRUCTION`、`NO_DATA_ANSWER` | 6.1、6.2 | 排序與合併段、一般知識標註、無資料回覆 |

- **左欄**：中文結構整理，包括目標、步驟或輸出、引用規則與佔位符。佔位符依原始碼列出，例如 `{entity_types}`、`{input_text}`、`{max_length}`。
- **右欄**：等寬字體的英文節錄。
- **備忘稿**：常數的完整字串值。
- **圖說**：「Source: microsoft/graphrag 34b2b67（3.3.0）· <檔案路徑> · MIT License」。
- **用詞**：中文說明只描述 prompt 本身，不提論文。

### D8：目錄

- 單頁兩欄。
- **方法段**：分為「方法：索引階段」（5 個階段）與「方法：查詢階段」（1 個階段）兩組，項目是英文階段名稱與頁碼範圍。
- **其他分組**：「方法回顧」「評測設計（屬論文方法章）」「結果與驗證」「限制與總結」「備用頁 · 不播放」「附錄 · 實作 prompt（34b2b67 · 不播放）」。
- **行距**：縮小到排得下為止，不刪項目。

### D9：驗證

- **`verify_full_v3.py`**：36 頁的頁序、x.y 編號與 Fig. 1 階段標籤、總覽頁對應表、目錄範圍涵蓋 3–36、workflow 頁碼欄、備忘稿中的頁碼與 x.y 引用。
- **`verify_coverage_v3.py`**：
  - §3.1 各段要點出現在 x.1 頁備忘稿的「【論文本節重點】」段；§3.2、§4.1、§4.2 的關鍵詞出現在指定頁的**畫面**上；
  - 畫面上沒有 §、附錄、第 N 章；
  - claim 頁沒有 Claimify、ROUGE-L、factual claim；
  - Algorithm 1 每行英文都在論文原文中；
  - 新畫面文字中的多位數數字都在論文中。
- **`verify_prompts.py`**：從 clone 以 `ast` 取出常數字串值，比對附錄頁的節錄與備忘稿全文都是子字串；7 個檔案路徑存在；附錄中文說明不含「論文」「不同」「差異」「預設」。
- **其他**：Open XML SDK 0 錯誤、整數 EMU、`audit_pptx_quality.py` high = 0、medium = 0；以 LibreOffice 渲染所有新頁與改動頁目視檢查。

## Risks

- **目錄排不下**：36 頁的目錄若仍超出，就縮小行距與字級，不拆頁、不刪項目。
