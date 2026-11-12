# Design

## Context

動機見 proposal.md 的 Why；要求見 `specs/` 的三份 delta spec。這裡只記錄影響做法的現況：

- **簡報的建置腳本不在 repo 內**。目前 20 頁的 `slides_zh-TW.pptx` 由一支 python-pptx 腳本產生，腳本放在 session 的 scratchpad，沒有進版控。整理庫其他論文資料夾也都只放 pptx，不放建置腳本。
- **術語統一要改的地方**：grilling 決定 community summary 與 community answer 改用原文英文。投影片正文與備註目前混用「社群摘要／社群報告」「社群答案／部分答案」，主要集中在第 3、4、9–12、17、20 頁與講者備註。
- **原始碼來源**：程式碼筆記的依據是 `microsoft/graphrag` main 分支 `34b2b67`（2026-11-01），各套件版本為 3.3.0。原始碼只 clone 到 scratchpad 閱讀，不進 repo。
- **進行中的 change**：`archive-contest-and-document-survey-directions` 也會修改 `README.md` 與 `GLOSSARY-MAP.md`。

## Goals / Non-Goals

**Goals:**
- 簡報修改後仍維持現有版面系統（字級、色彩、重點帶位置），程式化檢查維持 high = 0、medium = 0。
- 程式碼筆記的每個路徑、預設值與行為描述，都能在釘選的 commit 找到出處。

**Non-Goals:**
- 不修改或 fork `microsoft/graphrag` 的程式碼，也不實際執行索引或查詢。筆記只寫閱讀原始碼得到的結論，不做執行驗證。
- 不改簡報的敘事順序與既有圖片裁切。
- 不處理 GraphRAG 以外的論文術語表。

## Decisions

### D1 簡報修改方式：沿用 scratchpad 建置腳本重建，失效時改用 python-pptx 原地修改

- **主要做法**：腳本還在時，改腳本後重建，版面一致性最好。
- **備案**：若 session 已重置、腳本遺失，就用 python-pptx 開啟現有 pptx，依文字比對做原地取代，再新增 2 頁備用頁。
- **不採用**：手動在 PowerPoint 裡修改，因為無法重現，也難以逐字核對術語是否全部統一。
- **建置腳本不進 repo**：與其他論文資料夾的慣例一致。

### D2 術語呈現：中文句子內直接嵌入英文原文名詞

- 寫成「每個 community 的 community summary」「map 步驟產生 community answer」，名詞一律小寫單數。
- 頁面第一次出現時，可在括號內補中文說明，例如「community summary（社群層級的摘要）」。
- 「報告」只用在第 10 頁描述 JSON 輸出格式的地方。
- 「社群」單獨使用時仍指圖上的 community 分群，不在統一範圍內。
- **不採用**：全部改回中文譯名。這是使用者在 Q5 的明確選擇。

### D3 map 呼叫次數用下限估計，並標明假設

- **公式**：`ceil(該層 community summary 總 tokens ÷ 8,000)`。
- **假設**：每個 map 區塊大小等於 8k context。原文只寫「pre-specified token size」，§4.1.3 寫 community answer 生成用 8k context。
- **估計值**：

  | 資料集 | C0 | C1 | C2 | C3 | TS |
  |---|---|---|---|---|---|
  | Podcast | 4 | 29 | 71 | 94 | 127 |
  | News | 5 | 45 | 123 | 143 | 214 |

- 因為沒有計入 prompt 本身的 token，實際呼叫次數只會更多，所以標為「約略下限」。
- **不採用**：拿掉這個表、只放 community summary 份數。這正是 grilling 指出的誤導來源。

### D4 備用頁放在總結之後，共 2 頁，標示「備用頁 · 不播放」

- **第 21 頁「原文未說明的項目」**：
  - 評審模型版本（引言只寫 GPT-4）；
  - 兩個答案的擺放順序是否隨機；
  - SS 的 embedding 模型與 top-k；
  - 實驗用的 entity types；
  - Leiden 的 resolution 與是否使用邊權重；
  - map 區塊的 token 大小；
  - 有用度分數的準確度；
  - gleaning 後擷取的精確度。
- **第 22 頁「勝率計分與成本」**：
  - 勝率計分方式：勝者 100、敗者 0、平手各 50，再對 5 次評審取平均；
  - 索引成本是一次性的，Table 2 只算查詢成本；
  - 原文沒有計算「問幾題之後 GraphRAG 才划算」。
- **不採用**：另寫一份報告者小抄 md 檔（Q4 選了 B）。

### D5 程式碼筆記的結構

`code_notes_zh-TW.md` 依序分成六節：

1. **版本與範圍**
2. **論文 → 程式碼對照表**：依論文步驟列出 workflow、operation 檔案與 prompt 檔案。
3. **論文設定與程式碼預設值差異表**
4. **實作與論文描述不一致之處**
5. **論文未涵蓋的功能**
6. **修改程式碼注意事項**

第 3、4 節依閱讀原始碼確認的結果，至少包含下列內容（檔案路徑相對於 `packages/graphrag/graphrag/`）。

**第 3 節：設定差異**

