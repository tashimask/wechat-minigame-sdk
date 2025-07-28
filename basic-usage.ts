/**
 * 🎯 《我要消灭你》SDK 基础使用示例
 * 
 * 本示例展示了如何使用SDK的基本功能
 * 
 * 开发者：[GF工作室]
 * 版本：v1.0.0
 */

import { AdManager, adManager } from '../src/ad/AdManager';
import { RankManager, rankManager } from '../src/rank/RankManager';
import { StorageUtil } from '../src/utils/StorageUtil';
import { GameMode, SkillType, ItemType } from '../src/types/GameTypes';

/**
 * 基础使用示例
 */
export class BasicUsageExample {
    
    /**
     * 初始化游戏
     */
    public static initGame(): void {
        console.log('🎮 初始化《我要消灭你》游戏');
        
        // 初始化存储
        this.initStorage();
        
        // 初始化广告
        this.initAds();
        
        // 初始化排行榜
        this.initRank();
    }

    /**
     * 初始化存储系统
     */
    private static initStorage(): void {
        // 设置默认游戏数据
        StorageUtil.setItem('gameConfig', {
            version: '1.0.0',
            developer: '[GF工作室]',
            gameName: '我要消灭你',
            maxLevel: 100,
            defaultCoins: 1000,
            defaultEnergy: 10,
            adEnabled: true,
            rankEnabled: true
        });

        // 设置用户数据
        StorageUtil.setItem('userData', {
            id: 'user_' + Date.now(),
            nickname: '玩家',
            avatarUrl: '',
            score: 0,
            level: 1,
            coins: 1000,
            skills: {
                [SkillType.Freeze]: 3,
                [SkillType.Erase]: 3,
                [SkillType.Move]: 3
            }
        });

        console.log('✅ 存储系统初始化完成');
    }

    /**
     * 初始化广告系统
     */
    private static initAds(): void {
        // 预加载广告
        adManager.preloadRewardedVideo();
        adManager.preloadInterstitialAd();
        
        console.log('✅ 广告系统初始化完成');
    }

    /**
     * 初始化排行榜系统
     */
    private static initRank(): void {
        // 获取当前用户分数
        const userData = StorageUtil.getItem('userData', { score: 0 });
        rankManager.updateScore(userData.score);
        
        console.log('✅ 排行榜系统初始化完成');
    }

    /**
     * 显示激励视频广告
     */
    public static showRewardedVideo(): void {
        adManager.showRewardedVideo({
            onSuccess: () => {
                console.log('🎉 激励视频播放完成，发放奖励');
                this.giveReward();
            },
            onFail: () => {
                console.log('❌ 激励视频播放失败');
            },
            onError: () => {
                console.log('⚠️ 激励视频播放出错');
            }
        });
    }

    /**
     * 显示插屏广告
     */
    public static showInterstitialAd(): void {
        adManager.showInterstitialAd({
            onSuccess: () => {
                console.log('✅ 插屏广告显示成功');
            },
            onFail: () => {
                console.log('❌ 插屏广告显示失败');
            }
        });
    }

    /**
     * 更新分数
     */
    public static updateScore(newScore: number): void {
        // 更新本地存储
        const userData = StorageUtil.getItem('userData', { score: 0 });
        userData.score = newScore;
        StorageUtil.setItem('userData', userData);

        // 更新排行榜
        rankManager.updateScore(newScore);
        
        console.log(`📊 分数更新: ${newScore}`);
    }

    /**
     * 获取排行榜
     */
    public static getLeaderboard(): void {
        rankManager.getRankList({
            onSuccess: (data) => {
                console.log('🏆 排行榜数据:', data);
                this.displayLeaderboard(data);
            },
            onFail: (error) => {
                console.error('❌ 获取排行榜失败:', error);
            }
        });
    }

    /**
     * 分享游戏
     */
    public static shareGame(): void {
        rankManager.shareRank();
    }

    /**
     * 发放奖励
     */
    private static giveReward(): void {
        const userData = StorageUtil.getItem('userData', { coins: 0, skills: {} });
        
        // 增加金币
        userData.coins += 100;
        
        // 增加技能
        userData.skills[SkillType.Freeze] = (userData.skills[SkillType.Freeze] || 0) + 1;
        
        StorageUtil.setItem('userData', userData);
        
        console.log('🎁 奖励发放完成');
    }

    /**
     * 显示排行榜
     */
    private static displayLeaderboard(data: any[]): void {
        console.log('🏆 排行榜:');
        data.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry.nickname} - ${entry.score}分`);
        });
    }

    /**
     * 游戏开始
     */
    public static startGame(): void {
        console.log('🎮 游戏开始');
        
        // 显示插屏广告
        this.showInterstitialAd();
        
        // 模拟游戏进行
        setTimeout(() => {
            const score = Math.floor(Math.random() * 1000) + 100;
            this.updateScore(score);
            
            // 游戏结束后显示激励视频
            setTimeout(() => {
                this.showRewardedVideo();
            }, 1000);
        }, 3000);
    }

    /**
     * 游戏结束
     */
    public static endGame(): void {
        console.log('🏁 游戏结束');
        
        // 获取排行榜
        this.getLeaderboard();
        
        // 分享游戏
        this.shareGame();
    }
}

// 导出示例类
export default BasicUsageExample; 