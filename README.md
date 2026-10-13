# CV-RAG-LLM-Papers

Organize with Paper Survey —— 已讀論文的整理庫。每篇論文保存原文 PDF 與報告用的繁體中文簡報，依**領域**放置、以**標籤**標註跨領域主題。

用語定義見 [GLOSSARY.md](GLOSSARY.md)（各用語脈絡見 [GLOSSARY-MAP.md](GLOSSARY-MAP.md)）；分類方式的決策記錄見 [docs/adr/0001](docs/adr/0001-domain-first-single-home-with-tags.md)（新增 Speech 領域見 [0002](docs/adr/0002-add-speech-domain.md)）。

## 目錄結構

```
CV-RAG-LLM-Papers/
├── CV/                      # 領域：電腦視覺／視覺語言模型
├── Speech/                  # 領域：語音處理（辨識、分離、語音資料集）
├── RAG/                     # 領域：檢索與檢索增強生成
├── LLM/                     # 領域：大型語言模型（生成、評測、提示、訓練）
│   └── <論文ID>/            # 一篇論文一個資料夾
│       ├── paper.pdf
│       ├── slides_zh-TW.pptx          # 主要簡報（繁體中文）
│       ├── slides_zh-CN.pptx          # 選用：簡體中文版
│       ├── slides_deepread_zh-TW.pptx # 選用：精讀簡報
│       ├── qa_report_<語言>.md        # 簡報品質報告
│       ├── pptx_audit_<語言>.md       # 簡報程式化檢查結果
│       ├── asset_manifest.md          # 簡報圖片出處
│       └── assets/figures/            # 從原文擷取的圖
├── Contest/                 # 非論文資料：2026 AI 黑客松競賽情報與 iRent 提案
├── docs/adr/                # 架構決策記錄
├── tools/my-slide/          # open-slide 簡報工作區
├── openspec/                # OpenSpec 設定（工具需放在根目錄）
├── .claude/ · .agents/      # Claude Code 的 skills、plugins 與指令
├── GLOSSARY.md · GLOSSARY-MAP.md
└── skills-lock.json         # 已安裝 skill 的來源紀錄
```

## 分類規則

1. **一篇論文只屬於一個領域**，不在多個資料夾重複放置。
2. **依主要貢獻決定領域**，依序判斷：
   - 輸入含影像或視覺模態，或評測對象是 VLM → `CV`
   - 輸入為語音訊號，或以語音處理為核心（辨識、分離、語音資料集）→ `Speech`
   - 檢索器、檢索來源或 RAG 流程是核心貢獻 → `RAG`
   - 其他（生成、評測、提示、訓練）→ `LLM`
3. **跨領域主題用標籤表示**，一篇可有多個標籤，只記在下方索引，不放進資料夾名稱。

### 標籤

| 標籤 | 意義 |
|---|---|
| `MCQ-Benchmark` | 建置、改造或評估選擇題形式的評測基準 |
| `Distractor-Gen` | 自動生成選擇題的干擾選項 |
| `QA-Synthesis` | 從語料自動合成問答資料 |
| `Retrieval` | 以檢索器或檢索來源本身為研究對象 |
| `LLM-as-Judge` | 以 LLM 擔任評分者或驗證者 |

新增標籤時，請同步更新本表與 [GLOSSARY.md](GLOSSARY.md)。

## 命名規則

- **論文 ID**：`<年份>_<簡稱>`，只用英數字、`-` 與 `_`，例如 `2025_WiCkeD`、`2025_D-GEN`。年份為正式發表或 arXiv 首版年份；會議與 arXiv 編號寫在索引，不寫進 ID。
- **論文資料夾內的檔名**：固定為 `paper.pdf`、`slides_<語言>.pptx`、`slides_deepread_<語言>.pptx`、`qa_report_<語言>.md`、`pptx_audit_<語言>.md`、`asset_manifest.md`、`assets/figures/`。
- **語言代碼**：`zh-TW`（繁體中文，主要版本）、`zh-CN`（簡體中文）。

## 論文索引

