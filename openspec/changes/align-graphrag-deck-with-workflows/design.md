# Design

## Context

動機見 proposal.md；要求見 `specs/talk-ready-slides/spec.md`。以下是影響做法的現況：

- **建置方式**：簡報由 scratchpad 的 python-pptx 建置腳本產生（與上一個 change 相同，不進版控）。目前 22 頁，方法段在第 3–13 頁。
- **9 個 workflow 與論文的對應**（以 `code_notes_zh-TW.md` 第 2 節為準）：

  | # | Workflow | 論文步驟 | 目前專頁 |
  |---|---|---|---|
  | 1 | `create_base_text_units` | 文件切 chunk | 無 |
  | 2 | `create_final_documents` | 無對應 | — |
  | 3 | `extract_graph` | 擷取實體與關係、gleaning、合併成圖 | 第 5、6、7 頁 |
  | 4 | `finalize_graph` | 節點 degree、邊的顯著度 | 無 |
  | 5 | `extract_covariates` | 擷取 claim | 無 |
  | 6 | `create_communities` | 階層式社群偵測 | 第 8 頁 |
  | 7 | `create_final_text_units` | 無對應 | — |
  | 8 | `create_community_reports` | 生成 community summary | 第 9、10 頁 |
  | 9 | `generate_text_embeddings` | 無對應 | — |

  查詢階段（第 11–13 頁）在實作中屬於 global search，不在這 9 個 workflow 裡。
- **章節標號**：可見文字中約有 20 處「§」或「附錄」，散在 kicker、圖說、正文與表格標題。
- **程式碼相關文字**：可見文字與備註中有 3 處：
  - 封面寫「開源實作：github.com/microsoft/graphrag」；
  - 第 21 頁的重點帶寫「補充開源實作的做法，並提醒其預設值與論文不同」；
  - 第 21 頁的講者備註寫「見 code_notes_zh-TW.md」。

## Goals / Non-Goals

**Goals:**
- 方法段敘事仍依論文順序，聽眾可由 kicker 標籤與總覽頁對照到 workflow。
- 新增的 3 頁專頁只用原文內容，延續現有版面系統（字級、色彩、重點帶位置）。
- 程式化檢查維持 high = 0、medium = 0。

**Non-Goals:**
- 不改評測、結果、限制、總結頁的內容，只改頁碼。
- 不修改 `code_notes_zh-TW.md`、`GLOSSARY.md`，也不修改 `paper-code-notes` 規格。
- 不在簡報中解釋論文沒有的 3 個 workflow。

## Decisions

### D1 頁面順序（27 頁）

| 頁 | 內容 | kicker 標籤 |
|---|---|---|
| 1 | 封面 | — |
| 2 | **目錄（新增）** | — |
| 3 | 研究背景 | — |
| 4 | 核心想法 | — |
| 5 | Fig. 1 管線 | — |
| 6 | **workflow 總覽（新增）** | — |
| 7 | **chunk 切分（新增）** | 方法細節 1 · `create_base_text_units` |
| 8 | 元素擷取 prompt | 方法細節 2 · `extract_graph` |
| 9 | 自我反思（gleaning） | 方法細節 3 · `extract_graph` |
| 10 | 建構知識圖譜 | 方法細節 4 · `extract_graph` |
| 11 | **claim（新增）** | 方法細節 5 · `extract_covariates` |
| 12 | **節點 degree 與邊顯著度（新增）** | 方法細節 6 · `finalize_graph` |
| 13 | 階層式社群 | 方法細節 7 · `create_communities` |
| 14 | community summary 的 context 組裝 | 方法細節 8 · `create_community_reports` |
| 15 | 社群報告格式 | 方法細節 9 · `create_community_reports` |
| 16 | 查詢時 map-reduce | 方法細節 10 · `global_search` |
| 17 | 回答 prompt | 方法細節 11 · `global_search` |
| 18 | context 視窗與實驗設定 | 方法細節 12 · `global_search` |
| 19–25 | 評測、結果、限制、總結（原 14–20） | 不變 |
| 26–27 | 備用頁（原 21–22） | 不變 |

**claim 頁的位置**：放在建圖之後、degree 之前，順著論文的敘事（claim 與實體同屬擷取步驟）。實作中 `extract_covariates` 排在 `finalize_graph` 之後，這個順序只在總覽頁的編號呈現，簡報中不另外說明。

**不採用**：完全依 workflow 編號排序。那樣會打斷論文從「建圖」到「分群」的敘事。

### D2 新增 3 頁的內容（只用原文）

- **chunk 切分（第 7 頁）**：
  - chunk 越長，LLM 呼叫越少，但 chunk 前段資訊的召回會下降；
  - HotPotQA 上，600-token chunk 抽到的實體參照數幾乎是 2400-token 的兩倍；
  - 實驗設定是 600 tokens、重疊 100；
  - 原生表格列出 Podcast 1,669 chunks（約 1M tokens）、News 3,197 chunks（約 1.7M tokens）。
  - 重點帶：「chunk 大小在 LLM 呼叫次數與擷取召回之間取捨，實驗採 600 tokens」。
- **claim（第 11 頁）**：
  - claim 是關於實體的重要事實陳述，包括日期、事件、與其他實體的互動；
  - 原文 NeoChip 例子的 3 條 claim（英文原句）；
  - 可用領域化的 in-context 範例引導；
  - 與實體、關係一樣跨文件彙整；
  - 組裝 community summary 時，隨相關的邊一起放進 context。
  - 重點帶：「claim 補上日期與事件這類事實，隨相關的邊進入 community summary」。
