# Risk Assessment

## S.U.P.E.R Architecture Health Summary

> 绿地项目 — 评估**目标架构**风险及规划阶段的合规/治理风险。

| Principle | Status | Key Findings | Priority |
|:----------|:-------|:-------------|:---------|
| **S** Single Purpose | 🟡 | ingest-service 易膨胀（上传+扫描+入库）；规划阶段已标注拆分 | Medium |
| **U** Unidirectional Flow | 🟢 | 分层清晰，domain-core 零外部依赖 | Low |
| **P** Ports over Implementation | 🔴 | **当前无代码，契约尚未全部落地** — 最大风险 | **High** |
| **E** Environment-Agnostic | 🟢 | 私有云通过 env/config 注入；MinIO/S3 抽象 | Low |
| **R** Replaceable Parts | 🟢 | 契约驱动，存储/检索可替换 | Low |

**Overall Health**: 2/5 principles at risk in planning — **契约优先执行是 P0 缓解措施**

### S.U.P.E.R Violation Hotspots (Planned — Preventive)

| Hotspot | Risk | Mitigation |
|:--------|:-----|:-----------|
| 未定义契约即写 CRUD | 字段与国标不一致，后期迁移成本极高 | Phase 1–2 全部契约任务 blocking |
| ingest 单体模块 | 上传/检测/入库耦合 | 拆为三子模块，各一契约 port |
| web-admin 直接调 DB | 绕过 RBAC 与审计 | 禁止；仅通过 OpenAPI 客户端 |
| AI 生成销毁/删库逻辑 | 合规事故 | `ai-agent-boundaries.md` Hard Deny |

## Risk Matrix

| Risk | Impact | Likelihood | Severity | Mitigation |
|:-----|:-------|:-----------|:---------|:-----------|
| 国标著录字段遗漏 | 档案不合规，验收失败 | Medium | **High** | `compliance-mapping.md` + DA/T 18 schema 评审 |
| DA/T 70 检测项实现不足 | 电子档案无效 | Medium | **High** | 检测清单契约化；fixture 边界测试 |
| 跨分公司数据泄露 | 法律与声誉 | Low | **Critical** | 所有查询强制 `branch_org_id`；集成测试 |
| 审计日志被篡改 | 无法追溯 | Low | **Critical** | DB 触发器 INSERT-only；AI Hard Deny |
| 大文件/BIM 上传失败 | 业务阻塞 | High | Medium | 分片上传契约；MinIO 断点续传 |
| AI 自动生成审批绕过 | 违规操作 | Medium | **High** | HITL 契约 + code review 门禁 |
| 无测试 harness 即开发 | 回归风险 | High | Medium | Phase 1 建立契约测试基线 |
| 销毁流程误操作 | 不可逆数据丢失 | Low | **Critical** | 双人审批 + 逻辑删除 + 冷却期 |

## High-Severity Risks

### R1: 合规差距（GB/T 50328 + DA/T 系列）

**描述**：工程文件目录结构、著录项、四性检测若未在契约中完整映射，实现后返工成本极高。

**缓解**：
1. Phase 1 完成 `compliance-mapping.md` 逐条映射
2. 领域专家评审 `metadata-dictionary.json`
3. 契约测试 + 合规 fixture

### R2: 多租户数据隔离

**描述**：集团—分公司—全宗三级结构，权限矩阵复杂；领导角色仅本分公司。

**缓解**：
1. `rbac-matrix.yaml` 显式定义
2. 所有 API 集成测试含跨租户越权用例
3. 集团管理员操作单独审计

### R3: AI 辅助开发越界

**描述**：AI 可能生成物理删除、跳过检测、硬编码密钥等危险代码。

**缓解**：
1. `ai-agent-boundaries.md` + `project-agents-template.md`
2. PR 检查：audit 表无 DELETE、archive 无物理 DELETE
3. 人工确认清单（HITL）用于 RBAC/销毁/密级变更

## Technical Debt

| Item | Notes |
|:-----|:------|
| 无现有代码 | 非债务；需避免「先写后补契约」形成真债务 |
| 标准版本 | DA/T 58-2014 术语 vs 新修订；锁定版本于 glossary |
| 领导审批层级 | 已确认：销毁仅分公司领导+管理员，**无需集团终审** |
| 后端栈 | 已确认：**Java 17 + Spring Boot 3** |

## Testing Risks

| Gap | Impact | Plan |
|:----|:-------|:-----|
| 无契约测试 CI | Schema 漂移 | Phase 1 Task T1.6 建立 AJV + OpenAPI lint |
| 无 DA/T 70 fixture | 检测漏项 | Phase 2 建立合法/非法电子文件样本 |
| 无越权测试 | 数据泄露 | Phase 4 集成测试必含 RBAC matrix 全覆盖 |

## Project Governance Risks

| Gap | Mitigation |
|:----|:-----------|
| 档案系统 AGENTS 与工具仓库 AGENTS 混淆 | 独立 `project-agents-template.md`；实施时复制到业务仓库 |
| 跨会话决策丢失 | MASTER.md + Cursor 原生记忆 |
| 契约与实现分叉 | 契约变更必须 PR 先行；Schemathesis 契约测试 |

## Compatibility Concerns

| Concern | Notes |
|:--------|:------|
| 电子文件长期格式 | PDF/A、OFD 等见 DA/T 47 参考；`digital-asset.schema` 定义 allowed MIME |
| BIM/CAD 格式版本 | Revit/AutoCAD 版本差异；存储原文件 + 可选预览格式 |
| Schema 演进 | 版本字段 `schema_version`；破坏性变更需迁移脚本 + 人工评审 |

## AI Governance Risk Summary

| Category | Required Control |
|:---------|:-----------------|
| 数据销毁 | Hard Deny — AI 不得生成 DELETE archived 数据 |
| 审计 | Hard Deny — audit_log 仅 INSERT |
| 检测门禁 | Hard Deny — 不得 skip integrity check |
| 权限 | Hard Deny — 不得移除 branch_org_id 过滤 |
| RBAC/密级/销毁 | Human-in-the-loop — 仅生成草案 |

See: `docs/contracts/governance/ai-agent-boundaries.md`
