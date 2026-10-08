# QA report（繁體中文版）— Automatic Multiple-Choice Question Generation and Evaluation Systems Based on LLM: A Study Case With University Resolutions (COLING 2025, pp. 2246–2260)

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 原始論文：`paper.pdf`（同資料夾）
- 論文類型：methods（problem-to-solution）
- 投影片數：14；內嵌圖片：1；講者備註：14 頁
- 產生工具：python-pptx（原生文字框、表格與圖表）；字型：Microsoft JhengHei（中文）＋ Calibri（英數）

## 自我審查與修正

第一版產生後以 LibreOffice headless 轉 PDF 渲染全部投影片，逐頁檢查後修正：

- 標題過長換行（以字寬估算自動檢查）→ 縮短標題；共用函式在仍會換行時降為 24pt
- 多行文字在方框內對齊不一致 → 共用函式改為每行獨立段落
- 圖形繼承佈景主題陰影 → 移除 shape style
- 版面下半部留白過多、圖說與重點帶重疊 → 調整字級、間距或改為上下堆疊版面
- 數字與原文逐筆比對；與原文正文不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- 結論段寫「balanced accuracy 提升約 19 個百分點」，但 Table 3 顯示提升的是有效題比例（75.1→94.4%、72→91%）；投影片以表格為準並在備註說明。
- §2.2 文字列出的模型為「Mixtral 8B」，Table 2 標示為 Mixtral 8x7b；投影片採表格名稱。
- 論文無獨立失敗案例圖；slide 12 的失敗模式整理自 §5.4 討論段文字。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 16（詳見 `pptx_audit_zh-TW.md`）
- low 類別：alignment_near_miss（多為刻意對齊至不同參考線所致，不影響閱讀）
- 另以 python-pptx 重新開啟檔案，確認所有形狀皆位於投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，改以文泉驛正黑替代；在 PowerPoint 中字寬可能略有差異，已預留邊距。
- 原始圖片中的英文小字維持原樣，未翻譯。
