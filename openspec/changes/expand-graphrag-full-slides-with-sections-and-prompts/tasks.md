# Tasks

## 1. 建置

- [x] 1.1 依 design D1、D2 重排方法細節、更新 Fig. 1 標籤對應、交叉引用與 workflow 對照頁頁碼
- [x] 1.2 依 design D3 新增 6 張章節總覽頁，並更新方法總覽頁對應表（使用者後續要求移除，見 4.x）
- [x] 1.3 依 design D4、D5 新增 Algorithm 1 頁與實驗 2 方法頁
- [x] 1.4 依 design D6 新增 4 條「實驗 1 對應」小條
- [x] 1.5 依 design D7 新增 7 頁附錄實作 prompt
- [x] 1.6 依 design D8 改寫單頁目錄，重建簡報並複製到 `RAG/2024_GraphRAG/`

## 2. 驗證

- [x] 2.1 先寫 `verify_full_v2.py`、`verify_coverage_v2.py`、`verify_prompts.py`，在修改前的簡報上確認會失敗，再確認修改後全部通過
- [x] 2.2 Open XML SDK 0 錯誤、整數 EMU 通過、`audit_pptx_quality.py` high = 0、medium = 0
- [x] 2.3 LibreOffice 渲染目錄、所有新頁與改動頁，目視確認無重疊、溢出與換行問題
- [x] 2.4 執行 `openspec validate expand-graphrag-full-slides-with-sections-and-prompts --strict`，逐條核對 Scenario

## 3. 提交

- [x] 3.1 顯示 diff 摘要後，以英文 conventional commit 提交並推送到 `claude/nice-knuth-5v7f3y`

## 4. 修訂：改用 x.y 編號、移除章節總覽頁

- [x] 4.1 依 design D2、D3 改寫 build script：移除 6 張章節總覽頁，方法細節改用 x.y 編號與「Fig. 1 階段 x」標籤，論文本節重點移入 x.1 頁備忘稿
- [x] 4.2 更新目錄、方法總覽對應表、workflow 頁碼欄、交叉引用、實驗 1 小條與附錄 kicker 為 36 頁的配置
- [x] 4.3 撰寫 `verify_full_v3.py`、`verify_coverage_v3.py`，先在 42 頁版本上確認會失敗，再確認新版本全部通過；`verify_prompts.py` 維持通過
- [x] 4.4 Open XML SDK 0 錯誤、整數 EMU 通過、`audit_pptx_quality.py` high = 0、medium = 0；LibreOffice 渲染改動頁目視檢查
- [x] 4.5 `openspec validate --strict` 通過後提交並推送

## Workflow follow-up

- 使用者確認後開 PR，以 squash 合併到 main，之後封存本 change。
