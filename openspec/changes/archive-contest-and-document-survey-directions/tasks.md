# Tasks

## 1. 封存比賽資料

- [ ] 1.1 執行 `git mv Contest archive/2026-contests`，驗證 `git status` 中 46 個檔案全部顯示為 rename（R），且根目錄已無 `Contest/`
- [ ] 1.2 比對搬移前後的檔案雜湊（`git ls-tree` 搬移前 HEAD 的 `Contest` 與工作區的 `archive/2026-contests`），驗證檔案清單與內容完全相同
- [ ] 1.3 新增 `archive/README.md`：列出 `2026-contests/` 的封存日期（2026-11-06）、封存原因（未獲選）、內容摘要、舊路徑 `Contest/` 對應新路徑的說明、連到 `2026-contests/README.md` 的入口，以及一句「其中的車損與車內整潔文獻調查為提案服務，不屬於論文整理庫」；驗證檔案內每個相對連結都指向存在的檔案
- [ ] 1.4 檢查 `archive/2026-contests/` 內所有 Markdown 相對連結，驗證每個連結目標都存在

## 2. 更新根目錄文件的封存連結

- [ ] 2.1 更新 `README.md` 目錄樹：把 `Contest/` 那一行改為 `archive/`（封存區），驗證樹狀圖其他行不變
- [ ] 2.2 更新 `README.md`「非論文資料與工具」段落：把 `Contest/` 項目改為指向 `archive/README.md` 的封存說明，保留「不列入論文索引」的註記；驗證連結可開
- [ ] 2.3 更新 `GLOSSARY-MAP.md`：iRent 脈絡改指 `archive/2026-contests/iRent/GLOSSARY.md` 與其 `docs/adr/`，標示「已封存、不再更新」，並修改 Relationships 中的 `Contest/` 字樣；驗證兩個連結可開
- [ ] 2.4 在封存區以外的 Markdown、YAML、JSON、JS 檔中搜尋 `Contest/`（排除 `openspec/changes/`），驗證結果為零筆

## 3. README 的 Survey 方向

- [ ] 3.1 逐篇讀 12 篇論文的 `qa_report_zh-TW.md`（或簡報摘要頁），確認 design.md D2 表格中各方向的「研究問題」描述與論文內容相符；若發現標籤與內容不符，記錄下來回報使用者，不自行改標籤
- [ ] 3.2 在 `README.md` 的「分類規則」之後、「論文索引」之前新增「Survey 方向」段落：焦點句加上 6 個方向的表格（方向、研究問題、對應標籤、論文 ID 連結）；驗證每個論文 ID 連結都指向存在的資料夾
- [ ] 3.3 核對涵蓋關係：論文索引中的 12 個 ID 每個都至少出現在一個方向，方向表中每個 ID 都存在於索引；用腳本比對兩份 ID 清單，驗證差集為空
- [ ] 3.4 在 README「新增論文的步驟」加入一步：將新論文歸入既有方向，或在無合適方向時新增方向並更新方向表；驗證步驟編號連續
- [ ] 3.5 在 `GLOSSARY.md` 新增「Survey 方向」與「封存區」兩個用語（含 _Avoid_ 行），並在「標籤」定義補一句方向與標籤的關係；驗證格式與既有用語一致、沒有實作細節

## 4. 整體驗證與提交

- [ ] 4.1 檢查 repo 內所有 Markdown（含 `archive/`）的相對連結，驗證沒有失效連結
- [ ] 4.2 依 specs/archive 與 specs/survey-directions 的每個 Scenario 逐條核對，驗證全部成立
- [ ] 4.3 執行 `openspec validate archive-contest-and-document-survey-directions --strict`，驗證通過
- [ ] 4.4 顯示 diff 摘要給使用者確認後，以 conventional commit（英文）提交並推送到指定分支

## Workflow follow-up

- 使用者確認實作結果後，執行 `/opsx:archive` 封存此 change，讓 `archive` 與 `survey-directions` 成為 `openspec/specs/` 中的正式規格。
