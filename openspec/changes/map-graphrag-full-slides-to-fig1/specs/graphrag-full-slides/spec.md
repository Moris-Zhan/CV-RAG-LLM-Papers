# Spec Delta

## ADDED Requirements

### Requirement: 方法細節頁標出 Figure 1 階段

完整版簡報的每張方法細節頁 SHALL 在標題列右上角顯示一個標籤，寫出該頁對應的 Figure 1 階段轉換。階段名稱 MUST 使用論文 Figure 1 的英文原名，不加 workflow 名稱。對應以論文方法小節為準：

| Figure 1 階段轉換 | 方法細節 |
|---|---|
| Source Documents → Text Chunks | 1 |
| Text Chunks → Entities & Relationships | 2、3、5 |
| Entities & Relationships → Knowledge Graph | 4 |
| Knowledge Graph → Graph Communities | 7 |
| Graph Communities → Community Summaries | 6、8、9 |
| Community Summaries → Community Answers → Global Answer | 10、11、12 |

#### Scenario: 每張方法細節頁都有正確標籤
- **WHEN** 查看 kicker 以「方法細節 N」開頭的任一頁
- **THEN** 該頁右上角的標籤以「Fig. 1」開頭，接著是上表中方法細節 N 所屬的階段轉換

#### Scenario: 標籤不與 kicker 或標題重疊
- **WHEN** 檢查方法細節頁的版面
- **THEN** 標籤的範圍不與 kicker 文字框和標題文字框重疊

### Requirement: 方法總覽頁列出 Figure 1 對應表

「方法總覽 · Figure 1」頁 SHALL 在 Figure 1 原圖旁列出 6 段階段轉換，以及各段對應的方法細節編號與頁碼。原圖 MUST NOT 疊加任何標記。

#### Scenario: 對應表頁碼正確
- **WHEN** 讀取方法總覽頁的對應表
- **THEN** 每列「細節 N1、N2 · 第 P1、P2 頁」中，第 Pi 頁的 kicker 都以「方法細節 Ni」開頭，且 12 張方法細節頁都恰好出現一次

### Requirement: 對照頁位於方法細節之後

「論文步驟與 workflow 對照」頁 SHALL 緊接在最後一張方法細節頁之後。目錄 SHALL 把它放在獨立的「方法回顧」分組；對照頁的頁碼欄與所有備忘稿中的頁碼 MUST 指向實際頁面。

#### Scenario: 頁序
- **WHEN** 列出完整版簡報的 kicker
- **THEN** 第 6–17 頁依序是方法細節 1–12，第 18 頁是「論文步驟與 workflow 對照」

#### Scenario: 目錄頁碼一致
- **WHEN** 比對目錄的每個項目與其頁碼
- **THEN** 該頁的 kicker 與目錄項目相符，且目錄頁碼涵蓋第 3–27 頁、每頁一次

#### Scenario: 對照頁頁碼欄一致
- **WHEN** 讀取對照頁中每個 workflow 的頁碼
- **THEN** 頁碼範圍內每一頁的 kicker 都含有該 workflow 名稱；查詢階段的頁碼指向 kicker 含 `global_search` 的頁面
