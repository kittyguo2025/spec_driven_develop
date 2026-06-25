# Project Agent Instructions — 城建建筑档案管理系统

> **Usage**: 业务代码仓库初始化时，复制本文件为仓库根目录 `AGENTS.md`。

## Scope

本文件适用于城建建筑档案管理系统全部开发工作。

## Truth Sources

- 契约根目录：`docs/contracts/`
- AI 边界：`docs/contracts/governance/ai-agent-boundaries.md`
- 进度索引：`docs/progress/MASTER.md`
- 领域术语：`docs/contracts/domain/glossary.md`

## Development Rules

1. **契约优先**：未在 `docs/contracts/` 定义的字段、状态、API，不得实现。
2. **技术栈**：Java 17 + Spring Boot 3（后端）；Vue 3 + TypeScript（前端）。
3. **合规优先**：与 GB/T 50328-2019、DA/T 18/58/70 冲突时停止并上报。
3. **审计不可变**：`audit_log` 仅允许 INSERT。
4. **归档不可物理删**：`archive_*` 实体仅允许 status 流转。
5. **检测门禁**：电子文件入库前必须通过 DA/T 70 检测。
6. **多租户隔离**：所有查询必须带 `branch_org_id`（集团管理员除外）。
7. **审批不可跳过**：借阅、销毁、密级变更必须走 workflow 状态机。
8. **测试默认**：行为变更必须更新契约测试或单元测试。

## AI Hard Deny（摘要）

完整清单见 `ai-agent-boundaries.md`。摘要：

- 禁止物理删除已归档数据
- 禁止修改/删除审计日志
- 禁止跳过四性检测
- 禁止移除租户过滤
- 禁止硬编码密钥

## Validation

```bash
cd docs/contracts && npm run validate-schemas
npm run lint:openapi   # openapi.yaml 定稿后启用 Spectral
```