- **節點 degree 與邊顯著度（第 12 頁）**：
  - 用原生圖形畫一張示意小圖，標註各節點的 degree，以及一條邊的顯著度 = deg(來源) + deg(目標)，標示「示意」；
  - 說明 degree 的兩個用途：Fig. 4 以 degree 決定節點大小，葉社群組裝 context 時依邊的顯著度排序；
  - 原生表格列出建圖規模：Podcast 8,564 節點、20,691 邊；News 15,754 節點、19,520 邊。
  - 重點帶：「邊的顯著度決定哪些描述先放進 community summary 的 context」。

### D3 workflow 總覽頁（第 6 頁）

- **左側 3/4 寬**：直排列出 1–9 個 workflow。每列包含：編號、等寬字體的 workflow 名稱、論文步驟（中文）、專頁頁碼。
- **論文沒有的 3 個 workflow**：該列整列灰色，只有編號與名稱，論文步驟與頁碼欄留空。
- **右側 1/4 寬**：「查詢階段：global search」，列出 map-reduce（16）、回答 prompt（17）、context 視窗（18）。
- **底部註記**：「workflow 名稱依 `microsoft/graphrag` `34b2b67`（3.3.0）」。

**不採用**：只放對照表。依序列出 1–9 的步驟更直觀，也能看出先後順序。

### D4 目錄頁（第 2 頁）

- **版面**：兩欄，依 7 組依序排下；每組一個色塊標題，下方列出「小主題 ⋯⋯ 頁碼」。
- **分組與小主題**：

  | 組別 | 小主題（頁碼） |
  |---|---|
  | 研究背景 | 向量 RAG 的瓶頸（3） |
  | 核心想法與管線 | 核心想法（4）；GraphRAG 管線（5）；論文步驟與 workflow 對照（6） |
  | 方法：索引階段 | chunk 切分（7）；元素擷取 prompt（8）；自我反思（9）；建構知識圖譜（10）；claim（11）；節點 degree 與邊顯著度（12）；階層式社群（13）；community summary 的 context 組裝（14）；社群報告格式（15） |
  | 方法：查詢階段 | map-reduce（16）；回答 prompt（17）；context 視窗與實驗設定（18） |
  | 評測設計 | 問題生成（19）；評分與比較條件（20） |
  | 結果與驗證 | 實驗 1 勝率（21）；成本（22）；實驗 2 claims 驗證（23） |
  | 限制與總結 | 限制（24）；總結（25） |

- **備用頁一行**：原文未說明的項目（26）、勝率計分與成本（27），標「不播放」。
- **頁碼驗證**：建置後以腳本比對目錄的每個頁碼，與目標頁的 kicker 或標題關鍵字是否相符。

### D5 章節標號與程式碼文字的替換規則

- **kicker**：改為「方法細節 N · 主題 · `workflow`」。
- **圖說**：
  - 「Source: Fig. 3（附錄 A.2），HotPotQA…」改為「Source: Fig. 3，HotPotQA…」；
  - 「整理自 §3.1.5；…」改為「整理自原文方法說明；…」。
- **正文**：
  - 括號內的「（§3.1.x）」直接刪除；
  - 「① 原文 chunk（§3.1.2 範例）」改為「① 原文 chunk（範例）」；
  - 表格標題「實驗設定（§4.1.1、§4.1.3）」改為「實驗設定」。
- **prompt 來源**：
  - 「附錄 E.4（Global Answer Generation）」改為「原文 prompt：Global Answer Generation」；
  - 「附錄 E.3、E.4」改為「原文 prompt」；
  - 對調的註記改寫為「註：依內容判斷，原文兩個 prompt 的標題與 map／reduce 看似對調」。
- **封面**：「開源實作：github.com/…」改為「開源程式碼：github.com/microsoft/graphrag」。原文確實寫到已開源，但不再用「實作」這個字。
- **第 26 頁（原第 21 頁）**：
  - 重點帶改為「回答方式：先說明原文未交代，不臆測細節」；
  - 備註刪除「再視需要補充開源實作的做法…見 code_notes_zh-TW.md」一整句，不另補說明。
- **講者備註**：保留章節號，不做替換。

### D6 驗證腳本

建置後以 python-pptx 自動檢查：
- 可見文字中「§」「附錄」的出現次數為 0（不掃講者備註）；
- 全份文字與備註中，「開源實作」「預設值」「code_notes」的出現次數為 0（「預設 prompt」是原文 default prompt 的說法，不在禁止之列）；
- 6 個論文有對應的 workflow 都出現在 kicker，3 個沒有對應的不出現在任何 kicker；
- 目錄頁碼與目標頁一致；
- 共 27 頁，每頁都有講者備註。

## Risks / Trade-offs

- **[風險] 頁碼大幅位移，QA 報告與圖片出處清單的頁碼過時** → 圖片從第 4、6、8、16 頁移到第 5、9、13、21 頁，原生表格頁也一併更新；以 D6 的腳本比對目錄頁碼。
- **[風險] kicker 加上 workflow 名稱後太長而換行** → kicker 字級 11pt，寬度可容納約 60 個半形字元；渲染後逐頁檢查，過長時縮短主題文字。
- **[取捨] degree 頁的示意圖是報告者繪製** → 標註「示意」，數字只用原文的建圖規模；示意圖本身不宣稱任何原文數據。
- **[取捨] claim 頁在簡報中的位置與總覽頁的編號不一致** → 總覽頁照實作順序編號、旁邊標專頁頁碼，聽眾可直接跳到正確頁面，不需額外說明。
