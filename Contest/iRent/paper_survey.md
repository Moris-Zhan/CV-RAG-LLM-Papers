# iRent 智能車況管家｜技術文獻與案例 Survey

> 目的：支撐 Q4（主要使用者定位）與 Q5（AI 系統架構）決策。整理於 2026/10/08。
> 完整閱讀計畫、分級與分工見 [`../Paper/Plan.md`](../Paper/Plan.md)。
> 標註「⚠ 待查證」者僅讀到摘要或二手整理，引用前需確認原文。

## 1. 對應題目三環節的技術地圖

| 環節 | 子任務 | 代表文獻／資源 | 對我們的意義 |
|---|---|---|---|
| 一、即時防呆 | 模糊／品質判斷 | Lightweight patch-wise blur features（XGBoost，90.1% vs VGG16 94%）⚠；CCNY 穿戴相機即時模糊濾除（patch 梯度統計 + SVM） | 品質檢查可用輕量特徵或小 CNN 在手機端跑，不必上雲 |
| 一、即時防呆 | 拍攝角度／位置 | 車輛視角分類：前／後／側／前側／後側 5 類即可完整描述（VeRi-776 有 8 視角標註）；多任務 RCNN 視角屬性 > 90% ⚠ | 以 iRent「車外車內照片上傳清單」定義必拍視角，訓練視角分類器檢查「拍對位置」 |
| 一、即時防呆 | 車牌是否入鏡 | 一般車牌偵測（成熟技術） | 作為必要條件檢查之一 |
| 二、新車損 | 車損偵測／分割 | **CarDD**（IEEE T-ITS 2023，4,000 張、9,000+ 實例、6 類：凹痕、刮痕、裂痕、玻璃破、爆胎、燈損）；**VehiDE**（KSE 2023 / JIT 2025，13,945 張、8 類）；YOLOv11-seg 於 CarDD 優於 Mask R-CNN、U-Net、DeepLabV3，並以 Vertex AI 雲端即時推論（Pisa 碩論）⚠；小凹痕難偵測（Small Dents, Big Impact, 2025） | 有公開資料集可預訓練，再用 iRent 有／無索賠照片微調；小凹痕是已知難點，應設信心門檻＋人工覆核 |
| 二、新車損 | **取車 vs 還車比對（歸責）** | **The Change You Want to See**（Sachdeva & Zisserman, WACV 2023）：物件級變化偵測，可容忍視角與光線差異，零樣本泛化；**LightGlue**（ICCV 2023）：快速局部特徵匹配，可對齊同視角照片 | 「新車損」本質是**變化偵測**而非單張偵測：同視角取／還車照片對齊後比對，只有新增的損傷才預警 |
| 二、新車損 | 零／少樣本異常 | **WinCLIP**（CVPR 2023，零樣本異常分類／分割）；**AnomalyGPT**（AAAI 2024，以 1 張正常參考圖做異常偵測，MVTec-AD 影像 AUC 94.1%） | 取車照片天然就是「正常參考圖」，可補足標註資料不足 |
| 二、新車損 | VLM 判讀 | GPT-4V 可定位車損並輸出結構化報告（The Dawn of LMMs §9.4，質性）；Gemini vs GPT-4V 車險案例（2312.15011）；小樣本測試 GPT-4o 13/13（2501.04150）；**但**保險場景定損弱、會幻覺（Harnessing GPT-4V for Insurance, 2404.09690） | VLM 適合做解釋、摘要、第二意見，**不適合單獨作為收費依據** |
| 二、整潔度 | 車內髒汙／污漬 | Dixe et al. 2021：DeepLabV3+ 語意分割 good/damage/stain/dirt，1,861 張、78 台車，各類準確率 58–77%；Bosch 專利 US11334985B2（共享車清潔度偵測）；Aalto AntiTrash：座椅垃圾與遺留物偵測 | 整潔度判讀仍不成熟，三級分類（乾淨／普通／髒汙）宜採「分類模型＋VLM 評分規則」雙軌；**遺留物偵測**可延伸為加值功能 |
| 二、開放詞彙 | 文字指定偵測 | Grounding DINO（ECCV 2024）＋ Grounded SAM：以文字提示偵測與分割任意物件 | 可快速做「垃圾、飲料杯、污漬」等開放類別原型，無需大量標註 |
| 三、營運調度 | 預警與通知 | （以系統設計為主） | 依嚴重度排序工單、派遣清潔或整備，回饋標註再訓練 |

