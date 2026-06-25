# 业务代码仓库目录结构（规划）

> Java 17 + Spring Boot 3 | Vue 3 前端  
> 初始化业务仓库时按此结构创建；契约保留在 `docs/contracts/`

```
urban-construction-archive/
├── AGENTS.md                          # 从 project-agents-template.md 复制
├── docs/
│   └── contracts/                     # 契约真相源（可 submodule 或复制）
├── backend/
│   ├── pom.xml                        # Spring Boot 3 父 POM
│   ├── domain-core/                   # 纯 Java，零 Spring 依赖
│   │   └── src/main/java/.../domain/
│   ├── integrity-check/               # DA/T 70 检测编排
│   ├── ingest-service/
│   │   ├── upload/
│   │   ├── scan/
│   │   └── persist/
│   ├── archive-service/
│   ├── workflow-service/
│   ├── identity-service/
│   ├── audit-service/
│   ├── report-service/
│   ├── storage-adapters/
│   └── api-gateway/                   # Spring Boot 主应用 / BFF
├── frontend/
│   ├── web-admin/                     # Vue 3 业务端
│   └── web-approval/                  # Vue 3 领导审批端
├── deploy/
│   ├── docker-compose.yml             # PG + MinIO + ES + Redis
│   └── helm/                          # K8s 私有云
└── .github/workflows/
    └── contract-ci.yml                # validate-schemas 门禁
```

## 模块依赖规则

- `domain-core` 不得依赖 Spring、JPA、HTTP 客户端
- 应用模块通过 `storage-adapters` 实现契约 port
- 所有 API DTO 与 `docs/contracts/schemas/` 对齐
