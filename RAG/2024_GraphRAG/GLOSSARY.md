# GraphRAG

GraphRAG 論文（arXiv:2404.16130）的技術名詞，供簡報、講者備註與程式碼筆記共用；community summary 與 community answer 沿用論文原文，其餘以簡報既有的中文名稱為準。

## 問題與比較對象

**全域問題（Global sensemaking question）**：
需要理解整個語料才能回答的問題，例如「這個資料集的主要主題是什麼」，本質上是 query-focused summarization。
_Avoid_: 全局問題、總結型問題

**向量 RAG（Vector RAG）**：
依 embedding 相似度取回少數 chunk，再交給 LLM 生成答案的傳統 RAG。
_Avoid_: naïve RAG、傳統檢索、一般 RAG

**SS（Semantic search）**：
實驗中代表向量 RAG 的比較條件。
_Avoid_: 語意搜尋基準、baseline RAG

**TS（Text summarization）**：
實驗中不建圖、直接對原文 chunk 做 map-reduce 的比較條件，用來分離圖索引本身的貢獻。
_Avoid_: 原文摘要法、全文摘要

## 索引

**Claim**：
LLM 從 chunk 中針對實體抽出的事實陳述，例如日期、事件，或與其他實體的互動；是索引的一部分，與評測用的 factual claim 不同。
_Avoid_: 共變量（covariate）、事實三元組

**自我反思（Gleaning）**：
擷取完成後，再提示 LLM 補抽遺漏實體的步驟，可重複到指定的次數上限。
_Avoid_: 二次擷取、補抽循環

**社群（Community）**：
知識圖譜經階層式社群偵測切出的一群緊密相連的節點；同一層的社群互不重疊，且涵蓋所有節點。
_Avoid_: 群集、cluster、主題群

**C0–C3**：
實驗採用的四個社群層級：C0 為根層、數量最少，C3 為低層、數量最多；無法再切的社群沿用到下一層。
_Avoid_: level 0–3、第一到第四層

**community summary**：
為每個社群預先生成的報告式摘要，涵蓋社群內的實體、關係與 claim；回答全域問題時以它作為 context。
_Avoid_: 社群摘要、社群報告、community report

## 查詢

**Map-reduce**：
查詢時先讓每個區塊的 community summary 各自生成 community answer（map），再依有用度分數合併成全域答案（reduce）的兩階段流程。
_Avoid_: 分治彙整、兩輪摘要

**community answer**：
map 步驟中，由一個區塊的 community summary 針對問題生成的中間答案。
_Avoid_: 社群答案、部分答案、intermediate answer

**有用度分數（Helpfulness score）**：
LLM 在 map 步驟自評的 0–100 分，表示該 community answer 對回答問題的幫助程度；0 分的答案會被丟棄。
_Avoid_: 相關度分數、重要度分數

**全域答案（Global answer）**：
reduce 步驟合併 community answer 後，回給使用者的最終答案。
_Avoid_: 最終摘要、總答案

## 評測

**factual claim（事實陳述）**：
從答案中抽出、明確陳述可驗證事實的句子，用來量測答案的全面性與多樣性；與索引中的 Claim 不同。
_Avoid_: Claim（指索引中的 claim）
