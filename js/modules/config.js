// ========================================
// 配置管理模块
// ========================================

import { debounce } from './utils.js';
import { 写入文件, 获取文件 } from './fileOps.js';

const CONFIG_PATH = "/data/snippets/SavorMonokaiPro.config.json";

export const config = {
    data: {},
    save: debounce(function() {
        写入文件(CONFIG_PATH, JSON.stringify(config.data, undefined, 4));
    }, 300),
    set(key, value) {
        if (config.data[key] === value) return;
        config.data[key] = value;
        config.save();
    },
    get(key) {
        return config.data[key] ?? null;
    },
    async load() {
        const result = await 获取文件(CONFIG_PATH);
        if (result) {
            config.data = typeof result === "string" ? JSON.parse(result) : result;
        } else {
            config.data = { "SavorMonokaiPro": 1 };
            config.save();
        }
    }
};

export const initConfig = async () => {
    window.SavorMonokaiProConfig = config;
    await config.load();
};
