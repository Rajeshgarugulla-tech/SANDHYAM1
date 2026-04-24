# Saadhyam AI: Base Model & Dataset Suggestions

## Current Implementation Model

- Production generation model currently wired: `grok-3-mini` via xAI API (`XAI_MODEL` env configurable).
- Reason for current choice: available API + fast inference for MVP workflows.

## Suggested Base Models by Module (Future)

- **Business Intelligence + Strategy**
  - Primary: `grok-3` (or strongest available Grok reasoning model)
  - Backup: `grok-3-mini`
- **Content Generation (Ads, Reels, WhatsApp, SEO, FAQ)**
  - Primary: `grok-3-mini`
  - Higher-quality mode: `grok-3`
- **Structured Extraction / JSON standardization**
  - Primary: `grok-3-mini` with strict JSON prompts
- **Speech-to-Text**
  - For now: browser speech recognition (Web Speech API)
  - Upgrade: Whisper-large-v3 equivalent hosted STT

## Datasets for Fine-tuning / Evaluation (Legally Available)

### 1) SEO / GEO / AEO
- [Common Crawl](https://commoncrawl.org/) (web-scale text for domain adaptation)
- [BEIR benchmark](https://github.com/beir-cellar/beir) (retrieval quality evaluation)
- [MS MARCO](https://microsoft.github.io/msmarco/) (passage ranking)

### 2) Business Profiles / SMB Context
- [Google Business categories public references](https://developers.google.com/my-business/reference/businessinformation/rest/v1/categories/list)
- Public local business directories with compliant crawling permissions (country-focused)
- Kaggle small-business marketing datasets (for non-sensitive prototyping)

### 3) Reviews / Sentiment
- [Yelp Open Dataset](https://www.yelp.com/dataset)
- [Amazon Reviews (public subsets)](https://nijianmo.github.io/amazon/index.html)
- [Kaggle sentiment datasets](https://www.kaggle.com/)

### 4) Ads + Marketing Copy
- Meta ad library public examples (manual curated, policy-compliant)
- Public landing page corpora from Common Crawl
- In-house anonymized conversion copy dataset (best long-term asset)

### 5) Multilingual Indian Language Support
- [AI4Bharat datasets](https://ai4bharat.org/)
- [IndicCorp / IndicBERT resources](https://github.com/AI4Bharat/IndicBERT)
- [FLORES-200](https://github.com/facebookresearch/flores) for multilingual evaluation

### 6) Speech / Voice
- [Mozilla Common Voice](https://commonvoice.mozilla.org/)
- [OpenSLR corpora](https://www.openslr.org/)
- Indian language speech datasets from AI4Bharat/Indic initiatives

## Recommended Training Strategy

- Phase 1: Prompt engineering + retrieval grounding (no fine-tune).
- Phase 2: SFT on curated Saadhyam JSON outputs (business summary, scores, actions).
- Phase 3: Preference tuning using human feedback from SME consultants.
- Phase 4: Vertical adapters:
  - Clinics
  - Salons
  - Restaurants
  - Gyms
  - Local professional services

## Evaluation Checklist

- JSON validity rate
- Business accuracy score (human-rated)
- Actionability score of daily tasks
- Conversion uplift in pilot cohort
- Regional language naturalness score
- Hallucination/error rate in competitor analysis

