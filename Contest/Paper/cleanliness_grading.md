# 整潔分級與說明｜文獻挑選與方法設計

對應簡報 P9「③ 報告：整潔分級與說明」與 P8 架構圖「② 車內整潔＋遺留物」。來源為團隊提供的 Survey.md，所有入選文獻已逐篇查證（2026/10/13）。

## 一、入選文獻

| 編號 | 論文原始名稱 | 發表 | 查證過的關鍵數字 | 在本案的角色 |
|---|---|---|---|---|
| [5] | Architecture for Determining the Cleanliness in Shared Vehicles Using an Integrated Machine Vision and Indoor Air Quality-Monitoring System | Journal of Big Data, 2023 | 自建 1,379 張影像（已公開）；遺留物細分類準確率 89%、垃圾／貴重物品兩類 91%；端到端 65 秒 | **問題定義與研究缺口**：作者將「整合成離散的整潔等級」列為未來工作，本案正好補上 |
| [11] | Scalable Object Detection in the Car Interior With Vision Foundation Models（ODAL） | arXiv 2508.19651, 2025 | 微調 LLaVA 1.5 7B 的 ODAL score 89%，比 baseline 高 71%、比 GPT-4o 高近 20%；幻覺指標 ODAL-SNR 為 GPT-4o 的 3 倍；車端與雲端分工 | **感知層**：先偵測並定位遺留物，再分級；車端＋雲端分工與本案架構一致 |
| [13] | Enhancing Waste Recognition with Vision-Language Models: A Prompt Engineering Approach（Malla, Bazli, Arashpour） | Waste Management, vol. 204, 2025 | 提示詞工程使零樣本垃圾分類準確率由 82.71% 提升到 90.48%；全監督 97.18% | **語意層**：不需大量標註，用評分規則與類別定義的提示詞處理長尾垃圾（飲料杯、餐盒、口罩、紙巾…） |
| [14] | Search-based Testing of Vision Language Models for In-Car Scene Understanding（ISU-Test, Sorokin et al.） | arXiv 2607.02300, 2026 | 以渲染場景＋搜尋式測試找出 VLM 車內場景理解的錯誤，失敗率最高為隨機測試的 10 倍、覆蓋率 3.6 倍 | **驗證層**：上線前針對光線、遮擋、小型垃圾、合法物品誤判做系統性壓力測試 |

## 二、未入選與原因

| 文獻 | 原因 |
|---|---|
| [10] Classification of Trash and Valuables with Machine Vision in Shared Cars（Applied Sciences 2022） | [5] 的前作，保留為背景引用，不另佔篇幅 |
| Systematic review of AI-based waste classification（2025） | 綜述，只適合當資料集來源，不提供分級方法 |
| CBTW 車輛髒污預測案例 | 針對車外、且為廠商案例，不適用車內整潔 |
| Survey.md 範例中的 1–5 級量表 | 題目明定三級（乾淨／普通／髒汙），不採用 |

## 三、建議方法：偵測 → 屬性 → 規則分級 → 說明 → 驗證

| 步驟 | 做什麼 | 依據 |
|---|---|---|
| 1 偵測與定位 | 找出車內物品與污漬並標出位置（前座、後座、地墊、置杯架） | [11]、[12] |
| 2 污染屬性 | 由 Gemini 依提示詞為每個物品標註類型：垃圾、食物或液體污染、表面污漬、遺留物（個人物品） | [13] |
| 3 規則分級 | 依固定規則把屬性聚合成三級，例如：有液體或食物污染，或垃圾 ≥ 2 件 → 髒汙；只有少量灰塵或 1 件小雜物 → 普通；都沒有 → 乾淨 | 補上 [5] 的研究缺口 |
| 4 說明與行動 | 先列證據（物品與位置），再給等級與理由；髒汙時建議「暫停出租並派清潔」 | [11] 的定位優先設計，降低幻覺 |
| 5 驗證 | 以 [5] 公開資料集與團隊實拍照片，針對夜間、遮擋、半透明塑膠袋、合法物品（嬰兒座椅、雨傘）做壓力測試 | [14]、[5] |

## 四、待確認事項

- [5] 公開資料集的授權條款（能否用於試點測試）
- 先前引用的「EfficientDet、mAP 0.87」無法從摘要查證，已改用摘要中的 89%／91%
