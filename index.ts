/**
 * 🎯 《我要消灭你》SDK 主入口文件
 * 
 * 独有特色：
 * ✨ 统一的SDK接口导出
 * ✨ 完整的类型定义支持
 * ✨ 跨平台兼容性设计
 * 
 * 开发者：[GF工作室]
 * 版本：v1.0.0
 */

// 导出广告相关
export { AdManager, adManager, type AdCallback } from './ad/AdManager';

// 导出排行榜相关
export { RankManager, rankManager, type RankData, type RankCallback } from './rank/RankManager';

// 导出存储工具
export { StorageUtil, type StorageData } from './utils/StorageUtil';

// 导出类型定义
export {
    GameMode,
    SkillType,
    ItemType,
    GameState,
    type BallData,
    type LevelData,
    type RewardData,
    type UserData,
    type GameConfig,
    type GameEvent,
    type GameStats,
    type GameSettings,
    type Achievement,
    type LeaderboardEntry,
    type AdCallback as GameAdCallback,
    type ShareData,
    type ErrorInfo,
    type RequestConfig,
    type ResponseData
} from './types/GameTypes';

// 默认导出SDK实例
import { adManager } from './ad/AdManager';
import { rankManager } from './rank/RankManager';
import { StorageUtil } from './utils/StorageUtil';

/**
 * SDK主类
 */
export class EliminateGameSDK {
    public readonly ad = adManager;
    public readonly rank = rankManager;
    public readonly storage = StorageUtil;

    /**
     * 初始化SDK
     */
    public init(): void {
        console.log('🎮 《我要消灭你》SDK 初始化完成');
        console.log('📦 版本: v1.0.0');
        console.log('👨‍💻 开发者: [GF工作室]');
    }

    /**
     * 获取SDK版本信息
     */
    public getVersion(): string {
        return '1.0.0';
    }

    /**
     * 获取开发者信息
     */
    public getDeveloper(): string {
        return '[GF工作室]';
    }
}

// 创建并导出默认实例
export const sdk = new EliminateGameSDK();

// 默认导出
export default sdk; 