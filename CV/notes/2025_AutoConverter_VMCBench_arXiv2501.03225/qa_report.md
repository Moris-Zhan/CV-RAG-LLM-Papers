# QA report（繁體中文版）— Automated Generation of Challenging Multiple-Choice Questions for Vision Language Model Evaluation（AutoConverter / VMCBench, arXiv:2501.03225v2）

## 交付狀態

- 主檔：`final_presentation_zh_tw.pptx`（16:9，繁體中文，含講者備註）
- 原始論文：2025_AutoConverter_VMCBench_arXiv2501.03225.pdf
- 論文類型：methods（problem-to-solution），後半含 resource（VMCBench）
- 投影片數：14；內嵌圖片：5；講者備註：14 頁
- 產生工具：python-pptx（原生文字框、表格與圖表）；字型：Microsoft JhengHei（中文）＋ Calibri（英數）

## 自我審查與修正

第一版產生後以 LibreOffice headless 轉 PDF 渲染全部投影片，逐頁檢查後修正：

- 標題過長換行（以字寬估算自動檢查）→ 縮短標題；共用函式在仍會換行時降為 24pt
- 多行文字在方框內對齊不一致 → 共用函式改為每行獨立段落
- 圖形繼承佈景主題陰影 → 移除 shape style
- 版面下半部留白過多、圖說與重點帶重疊 → 調整字級、間距或改為上下堆疊版面
- 數字與原文逐筆比對；與原文正文不一致處以表格為準（見下）

## 與原文不一致或需保留的地方

- PDF 本身未載明發表會議，投影片僅標示 arXiv:2501.03225v2（2025）。
- 附錄 C.1 寫「目前最佳模型 GPT-4o 為 80.6%」，與主文 Table 1（Qwen2-VL-72B 85.0%、GPT-4o 80.3%）不一致；投影片以主表為準並在備註說明。
- §5.2 稱 Phi-3.5 在 MMMU、MathVista 優於 Phi-3；Table 1 四類彙總中 Phi-3.5 的 Reasoning 反而略低（55.3 vs 56.4）。投影片改寫為不與表格矛盾的敘述。
- slide 13「報告者補充」三點為報告者觀點，非論文內容，已明確標示。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 12（詳見 `pptx_audit.md`）
- low 類別：alignment_near_miss（多為刻意對齊至不同參考線所致，不影響閱讀）
- 另以 python-pptx 重新開啟檔案，確認所有形狀皆位於投影片範圍內、每頁皆有講者備註

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，改以文泉驛正黑替代；在 PowerPoint 中字寬可能略有差異，已預留邊距。
- 原始圖片中的英文小字維持原樣，未翻譯。
