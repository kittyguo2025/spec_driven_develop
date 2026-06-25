# Phase 1: 契约与治理基础

**Goal**: AI 边界、RBAC、审计契约及项目骨架  
**Status**: Complete (8/8)

## Tasks

- [x] **T1.1**: 完善 `ai-agent-boundaries.md` 与 HITL 契约
- [x] **T1.2**: 编写 `glossary.md`（对齐 DA/T 58-2014）
- [x] **T1.3**: 编写 `requirements.md`
- [x] **T1.4**: 编写 `rbac-matrix.yaml`
- [x] **T1.5**: 编写 `audit-log.schema.json`
- [x] **T1.6**: 建立契约校验 CI（AJV）
- [x] **T1.7**: 业务仓库目录骨架 `REPO-SKELETON.md`
- [x] **T1.8**: `compliance-non-negotiables.md` 定稿

## Phase Notes

- 销毁审批：分公司领导 + 分公司管理员，无需集团终审（用户确认 2026-06-24）
- 后端：Java 17 + Spring Boot 3（用户确认 2026-06-24）
- 契约校验：`cd docs/contracts && npm run validate-schemas`

## Phase Completion Checklist

- [x] All tasks checked
- [x] MASTER.md updated
- [ ] Milestone M1 gate passed（待人工评审 ai-agent-boundaries）
