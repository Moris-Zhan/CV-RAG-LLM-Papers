# Tasks

## 1. 術語表

- [ ] 1.1 新增 `RAG/2024_GraphRAG/GLOSSARY.md`，依 design D6 收錄 13 個名詞（含原文英文名稱、一句定義、_Avoid_ 行）；驗證 `community summary` 的 _Avoid_ 行列出「社群摘要」「社群報告」，`community answer` 的 _Avoid_ 行列出「社群答案」「部分答案」，且全檔沒有程式碼路徑、設定鍵名或預設數值
- [ ] 1.2 在 `GLOSSARY-MAP.md` 的 Contexts 新增 GraphRAG 一行，並在 Relationships 說明它與 Papers context 的分工；驗證兩個新連結都指向存在的檔案

## 2. 簡報用詞與事實修正

- [ ] 2.1 依 grilling Q1 對照表改寫 8 處（第 3、4、5、6、7 頁的重點帶，第 20 頁的標題與重點帶，第 16 頁的講者備註）；驗證全份文字與備註中已找不到原本的 8 個句子
- [ ] 2.2 修正 3 處與原文不符的說法（第 17 頁改為「全域方法中成本最低」、第 19 頁改寫局部問題的推論、第 8 頁標題改為「實驗取 C0–C3 四層」）；驗證第 17 頁備註寫出 SS 的 context 上限為 8k
- [ ] 2.3 依 design D2 統一術語：正文與備註改用 community summary、community answer，「報告」只留在第 10 頁描述 JSON 的地方；以腳本掃描全份文字，驗證「社群摘要」「社群答案」「部分答案」出現 0 次，「社群報告」只出現在第 10 頁

## 3. 簡報深度補強

- [ ] 3.1 依 design D3 改寫第 11 頁的表格：區分 community summary 份數與 map 呼叫次數，後者標示「推算・約略下限」並在備註寫出公式與 8k 區塊假設；驗證 8 個推算值與 design D3 的表一致
- [ ] 3.2 在第 8 頁講者備註補上 Leiden／modularity 的基本概念與 projected downwards 的意思；驗證備註不含原文沒有的參數值
- [ ] 3.3 依 design D4 新增第 21、22 頁備用頁，標示「備用頁 · 不播放」；驗證第 21 頁列出 8 個原文未說明的項目，第 22 頁寫明 100／0／50 計分方式、5 次評審平均，以及索引成本與查詢成本的區別
- [ ] 3.4 重建簡報並以 LibreOffice 渲染逐頁檢查，修正換行、重疊與留白；執行 `audit_pptx_quality.py`，驗證 22 頁、high = 0、medium = 0，且每頁都有講者備註
- [ ] 3.5 更新 `qa_report_zh-TW.md`（頁數、修正紀錄、報告者補充與推算值的說明）、`pptx_audit_zh-TW.md`，以及 `asset_manifest.md` 的頁碼；驗證文件中的頁碼與重建後的簡報一致

## 4. 程式碼對照筆記

- [ ] 4.1 新增 `RAG/2024_GraphRAG/code_notes_zh-TW.md` 的第 1、2 節：版本與範圍（`microsoft/graphrag` 套件 3.3.0、commit `34b2b67`、2026-11-01，註明只讀原始碼、未經執行驗證），以及論文 §3.1.1–3.1.6、附錄 A.2、附錄 E 對應的 workflow、operation 與 prompt 檔案表；以 `git -C <clone> cat-file -e 34b2b67:<path>` 逐一檢查，驗證表中每個路徑都存在
- [ ] 4.2 撰寫第 3 節「論文設定與程式碼預設值差異表」，至少涵蓋 design D5 第 3 節的 9 項；驗證每一項的預設值都能在釘選 commit 的 `config/defaults.py` 或對應檔案中找到
- [ ] 4.3 撰寫第 4 節「實作與論文描述不一致之處」，至少涵蓋 design D5 第 4 節的 7 項，每項附檔案路徑與影響；驗證每項都引用到具體檔案
- [ ] 4.4 撰寫第 5 節「論文未涵蓋的功能」（local、DRIFT、basic search，dynamic community selection，fast 索引模式，增量更新，prompt tuning），以及第 6 節「修改程式碼注意事項」：
  - semver 範圍（CLI、API、settings.yaml、data model，與 internals 的區別）；
  - 改 prompt 的兩種方式（`graphrag init` 產生的 `prompts/*.txt`，或改套件預設值）；
  - LLM cache 對重跑的影響與需要重跑的 workflow；
  - 測試指令 `uv run poe test_unit`／`test_smoke`。

  驗證：第 6 節的每個指令都可以在上游的 `DEVELOPING.md` 找到。

## 5. README 與整體驗證

- [ ] 5.1 更新 `README.md` 命名規則：在固定檔名清單加入選用的 `GLOSSARY.md` 與 `code_notes_<語言>.md`，並在目錄結構的範例樹加上這兩個檔案；驗證 README 其他段落不變
- [ ] 5.2 檢查 repo 內本 change 新增或修改的 Markdown 相對連結；驗證沒有失效連結
- [ ] 5.3 依三份 delta spec 的每個 Scenario 逐條核對；執行 `openspec validate refine-graphrag-deck-and-add-code-notes --strict`，驗證通過
- [ ] 5.4 顯示 diff 摘要給使用者確認後，以英文 conventional commit 提交，並推送到 `claude/nice-knuth-5v7f3y`

## Workflow follow-up

- 使用者確認後開 PR，以 squash 合併到 main。
- 合併後執行 `/opsx:archive`，讓 `talk-ready-slides`、`paper-code-notes`、`paper-term-glossary` 成為 `openspec/specs/` 的正式規格。
- 若 `archive-contest-and-document-survey-directions` 先合併，apply 前先把分支 rebase 到最新 main，再處理 `README.md`、`GLOSSARY-MAP.md` 的衝突。
