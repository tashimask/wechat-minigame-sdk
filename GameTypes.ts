/**
 * 🎯 《我要消灭你》游戏类型定义
 * 
 * 独有特色：
 * ✨ 完整的游戏数据结构定义
 * ✨ 类型安全的接口设计
 * ✨ 跨平台兼容性支持
 * 
 * 开发者：[GF工作室]
 * 版本：v1.0.0
 */

/**
 * 游戏模式枚举
 */
export enum GameMode {
    Normal = 'normal',
    Super = 'super',
    Challenge = 'challenge'
}

/**
 * 技能类型枚举
 */
export enum SkillType {
    Freeze = 'freeze',
    Erase = 'erase',
    Move = 'move'
}

/**
 * 道具类型枚举
 */
export enum ItemType {
    Coin = 'coin',
    Skill = 'skill',
    Collection = 'collection'
}

/**
 * 游戏状态枚举
 */
export enum GameState {
    Loading = 'loading',
    Playing = 'playing',
    Paused = 'paused',
    GameOver = 'gameOver',
    Victory = 'victory'
}

/**
 * 球体数据结构
 */
export interface BallData {
    id: number;
    type: number;
    position: {
        x: number;
        y: number;
    };
    scale: number;
    isConnected: boolean;
    isEliminated: boolean;
}

/**
 * 关卡数据结构
 */
export interface LevelData {
    id: number;
    name: string;
    targetScore: number;
    timeLimit: number;
    ballTypes: number[];
    difficulty: 'easy' | 'normal' | 'hard';
}

/**
 * 奖励数据结构
 */
export interface RewardData {
    itemId: number;
    count: number;
    type: ItemType;
    description: string;
}

/**
 * 用户数据结构
 */
export interface UserData {
    id: string;
    nickname: string;
    avatarUrl: string;
    score: number;
    level: number;
    coins: number;
    skills: {
        [key in SkillType]: number;
    };
}

/**
 * 游戏配置接口
 */
export interface GameConfig {
    version: string;
    developer: string;
    gameName: string;
    maxLevel: number;
    defaultCoins: number;
    defaultEnergy: number;
    adEnabled: boolean;
    rankEnabled: boolean;
}

/**
 * 事件数据结构
 */
export interface GameEvent {
    type: string;
    data?: any;
    timestamp: number;
}

/**
 * 统计数据结构
 */
export interface GameStats {
    totalPlayTime: number;
    totalScore: number;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    coinsEarned: number;
    skillsUsed: number;
    lastPlayDate: string;
}

/**
 * 设置数据结构
 */
export interface GameSettings {
    soundEnabled: boolean;
    musicEnabled: boolean;
    vibrationEnabled: boolean;
    autoSaveEnabled: boolean;
    notificationsEnabled: boolean;
    language: string;
    theme: 'light' | 'dark' | 'auto';
}

/**
 * 成就数据结构
 */
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    unlockDate?: string;
    progress: number;
    maxProgress: number;
}

/**
 * 排行榜数据结构
 */
export interface LeaderboardEntry {
    rank: number;
    userId: string;
    nickname: string;
    avatarUrl: string;
    score: number;
    level: number;
    timestamp: number;
}

/**
 * 广告回调接口
 */
export interface AdCallback {
    onSuccess?: () => void;
    onFail?: (error: any) => void;
    onError?: (error: any) => void;
    onClose?: (result: any) => void;
}

/**
 * 分享数据结构
 */
export interface ShareData {
    title: string;
    imageUrl: string;
    path: string;
    query?: string;
}

/**
 * 错误信息结构
 */
export interface ErrorInfo {
    code: string;
    message: string;
    details?: any;
    timestamp: number;
}

/**
 * 网络请求配置
 */
export interface RequestConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    data?: any;
    timeout?: number;
}

/**
 * 网络响应结构
 */
export interface ResponseData<T = any> {
    success: boolean;
    data?: T;
    error?: ErrorInfo;
    timestamp: number;
} 