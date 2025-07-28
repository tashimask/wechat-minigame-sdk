# 《我要消灭你》公共SDK库

## 项目说明

本项目包含《我要消灭你》游戏中可以公开的SDK代码，主要用于：
- 微信小游戏平台集成
- 广告系统集成
- 排行榜系统集成
- 基础工具类

## 目录结构

```
sdk-public/
├── README.md              # 项目说明
├── LICENSE               # MIT许可证
├── src/
│   ├── ad/              # 广告SDK
│   ├── rank/            # 排行榜SDK
│   ├── utils/           # 工具类
│   └── types/           # 类型定义
└── examples/            # 使用示例
```

## 安装使用

```bash
npm install eliminate-game-sdk
```

## 使用示例

```typescript
import { AdManager, RankManager } from 'eliminate-game-sdk';

// 显示广告
AdManager.showRewardedVideo(() => {
    console.log('广告播放完成');
});

// 更新排行榜
RankManager.updateScore(1000);
```

## 许可证

MIT License - 详见 LICENSE 文件

## 开发者

[GF工作室]

## 版本

v1.0.0 