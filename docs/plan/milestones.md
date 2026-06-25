# Milestones

| # | Milestone | Phase | Tasks | Criteria | Status |
|:--|:----------|:------|------:|:---------|:-------|
| M1 | 治理与契约基础就绪 | After Phase 1 | 8 | AI 边界、RBAC、审计 schema、契约 CI 可用 | Pending |
| M2 | 领域契约定稿 | After Phase 2 | 9 | 全部 JSON Schema + 国标映射评审通过 | Pending |
| M3 | 领域核心可测 | After Phase 3 | 8 | domain-core 单元测试绿；Docker 栈 healthy | Pending |
| M4 | 入库与档案 MVP | After Phase 4 | 8 | 电子文件四性检测入库 E2E 通过 | Pending |
| M5 | API 与审批就绪 | After Phase 5 | 7 | OpenAPI 定稿；借阅/销毁审批 E2E 通过 | Pending |
| M6 | 系统可部署验收 | After Phase 6 | 8 | 双端 UI + K8s 部署 + 合规验收清单全通过 | Pending |

## Adaptive Control State

```yaml
---
adaptive:
  strategy: "contract-first phased delivery"
  phases:
    - name: "Phase 1"
      total_tasks: 8
      completed_tasks: 1
      drift_score: 0
      thresholds:
        annotate: 2    # ceil(8 * 0.20)
        replan: 4      # ceil(8 * 0.40)
        rescope: 5     # ceil(8 * 0.60)
      last_updated: "2026-06-24"
    - name: "Phase 2"
      total_tasks: 9
      completed_tasks: 0
      drift_score: 0
      thresholds:
        annotate: 2
        replan: 4
        rescope: 6
      last_updated: "2026-06-24"
    - name: "Phase 3"
      total_tasks: 8
      completed_tasks: 0
      drift_score: 0
      thresholds:
        annotate: 2
        replan: 4
        rescope: 5
      last_updated: "2026-06-24"
    - name: "Phase 4"
      total_tasks: 8
      completed_tasks: 0
      drift_score: 0
      thresholds:
        annotate: 2
        replan: 4
        rescope: 5
      last_updated: "2026-06-24"
    - name: "Phase 5"
      total_tasks: 7
      completed_tasks: 0
      drift_score: 0
      thresholds:
        annotate: 2
        replan: 3
        rescope: 5
      last_updated: "2026-06-24"
    - name: "Phase 6"
      total_tasks: 8
      completed_tasks: 0
      drift_score: 0
      thresholds:
        annotate: 2
        replan: 4
        rescope: 5
      last_updated: "2026-06-24"
```

## Milestone Acceptance Gates

### M1 Gate

- [ ] `ai-agent-boundaries.md` 评审通过
- [ ] `rbac-matrix.yaml` 四类角色完整
- [ ] `npm run validate-schemas` 可运行

### M2 Gate

- [ ] 全部 P0 schema 通过 AJV
- [ ] `compliance-mapping.md` 档案专家签字
- [ ] `da-t70-checklist.yaml` 检测项锁定

### M6 Gate（最终验收）

- [ ] GB/T 50328 竣工包导入 E2E
- [ ] DA/T 70 四性检测阻断无效文件
- [ ] 跨分公司越权测试全部失败（预期）
- [ ] 审计日志不可篡改验证
- [ ] 私有云 K8s staging 部署 smoke 通过
