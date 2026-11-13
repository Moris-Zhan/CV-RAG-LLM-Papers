# Design

## Context

完整版簡報由 scratchpad 的 build script 建置；上一個變更的版本是 27 頁。這次改動牽涉重排、插頁與附錄，因此改寫 build script 後整份重建，不手動編輯 pptx。所有新內容只取自論文原文，以及 `microsoft/graphrag` `34b2b67` 的 prompt 原始碼。

## Decisions

### D1：頁面配置（42 頁）

| 頁 | 內容 | 頁 | 內容 |
|---|---|---|---|
| 1 | 封面 | 22 | 方法細節 11 回答 prompt |
| 2 | 目錄 | 23 | 方法細節 12 context 視窗 |
| 3 | 研究背景 | 24 | 論文步驟與 workflow 對照 |
| 4 | 核心想法 | 25 | 評測設計 1 · 問題生成 |
| 5 | 方法總覽 · Figure 1 | 26 | 評測設計 · Algorithm 1（新） |
| 6 | 章節總覽 1／6（新） | 27 | 評測設計 2 · 評分與比較條件 |
| 7 | 方法細節 1 chunk 切分 | 28 | 實驗 1 勝率 |
| 8 | 章節總覽 2／6（新） | 29 | 成本 |
| 9–11 | 方法細節 2 擷取 prompt、3 自我反思、4 claim | 30 | 驗證 · 實驗 2 方法（新） |
| 12 | 章節總覽 3／6（新） | 31 | 實驗 2 結果 |
| 13 | 方法細節 5 建構知識圖譜 | 32–33 | 限制、總結 |
| 14 | 章節總覽 4／6（新） | 34–35 | 備用頁 × 2 |
| 15 | 方法細節 6 階層式社群 | 36–42 | 附錄 · 實作 prompt 1–7（新） |
| 16 | 章節總覽 5／6（新） | | |
| 17–19 | 方法細節 7 degree、8 context 組裝、9 JSON 格式 | | |
| 20 | 章節總覽 6／6（新） | | |
| 21 | 方法細節 10 map-reduce | | |

### D2：重排與交叉引用

- build script 中「claim」區塊移到「建構知識圖譜」之前，「階層式社群」區塊移到「節點 degree」之前。
- Fig. 1 標籤對應依 spec 的新表。
- 交叉引用更新：
  - claim 頁圖說「實體與關係見方法細節 4」→「方法細節 5」；
  - chunk 頁「見方法細節 3」不變。
- workflow 對照頁的頁碼欄：
  - `create_base_text_units` 7；`extract_graph` 9–10、13；`finalize_graph` 17；`extract_covariates` 11；`create_communities` 15；`create_community_reports` 18–19；
  - 查詢階段 21／22／23；
  - 備忘稿中的頁碼一併更新。

### D3：章節總覽頁

- **版面**：kicker「章節總覽 N／6」，標題為英文階段名稱，不加 Fig. 1 標籤。
- **左欄**：3–4 條中文要點，依使用者確認的草稿。
- **右欄**：「延伸頁」面板，列出「方法細節 N · 標題（第 P 頁）」。
- **備忘稿**：標出該段的論文小節，並加一句「細節見方法細節 N–M」。
- **畫面用詞**：不寫 §、附錄、章節編號；§3.1.6 的「第 4 章評估」改寫為「由實驗評估」。

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
| 9 | 實驗建圖用通用的實體與關係擷取 prompt，實體類型與 few-shot 範例依資料領域調整 |
| 21 | 對照條件 TS 用同一套方法，但打散、切塊的是原文 chunk，不是 community summary |
| 23 | community summary、community answer、全域答案都用 8k context；建圖環境為 16GB RAM 虛擬機（Xeon Platinum 8171M） |
| 27 | Podcast：Behind the Tech with Kevin Scott 訪談逐字稿；News：2013/9–2023/12 新聞，涵蓋娛樂、商業、運動、科技、健康、科學 |

### D7：附錄實作 prompt

| 頁 | 常數 | 對應方法細節 | 畫面節錄 |
|---|---|---|---|
| 36 | `GRAPH_EXTRACTION_PROMPT` | 2 | `-Steps-` 段 1–4 |
| 37 | extract_graph 與 extract_claims 的 `CONTINUE_PROMPT`／`LOOP_PROMPT` | 3、4 | 四個常數全文 |
| 38 | `EXTRACT_CLAIMS_PROMPT` | 4 | `-Steps-` 段的欄位清單與格式 |
| 39 | `SUMMARIZE_PROMPT` | 5 | 指示段全文 |
| 40 | `COMMUNITY_REPORT_PROMPT` | 9 | `# Report Structure` 段 |
| 41 | `MAP_SYSTEM_PROMPT` | 10、11 | key point 的元素與 0–100 評分段 |
| 42 | `REDUCE_SYSTEM_PROMPT`、`GENERAL_KNOWLEDGE_INSTRUCTION`、`NO_DATA_ANSWER` | 10、11 | 排序與合併段、一般知識標註、無資料回覆 |

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

- **`verify_full_v2.py`**：42 頁的頁序、Fig. 1 標籤、總覽頁對應表、章節總覽頁延伸清單、目錄範圍涵蓋 3–42、workflow 頁碼欄、備忘稿中的頁碼引用。
- **`verify_coverage_v2.py`**：
  - 論文各段關鍵詞出現在指定頁的**畫面**上；
  - 畫面上沒有 §、附錄、第 N 章；
  - claim 頁沒有 Claimify、ROUGE-L、factual claim；
  - Algorithm 1 每行英文都在論文原文中；
  - 新畫面文字中的多位數數字都在論文中。
- **`verify_prompts.py`**：從 clone 以 `ast` 取出常數字串值，比對附錄頁的節錄與備忘稿全文都是子字串；7 個檔案路徑存在；附錄中文說明不含「論文」「不同」「差異」「預設」。
- **其他**：Open XML SDK 0 錯誤、整數 EMU、`audit_pptx_quality.py` high = 0、medium = 0；以 LibreOffice 渲染所有新頁與改動頁目視檢查。

## Risks

- **英文標題過長**：「Community Summaries → Community Answers → Global Answer」在 27 pt 標題可能換行；渲染確認，必要時只對總覽頁縮小標題字級。
- **目錄排不下**：42 頁的目錄若仍超出，就縮小行距與字級，不拆頁、不刪項目。
