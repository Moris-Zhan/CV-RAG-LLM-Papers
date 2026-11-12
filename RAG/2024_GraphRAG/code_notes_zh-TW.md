# GraphRAG 程式碼對照筆記

把論文 arXiv:2404.16130v2 的方法對應到開源實作 `microsoft/graphrag`，並列出改 code 前要知道的差異與注意事項。名詞依 [GLOSSARY.md](GLOSSARY.md)。

## 1. 版本與範圍

- **對照版本**：[`microsoft/graphrag`](https://github.com/microsoft/graphrag) main 分支 commit `34b2b67`（2026-11-01），monorepo 內各套件版本皆為 3.3.0。
- **以此版本為準**：本筆記的檔案路徑、預設值與行為描述都以上述 commit 為準。上游的 internals 可能在任何版本變動（見第 6 節），使用前請先比對自己手上的版本。
- **路徑寫法**：除非另外註明，路徑都相對於 repo 根目錄；主要程式碼在 `packages/graphrag/graphrag/`，以下簡寫為 `graphrag/`。
- **驗證方式**：本筆記只靠閱讀原始碼整理，**未經執行驗證**；凡是要跑過才能確認的行為，都會標明。
- **不在 repo 內的部分**：論文的評測流程不在這個 repo，包括以 persona 生成問題（Algorithm 1）、LLM 評審的兩兩比較（附錄 F）、Claimify 指標。`graphrag/prompt_tune/` 雖然也會生成 persona，但用途是自動調整索引 prompt，不是產生評測問題。

## 2. 論文 → 程式碼對照表

索引流程的順序定義在 `graphrag/index/workflows/factory.py` 的 `_standard_workflows`：

1. `create_base_text_units`
2. `create_final_documents`
3. `extract_graph`
4. `finalize_graph`
5. `extract_covariates`
6. `create_communities`
7. `create_final_text_units`
8. `create_community_reports`
9. `generate_text_embeddings`

| 論文 | Workflow | 主要模組 | Prompt |
|---|---|---|---|
| §3.1.1 文件切 chunk | `graphrag/index/workflows/create_base_text_units.py` | `packages/graphrag-chunking/graphrag_chunking/token_chunker.py` | — |
| §3.1.2 擷取實體與關係（附錄 E.1） | `graphrag/index/workflows/extract_graph.py` | `graphrag/index/operations/extract_graph/graph_extractor.py`（呼叫 LLM、解析 tuple） | `graphrag/prompts/index/extract_graph.py` 的 `GRAPH_EXTRACTION_PROMPT` |
| 附錄 A.2 gleaning | 同上 | `graphrag/index/operations/extract_graph/graph_extractor.py` 的 `_process_document` | `graphrag/prompts/index/extract_graph.py` 的 `CONTINUE_PROMPT`、`LOOP_PROMPT` |
| §3.1.2 擷取 claim | `graphrag/index/workflows/extract_covariates.py` | `graphrag/index/operations/extract_covariates/claim_extractor.py` | `graphrag/prompts/index/extract_claims.py` |
| §3.1.3 合併成圖、彙整描述 | `graphrag/index/workflows/extract_graph.py`、`graphrag/index/workflows/finalize_graph.py` | `graphrag/index/operations/extract_graph/extract_graph.py` 的 `_merge_entities`、`_merge_relationships`；`graphrag/index/operations/summarize_descriptions/`；`graphrag/index/operations/finalize_relationships.py`（計算 `combined_degree`） | `graphrag/prompts/index/summarize_descriptions.py` |
| §3.1.4 階層式 Leiden | `graphrag/index/workflows/create_communities.py` | `graphrag/index/operations/cluster_graph.py`、`graphrag/graphs/hierarchical_leiden.py` | — |
| §3.1.5 community summary 的 context 組裝 | `graphrag/index/workflows/create_community_reports.py` | `graphrag/index/operations/summarize_communities/graph_context/sort_context.py`（葉社群：依 `combined_degree` 排序邊）、`graphrag/index/operations/summarize_communities/graph_context/context_builder.py`、`graphrag/index/operations/summarize_communities/build_mixed_context.py`（高層社群：以子社群報告替換） | — |
| §3.1.5 生成 community summary（附錄 E.2） | 同上 | `graphrag/index/operations/summarize_communities/community_reports_extractor.py` | `graphrag/prompts/index/community_report.py` |
| §3.1.6 選定社群層級 | — | `graphrag/query/indexer_adapters.py` 的 `read_indexer_reports` | — |
| §3.1.6 打散與分區塊 | — | `graphrag/query/context_builder/community_context.py` 的 `build_community_context` | — |
| §3.1.6 map（附錄 E.4） | — | `graphrag/query/structured_search/global_search/search.py` | `graphrag/prompts/query/global_search_map_system_prompt.py` |
| §3.1.6 reduce（附錄 E.3） | — | 同上 | `graphrag/prompts/query/global_search_reduce_system_prompt.py`；允許一般知識時另用 `graphrag/prompts/query/global_search_knowledge_system_prompt.py` |
| 預設設定值 | — | `graphrag/config/defaults.py`；`graphrag init` 產生的設定範本在 `graphrag/config/init_content.py` | — |

**佐證附錄 E.3／E.4 標題對調的判讀**：程式碼的 map prompt 檔名是 `global_search_map_system_prompt`，內容要求 0–100 分，對應論文附錄 E.4（Global Answer Generation）；reduce prompt 寫著報告已「依 importance 由高到低排序」，對應附錄 E.3（Community Answer Generation）。

## 3. 論文設定與程式碼預設值差異

要重現論文設定，需要在 `settings.yaml` 調整下列項目。設定名稱對應 `graphrag/config/defaults.py` 的 dataclass。

| 項目 | 論文 | 程式碼預設值 | 設定名稱／位置 |
|---|---|---|---|
| chunk 大小 | 600 tokens（§4.1.1） | 1200 | `chunking.size`（`ChunkingDefaults`） |
| chunk 重疊 | 100 tokens | 100 | `chunking.overlap` |
| gleaning 次數 | 指定上限，Fig. 3 測到 3 輪；實驗值原文未說明 | 1 | `extract_graph.max_gleanings` |
| entity types | 依資料領域調整，實驗用哪些原文未說明 | organization、person、geo、event | `extract_graph.entity_types` |
| claim 擷取 | 屬於流程的一部分 | 預設關閉（`enabled = False`） | `extract_claims.enabled` |
| community summary 輸入上限 | 8k context（§4.1.3） | 8,000 | `community_reports.max_input_length` |
| community summary 輸出長度 | 原文未說明 | 2,000 | `community_reports.max_length` |
| Leiden 遞迴停止條件 | 切到葉社群無法再切 | 社群節點數 ≤ 10 就停止 | `cluster_graph.max_cluster_size`；`resolution = 1.0` 寫死在 `graphrag/graphs/hierarchical_leiden.py` |
| 參與分群的節點 | 全圖 | 只取最大連通子圖 | `cluster_graph.use_lcc = True` |
| Leiden 隨機種子 | 原文未說明 | `0xDEADBEEF` | `cluster_graph.seed` |
| map／reduce context | 8k | 各 12,000 | `global_search.max_context_tokens`、`global_search.data_max_tokens` |
| map 區塊大小 | pre-specified token size，原文未給值 | 由 `max_context_tokens` 決定 | 同上 |
| 查詢的社群層級 | C0–C3 各為獨立條件 | CLI 預設 2 | `graphrag query --community-level`（`graphrag/cli/main.py`） |
| LLM | gpt-4-turbo | 由使用者設定 | `models` 區塊 |

**查詢層級的語意**：`read_indexer_reports` 會讀入「層級 ≤ 指定值」的報告，每個節點取它所屬的最深 community。因此：

- 指定 `--community-level 0` 約等於論文的 C0；
- 指定 2 時，無法再切的社群會沿用上層，接近論文說的 projected downwards，但不保證與論文的 C2 完全相同（未經執行驗證）。

## 4. 實作與論文描述不一致之處

| # | 論文的描述 | 程式碼實際行為 | 位置 | 影響 |
|---|---|---|---|---|
| 1 | 邊權重 = 同一關係重複出現的次數（§3.1.3） | 把 LLM 輸出的 relationship strength 依 (source, target) **加總** | `graphrag/index/operations/extract_graph/extract_graph.py` 的 `_merge_relationships` | 權重同時反映出現次數與 LLM 主觀強度；改 prompt 的 strength 給分方式會直接改變分群結果 |
| 2 | 分群在無向圖上進行 | 分群前把 (A, B) 與 (B, A) 正規化為同一方向並去重，**保留最後一筆**的權重，不加總 | `graphrag/index/operations/cluster_graph.py` 的 `_compute_leiden_communities` | 方向相反的重複關係，有一邊的權重會被丟掉；`graphrag/index/operations/finalize_relationships.py` 也只依有方向的 (source, target) 去重 |
| 3 | 實體以精確字串比對合併 | 以 **(title, type)** 合併，名稱一律轉大寫 | `graphrag/index/operations/extract_graph/extract_graph.py` 的 `_merge_entities`；`graphrag/index/operations/extract_graph/graph_extractor.py` 的 `_process_result` | 同名但類型不同的實體會變成兩個節點；大小寫差異會被吸收 |
| 4 | gleaning：先以 logit bias 強制回答 yes／no，有遺漏才補抽（附錄 A.2） | 先送 `CONTINUE_PROMPT` 補抽，之後才以 `LOOP_PROMPT` 問 Y／N；以字串比對 `"Y"` 判斷，沒有 logit bias；最後一輪不問 | `graphrag/index/operations/extract_graph/graph_extractor.py` 的 `_process_document` | `max_gleanings = 1` 時一定會多補抽一次；模型若回答 `"Yes"` 或帶空白，就會提前停止 |
| 5 | map 產生一個 community answer 加一個 0–100 分（§3.1.6） | map 輸出 JSON，含多個 key points，**每點**各有 0–100 分；reduce 時濾掉 0 分的點，依分數排序後依 token 上限截斷 | `graphrag/query/structured_search/global_search/search.py` | 排序單位是要點，不是整份 community answer；改 map prompt 時必須維持 `points` 的 JSON 結構，否則會被當成 0 分略過 |
| 6 | 全部 0 分時的行為未說明 | 預設回傳固定的「不知道」答案；開啟 `allow_general_knowledge` 才改用一般知識 prompt | 同上 | 開啟後幻覺風險會上升（程式碼的 log 訊息也這樣警告） |
| 7 | community summary 隨機打散 | 打散用固定的 `random_state = 86`，另外預設附上 community rank 與 occurrence weight 欄位 | `graphrag/query/context_builder/community_context.py`；`graphrag/query/factory.py` 的 global search 參數 | 重跑會得到相同順序；context 比論文多了排名與權重欄位 |
| 8 | 高層社群：依「元素摘要 token 數」由多到少，以子社群摘要替換 | 依子社群 context 字串的 token 數由大到小，逐一替換成子社群報告；子社群沒有報告時，改用原始元素並截斷 | `graphrag/index/operations/summarize_communities/build_mixed_context.py`、`graphrag/index/operations/summarize_communities/graph_context/context_builder.py` | 與論文一致，但有沒報告時的退路，論文沒有描述 |

## 5. 論文未涵蓋的功能

以下都是開源實作後續加入、論文沒有描述的功能，**不可寫進論文簡報的正文**：

- **Local search**：從問題比對到的實體出發，收集鄰近的實體、關係與文字片段來回答（`graphrag/query/structured_search/local_search/`）。
- **DRIFT search**：結合 global 與 local 的多步查詢（`graphrag/query/structured_search/drift_search/`）。
- **Basic search**：一般的向量 RAG（`graphrag/query/structured_search/basic_search/`），可當作 SS 的近似，但設定與論文未必相同。
- **Dynamic community selection**：查詢時先讓 LLM 評估 community 的相關性，再決定要往下展開哪些子社群（`graphrag/query/context_builder/dynamic_community_selection.py`）。論文第 6.2 節提到的 drill down 構想，與它最接近。
- **Fast 索引模式**：用 NLP 名詞片語建圖，取代 LLM 擷取（`extract_graph_nlp` workflow、`graphrag/index/operations/build_noun_graph/`）。
- **增量更新**：新增文件時只更新受影響的部分（`_update_workflows`、`graphrag/index/update/`）。
- **Prompt tuning**：依資料自動生成領域化的擷取 prompt（`graphrag/prompt_tune/`、`graphrag/api/prompt_tune.py`）。

## 6. 修改程式碼注意事項

- **semver 只保護四個介面**：CLI、API（`graphrag/api/`）、`settings.yaml`、輸出 data model。其他模組都屬於 internals，任何版本都可能變動（上游 `breaking-changes.md`）。如果要把 GraphRAG 當函式庫使用，盡量只呼叫 `graphrag/api/`；直接改 internals，升級時要自己合併。
- **改 prompt 的兩種方式**：
  - **建議做法**：`graphrag init` 會在專案的 `prompts/` 產生 `extract_graph.txt`、`community_report_graph.txt`、`global_search_map_system_prompt.txt` 等檔案，`settings.yaml` 指向這些檔案（`graphrag/config/init_content.py`）。改這些 txt 不必動套件程式碼，升級也不會被覆蓋，但跨 minor 版本重跑 `init --force` 會覆蓋它們，請先備份。
  - **改套件內的 `graphrag/prompts/`**：只影響沒有指定 prompt 檔的設定，而且升級時會被覆蓋。
  - 不論哪一種，都要保留 prompt 中的佔位符（例如 `{entity_types}`、`{tuple_delimiter}`）與輸出格式。解析程式依賴這些格式，例如 tuple 分隔符號與 map 的 `points` JSON。
- **改了什麼，就要重跑什麼**：
  - 改擷取 prompt、chunk 或 entity types：要從 `extract_graph` 起重跑整條索引，因為後面的圖、社群與 community summary 全部依賴它。
  - 只改 community report prompt：從 `create_community_reports` 重跑即可。
  - 只改查詢 prompt 或查詢參數：不必重建索引。
  - 實際的重跑方式（指定 workflow 或整條重跑）未經執行驗證，請以官方文件為準。
- **LLM cache 會讓重跑看起來「沒變」**：預設 cache 類型是 JSON 檔案，放在 cache 目錄（`CacheDefaults`）。如果只改了參數、送給 LLM 的內容卻一樣，就會直接取用 cache 的結果。要驗證 prompt 修改的效果，請清掉對應的 cache 或換一個 cache 目錄。
- **改分群相關設定會改變 community ID 與層級數**：
  - `max_cluster_size`、`use_lcc`、`seed` 都會影響分群結果；
  - 改了之後所有 community summary 都要重生成；
  - 舊的查詢結果與新索引的報告 ID 無法對應。
- **要比照論文的 C0–C3，先確認層級數**：程式碼的層級數由資料與 `max_cluster_size` 決定，不一定剛好是 4 層。先查看輸出的 communities 表有哪些 level，再決定 `--community-level`。
- **測試與開發指令**（上游 `DEVELOPING.md`）：
  - 安裝依賴：`uv sync`
  - 單元測試：`uv run poe test_unit`
  - 冒煙測試：`uv run poe test_smoke`
  - 全部測試：`uv run poe test`
  - 部分測試需要 Azurite 模擬 Azure 資源，啟動方式見同一份文件
  - 提交變更時，上游要求以 `uv run semversioner add-change` 加入版本紀錄
