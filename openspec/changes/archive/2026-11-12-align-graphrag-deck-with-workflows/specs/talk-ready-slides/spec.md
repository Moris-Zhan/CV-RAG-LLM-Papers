# Spec Delta

## ADDED Requirements

### Requirement: 第 2 頁為目錄頁

簡報 SHALL 在封面之後的第 2 頁放目錄頁，依論文的討論面向分組，列出每組的小主題與對應頁碼；備用頁 MUST 另列一行並標示「不播放」。目錄頁的頁碼 MUST 與實際頁碼一致。

#### Scenario: 從目錄找到方法細節
- **WHEN** 報告者在目錄頁找「方法：索引階段」的「claim」
- **THEN** 目錄列出該小主題的頁碼，翻到該頁即為 claim 的專頁

#### Scenario: 頁碼一致
- **WHEN** 比對目錄頁列出的每個頁碼與簡報實際頁碼
- **THEN** 全部一致，且備用頁那一行標示「不播放」

### Requirement: 程式碼識別字只作為對照標籤

簡報中出現的開源實作識別字 SHALL 只限 workflow 名稱與查詢模組名稱，且只出現在方法頁的 kicker 標籤與 workflow 總覽頁。投影片正文、講者備註與備用頁 MUST NOT 陳述實作行為、預設值，或實作與論文的差異。

#### Scenario: 總覽頁列出 9 個 workflow
- **WHEN** 查看 workflow 總覽頁
- **THEN** 依實作順序列出 9 個 standard workflow；有論文對應的標出論文步驟名稱，`create_final_documents`、`create_final_text_units`、`generate_text_embeddings` 只列名稱，並註明對照版本

#### Scenario: 不出現實作行為
- **WHEN** 掃描所有投影片文字與講者備註
- **THEN** 找不到實作預設值、「預設關閉」「開源實作」等描述，也沒有指向程式碼筆記的句子

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
