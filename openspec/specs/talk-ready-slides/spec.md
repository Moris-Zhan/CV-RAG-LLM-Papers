# talk-ready-slides Specification

## Purpose

規範要拿來做技術分享的論文簡報必須符合的條件，讓報告者照著投影片與講者備註講，不會說出原文不支持的結論、不會被術語混用絆住，也能回答原文沒交代的追問。

## Requirements

### Requirement: 投影片陳述以原文為界

投影片的標題、重點帶、條列與講者備註 SHALL 只陳述原文寫明或可由原文數字直接算出的內容。報告者自己的推論 MUST 標示「報告者補充」或「推算」，並寫出依據的假設。

#### Scenario: 成本比較的範圍
- **WHEN** 投影片比較各條件的 token 成本
- **THEN** 比較範圍限定在原文 Table 2 列出的條件；若要提到 SS，則依原文寫出其 context 上限，不宣稱 C0 是所有條件中最低

#### Scenario: 原文未測的情境
- **WHEN** 投影片提到原文評測範圍以外的情境（例如局部事實問答）
- **THEN** 該句明寫「本文沒有資料」，或標示為報告者補充，不寫成結論

#### Scenario: 推算值
- **WHEN** 投影片出現原文沒有直接給出、由報告者推算的數字（例如 map 呼叫次數）
- **THEN** 數字旁標示「推算」，並寫出所用的假設

### Requirement: 不使用口號式與推測意圖的用詞

投影片 MUST NOT 使用對仗口號、推測作者意圖的副詞（如「刻意」）、或原文沒有的評價詞（如「可行」「降低成本」而無對應數據）。重點帶 SHALL 寫出這一頁的具體證據或機制。

#### Scenario: 重點帶檢查
- **WHEN** 逐頁檢查重點帶
- **THEN** 每條重點帶都能對應到該頁的圖、表、數字或原文章節，且不含 grilling Q1 表列的 8 個問題句

### Requirement: 核心術語全份一致

同一個概念在整份簡報 SHALL 只用一個名稱。GraphRAG 簡報中，community summary 與 community answer 使用原文英文名稱；「報告」只用於描述 community summary 的 JSON 輸出格式。

#### Scenario: 術語掃描
- **WHEN** 掃描所有投影片文字與講者備註
- **THEN** 找不到「社群摘要」「社群答案」「部分答案」，「社群報告」只出現在描述 JSON 格式的頁面

### Requirement: 備用頁涵蓋原文未說明的項目

簡報 SHALL 在總結之後附上備用頁（Q&A 預備），列出聽眾可能追問、但原文沒有交代的實作細節，以及勝率計分方式、索引成本與查詢成本的區別。備用頁 MUST 標明正式報告時不播放。

#### Scenario: 被問到原文沒寫的細節
- **WHEN** 聽眾問評審模型版本、答案順序是否隨機、SS 的 embedding 模型、實驗用的 entity types、Leiden 參數或 map 區塊大小
- **THEN** 報告者可以在備用頁找到「原文未說明」的明確記載

#### Scenario: 被問到勝率怎麼算
- **WHEN** 聽眾問「72% 勝率」的意思
- **THEN** 備用頁寫明每題勝者 100、敗者 0、平手各 50，再對 5 次評審取平均

### Requirement: 第 2 頁為目錄頁

簡報 SHALL 在封面之後的第 2 頁放目錄頁，依論文的討論面向分組，列出每組的小主題與對應頁碼；備用頁 MUST 另列一行並標示「不播放」。目錄頁的頁碼 MUST 與實際頁碼一致。

#### Scenario: 從目錄找到方法細節
- **WHEN** 報告者在目錄頁找「方法：索引階段」的「claim」
- **THEN** 目錄列出該小主題的頁碼，翻到該頁即為 claim 的專頁

#### Scenario: 頁碼一致
- **WHEN** 比對目錄頁列出的每個頁碼與簡報實際頁碼
- **THEN** 全部一致，且備用頁那一行標示「不播放」

### Requirement: 程式碼識別字只作為對照標籤

簡報中出現的開源實作識別字 SHALL 只出現在三處：方法頁 kicker 的 workflow 與查詢模組標籤、workflow 總覽頁，以及備用頁的「實作對照」窄條與該頁講者備註；實作對照只列模組檔案與 prompt 的檔案和常數名稱。正文頁（封面到結論頁）的正文與講者備註 MUST NOT 出現檔案路徑或 prompt 名稱。全份簡報 MUST NOT 陳述實作行為、預設值，或實作與論文的差異。

#### Scenario: 總覽頁列出 9 個 workflow
- **WHEN** 查看 workflow 總覽頁
- **THEN** 依實作順序列出 9 個 standard workflow；有論文對應的標出論文步驟名稱，`create_final_documents`、`create_final_text_units`、`generate_text_embeddings` 只列名稱，並註明對照版本

