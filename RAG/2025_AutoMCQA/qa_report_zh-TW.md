# QA report（繁體中文版）— Automated MCQA Benchmarking at Scale: Evaluating Reasoning Traces as Retrieval Sources for Domain Adaptation of Small Language Models（SC'25, arXiv:2509.10744v1）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 原始論文：`paper.pdf`（同資料夾）
- 論文類型：resource（workflow-to-validation）
- 投影片數：13；內嵌圖片：3；講者備註：13 頁
- 產生工具：python-pptx（原生文字框、表格與圖表）；字型：Microsoft JhengHei（中文）＋ Calibri（英數）

## 自我審查與修正

第一版產生後以 LibreOffice headless 轉 PDF 渲染全部投影片，逐頁檢查後修正：

- 標題過長換行（以字寬估算自動檢查）→ 縮短標題；共用函式在仍會換行時降為 24pt
- 多行文字在方框內對齊不一致 → 共用函式改為每行獨立段落
- 圖形繼承佈景主題陰影 → 移除 shape style
- 版面下半部留白過多、圖說與重點帶重疊 → 調整字級、間距或改為上下堆疊版面
- 數字與原文逐筆比對；與原文正文不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- 引言稱推理軌跡檢索在 ASTRO 上「所有模型」皆最佳，但 Table 3（全部 335 題）中 Llama-3-8B 與 Llama-3.1-8B 以 RAG-Chunks 最佳，且 Llama-3-8B 的 RT（54.2%）低於 Baseline（66.5%）；投影片 slide 10、12 明確指出。
- 貢獻段寫 16,679 題，其餘皆為 16,680 題。
- §3.1.2 稱 TinyLlama 依模式為 71%–71.5%，Table 2 為 71.0 / 69.9 / 58.1%；投影片以表格為準。
- 論文聲稱小模型超越 GPT-4，但未列出 GPT-4 的分數（僅引用文獻 [5]），投影片未重述此比較。
- 論文無獨立 Limitations 段落；slide 12 為報告者整理並已標示。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 10（詳見 `pptx_audit_zh-TW.md`）
- low 類別：alignment_near_miss（多為刻意對齊至不同參考線所致，不影響閱讀）
- 另以 python-pptx 重新開啟檔案，確認所有形狀皆位於投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，改以文泉驛正黑替代；在 PowerPoint 中字寬可能略有差異，已預留邊距。
- 原始圖片中的英文小字維持原樣，未翻譯。
