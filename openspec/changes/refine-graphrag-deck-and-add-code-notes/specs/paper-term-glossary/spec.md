# Spec Delta

## Purpose

規範單篇論文的技術名詞表放在哪裡、如何在 GLOSSARY-MAP 登記，以及它和根目錄整理庫用語表的分工，讓簡報、程式碼筆記與講者備註使用同一套名稱。

## ADDED Requirements

### Requirement: 論文術語表放在論文資料夾

單篇論文的技術名詞 SHALL 記在該論文資料夾的 `GLOSSARY.md`，MUST NOT 寫進根目錄 `GLOSSARY.md`；根目錄 `GLOSSARY.md` 只收整理庫本身的用語（領域、標籤、論文 ID、產物）。

#### Scenario: 新增 GraphRAG 名詞
- **WHEN** 需要定義 community summary 或 map-reduce 等 GraphRAG 名詞
- **THEN** 定義寫在 `RAG/2024_GraphRAG/GLOSSARY.md`，根目錄 `GLOSSARY.md` 沒有變動

### Requirement: 在 GLOSSARY-MAP 登記為獨立 context

每份論文術語表 SHALL 在根目錄 `GLOSSARY-MAP.md` 的 Contexts 段落登記一行，寫明連結與涵蓋範圍，並在 Relationships 段落說明它與 Papers context 的關係。

#### Scenario: 從 GLOSSARY-MAP 找到論文術語表
- **WHEN** 讀者打開 `GLOSSARY-MAP.md`
- **THEN** 可以看到 GraphRAG context 的連結，點下後開啟 `RAG/2024_GraphRAG/GLOSSARY.md`

### Requirement: 術語條目標明原文名稱與避用說法

每個條目 SHALL 依專案既有的術語格式，寫出原文英文名稱、一句定義，以及 _Avoid_ 行列出不再使用的同義說法；條目 MUST NOT 含實作細節（設定名稱、檔案路徑、預設值）。

#### Scenario: community summary 條目
- **WHEN** 查看 `community summary` 條目
- **THEN** 條目給出定義，並在 _Avoid_ 行列出「社群摘要」「社群報告」

#### Scenario: 不含實作細節
- **WHEN** 掃描論文術語表
- **THEN** 沒有程式碼路徑、設定鍵名或預設數值
