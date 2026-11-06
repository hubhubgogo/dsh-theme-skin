# Theme Skin — DeepSeek Harness (DS Bot) 换肤插件

为 DeepSeek Harness Web UI（DS Bot 桌面客户端）提供一键换肤的插件。

![icon](theme-skin/icon.svg)

## 功能

- 右下角悬浮 🎂 调色盘按钮，点开皮肤菜单，**选完自动收起**
- 内置 5 套皮肤 + 恢复默认：深海蓝 Ocean / 紫夜 Violet / 森绿 Forest / 暖沙 Sunset / 玫瑰 Rose
- 每套皮肤覆盖全部 14 个主题 token（背景、浮层、边框、文字、状态色、侧边栏），亮/暗模式各有一套配色
- 通过 `ctx.theme.overrideTokens()` 官方 API 换肤，亮暗切换由主题服务自动合成
- 选择保存在 localStorage，重启客户端后保持

## 安装

1. 解压或克隆本仓库
2. 在 DS Bot 插件管理中选择 `theme-skin` 目录安装
3. **完全退出并重新打开 DS Bot**（Client 插件仅在启动时装载）

## 要求

- DeepSeek Harness 0.2.1-rc.5 或接口相近的版本（依赖 `ctx.theme` 服务与 `shell.overlay` 插槽）
- 零 npm 依赖，离线可用

## 自定义皮肤

编辑 `theme-skin/client.js` 中的 `SKINS` 数组即可增删皮肤或改色值，改后重启客户端生效。

## License

MIT
