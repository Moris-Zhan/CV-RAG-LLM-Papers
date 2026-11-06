# Spec Delta

## Purpose

讓讀者打開 README 就能看出論文整理庫 survey 了哪些研究方向、每個方向在研究什麼問題、由哪些論文構成，並在新增論文時維持方向與論文索引一致。

## ADDED Requirements

### Requirement: README 有 Survey 方向段落

README SHALL 有一個「Survey 方向」段落，位置在論文索引之前，開頭用一句話說明整理庫的整體研究焦點。

#### Scenario: 讀者先看到方向再看到逐篇索引
- **WHEN** 讀者由上往下閱讀 README
- **THEN** 先讀到「Survey 方向」段落與整體焦點說明，之後才是論文索引表

### Requirement: 每個方向說明研究問題並列出論文

每個 Survey 方向 SHALL 有名稱、一句研究問題說明，並列出屬於該方向的論文 ID，每個 ID 連到論文資料夾。

#### Scenario: 讀者查看某個方向
- **WHEN** 讀者閱讀任一方向
- **THEN** 看得到方向名稱、這個方向在解決什麼問題，以及可點擊的論文 ID 清單

### Requirement: 方向涵蓋論文索引中的每一篇

論文索引中的每篇論文 SHALL 至少歸入一個 Survey 方向；方向中列出的論文 ID MUST 都存在於論文索引。

#### Scenario: 沒有遺漏的論文
- **WHEN** 比對論文索引的 ID 與所有方向列出的 ID
- **THEN** 索引中每個 ID 至少出現在一個方向裡

#### Scenario: 沒有多出來的論文
- **WHEN** 檢查各方向列出的 ID
- **THEN** 每個 ID 都能在論文索引找到對應列

### Requirement: 方向與領域、標籤區分

Survey 方向 SHALL 是跨領域的研究主題分組，與論文所屬的領域（資料夾）分開；一篇論文可屬於多個方向，方向名稱 MUST NOT 出現在資料夾名稱。

#### Scenario: 同一方向橫跨多個領域
- **WHEN** 某方向包含分屬 CV、LLM、RAG 的論文
- **THEN** 這些論文仍各自留在原領域資料夾，只在 Survey 方向段落中被歸在一起

### Requirement: 新增論文時同步更新方向

README 的新增論文步驟 SHALL 包含「將新論文歸入既有方向，或在無合適方向時新增方向」這一步。

#### Scenario: 新增一篇論文
- **WHEN** 依 README 的步驟新增一篇論文
- **THEN** 步驟中明確要求更新 Survey 方向，使該論文至少屬於一個方向
