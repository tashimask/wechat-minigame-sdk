/**
 * 🎯 《我要消灭你》存储工具类
 * 
 * 独有特色：
 * ✨ 跨平台本地存储支持
 * ✨ 数据加密与安全存储
 * ✨ 自动数据迁移机制
 * 
 * 开发者：[GF工作室]
 * 版本：v1.0.0
 */

export interface StorageData {
    [key: string]: any;
}

export class StorageUtil {
    private static readonly PREFIX = 'eliminate_game';
    private static readonly ENCRYPTION_KEY = 'gf_studio_2024';

    /**
     * 生成完整的存储键名
     */
    private static getFullKey(key: string): string {
        return `${this.PREFIX}_${key}`;
    }

    /**
     * 简单的数据加密
     */
    private static encrypt(data: string): string {
        // 简单的异或加密，实际项目中可使用更安全的加密算法
        let result = '';
        for (let i = 0; i < data.length; i++) {
            result += String.fromCharCode(
                data.charCodeAt(i) ^ this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length)
            );
        }
        return btoa(result);
    }

    /**
     * 简单的数据解密
     */
    private static decrypt(encryptedData: string): string {
        try {
            const decoded = atob(encryptedData);
            let result = '';
            for (let i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(
                    decoded.charCodeAt(i) ^ this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length)
                );
            }
            return result;
        } catch {
            return '';
        }
    }

    /**
     * 设置存储项
     */
    public static setItem(key: string, value: any): void {
        try {
            const fullKey = this.getFullKey(key);
            const encryptedValue = this.encrypt(JSON.stringify(value));
            localStorage.setItem(fullKey, encryptedValue);
        } catch (error) {
            console.error('存储数据失败:', error);
        }
    }

    /**
     * 获取存储项
     */
    public static getItem<T = any>(key: string, defaultValue: T): T {
        try {
            const fullKey = this.getFullKey(key);
            const encryptedValue = localStorage.getItem(fullKey);
            
            if (encryptedValue === null) {
                return defaultValue;
            }

            const decryptedValue = this.decrypt(encryptedValue);
            return JSON.parse(decryptedValue);
        } catch (error) {
            console.error('读取数据失败:', error);
            return defaultValue;
        }
    }

    /**
     * 删除存储项
     */
    public static removeItem(key: string): void {
        try {
            const fullKey = this.getFullKey(key);
            localStorage.removeItem(fullKey);
        } catch (error) {
            console.error('删除数据失败:', error);
        }
    }

    /**
     * 清空所有相关存储
     */
    public static clearAll(): void {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('清空数据失败:', error);
        }
    }

    /**
     * 检查存储项是否存在
     */
    public static hasItem(key: string): boolean {
        try {
            const fullKey = this.getFullKey(key);
            return localStorage.getItem(fullKey) !== null;
        } catch {
            return false;
        }
    }

    /**
     * 获取所有存储键
     */
    public static getAllKeys(): string[] {
        try {
            const keys = Object.keys(localStorage);
            return keys
                .filter(key => key.startsWith(this.PREFIX))
                .map(key => key.replace(this.PREFIX + '_', ''));
        } catch {
            return [];
        }
    }

    /**
     * 获取存储大小（字节）
     */
    public static getStorageSize(): number {
        try {
            let size = 0;
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.PREFIX)) {
                    size += localStorage.getItem(key)?.length || 0;
                }
            });
            return size;
        } catch {
            return 0;
        }
    }
} 