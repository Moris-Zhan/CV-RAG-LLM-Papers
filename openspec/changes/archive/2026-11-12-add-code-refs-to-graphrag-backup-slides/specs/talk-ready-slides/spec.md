# Spec Delta

## MODIFIED Requirements

### Requirement: 程式碼識別字只作為對照標籤

簡報中出現的開源實作識別字 SHALL 只出現在三處：方法頁 kicker 的 workflow 與查詢模組標籤、workflow 總覽頁，以及備用頁的「實作對照」窄條與該頁講者備註；實作對照只列模組檔案與 prompt 的檔案和常數名稱。正文頁（封面到結論頁）的正文與講者備註 MUST NOT 出現檔案路徑或 prompt 名稱。全份簡報 MUST NOT 陳述實作行為、預設值，或實作與論文的差異。

#### Scenario: 總覽頁列出 9 個 workflow
- **WHEN** 查看 workflow 總覽頁
- **THEN** 依實作順序列出 9 個 standard workflow；有論文對應的標出論文步驟名稱，`create_final_documents`、`create_final_text_units`、`generate_text_embeddings` 只列名稱，並註明對照版本

#### Scenario: 不出現實作行為
- **WHEN** 掃描所有投影片文字與講者備註
- **THEN** 找不到實作預設值、「預設關閉」「開源實作」等描述，也沒有指向程式碼筆記的句子

#### Scenario: 備用頁的實作對照
- **WHEN** 查看 GraphRAG 簡報第 13–21 頁
- **THEN** 每頁底部都有一條「實作對照」，列出 1–2 個模組檔案與 prompt 的檔案或常數名稱；講者備註列出完整路徑；每個路徑與常數名稱都存在於第 13 頁標示的版本

#### Scenario: 正文不出現路徑與 prompt 名稱
- **WHEN** 掃描正文第 1–12 頁的投影片文字與講者備註
- **THEN** 找不到 `.py` 檔案路徑與 prompt 常數名稱（例如 `GRAPH_EXTRACTION_PROMPT`）
