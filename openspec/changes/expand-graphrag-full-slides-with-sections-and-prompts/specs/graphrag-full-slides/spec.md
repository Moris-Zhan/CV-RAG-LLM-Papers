# Spec Delta

## MODIFIED Requirements

### Requirement: 方法細節頁標出 Figure 1 階段

完整版簡報的每張方法細節頁 SHALL 在標題列右上角顯示一個標籤，寫出該頁對應的 Figure 1 階段轉換。階段名稱 MUST 使用論文 Figure 1 的英文原名，不加 workflow 名稱。方法細節 SHALL 依論文 §3.1.1→3.1.6 的順序編號，同一階段的方法細節頁連續排列：

| Figure 1 階段轉換 | 方法細節 |
|---|---|
| Source Documents → Text Chunks | 1 |
| Text Chunks → Entities & Relationships | 2、3、4 |
| Entities & Relationships → Knowledge Graph | 5 |
| Knowledge Graph → Graph Communities | 6 |
| Graph Communities → Community Summaries | 7、8、9 |
| Community Summaries → Community Answers → Global Answer | 10、11、12 |

#### Scenario: 每張方法細節頁都有正確標籤
- **WHEN** 查看 kicker 以「方法細節 N」開頭的任一頁
- **THEN** 該頁右上角的標籤以「Fig. 1」開頭，接著是上表中方法細節 N 所屬的階段轉換

#### Scenario: 標籤不與 kicker 或標題重疊
- **WHEN** 檢查方法細節頁的版面
- **THEN** 標籤的範圍不與 kicker 文字框和標題文字框重疊

#### Scenario: 交叉引用跟著新編號
- **WHEN** 掃描所有畫面文字與備忘稿中的「方法細節 N」引用
- **THEN** 被引用的方法細節 N 的內容與引用句所指的主題相符（例如 claim 頁引用的「實體與關係」指向建構知識圖譜頁）

### Requirement: 方法總覽頁列出 Figure 1 對應表

「方法總覽 · Figure 1」頁 SHALL 在 Figure 1 原圖旁列出 6 段階段轉換，以及各段的章節總覽頁頁碼、對應的方法細節編號與頁碼。原圖 MUST NOT 疊加任何標記。

#### Scenario: 對應表頁碼正確
- **WHEN** 讀取方法總覽頁的對應表
- **THEN** 每列寫出的總覽頁，kicker 都是該段的「章節總覽 N／6」；每列寫出的方法細節頁，kicker 都以對應的「方法細節 N」開頭；12 張方法細節頁都恰好出現一次

### Requirement: 對照頁位於方法細節之後

「論文步驟與 workflow 對照」頁 SHALL 緊接在最後一張方法細節頁之後。目錄 SHALL 維持一頁，並把對照頁放在獨立的「方法回顧」分組；方法段 SHALL 只列 6 個 Figure 1 階段與頁碼範圍。對照頁的頁碼欄與所有備忘稿中的頁碼 MUST 指向實際頁面。

#### Scenario: 頁序
- **WHEN** 列出完整版簡報的 kicker
- **THEN** 第 6–23 頁依序是章節總覽 1、方法細節 1、章節總覽 2、方法細節 2–4、章節總覽 3、方法細節 5、章節總覽 4、方法細節 6、章節總覽 5、方法細節 7–9、章節總覽 6、方法細節 10–12；第 24 頁是「論文步驟與 workflow 對照」

#### Scenario: 目錄頁碼一致
- **WHEN** 比對目錄的每個項目與其頁碼或頁碼範圍
- **THEN** 範圍內各頁的 kicker 與目錄項目相符，且目錄頁碼涵蓋第 3–42 頁、每頁恰好一次

#### Scenario: 對照頁頁碼欄一致
- **WHEN** 讀取對照頁中每個 workflow 的頁碼
- **THEN** 列出的每一頁，kicker 都含有該 workflow 名稱；查詢階段的頁碼指向 kicker 含 `global_search` 的頁面

### Requirement: 論文方法章逐段可追溯

論文 §3.1.1–3.1.6、§3.2（含 Algorithm 1）、§3.3、§4.1、§4.2 的每一段論點 SHALL 出現在完整版簡報的**畫面**上：§3.1 各小節出現在章節總覽頁與方法細節頁；§3.2、§3.3 出現在「評測設計」頁；§4.1 出現在對應頁的「實驗 1 對應」小條或評測設計頁；§4.2 出現在實驗 2 方法頁。目錄的「評測設計」分組 MUST 標示它屬於論文方法章。畫面 MUST NOT 出現 §、附錄或章節編號；出處寫在講者備忘稿。不得加入論文沒有的說法。

#### Scenario: 先前只在備忘稿的論點已上畫面
- **WHEN** 讀取章節總覽頁與實驗 2 方法頁的畫面文字
- **THEN** 找得到 entity matching、其他社群偵測演算法、可擴展到非常大的資料集、層級選擇由實驗評估，以及 factual claim 的定義

