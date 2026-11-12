# Design

## Context

動機見 proposal.md；要求見 `specs/talk-ready-slides/spec.md`。以下是影響做法的現況：

- **簡報建置**：簡報由 scratchpad 的 python-pptx 建置腳本產生。目前 26 頁：正文第 1–12 頁，備用頁第 13–26 頁。
- **頁面空間**：
  - 備用頁第 13–21 頁的重點帶位在 y ≈ 6.38–6.84 in；
  - 圖說與註記大多落在 y ≈ 5.6–6.15 in，各頁不同；
  - 第 13 頁底部已有一行版本註記（y ≈ 6.05 in）。
- **原始碼與常數**：
  - 原始碼已 clone 在 scratchpad（`microsoft/graphrag` `34b2b67`），可逐一驗證路徑；
  - 已確認的 prompt 常數：`GRAPH_EXTRACTION_PROMPT`、`CONTINUE_PROMPT`、`LOOP_PROMPT`（`prompts/index/extract_graph.py`），`EXTRACT_CLAIMS_PROMPT`，`COMMUNITY_REPORT_PROMPT`，`MAP_SYSTEM_PROMPT`，`REDUCE_SYSTEM_PROMPT`，`GENERAL_KNOWLEDGE_INSTRUCTION`。

## Goals / Non-Goals

**Goals:**
- 追問「這一步在程式碼哪裡」時，在備用頁就能指出檔案與 prompt 名稱。
- 新增的每個路徑與常數都可在釘選的版本驗證。

**Non-Goals:**
- 不說明程式碼怎麼做，不寫預設值，也不寫與論文的差異（使用者選 Q3 (i)）。
- 不動正文第 1–12 頁與備用頁第 22–26 頁。
- 不節錄程式碼中的 prompt 原文。

## Decisions

### D1 各頁的實作對照內容

窄條上的路徑採簡寫：`graphrag/` 指 `packages/graphrag/graphrag/`，這個規則寫在第 13 頁的備註。講者備註列完整路徑。

| 頁 | 主題 | 窄條內容（約一行） | 備註另外補充 |
|---|---|---|---|
| 13 | workflow 總覽 | `index/workflows/factory.py`：`_standard_workflows`；版本 `microsoft/graphrag` `34b2b67`（3.3.0） | 路徑簡寫規則；9 個 workflow 各自的檔案 `index/workflows/<name>.py` |
| 14 | chunk 切分 | `index/workflows/create_base_text_units.py`；`graphrag_chunking/token_chunker.py` | `packages/graphrag-chunking/graphrag_chunking/token_chunker.py` |
| 15 | 元素擷取 prompt | `extract_graph/graph_extractor.py`；`GRAPH_EXTRACTION_PROMPT` | `graphrag/index/operations/extract_graph/graph_extractor.py`、`graphrag/prompts/index/extract_graph.py` |
| 16 | 自我反思 | `graph_extractor.py`：`_process_document`；`CONTINUE_PROMPT`、`LOOP_PROMPT` | 兩個常數所在的 `graphrag/prompts/index/extract_graph.py` |
| 17 | claim | `extract_covariates/claim_extractor.py`；`EXTRACT_CLAIMS_PROMPT` | `graphrag/index/workflows/extract_covariates.py`、`graphrag/prompts/index/extract_claims.py` |
| 18 | degree 與顯著度 | `index/workflows/finalize_graph.py`；`index/operations/finalize_relationships.py` | 欄位名稱 `combined_degree` |
| 19 | 社群報告格式 | `community_reports_extractor.py`；`COMMUNITY_REPORT_PROMPT` | `graphrag/index/workflows/create_community_reports.py`、`graph_context/sort_context.py`、`build_mixed_context.py`、`graphrag/prompts/index/community_report.py` |
| 20 | 回答 prompt | `global_search/search.py`；`MAP_SYSTEM_PROMPT`、`REDUCE_SYSTEM_PROMPT` | 三個 prompt 檔 `global_search_map／reduce／knowledge_system_prompt.py`，以及 `GENERAL_KNOWLEDGE_INSTRUCTION` |
| 21 | context 視窗 | `context_builder/community_context.py`：`build_community_context` | `graphrag/query/indexer_adapters.py`：`read_indexer_reports` |

**用詞規則**
- 窄條只寫「檔案；常數」，不加任何動詞描述，例如不寫「負責…」「預設…」。
- 備註裡的實作對照段，標題固定為「【實作對照（版本見第 13 頁）】」，內容只列出路徑與名稱。

**不採用**：在窄條上寫功能描述（例如「解析 tuple」）。這會開始陳述實作行為，違反規格與使用者的 Q3 決定。

### D2 窄條版面

- **位置與尺寸**：y = 5.95 in、高 0.34 in、寬同內容區（12.13 in）。
- **樣式**：灰底（PANEL）；左側灰色標籤「實作對照」11pt；內容用 Consolas 10.5pt。
- **頁面衝突處理**：凡是與窄條重疊的元素，例如圖說、註記文字、表格底部，都上移或縮短，讓窄條與重點帶之間至少留 0.04 in。
  - 第 13 頁：原本的版本註記併入窄條，原行刪除。
- **檢查方式**：渲染後逐頁確認沒有重疊、沒有換行。若內容超過一行，就縮短成只放主檔案與一個常數，其他移到備註。

### D3 驗證

1. **路徑存在**：以腳本擷取第 13–21 頁窄條與備註中所有以 `.py` 結尾的路徑；補上 `packages/graphrag/graphrag/` 前綴後，用 `git -C <clone> cat-file -e 34b2b67:<path>` 確認每一個都存在。
2. **符號存在**：每個常數或函式名稱都要在對應檔案中 grep 得到定義。
3. **正文乾淨**：第 1–12 頁的正文與備註中，`.py`、`graphrag/` 以及上述常數名稱的出現次數都為 0。
4. **禁用詞**：全份簡報的「開源實作」「預設值」「預設關閉」「code_notes」皆為 0。
5. **格式驗證**：Open XML SDK 0 錯誤、整數 EMU 檢查通過、`audit_pptx_quality.py` high = 0、medium = 0；既有的目錄與溯源檢查（`verify_condense.py`）仍全部通過。

## Risks / Trade-offs

- **[風險] 窄條與既有圖說、表格重疊** → 依 D2 逐頁調整位置，並以渲染圖確認；調整時只改位置，不刪除原有的論文內容。
- **[風險] 上游版本更新後路徑失效** → 只在第 13 頁標一次版本；路徑都在釘選的 commit 驗證過，與 code notes 同一版本。
- **[取捨] 只列「在哪裡」，聽眾可能誤以為程式碼行為與論文相同** → 這是使用者在 Q3 選 (i) 的明確取捨；差異仍記錄在 `code_notes_zh-TW.md` 第 4 節，簡報不另外指向它。
