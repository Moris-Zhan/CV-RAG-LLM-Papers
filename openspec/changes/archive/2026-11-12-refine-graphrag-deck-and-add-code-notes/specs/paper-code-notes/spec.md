# Spec Delta

## Purpose

規範論文對照開源實作的程式碼筆記：放在哪裡、釘選哪個版本、如何把論文步驟對到程式碼，以及如何記錄預設值差異與修改注意事項，讓讀者能從論文直接找到要改的程式碼，並避開論文與實作不一致的陷阱。

## ADDED Requirements

### Requirement: 筆記放在論文資料夾並釘選版本

程式碼筆記 SHALL 放在該論文資料夾的 `code_notes_<語言>.md`。開頭 MUST 寫明對照的 repo、套件版本、commit 與日期；筆記中的檔案路徑、預設值與行為描述都以該版本為準。

#### Scenario: 讀者確認筆記是否過時
- **WHEN** 讀者打開 `RAG/2024_GraphRAG/code_notes_zh-TW.md`
- **THEN** 第一段就看得到 `microsoft/graphrag`、套件版本與 commit hash，可以拿來和自己手上的版本比對

### Requirement: 論文步驟對應到程式碼位置

筆記 SHALL 以表格列出論文每個方法步驟（§3.1.1–3.1.6、附錄 A.2 與附錄 E 的各 prompt）對應的 workflow、模組檔案與 prompt 檔案，路徑相對於 repo 根目錄。

#### Scenario: 從論文找程式碼
- **WHEN** 讀者想修改論文 §3.1.5 的 community summary context 組裝
- **THEN** 對照表直接指出負責排序與子社群替換的檔案路徑

#### Scenario: 路徑可驗證
- **WHEN** 以釘選的 commit 檢查對照表的每個路徑
- **THEN** 每個路徑都存在於該 commit

### Requirement: 標出論文設定與程式碼預設值的差異

筆記 SHALL 列出論文實驗設定與程式碼預設值不同的每一項，包括論文值、程式碼預設值與對應的設定名稱；對於原文沒寫、但程式碼有預設值的參數，MUST 標明「原文未說明」。

#### Scenario: 重現論文設定
- **WHEN** 讀者想用程式碼重現論文的 Podcast 實驗設定
- **THEN** 差異表列出需要調整的 chunk 大小、gleaning 次數、context token 上限等設定名稱，以及論文值

### Requirement: 記錄實作行為與論文描述不一致之處

筆記 SHALL 另列一節，說明程式碼行為與論文描述不同、改 code 時會誤判的地方，每項附上程式碼位置與影響。

#### Scenario: 邊權重的來源
- **WHEN** 讀者依論文以為邊權重是關係重複出現的次數
- **THEN** 筆記說明程式碼實際的權重計算方式與所在檔案

### Requirement: 提供修改程式碼的注意事項

筆記 SHALL 列出修改程式碼前要知道的事項：
- 哪些介面受 semver 保護、哪些內部模組可能隨版本變動；
- 修改 prompt 的建議方式；
- 修改後要重建哪些輸出；
- 如何執行官方測試。

#### Scenario: 修改 community report prompt
- **WHEN** 讀者想改 community report 的 prompt
- **THEN** 筆記說明 prompt 檔案位置、改設定檔或改程式碼這兩種方式的差別，以及改完需要重跑哪些 workflow

### Requirement: 筆記與簡報的範圍分開

程式碼筆記中屬於開源實作、而論文沒有的功能（例如 local search、DRIFT search、dynamic community selection、fast 索引模式），SHALL 標示為「論文未涵蓋」，且 MUST NOT 寫入論文簡報的正文。

#### Scenario: 簡報不混入實作功能
- **WHEN** 檢查 `slides_zh-TW.pptx` 的正文頁
- **THEN** 不出現 local search、DRIFT search 或 dynamic community selection
