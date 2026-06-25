# AI Agent Boundaries — 城建建筑档案管理系统

> **Status**: Active  
> **Applies to**: 所有参与本系统开发的 AI Coding Agent（Cursor、Codex、Claude Code 等）  
> **Authority**: 与国标合规要求同级；冲突时以本文件 + 国标为准

---

## 1. Purpose

档案管理系统涉及**法律效力、审计追溯、保密与销毁合规**。AI 辅助编码不得降低合规基线。本文件定义 AI **绝对禁止**、**仅可草案**、**可自主执行**三类边界。

---

## 2. Hard Deny — AI 绝对禁止

以下行为 AI **不得**生成、建议、或协助绕过：

| ID | 禁止事项 | 原因 |
|:---|:---------|:-----|
| HD-01 | 物理删除已归档的案卷、文件、电子文件及其元数据 | 档案不可毁灭性删除（销毁须走审批流） |
| HD-02 | 对 `audit_log` 表/索引执行 UPDATE 或 DELETE | 审计日志不可篡改 |
| HD-03 | 绕过 RBAC 或移除 `branch_org_id` 租户过滤 | 跨分公司数据泄露 |
| HD-04 | 跳过 DA/T 70 四性检测直接标记入库成功 | 电子档案无效 |
| HD-05 | 自动执行销毁、降密、开放鉴定**结论** | 须人工/领导审批 |
| HD-06 | 修改状态为 `archived` / `frozen` 的著录项 | 已归档数据不可改 |
| HD-07 | 硬编码密钥、数据库连接串、内网 IP | 安全风险 |
| HD-08 | 关闭/弱化加密、哈希校验、病毒扫描 | 完整性风险 |
| HD-09 | 用物理 DELETE 替代逻辑删除 + 审计 | 不可追溯 |
| HD-10 | 生成 admin 后门、debug 绕过认证接口 | 安全后门 |
| HD-11 | 删减 `da-t70-checklist.yaml` 中的检测项 | 合规缩水 |
| HD-12 | 在契约未定义处发明字段、状态、API | 契约分叉 |

---

## 3. Human-in-the-Loop — 仅可生成草案

AI 可生成**草案代码/配置**，但必须标注 `// REQUIRES HUMAN REVIEW` 且**不得合并**直至人工确认：

| ID | 事项 | 确认人 |
|:---|:-----|:-------|
| HITL-01 | 保管期限、密级、开放范围规则变更 | 集团/分公司管理员 |
| HITL-02 | 销毁鉴定与执行逻辑 | 分公司领导 + 管理员 |
| HITL-03 | 批量导入/迁移脚本 | 管理员 + DBA |
| HITL-04 | RBAC 矩阵变更 | 集团管理员 |
| HITL-05 | 分类号表版本升级 | 集团管理员 |
| HITL-06 | Schema 破坏性变更（字段删除/类型变更） | 架构负责人 + 档案专家 |
| HITL-07 | 生产环境配置与密钥引用方式 | 运维负责人 |

详见：`human-in-the-loop.yaml`

---

## 4. Allowed — AI 可自主执行（契约范围内）

- 按已定 JSON Schema / OpenAPI 生成 CRUD 骨架
- 著录表单 UI（字段来源 `metadata-dictionary.json`）
- 四性检测**调用**代码（检测项来自契约，不发明）
- 单元测试、契约测试、fixture 数据
- 检索、统计、导出等**只读**功能
- 逻辑删除（`status = deleted`）+ 审计记录写入
- Docker/K8s 部署模板（不含真实密钥）

---

## 5. Compliance Non-Negotiables

1. **GB/T 50328-2019** — 工程文件目录与归档结构
2. **DA/T 18-2022** — 著录字段与规则
3. **DA/T 58-2014** — 术语一致（见 glossary）
4. **DA/T 70-2018** — 电子档案四性检测门禁

映射详情：`docs/contracts/domain/compliance-mapping.md`（Phase 2 产出）

---

## 6. PR / Code Review Checklist（AI 生成代码必查）

```
[ ] 无 audit_log UPDATE/DELETE
[ ] 无 archive 实体物理 DELETE
[ ] 所有 mutating API 写 audit_log
[ ] 所有 list/get 含 branch_org_id 过滤（集团管理员除外）
[ ] 入库路径调用 integrity-check
[ ] 无硬编码 secret / connection string
[ ] 新字段已在 docs/contracts/schemas/ 定义
[ ] 审批流状态来自 state-machines.yaml
```

---

## 7. Violation Response

若 AI 输出触犯 Hard Deny：

1. **立即停止**采用该输出
2. 从契约重新生成
3. 在 PR 中记录违规类型（HD-xx）
4. 更新本文件若发现新类别

---

## 8. Related Documents

- `human-in-the-loop.yaml`
- `compliance-non-negotiables.md`
- `rbac-matrix.yaml`
- `project-agents-template.md`
