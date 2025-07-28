/**
 * 🎯 《我要消灭你》广告SDK
 * 
 * 独有特色：
 * ✨ 多平台广告统一接口
 * ✨ 智能广告加载策略
 * ✨ 广告播放状态管理
 * 
 * 开发者：[GF工作室]
 * 版本：v1.0.0
 */

declare const wx: any;

export interface AdCallback {
    onSuccess?: () => void;
    onFail?: () => void;
    onError?: () => void;
}

export class AdManager {
    private static instance: AdManager;
    private rewardedVideoAd: any = null;
    private interstitialAd: any = null;

    private constructor() {
        this.initAds();
    }

    public static getInstance(): AdManager {
        if (!AdManager.instance) {
            AdManager.instance = new AdManager();
        }
        return AdManager.instance;
    }

    /**
     * 初始化广告
     */
    private initAds(): void {
        if (typeof wx !== 'undefined') {
            this.initRewardedVideoAd();
            this.initInterstitialAd();
        }
    }

    /**
     * 初始化激励视频广告
     */
    private initRewardedVideoAd(): void {
        this.rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: 'your-rewarded-video-ad-unit-id'
        });

        this.rewardedVideoAd.onLoad(() => {
            console.log('激励视频广告加载成功');
        });

        this.rewardedVideoAd.onError((err: any) => {
            console.error('激励视频广告加载失败', err);
        });

        this.rewardedVideoAd.onClose((res: any) => {
            if (res && res.isEnded) {
                console.log('激励视频广告播放完成');
            } else {
                console.log('激励视频广告播放未完成');
            }
        });
    }

    /**
     * 初始化插屏广告
     */
    private initInterstitialAd(): void {
        this.interstitialAd = wx.createInterstitialAd({
            adUnitId: 'your-interstitial-ad-unit-id'
        });

        this.interstitialAd.onLoad(() => {
            console.log('插屏广告加载成功');
        });

        this.interstitialAd.onError((err: any) => {
            console.error('插屏广告加载失败', err);
        });

        this.interstitialAd.onClose(() => {
            console.log('插屏广告关闭');
        });
    }

    /**
     * 显示激励视频广告
     */
    public showRewardedVideo(callback?: AdCallback): void {
        if (!this.rewardedVideoAd) {
            console.warn('激励视频广告未初始化');
            callback?.onError?.();
            return;
        }

        this.rewardedVideoAd.show().then(() => {
            callback?.onSuccess?.();
        }).catch((err: any) => {
            console.error('显示激励视频广告失败', err);
            callback?.onFail?.();
        });
    }

    /**
     * 显示插屏广告
     */
    public showInterstitialAd(callback?: AdCallback): void {
        if (!this.interstitialAd) {
            console.warn('插屏广告未初始化');
            callback?.onError?.();
            return;
        }

        this.interstitialAd.show().then(() => {
            callback?.onSuccess?.();
        }).catch((err: any) => {
            console.error('显示插屏广告失败', err);
            callback?.onFail?.();
        });
    }

    /**
     * 预加载激励视频广告
     */
    public preloadRewardedVideo(): void {
        if (this.rewardedVideoAd) {
            this.rewardedVideoAd.load();
        }
    }

    /**
     * 预加载插屏广告
     */
    public preloadInterstitialAd(): void {
        if (this.interstitialAd) {
            this.interstitialAd.load();
        }
    }
}

// 导出单例实例
export const adManager = AdManager.getInstance(); 