# Spec Delta

## Purpose

規範論文整理庫中已結束、不再更新的非論文資料如何封存，讓根目錄只保留論文領域與仍在使用的工具，同時讓封存內容仍可在 repo 中直接瀏覽與追溯。

## ADDED Requirements

### Requirement: 封存資料放在 archive 目錄

已結束、不再更新的非論文資料 SHALL 整包移到根目錄 `archive/` 底下的子目錄，子目錄名稱標示年份與主題；根目錄 MUST NOT 再保留原目錄。

#### Scenario: 比賽資料封存後的位置
- **WHEN** 2026 AI 黑客松資料完成封存
- **THEN** repo 根目錄沒有 `Contest/`，原內容位於 `archive/2026-contests/`

#### Scenario: 封存不改變內部結構
- **WHEN** 比對封存前的 `Contest/` 與封存後的 `archive/2026-contests/`
- **THEN** 兩者的檔案清單與每個檔案內容完全相同，只有上層路徑不同

### Requirement: 封存區有說明文件

`archive/` SHALL 有一份 `README.md`，對每個封存子目錄列出封存日期、封存原因、內容摘要與入口連結。

#### Scenario: 讀者查看封存原因
- **WHEN** 讀者打開 `archive/README.md`
- **THEN** 看得到 `2026-contests/` 的封存日期、「未獲選」的封存原因、內容摘要，以及連到其原有說明文件的連結

### Requirement: 封存區的文獻調查不屬於論文整理庫

封存資料中的文獻調查 MUST NOT 出現在 README 的論文索引或 Survey 方向；封存說明 SHALL 用一句話註明它的存在與用途。

#### Scenario: 比賽文獻不進論文索引
- **WHEN** 檢查 README 的論文索引與 Survey 方向
- **THEN** 其中沒有任何比賽期間調查的車損或整潔論文

#### Scenario: 封存說明提到比賽文獻
- **WHEN** 讀者閱讀 `archive/README.md` 的 `2026-contests/` 段落
- **THEN** 看到一句話說明其中含車損與車內整潔的文獻調查，為提案服務，不屬於論文整理庫

### Requirement: 封存後沒有失效連結

封存完成後，repo 中封存區以外的文件 MUST NOT 有指向舊路徑的連結；原本指向舊路徑的連結 SHALL 改指向封存後的新路徑或封存說明。

#### Scenario: 根目錄文件改指新路徑
- **WHEN** 在封存區以外的 Markdown 檔中搜尋 `Contest/`
- **THEN** 沒有任何結果；README 與 GLOSSARY-MAP 原本的連結改指向 `archive/` 底下對應的檔案

#### Scenario: 封存區內部連結仍有效
- **WHEN** 檢查 `archive/2026-contests/` 內所有 Markdown 相對連結
- **THEN** 每個連結指向的檔案都存在

### Requirement: 封存的用語脈絡標示為已封存

封存資料若有自己的用語脈絡，GLOSSARY-MAP SHALL 保留該脈絡項目、改指新路徑，並標示為已封存、不再更新。

#### Scenario: iRent 脈絡標示已封存
- **WHEN** 讀者查看 `GLOSSARY-MAP.md` 的 iRent 項目
- **THEN** 連結指向 `archive/2026-contests/iRent/GLOSSARY.md`，且文字標示已封存、不再更新
