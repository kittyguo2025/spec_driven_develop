# Task Breakdown

## Overview

- **Project**: 城建建筑档案管理系统
- **Total Phases**: 6
- **Total Tasks**: 43
- **Estimated Total Effort**: XL（绿地项目，含完整契约层）
- **Tracking Mode**: LOCAL_ONLY

## S.U.P.E.R Design Constraints

- **S**: 每模块单一职责；ingest 拆为 upload / scan / persist
- **U**: 依赖单向向内；domain-core 零基础设施依赖
- **P**: **所有实现任务依赖契约任务完成**；JSON Schema + OpenAPI 为先
- **E**: 配置经 env 注入；私有云组件可替换
- **R**: 存储/检索/语言实现可换，契约不变

## Testing and Governance Constraints

- 行为/API/schema 变更必须更新契约测试或单元测试
- 纯文档契约任务：运行 AJV/OpenAPI lint 作为验证
-  durable 规则写入 `project-agents-template.md` 或 Cursor 原生记忆

---

## Phase 1: 契约与治理基础

**Goal**: 建立 AI 边界、RBAC、审计契约及项目骨架  
**Prerequisite**: Phase 2 意图确认完成  
**S.U.P.E.R Focus**: P, S — 契约真相源与模块边界

| # | Task | Priority | Effort | Depends On | Lane | S.U.P.E.R | Test Expectation | Memory Impact | Acceptance Criteria |
|:--|:-----|:---------|:-------|:-----------|:-----|:----------|:-----------------|:--------------|:--------------------|
| T1.1 | 完善 `ai-agent-boundaries.md` 与 HITL 契约 | P0 | S | — | A | P | N/A: docs; peer review | 记录于 MASTER governance | 含 Hard Deny 12 条 + PR checklist |
| T1.2 | 编写 `glossary.md`（对齐 DA/T 58-2014） | P0 | M | — | B | P, S | N/A: 术语对照表评审 | None | 覆盖案卷/件/全宗/四性等 ≥30 术语 |
| T1.3 | 编写 `requirements.md` 功能与非功能需求 | P0 | M | T1.2 | B | S | N/A: 需求评审 | None | 四类角色场景完整 |
| T1.4 | 编写 `rbac-matrix.yaml` | P0 | M | T1.3 | A | P, U | 契约测试 fixture | Update project-agents | 4 角色 × 资源 × CRUD 矩阵 |
| T1.5 | 编写 `audit-log.schema.json` | P0 | S | — | A | P | AJV 校验通过 | None | INSERT-only 字段定义 |
| T1.6 | 建立契约校验 CI（AJV + Spectral） | P0 | M | T1.5 | C | P, E | CI 脚本可运行 | Record validate cmd | `npm run validate-schemas` 绿 |
| T1.7 | 业务仓库目录骨架与 `project-agents-template` 落地 | P0 | S | T1.1 | C | E, R | 目录 lint | Copy to AGENTS when bootstrap | backend/ frontend/ docs/contracts/ 结构 |
| T1.8 | 编写 `compliance-non-negotiables.md` 评审定稿 | P0 | S | T1.1 | A | P | 档案专家签字评审 | None | 8 条红线不可删 |

### Parallel Lanes