#### Scenario: 不出現實作行為
- **WHEN** 掃描所有投影片文字與講者備註
- **THEN** 找不到實作預設值、「預設關閉」「開源實作」等描述，也沒有指向程式碼筆記的句子

#### Scenario: 備用頁的實作對照
- **WHEN** 查看 GraphRAG 簡報第 13–21 頁
- **THEN** 每頁底部都有一條「實作對照」，列出 1–2 個模組檔案與 prompt 的檔案或常數名稱；講者備註列出完整路徑；每個路徑與常數名稱都存在於第 13 頁標示的版本

#### Scenario: 正文不出現路徑與 prompt 名稱
- **WHEN** 掃描正文第 1–12 頁的投影片文字與講者備註
- **THEN** 找不到 `.py` 檔案路徑與 prompt 常數名稱（例如 `GRAPH_EXTRACTION_PROMPT`）

### Requirement: 可見文字不含章節標號

投影片上可見的文字（標題、kicker、正文、圖說、表格）MUST NOT 含「§」章節號或「附錄 X」標號；圖表來源 SHALL 以 Fig.、Table、Algorithm 編號標示。講者備註可以保留章節號。

#### Scenario: 標號掃描
- **WHEN** 以 `§` 與「附錄」搜尋所有投影片的可見文字
- **THEN** 結果為 0 筆，講者備註不在掃描範圍內

### Requirement: 論文有對應的 workflow 都有專頁

方法段 SHALL 讓每個在論文有對應步驟的 workflow 至少有一頁專頁，並在該頁 kicker 標出 workflow 名稱；論文沒有對應的 workflow MUST NOT 開專頁。

#### Scenario: GraphRAG 方法段
- **WHEN** 檢查方法頁的 kicker 標籤
- **THEN** `create_base_text_units`、`extract_graph`、`finalize_graph`、`extract_covariates`、`create_communities`、`create_community_reports` 各至少出現在一頁，且沒有任何一頁的 kicker 標 `create_final_documents`、`create_final_text_units` 或 `generate_text_embeddings`

### Requirement: 正文頁數受報告時間約束

用於 15 分鐘報告的論文簡報，正文（封面到結論頁）SHALL 不超過 12 頁；其餘頁面 MUST 放在結論頁之後的備用頁區段，並在 kicker 標示「備用頁 · 不播放」。

#### Scenario: GraphRAG 簡報的頁數
- **WHEN** 計算 `RAG/2024_GraphRAG/slides_zh-TW.pptx` 中結論頁之前（含結論頁）的頁數
- **THEN** 為 12 頁，且結論頁之後的每一頁 kicker 都以「備用頁 · 不播放」開頭

### Requirement: 正文頁採結論式標題與單一主視覺

每個正文內容頁 SHALL 以一行結論式標題陳述該頁重點，並只放一個主視覺：一張原文圖、一個原生表格或圖表、一張流程圖，或一個關鍵數字。條列 MUST 不超過 3 點。封面與目錄頁不受此限。

#### Scenario: 3 秒讀出重點
- **WHEN** 只讀某個正文內容頁的標題
- **THEN** 能得知該頁的結論（例如「全域方法在全面性與多樣性上對向量 RAG 勝率 62–83%」），而不是只有主題名稱（例如「實驗結果」）

#### Scenario: 版面密度
- **WHEN** 檢查每個正文內容頁
- **THEN** 只有一個圖片、表格、圖表或流程圖作為主視覺，且條列不超過 3 點

### Requirement: 備忘稿承載講稿與技術細節

每個正文內容頁的講者備註 SHALL 依序包含四段：「重點」（一句話）、「講稿」、「技術細節」、「可能追問」。從正文移出或合併掉的內容，其要點 MUST 出現在對應正文頁的「技術細節」段。

#### Scenario: 備忘稿結構
- **WHEN** 打開任一正文內容頁的講者備註
- **THEN** 依序看到「重點」「講稿」「技術細節」「可能追問」四段標記

#### Scenario: 移出的內容不遺失
- **WHEN** 檢查原本在正文、這次被移出或合併的頁面（例如 chunk 切分、gleaning、claim、context 視窗）
- **THEN** 它們的關鍵數字與結論出現在對應正文頁的「技術細節」段，或該頁本身保留在備用頁

### Requirement: 備忘稿數字可追溯到原文

備忘稿中的每個數字 SHALL 能在原文找到，或由原文數字直接算出並標示「推算」。技術細節段 MUST 附原文章節、圖或表的編號作為出處；原文沒有的內容 MUST 標示「報告者補充」。

#### Scenario: 數字溯源檢查
- **WHEN** 以腳本抽出所有正文頁備忘稿中的數字，逐一比對原文全文
- **THEN** 每個數字都在原文出現，或位於標示「推算」的句子中，或是章節、頁碼等編號

#### Scenario: 出處標註
- **WHEN** 閱讀任一正文頁備忘稿的「技術細節」段
- **THEN** 每個技術陳述都附有原文的 § 章節、Fig.、Table、Algorithm 或附錄編號