#### Scenario: 評測設計標示屬於方法章
- **WHEN** 查看目錄頁與問題生成、評分與比較條件兩頁的講者備忘稿
- **THEN** 目錄「評測設計」分組標題含「屬論文方法章」；兩頁備忘稿的開頭分別說明本頁對應論文方法章的問題生成與評估準則

#### Scenario: 漏寫的論點已補進備忘稿
- **WHEN** 讀取方法細節 5、6、8、10 頁（第 13、15、18、21 頁）與「評測設計 2」頁（第 27 頁）的講者備忘稿
- **THEN** 分別找得到：entity matching 的定義（§3.1.3）、Leiden 之外也可用其他社群偵測演算法（§3.1.4）、摘要方法設計成可擴展到非常大的資料集（§3.1.5）、層級選擇是第 4 章評估的研究問題（§3.1.6）、沒有標準答案所以採 head-to-head 比較，以及附錄 F 與附錄 D 的指引（§3.3）

#### Scenario: 畫面與頁序不變
- **WHEN** 比對重排前後同一張方法細節頁與其他既有頁面
- **THEN** 除了 kicker 的方法細節編號、Fig. 1 標籤、「實驗 1 對應」小條、交叉引用的編號與頁碼、目錄、方法總覽對應表與 workflow 對照頁頁碼欄之外，既有頁面的畫面文字不變

#### Scenario: 新增內容有出處且不捏造
- **WHEN** 檢查本次新增的畫面文字與備忘稿
- **THEN** 新增畫面文字中的多位數數字都在論文原文中出現過，新增的備忘稿句子都標註論文小節或附錄

#### Scenario: 畫面不出現章節編號
- **WHEN** 掃描所有畫面文字
- **THEN** 找不到「§」「附錄」或「第 N 章」

## ADDED Requirements

### Requirement: 章節總覽頁

每個 Figure 1 階段 SHALL 有一張章節總覽頁，排在該階段第一張方法細節頁之前。kicker 為「章節總覽 N／6」，標題為英文階段名稱；左側以 3–4 條中文要點逐段整理該小節論文內容，右側列出延伸的方法細節編號與頁碼。

#### Scenario: 總覽頁列出延伸頁
- **WHEN** 讀取任一章節總覽頁右側的延伸頁清單
- **THEN** 清單中的每個方法細節都屬於該頁標題的階段，頁碼指向該方法細節頁

### Requirement: Algorithm 1 與實驗 2 方法頁

簡報 SHALL 有一張 Algorithm 1 頁，排在問題生成頁之後，以等寬字體列出論文 Algorithm 1 的英文原文，並附中文說明。簡報 SHALL 有一張實驗 2 方法頁，排在實驗 2 結果頁之前，說明以下內容：

- factual claim 的定義，以及英文原文例句；
- Claimify 的步驟；
- 全面性與多樣性兩個指標；
- 分群方式（complete linkage、1 − ROUGE-L、多個門檻）。

實驗 2 的內容 MUST NOT 放在方法細節的 claim 頁。

#### Scenario: Algorithm 1 逐字一致
- **WHEN** 比對 Algorithm 1 頁的英文虛擬碼與論文原文
- **THEN** 每一行都能在論文 Algorithm 1 中找到相同文字

#### Scenario: 兩種 claim 不混用
- **WHEN** 掃描方法細節 claim 頁的畫面與備忘稿
- **THEN** 找不到 Claimify、ROUGE-L 或 factual claim

### Requirement: 實驗 1 對應小條

方法細節 2、10、12 與「評測設計 2」頁 SHALL 在底部有一條標題為「實驗 1 對應」的灰色小條，以一行文字寫出論文 §4.1 與該頁相關的實驗設定。小條 MUST NOT 與頁面上其他元素重疊。

#### Scenario: 小條位置與內容
- **WHEN** 查看上述四頁
- **THEN** 各有一條「實驗 1 對應」小條，內容分別為建圖 prompt 的領域調整、TS 條件、context 與運算環境、資料集來源

### Requirement: 附錄實作 prompt

簡報最後 SHALL 有「附錄 · 實作 prompt」7 頁，kicker 標示為不播放並寫出對應的方法細節，涵蓋 `code_notes_zh-TW.md` 對照表引用的 7 個 prompt 檔。每頁畫面以中文整理 prompt 結構，並逐字節錄關鍵段落；講者備忘稿放完整原文；圖說標示 `microsoft/graphrag` `34b2b67`（3.3.0）、檔案路徑與 MIT License。這些頁面 MUST NOT 與論文比較，也不得陳述預設值或實作行為。

#### Scenario: 節錄與原文逐字一致
- **WHEN** 比對附錄頁的英文節錄與備忘稿原文，和 `34b2b67` 中對應 prompt 常數的字串值
- **THEN** 每段節錄與每份原文都是該常數字串值的子字串

#### Scenario: 不比較論文
- **WHEN** 掃描附錄頁的畫面與備忘稿中的中文說明
- **THEN** 找不到「論文」「不同」「差異」「預設」等比較或預設值的描述