| Lane | Tasks | Effort | Merge Risk | Key Files |
|:-----|:------|:-------|:-----------|:----------|
| A | T1.1, T1.4, T1.5, T1.8 | M | Low | governance/* |
| B | T1.2, T1.3 | M | Low | domain/glossary, requirements |
| C | T1.6, T1.7 | M | Low | scripts/, 目录结构 |

---

## Phase 2: 领域 Schema 与合规映射

**Goal**: 完成全部领域 JSON Schema 与国标映射  
**Prerequisite**: Phase 1 完成  
**S.U.P.E.R Focus**: P — 接口契约先于实现

| # | Task | Priority | Effort | Depends On | Lane | S.U.P.E.R | Test Expectation | Memory Impact | Acceptance Criteria |
|:--|:-----|:---------|:-------|:-----------|:-----|:----------|:-----------------|:--------------|:--------------------|
| T2.1 | `compliance-mapping.md`（4 份国标逐条映射） | P0 | L | T1.2, T1.3 | A | P | 映射表评审 | None | 每条国标 ≥1 系统落点 |
| T2.2 | `metadata-dictionary.json` 著录字段字典 | P0 | L | T2.1 | A | P | AJV + 字段覆盖率测试 | None | 覆盖 DA/T 18 必填项 |
| T2.3 | `classification-table.json` 分类编码表 | P0 | M | T2.1 | B | P | Schema 校验 | None | 支持版本号字段 |
| T2.4 | `state-machines.yaml` 档案/审批状态机 | P0 | M | T1.4 | B | U, P | 状态机单元测试 | None | 含领导审批节点 |
| T2.5 | `project.schema.json` + `building.schema.json` | P0 | M | T2.2 | A | P | AJV fixture | None | 对齐 GB/T 50328 工程级字段 |
| T2.6 | `archive-volume.schema.json` + `archive-item.schema.json` | P0 | M | T2.2 | A | P | AJV fixture | None | 案卷/件层级完整 |
| T2.7 | `digital-asset.schema.json` + `electronic-package.schema.json` | P0 | L | T2.1 | C | P | MIME/哈希 fixture | None | 含 BIM/CAD/扫描件 |
| T2.8 | `da-t70-checklist.yaml` + `integrity-check.schema.json` | P0 | L | T2.1 | C | P | 检测项数量锁定测试 | None | 四性检测项完整 |
| T2.9 | `storage/database-schema.sql` + `blob-layout.md` | P0 | M | T2.5 | B | P, E | SQL migrate dry-run | None | 含 branch_org_id 多租户 |

### Parallel Lanes

| Lane | Tasks | Effort | Merge Risk | Key Files |
|:-----|:------|:-------|:-----------|:----------|
| A | T2.1, T2.2, T2.5, T2.6 | L | Medium | domain/, schemas/ |
| B | T2.3, T2.4, T2.9 | M | Low | classification, state-machines, storage/ |
| C | T2.7, T2.8 | L | Low | digital-asset, da-t70 |

---

## Phase 3: 私有云基础设施与领域核心

**Goal**: Docker 私有云栈 + 纯领域逻辑实现  
**Prerequisite**: Phase 2 schemas 定稿  
**S.U.P.E.R Focus**: U, E — 领域内核零外部依赖

| # | Task | Priority | Effort | Depends On | Lane | S.U.P.E.R | Test Expectation | Memory Impact | Acceptance Criteria |
|:--|:-----|:---------|:-------|:-----------|:-----|:----------|:-----------------|:--------------|:--------------------|
| T3.1 | Docker Compose：PG + MinIO + ES + Redis | P0 | M | T2.9 | A | E, R | compose up 健康检查 | Record dev cmd | 全部服务 healthy |
| T3.2 | DB migration 执行与租户表结构 | P0 | M | T3.1, T2.9 | A | P | migration 测试 | None | group/branch/fonds 表就绪 |
| T3.3 | `domain-core` 著录校验实现 | P0 | L | T2.2, T2.6 | B | S, U, P | 单元测试 ≥90% 核心路径 | None | 违反 DA/T 18 返回明确错误 |
| T3.4 | `domain-core` 状态机实现 | P0 | M | T2.4, T3.3 | B | U, P | 状态转换测试全覆盖 | None | 非法转换拒绝 |
| T3.5 | `domain-core` 保管期限计算 | P1 | S | T2.5, T3.3 | B | S | 单元测试 | None | 对齐 GB/T 50328 期限表 |
| T3.6 | `storage-adapters` PG repository | P0 | M | T3.2 | A | P, R | 集成测试 Testcontainers | None | CRUD 符合 schema |
| T3.7 | `storage-adapters` MinIO adapter | P0 | M | T3.1, T2.9 | C | P, R | 上传/download 集成测试 | None | 路径符合 blob-layout |
| T3.8 | `audit-service` INSERT-only 实现 | P0 | M | T1.5, T3.6 | C | S, P | 验证无 UPDATE/DELETE API | Update project-agents | 触发器 + 服务层双保险 |

### Parallel Lanes

| Lane | Tasks | Effort | Merge Risk | Key Files |
|:-----|:------|:-------|:-----------|:----------|
| A | T3.1, T3.2, T3.6 | M | Medium | docker/, migrations/ |
| B | T3.3, T3.4, T3.5 | L | Low | domain-core/ |
| C | T3.7, T3.8 | M | Low | adapters/, audit-service/ |

---

## Phase 4: 入库检测与档案服务

**Goal**: 四性检测流水线 + 档案 CRUD/检索  
**Prerequisite**: Phase 3  
**S.U.P.E.R Focus**: S, P — ingest 拆分

| # | Task | Priority | Effort | Depends On | Lane | S.U.P.E.R | Test Expectation | Memory Impact | Acceptance Criteria |
|:--|:-----|:---------|:-------|:-----------|:-----|:----------|:-----------------|:--------------|:--------------------|
| T4.1 | `integrity-check` 检测编排器 | P0 | L | T2.8, T3.3 | A | S, P | 四性分项测试 | None | 失败阻断入库 |
| T4.2 | upload 子模块：分片上传 API | P0 | L | T3.7 | B | S, P | 大文件上传测试 | None | 支持 CAD/BIM 大文件 |
| T4.3 | scan 子模块：病毒/格式校验 adapter | P0 | M | T4.2 | B | R | 恶意样本拦截测试 | None | 白名单 MIME |
| T4.4 | persist 子模块：检测门禁入库 | P0 | M | T4.1, T4.3, T3.8 | A | U, P | 端到端 ingest 测试 | None | 未检测不可 archived |
| T4.5 | `archive-service` 案卷/文件 CRUD | P0 | L | T3.3, T3.6, T3.8 | C | P | CRUD + 逻辑删除测试 | None | 无物理 DELETE |
| T4.6 | `archive-service` 全文检索 | P1 | M | T3.1, T4.5 | C | R | 检索集成测试 | None | 分公司隔离过滤 |
| T4.7 | 竣工电子包 `electronic-package` 解析入库 | P1 | L | T2.7, T4.4 | A | S | 样本包测试 | None | GB/T 50328 目录校验 |
| T4.8 | 批量导出（Excel + 文件包） | P2 | M | T4.5 | C | P | 导出契约测试 | None | 导出含审计记录 |

### Parallel Lanes

| Lane | Tasks | Effort | Merge Risk | Key Files |
|:-----|:------|:-------|:-----------|:----------|
| A | T4.1, T4.4, T4.7 | L | Medium | integrity-check/, ingest/ |
| B | T4.2, T4.3 | L | Low | ingest/upload, ingest/scan |
| C | T4.5, T4.6, T4.8 | L | Medium | archive-service/ |

---

## Phase 5: 身份、审批与 API

**Goal**: RBAC、审批流、OpenAPI 完整实现  
**Prerequisite**: Phase 4  
**S.U.P.E.R Focus**: U, P

| # | Task | Priority | Effort | Depends On | Lane | S.U.P.E.R | Test Expectation | Memory Impact | Acceptance Criteria |
|:--|:-----|:---------|:-------|:-----------|:-----|:----------|:-----------------|:--------------|:--------------------|
| T5.1 | `identity-service` 用户与分公司管理 | P0 | M | T1.4, T3.2 | A | P | RBAC 矩阵全覆盖测试 | None | 4 角色权限正确 |
| T5.2 | 租户中间件：强制 branch_org_id | P0 | M | T5.1 | A | U, P | 越权测试必失败 | Update project-agents | 集团管理员例外 |
| T5.3 | `workflow-service` 借阅审批流 | P0 | M | T2.4, T5.1 | B | U, P | 审批路径测试 | None | 领导节点不可跳过 |
| T5.4 | `workflow-service` 销毁/密级/开放鉴定 | P0 | L | T5.3, T1.8 | B | P | HITL 流程测试 | None | 双人确认 + 审计 |
| T5.5 | `api/openapi.yaml` 完整定稿 | P0 | L | T4.5, T5.3 | C | P | Spectral lint 0 error | None | 全部端点 documented |
| T5.6 | API Gateway / 统一错误与审计切面 | P0 | M | T5.5, T3.8 | C | U | 契约测试 Schemathesis | None | 每个 mutation 写 audit |
| T5.7 | `report-service` 统计报表 API | P1 | M | T4.5, T5.2 | A | S | 只读 API 测试 | None | 分公司范围统计 |

### Parallel Lanes

| Lane | Tasks | Effort | Merge Risk | Key Files |
|:-----|:------|:-------|:-----------|:----------|
| A | T5.1, T5.2, T5.7 | M | Medium | identity-service/ |
| B | T5.3, T5.4 | L | Low | workflow-service/ |
| C | T5.5, T5.6 | L | Medium | api/, middleware/ |

---

## Phase 6: 前端、测试与私有云部署

**Goal**: 双端 UI、契约测试 CI、K8s 生产部署  
**Prerequisite**: Phase 5  
**S.U.P.E.R Focus**: E, R

| # | Task | Priority | Effort | Depends On | Lane | S.U.P.E.R | Test Expectation | Memory Impact | Acceptance Criteria |
|:--|:-----|:---------|:-------|:-----------|:-----|:----------|:-----------------|:--------------|:--------------------|
| T6.1 | `web-admin` 著录与上传 UI | P0 | L | T5.5, T2.2 | A | P | E2E 著录流程 | None | 字段与 dictionary 一致 |
| T6.2 | `web-admin` 检索与案卷浏览 | P0 | M | T4.6, T6.1 | A | P | E2E 检索 | None | 分公司数据隔离 |
| T6.3 | `web-approval` 领导审批端 | P0 | M | T5.3, T5.5 | B | S | E2E 审批 | None | 待办仅本分公司 |
| T6.4 | `web-admin` 管理后台（用户/分类/统计） | P1 | L | T5.1, T5.7 | A | S | E2E 管理 | None | 集团/分公司权限分离 |
| T6.5 | 契约测试套件（OpenAPI + Schema） | P0 | M | T5.5, T1.6 | C | P | CI 全绿 | Record CI cmd | PR 门禁 |
| T6.6 | DA/T 70 合规 fixture 与回归测试 | P0 | M | T4.1, T2.8 | C | P | 合规测试 CI | None | 样本覆盖四性 |
| T6.7 | K8s Helm Chart / 私有云部署文档 | P0 | L | T3.1 | C | E, R | staging 部署 smoke | Update project-agents | 无硬编码 secret |
| T6.8 | 验收测试与合规检查清单 | P0 | M | T6.5, T6.6 | B | P | 手工+自动验收 | None | compliance checklist 全通过 |

### Parallel Lanes

| Lane | Tasks | Effort | Merge Risk | Key Files |
|:-----|:------|:-------|:-----------|:----------|
| A | T6.1, T6.2, T6.4 | XL | Medium | web-admin/ |
| B | T6.3, T6.8 | M | Low | web-approval/, tests/ |
| C | T6.5, T6.6, T6.7 | L | Low | ci/, deploy/ |

---

## Task Index

| ID | Phase | Title |
|:---|:------|:------|
| T1.1–T1.8 | 1 | 治理与契约基础 |
| T2.1–T2.9 | 2 | 领域 Schema |
| T3.1–T3.8 | 3 | 基础设施与领域核心 |
| T4.1–T4.8 | 4 | 入库与档案服务 |
| T5.1–T5.7 | 5 | 身份、审批、API |
| T6.1–T6.8 | 6 | 前端与部署 |
