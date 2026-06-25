# Task Dependency Graph

```mermaid
graph TD
    subgraph P1 [Phase 1: 契约与治理基础]
        T1_1[T1.1 AI boundaries]
        T1_2[T1.2 Glossary]
        T1_3[T1.3 Requirements]
        T1_4[T1.4 RBAC matrix]
        T1_5[T1.5 Audit schema]
        T1_6[T1.6 Contract CI]
        T1_7[T1.7 Repo skeleton]
        T1_8[T1.8 Compliance redlines]
        T1_2 --> T1_3
        T1_3 --> T1_4
        T1_1 --> T1_8
        T1_5 --> T1_6
        T1_1 --> T1_7
    end

    subgraph P2 [Phase 2: 领域 Schema]
        T2_1[T2.1 Compliance mapping]
        T2_2[T2.2 Metadata dictionary]
        T2_3[T2.3 Classification]
        T2_4[T2.4 State machines]
        T2_5[T2.5 Project/Building schema]
        T2_6[T2.6 Volume/Item schema]
        T2_7[T2.7 Digital asset schema]
        T2_8[T2.8 DA/T 70 checklist]
        T2_9[T2.9 Storage schema]
        T1_2 --> T2_1
        T2_1 --> T2_2
        T2_1 --> T2_3
        T1_4 --> T2_4
        T2_2 --> T2_5
        T2_2 --> T2_6
        T2_1 --> T2_7
        T2_1 --> T2_8
        T2_5 --> T2_9
    end

    subgraph P3 [Phase 3: 基础设施与领域核心]
        T3_1[T3.1 Docker Compose]
        T3_2[T3.2 DB migration]
        T3_3[T3.3 Metadata validation]
        T3_4[T3.4 State machine impl]
        T3_6[T3.6 PG adapter]
        T3_7[T3.7 MinIO adapter]
        T3_8[T3.8 Audit service]
        T2_9 --> T3_1
        T3_1 --> T3_2
        T2_2 --> T3_3
        T2_4 --> T3_4
        T3_3 --> T3_4
        T3_2 --> T3_6
        T3_1 --> T3_7
        T1_5 --> T3_8
        T3_6 --> T3_8
    end

    subgraph P4 [Phase 4: 入库与档案]
        T4_1[T4.1 Integrity check]
        T4_2[T4.2 Upload]
        T4_4[T4.4 Persist gate]
        T4_5[T4.5 Archive CRUD]
        T2_8 --> T4_1
        T3_3 --> T4_1
        T3_7 --> T4_2
        T4_1 --> T4_4
        T4_2 --> T4_4
        T3_8 --> T4_4
        T3_3 --> T4_5
        T3_6 --> T4_5
    end

    subgraph P5 [Phase 5: 身份审批 API]
        T5_1[T5.1 Identity]
        T5_2[T5.2 Tenant middleware]
        T5_3[T5.3 Borrow workflow]
        T5_5[T5.5 OpenAPI]
        T5_6[T5.6 API gateway]
        T1_4 --> T5_1
        T5_1 --> T5_2
        T2_4 --> T5_3
        T5_1 --> T5_3
        T4_5 --> T5_5
        T5_5 --> T5_6
    end

    subgraph P6 [Phase 6: 前端与部署]
        T6_1[T6.1 Admin UI]
        T6_3[T6.3 Approval UI]
        T6_5[T6.5 Contract tests]
        T6_7[T6.7 K8s deploy]
        T5_5 --> T6_1
        T5_3 --> T6_3
        T5_5 --> T6_5
        T3_1 --> T6_7
    end

    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P5
    P5 --> P6
```

## Parallel Execution Summary

| Phase | Lanes | Max Parallelism |
|:------|:------|:----------------|
| 1 | A, B, C | 3 agents |
| 2 | A, B, C | 3 agents |
| 3 | A, B, C | 3 agents |
| 4 | A, B, C | 3 agents |
| 5 | A, B, C | 3 agents |
| 6 | A, B, C | 3 agents |

## Critical Path

```
T1.2 → T2.1 → T2.2 → T3.3 → T4.1 → T4.4 → T5.5 → T6.1 → T6.8
```

契约层（Phase 1–2）在关键路径上 — **不可压缩**。
