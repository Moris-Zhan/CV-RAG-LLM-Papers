# QA 報告（繁體中文版）— Right this way（NeurIPS 2024, arXiv:2411.00394v1）

## 交付狀態

- 主檔：`slides_zh-TW.pptx`（16:9，繁體中文，含講者備註）
- 論文類型：methods（problem-to-solution），含 resource（Directional Guidance 評測集）
- 投影片數：10；內嵌圖片：4；講者備註：10 頁

## 自我審查與修正

- 以 LibreOffice headless 渲染全部投影片並逐頁檢查
- 投影片 8 原本把 GPT-4o 的「微調」長條以 0 表示，容易誤讀；改為圖中只放三個開源模型，GPT-4o 數字寫在右側文字
- 投影片 3 的重點帶原本觸發 `ai_template_phrase`（「不是……而是……」句型），已改寫
- 數字逐筆對照原文 Table 1–2 與 §4.2、§5.1：評測集 291 + 230 + 300 = 821；方向分布左 38.5%、右 29.6%、下 17.2%、上 14.8%（Figure 3a）

## 與原文不一致或需保留的地方

- 前言稱最佳模型「比 GPT-4o (CoT) 高 3% 正確率」，但 §5.1 寫 GPT-4o 使用單輪提示；Table 1 的 0.63 vs 0.60 與 3% 相符。投影片以表格為準，並在投影片 10 標示此不一致。
- 投影片 8 的「微調」值取「不打亂選項、擾動 0.1–0.9」設定（三個模型在此設定都最佳）。
- Figure 4 微調列（b1–b4）的訓練設定，原文未明確標示。

## 程式化檢查（scripts/audit_pptx_quality.py）

- 最終結果：high = 0、medium = 0、low = 8（詳見 `pptx_audit_zh-TW.md`），皆為對齊微差

## 已知限制

- 預覽以 LibreOffice 渲染，環境中無 Microsoft JhengHei，以替代字型顯示。
- Figure 4 熱圖在投影片尺寸下格內數字偏小；投影片重點是顏色分布與對角線，數字細節請參考原文。
