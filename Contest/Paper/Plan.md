# iRent 智能車況管家｜Paper Survey Plan

2026 和泰 AI 黑客松「題目 05：運用 AI 打造 iRent 智能車況管家」的文獻調查計畫。用語依 [`../iRent/GLOSSARY.md`](../iRent/GLOSSARY.md)，第一輪調查結果見 [`../iRent/paper_survey.md`](../iRent/paper_survey.md)。

> 建立：2026/10/08｜狀態：Phase 1 進行中｜決策來源：grilling 第 1–3 輪（見 §8）

## 1. 目的與兩階段

| 階段 | 期限 | 目的 | 產出 |
|---|---|---|---|
| **Phase 1｜服務初賽** | **10/11（六）前** | 為 10/14 13:00 初賽提案提供引用與架構佐證；據此定案 Q4（主要使用者）與 Q5（AI 架構） | Tier 2 單頁筆記、`references.md` 引用清單、架構佐證摘要 |
| **Phase 2｜服務決賽** | 10/15 起，11/18 前 | 深讀核心論文，支撐決賽 Prototype 與 30 頁最終提案 | Tier 1 完整 `qa_report.md` 與 zh-TW 精讀簡報（`nature-paper2ppt`） |

Phase 1 的唯一驗收標準：**10/11 開始寫簡報時，每一個技術主張都有可引用的來源。**

## 2. 調查方向（對應題目三環節）

| 方向 | 對應環節 | 要回答的問題 | 簡報用途 |
|---|---|---|---|
| **A. 即時防呆：照片品質／視角／車牌** | 一 | 手機端能否在 1 秒內判斷模糊、角度、距離、車牌並引導重拍？ | AI 應用方法、可行性 |
| **B. 車損偵測** | 二 | 有哪些公開資料集與模型可預訓練？小凹痕等難點的準確度如何？ | AI 應用方法、可行性 |
| **C. 取還車變化比對（核心）** | 二 | 如何只對「新車損」預警？如何容忍視角與光線差異？ | 獨特優勢與差異化（ADR 0001） |
| **D. 車內整潔** | 二 | 「乾淨／普通／髒汙」三級與遺留物能做到多準？ | AI 應用方法、加值功能 |
| **E. VLM 判讀** | 二、三 | Gemini 類模型適合扮演什麼角色？限制（幻覺、定損）在哪？ | AI 應用方法、風險控管 |
| **F. 開放詞彙偵測** | 二 | 能否不靠大量標註快速做出原型（垃圾、杯子、污漬）？ | Prototype 技術選型 |
| **G. 產業案例** | 全 | 現有 AI 車損系統踩過什麼坑？ | 痛點分析、差異化（雙邊信任） |

## 3. 論文清單與分級

**分級規則：** Tier 1＝Phase 2 完整精讀（PDF＋`qa_report.md`＋精讀簡報）；Tier 2＝Phase 1 單頁筆記；Tier 3＝僅列入引用清單。Tier 1 論文在 Phase 1 也先寫 Tier 2 筆記。

### Tier 1｜核心 5 篇（Phase 1 寫筆記，Phase 2 精讀）