| ID | 標題 | 會議／來源 | 標籤 | 簡報 |
|---|---|---|---|---|
| [CV/2024_RightThisWay](CV/2024_RightThisWay/) | Right this way: Can VLMs Guide Us to See More to Answer Questions? | NeurIPS 2024 · arXiv:2411.00394 | `MCQ-Benchmark` `QA-Synthesis` | [zh-TW](CV/2024_RightThisWay/slides_zh-TW.pptx) |
| [CV/2024_UncertaintyVLM](CV/2024_UncertaintyVLM/) | Uncertainty-Aware Evaluation for Vision-Language Models | arXiv:2402.14418 | `MCQ-Benchmark` | [zh-TW](CV/2024_UncertaintyVLM/slides_zh-TW.pptx) |
| [CV/2025_AutoConverter](CV/2025_AutoConverter/) | Automated Generation of Challenging Multiple-Choice Questions for Vision Language Model Evaluation | arXiv:2501.03225 | `MCQ-Benchmark` `Distractor-Gen` `LLM-as-Judge` | [zh-TW](CV/2025_AutoConverter/slides_zh-TW.pptx) |
| [LLM/2025_COLING-MCQGen](LLM/2025_COLING-MCQGen/) | Automatic Multiple-Choice Question Generation and Evaluation Systems Based on LLM: A Study Case With University Resolutions | COLING 2025 | `MCQ-Benchmark` `Distractor-Gen` `QA-Synthesis` `LLM-as-Judge` | [zh-TW](LLM/2025_COLING-MCQGen/slides_zh-TW.pptx) |
| [LLM/2025_D-GEN](LLM/2025_D-GEN/) | D-GEN: Automatic Distractor Generation and Evaluation for Reliable Assessment of Generative Models | arXiv:2504.13439 | `Distractor-Gen` `LLM-as-Judge` | [zh-TW](LLM/2025_D-GEN/slides_zh-TW.pptx) |
| [LLM/2025_WiCkeD](LLM/2025_WiCkeD/) | WiCkeD: A Simple Method to Make Multiple Choice Benchmarks More Challenging | ACL 2025 · arXiv:2502.18316 | `MCQ-Benchmark` | [zh-TW](LLM/2025_WiCkeD/slides_zh-TW.pptx) |
| [RAG/2024_RAGChecker](RAG/2024_RAGChecker/) | RAGChecker: A Fine-grained Framework for Diagnosing Retrieval-Augmented Generation | arXiv:2408.08067 | `Retrieval` `LLM-as-Judge` | [zh-TW](RAG/2024_RAGChecker/slides_zh-TW.pptx) |
| [RAG/2025_AutoMCQA](RAG/2025_AutoMCQA/) | Automated MCQA Benchmarking at Scale: Evaluating Reasoning Traces as Retrieval Sources for Domain Adaptation of Small Language Models | SC'25 · arXiv:2509.10744 | `MCQ-Benchmark` `QA-Synthesis` `Retrieval` | [zh-TW](RAG/2025_AutoMCQA/slides_zh-TW.pptx) · [精讀](RAG/2025_AutoMCQA/slides_deepread_zh-TW.pptx) · [zh-CN](RAG/2025_AutoMCQA/slides_zh-CN.pptx) |
| [RAG/2026_HopWeaver](RAG/2026_HopWeaver/) | HopWeaver: Cross-Document Synthesis of High-Quality and Authentic Multi-Hop Questions | ACL 2026 | `QA-Synthesis` `Retrieval` | [zh-TW](RAG/2026_HopWeaver/slides_zh-TW.pptx) · [zh-CN](RAG/2026_HopWeaver/slides_zh-CN.pptx) |
| [RAG/2026_STAIR](RAG/2026_STAIR/) | STAIR (STructure Aware Information Retriever): A novel dataset and LLM based retriever for document structure augmentation | arXiv:2609.03874 | `Retrieval` | [zh-TW](RAG/2026_STAIR/slides_zh-TW.pptx) · [zh-CN](RAG/2026_STAIR/slides_zh-CN.pptx) |
| [Speech/2021_AISHELL-4](Speech/2021_AISHELL-4/) | AISHELL-4: An Open Source Dataset for Speech Enhancement, Separation, Recognition and Speaker Diarization in Conference Scenario | arXiv:2104.03603 | — | [zh-TW](Speech/2021_AISHELL-4/slides_zh-TW.pptx) |
| [Speech/2022_ASCEND](Speech/2022_ASCEND/) | ASCEND: A Spontaneous Chinese-English Dataset for Code-switching in Multi-turn Conversation | LREC 2022 | — | [zh-TW](Speech/2022_ASCEND/slides_zh-TW.pptx) |

## 新增論文的步驟

1. 依[分類規則](#分類規則)決定領域。
2. 依[命名規則](#命名規則)取論文 ID，確認不與既有 ID 重複。
3. 建立 `<領域>/<論文ID>/`，放入 `paper.pdf`。
4. 用 `/nature-paper2ppt` 產出 `slides_zh-TW.pptx`，連同 `qa_report_zh-TW.md`、`pptx_audit_zh-TW.md`、`asset_manifest.md`、`assets/figures/` 放進同一資料夾。
5. 在[論文索引](#論文索引)加一列，依領域、再依 ID 排序；若用到新標籤，同步更新標籤表與 GLOSSARY。

## 非論文資料與工具

- `Contest/`：2026 AI 黑客松（ASUS、和泰）競賽情報與簡報、iRent 提案規劃與文獻調查、會議議程，說明見 [Contest/README.md](Contest/README.md)。這裡的文獻調查為提案服務，不列入上方論文索引。
- `tools/my-slide/`：open-slide 簡報工作區（`npm install` 後以 `npm run dev` 啟動；`node_modules` 不進版控）。
- `openspec/`、`.claude/`、`.agents/`、`skills-lock.json`：Claude Code 的 OpenSpec、skills 與 plugins 設定，須留在根目錄。
