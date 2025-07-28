/**
 * 🎯 《我要消灭你》排行榜SDK
 * 
 * 独有特色：
 * ✨ 微信小游戏排行榜集成
 * ✨ 分数上传与获取
 * ✨ 好友排行榜支持
 * 
 * 开发者：[GF工作室]
 * 版本：v1.0.0
 */

declare const wx: any;

export interface RankData {
    score: number;
    rank: number;
    nickname: string;
    avatarUrl: string;
}

export interface RankCallback {
    onSuccess?: (data: RankData[]) => void;
    onFail?: (error: any) => void;
}

export class RankManager {
    private static instance: RankManager;
    private currentScore: number = 0;

    private constructor() {}

    public static getInstance(): RankManager {
        if (!RankManager.instance) {
            RankManager.instance = new RankManager();
        }
        return RankManager.instance;
    }

    /**
     * 更新分数
     */
    public updateScore(score: number): void {
        this.currentScore = score;
        
        if (typeof wx !== 'undefined' && wx.setUserCloudStorage) {
            wx.setUserCloudStorage({
                KVDataList: [{
                    key: 'score',
                    value: score.toString()
                }],
                success: () => {
                    console.log('分数上传成功');
                },
                fail: (err: any) => {
                    console.error('分数上传失败', err);
                }
            });
        }
    }

    /**
     * 获取排行榜数据
     */
    public getRankList(callback?: RankCallback): void {
        if (typeof wx !== 'undefined' && wx.getFriendCloudStorage) {
            wx.getFriendCloudStorage({
                keyList: ['score'],
                success: (res: any) => {
                    const rankData: RankData[] = res.data
                        .filter((item: any) => item.KVDataList && item.KVDataList.length > 0)
                        .map((item: any, index: number) => {
                            const scoreData = item.KVDataList.find((kv: any) => kv.key === 'score');
                            return {
                                score: parseInt(scoreData?.value || '0'),
                                rank: index + 1,
                                nickname: item.nickname || '未知用户',
                                avatarUrl: item.avatarUrl || ''
                            };
                        })
                        .sort((a: RankData, b: RankData) => b.score - a.score);

                    callback?.onSuccess?.(rankData);
                },
                fail: (err: any) => {
                    console.error('获取排行榜失败', err);
                    callback?.onFail?.(err);
                }
            });
        } else {
            callback?.onFail?.('微信API不可用');
        }
    }

    /**
     * 获取当前用户排名
     */
    public getCurrentUserRank(callback?: (rank: number) => void): void {
        this.getRankList({
            onSuccess: (data: RankData[]) => {
                const currentUserRank = data.findIndex(item => 
                    item.nickname === '当前用户' || item.score === this.currentScore
                );
                callback?.(currentUserRank >= 0 ? currentUserRank + 1 : -1);
            },
            onFail: () => {
                callback?.(-1);
            }
        });
    }

    /**
     * 分享排行榜
     */
    public shareRank(): void {
        if (typeof wx !== 'undefined' && wx.shareAppMessage) {
            wx.shareAppMessage({
                title: '我在《我要消灭你》中获得了' + this.currentScore + '分，快来挑战我吧！',
                imageUrl: 'share-image-url',
                success: () => {
                    console.log('分享成功');
                },
                fail: (err: any) => {
                    console.error('分享失败', err);
                }
            });
        }
    }

    /**
     * 获取当前分数
     */
    public getCurrentScore(): number {
        return this.currentScore;
    }
}

// 导出单例实例
export const rankManager = RankManager.getInstance(); 