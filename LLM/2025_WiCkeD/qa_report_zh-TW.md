# QA report（繁體中文版）— WiCkeD: A Simple Method to Make Multiple Choice Benchmarks More Challenging (ACL 2025, arXiv:2502.18316)

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 原始論文：`paper.pdf`（同資料夾）
- 論文類型：methods（problem-to-solution）
- 投影片數：12；內嵌圖片：3；講者備註：12 頁
- 產生工具：python-pptx（原生文字框、表格與圖表）；字型：Microsoft JhengHei（中文）＋ Calibri（英數）

## 自我審查與修正

第一版產生後以 LibreOffice headless 轉 PDF 渲染全部投影片，逐頁檢查後修正：

- 標題過長換行（以字寬估算自動檢查）→ 縮短標題；共用函式在仍會換行時降為 24pt
- 多行文字在方框內對齊不一致 → 共用函式改為每行獨立段落
- 圖形繼承佈景主題陰影 → 移除 shape style
- 版面下半部留白過多、圖說與重點帶重疊 → 調整字級、間距或改為上下堆疊版面
- 數字與原文逐筆比對；與原文正文不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- 原文摘要寫平均降幅 12.1 分，Table 1 為 12.2；投影片採表格數值並在講者備註說明。
- §5.1 文字所述落後幅度（13%、8%、9.5%、5.3%）與 Table 1 直接相減（約 12.1、8.0、9.4、5.1 分）略有差異；投影片以表格相減值為準。
- Figure 3 未定義「Reversed Corrects」方向，且 instruct 模型比例（21.7%）高於 base（18.0%），與正文解讀不易對應；投影片照實列出數字並保留解讀。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 8（詳見 `pptx_audit_zh-TW.md`）
- low 類別：alignment_near_miss（多為刻意對齊至不同參考線所致，不影響閱讀）
- 另以 python-pptx 重新開啟檔案，確認所有形狀皆位於投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，改以文泉驛正黑替代；在 PowerPoint 中字寬可能略有差異，已預留邊距。
- 原始圖片中的英文小字維持原樣，未翻譯。
