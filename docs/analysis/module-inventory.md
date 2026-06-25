# Module Inventory

> **Status**: 绿地项目 — 下表为**规划模块**及目标 S.U.P.E.R 合规状态（实现后复评）。

| Module | Responsibility | Depends On | Est. Files | Complexity | Target S.U.P.E.R |
|:-------|:---------------|:-----------|----------:|:-----------|:-----------------|
| `domain-core` | 档案实体、状态机、著录校验、保管期限 | 契约 schemas | 30–50 | High | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `integrity-check` | DA/T 70 四性检测编排 | domain-core, 检测契约 | 20–30 | High | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `ingest-service` | 上传、分片、扫描、入库门禁 | integrity-check, adapters | 25–40 | High | S🟡 U🟢 P🟢 E🟢 R🟢 |
| `archive-service` | 案卷/文件 CRUD、检索、导出 | domain-core, adapters | 30–45 | High | S🟡 U🟢 P🟢 E🟢 R🟢 |
| `workflow-service` | 借阅/销毁/密级审批 | domain-core, identity | 20–30 | Medium | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `identity-service` | 用户、RBAC、分公司隔离 | 契约 rbac-matrix | 15–25 | Medium | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `audit-service` | 不可变审计日志 | adapters (DB) | 10–15 | Medium | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `report-service` | 统计报表（只读） | archive-service | 10–15 | Low | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `storage-adapters` | PG、MinIO、ES、Redis 适配 | 契约 | 20–30 | Medium | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `web-admin` | 业务/管理 UI | API 契约 | 80–120 | High | S🟡 U🟢 P🟢 E🟢 R🟢 |
| `web-approval` | 领导审批 UI | workflow API | 30–50 | Medium | S🟢 U🟢 P🟢 E🟢 R🟢 |
| `contracts` | JSON Schema、OpenAPI、治理契约 | — | 40–60 | Medium | S🟢 U🟢 P🟢 E🟢 R🟢 |

## Module Details

### domain-core

- **Path**: `backend/domain-core/`（规划）
- **Responsibility**: 档案领域纯逻辑 — 案卷/文件状态流转、DA/T 18 著录字段校验、GB/T 50328 目录结构校验、保管期限计算
- **Public API**: `validateMetadata()`, `transitionState()`, `computeRetentionDeadline()`, `validateClassification()`
- **Internal Dependencies**: 无（仅依赖 JSON Schema 生成的类型或契约 DTO）
- **External Dependencies**: 无
- **Complexity Rating**: High
- **S.U.P.E.R Assessment**: 纯领域层，零基础设施依赖

### integrity-check

- **Path**: `backend/integrity-check/`
- **Responsibility**: 按 `da-t70-checklist.yaml` 执行四性检测，输出 `integrity-check.schema` 结果
- **S.U.P.E.R Assessment**: 检测项清单来自契约，AI 不可删减

### contracts

- **Path**: `docs/contracts/`
- **Responsibility**: 全系统契约真相源；**所有实现任务依赖此模块完成**

## Contract File Inventory (Cross-Module)

| Contract | Consumer Modules |
|:---------|:-----------------|
| `schemas/*.schema.json` | domain-core, archive-service, ingest-service, web-admin |
| `domain/da-t70-checklist.yaml` | integrity-check, ingest-service |
| `domain/state-machines.yaml` | workflow-service, domain-core |
| `governance/rbac-matrix.yaml` | identity-service, all API handlers |
| `api/openapi.yaml` | 全部 API 模块, web-admin, web-approval |
| `governance/audit-log.schema.json` | audit-service, all mutating handlers |

## Dependency Direction (Target)

```
web-admin / web-approval → application services → domain-core / integrity-check
                                                      ↑
                                              contracts (schemas)
storage-adapters implements ports defined in contracts
```