| 項目 | 論文 | 程式碼預設值 | 位置 |
|---|---|---|---|
| chunk 大小／重疊 | 600／100 | 1200／100 | `config/defaults.py` 的 `ChunkingDefaults` |
| gleaning 次數 | 「指定上限」，Fig. 3 測到 3 輪 | `max_gleanings = 1` | 同上檔案 |
| claims 擷取 | 屬於流程的一部分 | 預設關閉（`extract_claims.enabled = False`） | 同上檔案 |
| entity types | 原文未說明實驗用哪些 | organization、person、geo、event | 同上檔案 |
| global search context | 8k | `max_context_tokens`、`data_max_tokens` 皆 12,000 | 同上檔案 |
| community report 輸入／輸出上限 | 8k context | `max_input_length` 8,000／`max_length` 2,000 | 同上檔案 |
| Leiden 遞迴停止條件 | 切到葉社群無法再切 | `max_cluster_size = 10`、`resolution = 1.0`、固定 seed | `graphs/hierarchical_leiden.py` |
| 參與分群的節點 | 全圖 | `use_lcc = True`，只取最大連通子圖 | `index/operations/cluster_graph.py` |
| 查詢層級 | C0–C3 各為獨立實驗條件 | CLI `--community-level` 預設為 2 | `cli/main.py` |

查詢層級的補充：程式碼讀入「層級 ≤ 指定值」的報告，每個節點取它所屬的最深 community，效果接近論文說的 projected downwards（`query/indexer_adapters.py`）。

**第 4 節：行為不一致**

- **邊權重**：
  - 程式碼把 LLM 輸出的 relationship strength 依 (source, target) 加總，不是關係重複出現的次數（`index/operations/extract_graph/extract_graph.py`）。
  - 分群前，方向相反的同一對節點會去重並保留最後一筆，不是加總（`cluster_graph.py`）。
- **實體合併鍵**：以 (title, type) 合併，名稱一律轉大寫。同名但類型不同的實體會變成兩個節點；論文只說「精確字串比對」。
- **Gleaning 流程**：
  - 程式碼先送 CONTINUE prompt 補抽，之後才問 Y/N 是否還有遺漏，判斷方式是比對字串 `"Y"`，沒有 logit bias；
  - 論文描述的順序相反：先以 logit bias 強制回答 yes/no，再補抽。
- **Map 輸出格式**：每次 map 輸出一串 key points，每點各有 0–100 分，不是論文描述的「一個答案配一個分數」。Reduce 時濾掉 0 分的點，依分數排序後依 token 上限截斷。
- **全部 0 分時的處理**：若所有點都是 0 分，預設回傳固定的「不知道」答案；開啟 `allow_general_knowledge` 才改用模型的一般知識作答。
- **打散的隨機性**：打散用固定的 `random_state = 86`，所以重跑會得到相同的打散順序。
- **Prompt 命名**：程式碼的 map／reduce prompt 名稱是 `global_search_map_system_prompt`／`global_search_reduce_system_prompt`，內容與論文附錄 E.4／E.3 對應。這支持簡報第 12 頁「附錄標題看似對調」的判讀，筆記會引為佐證。

**不採用**：只寫論文 → 程式碼對照表。使用者的目的是改 code，第 3、4 節才是會踩到的地方。

### D6 GLOSSARY 的條目範圍

`RAG/2024_GraphRAG/GLOSSARY.md` 收錄以下 13 個名詞，格式依 `.claude/skills/domain-modeling/GLOSSARY-FORMAT.md`：

- 全域問題（global sensemaking question）
- vector RAG
- community
- community summary
- community answer
- global answer
- C0–C3
- TS
- SS
- gleaning
- 有用度分數（helpfulness score）
- claim
- map-reduce

程式碼名詞（例如 workflow 名稱、設定鍵名）不收入術語表，放在 code notes。

## Risks / Trade-offs

- **[風險] 上游版本更新後，筆記的路徑與預設值失效** → 開頭釘選 commit 與版本，並寫明「以此版本為準」；README 不承諾隨上游更新。
- **[風險] 在簡報中嵌入英文名詞，可能讓中文聽眾不熟悉** → 每頁首次出現時附中文括號說明，術語表也提供定義。
- **[風險] 與進行中 change 同時修改 `README.md`、`GLOSSARY-MAP.md`，造成合併衝突** → 本 change 只改命名規則段落與 Contexts 清單的新增一行。先合併的一方完成後，另一方在 apply 前先 rebase 到最新 main。
- **[取捨] map 呼叫次數只是下限估計** → 以「推算」標示，並在備註寫出公式與假設；不寫成原文數據。
- **[風險] 程式碼筆記只靠閱讀原始碼，沒有實際執行** → 筆記在範圍一節說明這一點；凡是只能靠執行才能確認的行為，標為「未經執行驗證」。

## Migration Plan

- **README**：在命名規則的固定檔名清單加入 `GLOSSARY.md`、`code_notes_<語言>.md`，兩者都是選用檔案。
- **其他論文資料夾**：不需要補檔案。
- **回復方式**：還原 `slides_zh-TW.pptx` 與相關 md 檔即可，沒有其他相依。
