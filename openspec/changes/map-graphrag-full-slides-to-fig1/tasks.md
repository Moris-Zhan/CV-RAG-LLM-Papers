# Tasks

## 1. 用詞與文件

- [x] 1.1 `GLOSSARY.md` 新增「完整版簡報」，「精讀簡報」的 _Avoid_ 移除「完整版」，「簡報」補上口語別稱「精簡版」
- [x] 1.2 `README.md` 檔名規則加入完整版簡報保留原檔名；GraphRAG 索引列加「完整版」連結

## 2. 建置

- [x] 2.1 複製 build script 為完整版專用版本，輸出檔名改為 `graph-rag-full-slides_zh-TW.pptx`；依 D2 為方法細節 1–12 加上 Figure 1 階段標籤
- [x] 2.2 依 D3 改寫方法總覽頁右欄為對應表，並補充備忘稿
- [x] 2.3 依 D4 搬移對照頁、新增「方法回顧」目錄分組、更新所有頁碼與目錄行距

## 3. 驗證

- [x] 3.1 依 D5 撰寫並執行 `verify_full.py`，全部通過
- [x] 3.2 Open XML SDK 0 錯誤、整數 EMU 檢查通過、`audit_pptx_quality.py` high = 0、medium = 0
- [x] 3.3 LibreOffice 渲染第 2、5、6–18 頁目視檢查：標籤、對應表、目錄無重疊或溢出
- [x] 3.4 執行 `openspec validate map-graphrag-full-slides-to-fig1 --strict`，逐條核對 Scenario

## 4. 提交

- [ ] 4.1 顯示 diff 摘要後以英文 conventional commit 提交並推送到 `claude/nice-knuth-5v7f3y`
- [ ] 4.2 開 PR 以 squash 合併到 main，之後封存本 change
