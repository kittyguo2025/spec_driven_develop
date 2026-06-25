# 城建建筑档案管理系统 — Progress Tracker

> **Task**: 私有云部署的集团级城建建筑档案管理系统（含 BIM/CAD/竣工包、四性检测、多分公司 RBAC）
> **Started**: 2026-06-24
> **Last Updated**: 2026-06-24
> **Mode**: LOCAL_ONLY

## Confirmed Decisions

| 项 | 值 |
|:---|:---|
| 后端 | Java 17 + Spring Boot 3 |
| 销毁审批 | 分公司领导 + 分公司管理员（无集团终审） |
| 部署 | 私有云，无外部对接 |

## References

- [Project Overview](../analysis/project-overview.md)
- [Module Inventory](../analysis/module-inventory.md)
- [Risk Assessment](../analysis/risk-assessment.md)
- [Task Breakdown](../plan/task-breakdown.md)
- [Dependency Graph](../plan/dependency-graph.md)
- [Milestones](../plan/milestones.md)
- [Glossary](../contracts/domain/glossary.md)
- [Requirements](../contracts/domain/requirements.md)
- [RBAC Matrix](../contracts/governance/rbac-matrix.yaml)
- [AI Agent Boundaries](../contracts/governance/ai-agent-boundaries.md)

## Phase Summary

| Phase | Name | Tasks | Done | Progress |
|:------|:-----|------:|-----:|:---------|
| 1 | 契约与治理基础 | 8 | 8 | 100% |
| 2 | 领域 Schema 与合规映射 | 9 | 0 | 0% |
| 3 | 私有云基础设施与领域核心 | 8 | 0 | 0% |
| 4 | 入库检测与档案服务 | 8 | 0 | 0% |
| 5 | 身份、审批与 API | 7 | 0 | 0% |
| 6 | 前端、测试与私有云部署 | 8 | 0 | 0% |

## Phase Checklist

- [x] Phase 1: 契约与治理基础 (8/8 tasks) — [details](./phase-1-governance.md)
- [ ] Phase 2: 领域 Schema 与合规映射 (0/9 tasks) — [details](./phase-2-domain-contracts.md)
- [ ] Phase 3: 私有云基础设施与领域核心 (0/8 tasks) — [details](./phase-3-core-platform.md)
- [ ] Phase 4: 入库检测与档案服务 (0/8 tasks) — [details](./phase-4-ingest-archive.md)
- [ ] Phase 5: 身份、审批与 API (0/7 tasks) — [details](./phase-5-api-workflow.md)
- [ ] Phase 6: 前端、测试与私有云部署 (0/8 tasks) — [details](./phase-6-ui-deploy.md)

## Current Status

**Active Phase**: Phase 2 — 领域 Schema 与合规映射  
**Active Task**: T2.1 `compliance-mapping.md`  
**Blockers**: 无

## Governance Status

**Shared instruction surface**: `docs/contracts/governance/project-agents-template.md`（业务仓库复制为 AGENTS.md）  
**AI boundaries**: ✅ `ai-agent-boundaries.md`  
**HITL**: ✅ `human-in-the-loop.yaml`（销毁无集团终审）  
**RBAC**: ✅ `rbac-matrix.yaml`  
**Contract CI**: ✅ `docs/contracts/` → `npm run validate-schemas`

## Task Telemetry Log

| Task ID | Date | Effort | Notes |
|:--------|:-----|:-------|:------|
| T1.1–T1.8 | 2026-06-24 | M | Phase 1 全部完成 |

## Next Steps

1. Phase 2 T2.1 `compliance-mapping.md`（国标逐条映射）
2. T2.2 `metadata-dictionary.json` + T2.3 分类表（可并行）
3. T2.8 DA/T 70 检测清单

## Session Log

| Date | Session | Summary |
|:-----|:--------|:--------|
| 2026-06-24 | 1 | Phase 0–3 规划；治理契约初稿 |
| 2026-06-24 | 2 | 确认 Java/Spring Boot、销毁审批；Phase 1 执行完成 |

## Open Questions

- （无）