## 2. 產業案例：Hertz × UVeye（2024–）

- 機場站以 AI 掃描器拍攝出車與還車，自動比對差異並**直接寄送車損帳單**，只有顧客申訴時才由人工覆核。
- 顧客抱怨被收取肉眼看不到的細微損傷費用，例如輪圈刮痕 USD 440（含 USD 125 處理費、USD 65 行政費）；有律所展開調查，美國國會議員也提出質詢。
- Hertz 表示超過 97% 的車輛沒有可收費損傷；UVeye 宣稱比人工多找到 5 倍損傷。
- 來源：The Autopian、SAN、CO/AI 報導 ⚠（時間軸待查證）

**啟示：** 偵測率高不等於體驗好。iRent 的方案若要同時解決「營運效率」與「用戶客訴」，必須設計**透明證據、人工確認後才收費、申訴流程**，才不會把營運痛點轉成新的客訴痛點。這正好是本案的差異化切入點。

## 3. 對 Q4／Q5 的建議（待團隊確認）

**Q4 主要使用者：** 以營運人員為主軸（題目明確量化的痛點），但敘事採「**雙邊信任**」：AI 讓營運更快攔截異常，也讓用戶對車況歸責感到公平（取車照片即證據，避免 Hertz 式爭議）。

**Q5 系統架構（三層＋人工）：**
1. **手機端品質閘門（環節一）：** 模糊度／曝光評分、視角分類、車牌偵測，以輕量模型 < 1 秒回饋，不合格就即時引導重拍。
2. **雲端專用模型（環節二）：** 車損分割（CarDD／VehiDE 預訓練＋ iRent 照片微調）；車內整潔三級分類與遺留物偵測。
3. **取還車變化比對（環節二核心）：** 同視角照片以特徵匹配對齊，再做變化偵測（CYWS 類方法）；取車照片當作正常參考圖，只對**新增**損傷預警。
4. **VLM 層（Gemini）：** 產生白話車況說明與工單摘要、依評分規則複核整潔度、提供第二意見；不作為唯一收費依據。
5. **人工把關與回饋：** 達收費等級的異常一律由營運人員確認；確認結果回流成標註資料持續訓練（環節三）。

## 4. 參考連結

- CarDD: https://arxiv.org/abs/2211.00945 ｜ https://cardd-ustc.github.io
- VehiDE（JIT 2025）: https://doi.org/10.1080/24751839.2024.2367387
- Small Dents, Big Impact: https://arxiv.org/abs/2508.15431
- The Change You Want to See: https://arxiv.org/abs/2209.14341
- LightGlue: https://github.com/cvg/LightGlue
- WinCLIP: https://arxiv.org/abs/2303.14814
- AnomalyGPT: https://arxiv.org/abs/2308.15366
- Grounding DINO: https://arxiv.org/abs/2303.05499 ｜ Grounded SAM: https://arxiv.org/abs/2401.14159
- The Dawn of LMMs (GPT-4V): https://arxiv.org/abs/2309.17421
- Gemini vs GPT-4V: https://arxiv.org/abs/2312.15011
- Harnessing GPT-4V for Insurance: https://arxiv.org/abs/2404.09690
- Benchmarking Large and Small MLLMs: https://arxiv.org/abs/2501.04150
- Dixe et al. 2021 In-car Damage Dirt and Stain Estimation: https://www.scitepress.org/Papers/2021/102280/
- Bosch patent US11334985B2: https://patents.google.com/patent/US11334985
- Aalto AntiTrash thesis: https://www.aalto.fi/sites/default/files/2021-04/Detecting%20trash%20and%20valuables%20with%20machine%20vision%20in%20passenger%20vehicles%20Nilusha%20Jayawickrama.pdf
- Hertz × UVeye: https://www.theautopian.com/customers-outraged-with-hertz-ai-scanners-they-say-automatically-charge-for-questionable-damages/ ｜ https://san.com/cc/how-do-hertzs-ai-damage-scans-work-a-congresswoman-wants-to-know/