| # | 方向 | 論文 | 連結 | 為什麼是核心 |
|---|---|---|---|---|
| 1 | B | CarDD: A New Dataset for Vision-Based Car Damage Detection（IEEE T-ITS 2023） | [arXiv 2211.00945](https://arxiv.org/abs/2211.00945)｜[專案](https://cardd-ustc.github.io) | 車損預訓練的主要公開資料集（4,000 張、6 類） |
| 2 | C | The Change You Want to See（WACV 2023） | [arXiv 2209.14341](https://arxiv.org/abs/2209.14341) | 取還車比對的方法基礎：物件級變化偵測，可容忍視角與光線差異 |
| 3 | C | AnomalyGPT（AAAI 2024） | [arXiv 2308.15366](https://arxiv.org/abs/2308.15366) | 「取車照＝正常參考圖」的一張參考異常偵測 |
| 4 | E | Harnessing GPT-4V(ision) for Insurance | [arXiv 2404.09690](https://arxiv.org/abs/2404.09690) | VLM 在車險定損的能力與限制，支撐「AI 不單獨收費」 |
| 5 | D | Architecture for determining the cleanliness in shared vehicles（J. Big Data 2023） | [Springer](https://link.springer.com/article/10.1186/s40537-023-00696-6) | 共享車內整潔判讀：EfficientDet 遺留物偵測，mAP 0.87 |

### Tier 2｜Phase 1 單頁筆記 7 篇

| # | 方向 | 論文 | 連結 |
|---|---|---|---|
| 6 | A | Predictive Quality Assessment for Mobile Secure Graphics（2025）：輕量模型即時篩選可用影格 | [arXiv 2509.20028](https://arxiv.org/abs/2509.20028) |
| 7 | A | Open-Source Framework for Quality-Assured Smartphone Capture（2025）：手機端即時構圖與清晰度回饋（MobileNetV3） | [arXiv 2512.15548](https://arxiv.org/abs/2512.15548) |
| 8 | B | Small Dents, Big Impact（2025）：小凹痕偵測資料集與 YOLOv8 方法 | [arXiv 2508.15431](https://arxiv.org/abs/2508.15431) |
| 9 | C | LightGlue（ICCV 2023）：取還車同視角照片對齊 | [arXiv 2306.13643](https://arxiv.org/abs/2306.13643)｜[GitHub](https://github.com/cvg/LightGlue) |
| 10 | D | Classification of Trash and Valuables with Machine Vision in Shared Cars（Applied Sciences 2022） | [MDPI](https://www.mdpi.com/2076-3417/12/11/5695) |
| 11 | D／F | Scalable Object Detection in the Car Interior With Vision Foundation Models（2025） | [arXiv 2508.19651](https://arxiv.org/abs/2508.19651) |
| 12 | F | Grounding DINO（ECCV 2024） | [arXiv 2303.05499](https://arxiv.org/abs/2303.05499) |

### Tier 3｜引用清單

| 方向 | 論文／來源 | 連結 |
|---|---|---|
| A | Lightweight patch-wise features for blur image classification ⚠ 待查證出處 | [Academia](https://www.academia.edu/108185192/Patch_wise_Features_for_Blur_Image_Classification) |
| A | CCNY 穿戴相機即時模糊濾除（BIBM 2013） | [PDF](https://media-lab.ccny.cuny.edu/YLTCCNYHomepage/Publications/BIBM13_Paper322_Blur.pdf) |
| A | PrISM-IQA: Image Quality Assessment for Smartphone Photography ⚠ arXiv 編號待查證 | [arXiv 2606.31626](https://arxiv.org/abs/2606.31626) |
| A | Fang et al., Perceptual Quality Assessment of Smartphone Photography（CVPR 2020） | 待補連結 |
| A | 車輛視角分類（VeRi-776 8 視角；前／後／側 5 類方案） | [arXiv 2305.15764](https://arxiv.org/abs/2305.15764) |
| B | VehiDE（KSE 2023；J. Inf. Telecommun. 2025） | [DOI](https://doi.org/10.1080/24751839.2024.2367387) |
| C | The Change You Want to See (now in 3D)（ICCV 2023） | 待補連結 |
| C | WinCLIP（CVPR 2023） | [arXiv 2303.14814](https://arxiv.org/abs/2303.14814) |
| D | Dixe et al., In-car Damage Dirt and Stain Estimation with RGB Images（2021） | [SciTePress](https://www.scitepress.org/Papers/2021/102280/) |
| D | Aalto AntiTrash 碩論（2021） | [PDF](https://www.aalto.fi/sites/default/files/2021-04/Detecting%20trash%20and%20valuables%20with%20machine%20vision%20in%20passenger%20vehicles%20Nilusha%20Jayawickrama.pdf) |
| D | Bosch 專利 US11334985B2 共享車清潔度偵測 | [Google Patents](https://patents.google.com/patent/US11334985) |
| E | The Dawn of LMMs（GPT-4V）§9.4 車損評估 | [arXiv 2309.17421](https://arxiv.org/abs/2309.17421) |
| E | Gemini vs GPT-4V §10.3 車險報告 | [arXiv 2312.15011](https://arxiv.org/abs/2312.15011) |
| E | Benchmarking Large and Small MLLMs（車損案例） | [arXiv 2501.04150](https://arxiv.org/abs/2501.04150) |
| F | Grounded SAM | [arXiv 2401.14159](https://arxiv.org/abs/2401.14159) |
| G | Hertz × UVeye AI 車損掃描爭議 ⚠ 時間軸待查證 | [The Autopian](https://www.theautopian.com/customers-outraged-with-hertz-ai-scanners-they-say-automatically-charge-for-questionable-damages/)｜[SAN](https://san.com/cc/how-do-hertzs-ai-damage-scans-work-a-congresswoman-wants-to-know/) |

### 已知缺口

- **A 方向：** 沒有找到專門針對「車輛拍照引導」的論文，最接近的是虹膜與防偽圖案的即時拍攝回饋（#6、#7）。簡報應寫成「將已驗證的即時品質閘門方法遷移到車輛拍照場景」，而非宣稱已有現成方案。
- **D 方向：** 目前沒有找到用 VLM 判定車內整潔等級的研究，既有研究以 CNN 偵測遺留物為主，且「如何把偵測結果轉成單一整潔等級」被列為未來工作。這正是本案可主張的創新點：**偵測模型＋VLM 評分規則**產出三級整潔等級。

## 4. 產出規格與目錄

```
Contest/Paper/
├── Plan.md                 ← 本文件
├── references.md           ← Phase 1 產出：依簡報章節整理的引用清單
├── papers/                 ← PDF，命名：{年份}_{簡稱}_{arXiv或來源}.pdf
└── notes/{年份}_{簡稱}/
    ├── note.md             ← Tier 1–2：單頁筆記（Phase 1）
    ├── qa_report.md        ← Tier 1：精讀報告（Phase 2）
    └── final_presentation_zh_tw.pptx  ← Tier 1：精讀簡報（Phase 2，nature-paper2ppt）
```

**單頁筆記 `note.md` 模板（Phase 1，每篇 ≤ 1 頁）：**

```md
# {論文標題}（{會議/期刊 年份}）
- 方向：A–G｜Tier：1/2｜負責人：
- 連結：
## 解決什麼問題（1–2 句）
## 方法重點（3 點內）
## 關鍵數字（資料集規模、準確率、速度；註明條件）
## 限制與風險
## 對 iRent 的用法（對應哪個環節、放進架構哪一層）
## 簡報引用位置（七大架構中的哪一章、一句可直接貼上的引用）
```

## 5. 分工（依 Q2 角色）

| 角色 | 負責方向 | Phase 1 筆記（篇號） |
|---|---|---|
| A｜AI／模型 | B、C | #1 CarDD、#2 CYWS、#3 AnomalyGPT、#8 Small Dents |
| B｜系統架構與原型 | A（手機端）、C 對齊、F | #6 品質閘門、#7 即時拍攝回饋、#9 LightGlue、#12 Grounding DINO |
| C｜服務設計與 UX | D、G | #5 共享車整潔架構、#10 垃圾與遺留物、#11 車內 VFM 偵測、Hertz 案例整理 |
| D｜商業效益與簡報 | E、G | #4 GPT-4V 保險、Tier 3 E 方向摘要、`references.md` 彙整 |

## 6. 時程

| 日期 | 工作 | 完成標準 |
|---|---|---|
| 10/08（四） | Plan 定案；下載 Tier 1–2 PDF 至 `papers/` | 12 篇 PDF 或連結就位 |
| 10/09（五） | 各自完成 Phase 1 筆記 | 每人 3–4 篇 `note.md` |
| 10/10（六） | 綜整會議：定案 Q4、Q5；畫系統架構圖；D 彙整 `references.md` | Q4、Q5 寫入 `../iRent/DECISIONS.md`；架構圖每一層都有引用 |
| 10/11（日） | 引用清單凍結，開始撰寫 15 頁簡報 | `references.md` 定稿 |
| 10/15 起 | Phase 2：Tier 1 五篇精讀簡報，支援決賽 Prototype | 11/07 工作坊前完成 |

## 7. 與提案簡報的對應

| 初賽七大架構 | 主要引用 |
|---|---|
| 目標對象與痛點分析 | G（Hertz 案例）、#5、#10 |
| 解決方案設計 | ADR 0001、#2、#9 |
| AI 應用方法 | #1、#3、#4、#6、#7、#11、#12 |
| 獨特優勢與差異化 | #2、#3（取還車比對）、D 方向缺口（整潔等級）、G（AI 不單獨收費） |
| 預期效益與落地評估 | #1、#5 的實測數字作為準確度假設依據 |
| 補充資料 | `references.md` 全列 |

## 8. 決策紀錄

| 決策 | 內容 |
|---|---|
| Survey 目的 | 兩階段：Phase 1 服務初賽（10/11 前），Phase 2 服務決賽 |
| 補強搜尋 | A、D 兩方向已補搜（新增 #5、#6、#7、#10、#11） |
| 分級 | Tier 1 五篇完整精讀、Tier 2 單頁筆記、Tier 3 僅引用 |
| 目錄 | 沿用 repo 慣例 `papers/` + `notes/{paper}/` |
| 分工與時程 | 依角色暫定（§5、§6），待團隊確認 |
