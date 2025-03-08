# QuestBro

QuestBro 是一款融合專案管理、社交互動、個人成長的生產力工具，結合遊戲化機制來提升任務完成率與協作效率。

## 🚀 核心功能

- 看板式任務管理（類似 Trello，支援拖放操作）
- 角色選擇與專屬功能（使用者可選擇不同角色，角色影響其專案管理方式與獎勵機制）
- 遊戲化獎勵機制（完成任務獲得 XP、稱號、寶箱等）
- 即時協作（多人同步作業，支援 WebSockets）
- 個人成就展示（建立專業履歷，顯示專案影響力）
- 排行榜與競賽機制（提升團隊動力與競爭感）

## 🛠️ 技術架構

- **前端**: React.js + Next.js, Tailwind CSS, Zustand
- **後端**: Supabase (PostgreSQL, Auth, Serverless Functions)
- **即時同步**: Supabase WebSockets

## 🎮 角色系統

使用者可選擇以下角色，獲得不同的專案管理方式和特殊能力：

1. **戰略家** - 規劃型角色，擅長制定專案策略與資源分配
2. **執行者** - 行動型角色，擅長快速完成任務
3. **協作者** - 團隊型角色，擅長團隊溝通與合作
4. **創新者** - 創意型角色，提供解決方案與改善專案流程
5. **管理者** - 控制型角色，監督專案進度與成員表現

## 🔧 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🧩 專案結構

```
QuestBro/
├── src/
│   ├── components/       # React 組件
│   ├── lib/              # Supabase 客戶端與 API
│   ├── store/            # Zustand 狀態管理
│   └── assets/           # 靜態資源
├── public/               # 公共資源
└── ...配置文件
```

## 📄 授權

MIT
