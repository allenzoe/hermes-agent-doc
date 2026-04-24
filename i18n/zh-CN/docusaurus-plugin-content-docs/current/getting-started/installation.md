---
sidebar_position: 2
title: "安装指南"
description: "在 Linux、macOS、WSL2 或 Android Termux 上安装 Hermes Agent"
---

# 安装指南

使用一行安装脚本，在两分钟内让 Hermes Agent 运行起来。

## 快速安装

### Linux / macOS / WSL2

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### Android / Termux

Hermes 现在支持 Termux 感知的安装路径：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装程序自动检测 Termux 并切换到经过测试的 Android 流程：
- 使用 Termux `pkg` 安装系统依赖（`git`、`python`、`nodejs`、`ripgrep`、`ffmpeg`、构建工具）
- 使用 `python -m venv` 创建虚拟环境
- 自动导出 `ANDROID_API_LEVEL` 用于 Android wheel 构建
- 使用 `pip` 安装精选的 `.[termux]` 扩展
- 默认跳过未经测试的浏览器 / WhatsApp 引导

如果需要明确的路径，请参阅专门的 [Termux 指南](./termux.md)。

:::warning Windows
原生 Windows **不支持**。请安装 [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) 并在其中运行 Hermes Agent。上面的安装命令可以在 WSL2 中运行。
:::

### 安装程序做什么

安装程序自动处理所有事务——所有依赖（Python、Node.js、ripgrep、ffmpeg）、仓库克隆、虚拟环境、全局 `hermes` 命令设置，以及 LLM 提供商配置。完成后就可以开始聊天了。

### 安装后

重新加载 shell 并开始聊天：

```bash
source ~/.bashrc   # 或者: source ~/.zshrc
hermes             # 开始聊天！
```

之后要重新配置 individual 设置，请使用专门的命令：

```bash
hermes model          # 选择你的 LLM 提供商和模型
hermes tools          # 配置启用的工具
hermes gateway setup  # 设置消息平台
hermes config set     # 设置 individual 配置值
hermes setup          # 或者运行完整设置向导一次性配置 everything
```

---

## 前置条件

唯一的前提是 **Git**。安装程序自动处理其他所有事务：

- **uv**（快速的 Python 包管理器）
- **Python 3.11**（通过 uv，无需 sudo）
- **Node.js v22**（用于浏览器自动化和 WhatsApp 桥接）
- **ripgrep**（快速文件搜索）
- **ffmpeg**（TTS 音频格式转换）

:::info
你**不需要**手动安装 Python、Node.js、ripgrep 或 ffmpeg。安装程序检测缺失的内容并为你安装。只需确保 `git` 可用（`git --version`）。
:::

:::tip Nix 用户
如果你使用 Nix（ NixOS、macOS 或 Linux），有专门的 Nix flake 设置路径、声明式 NixOS 模块和可选容器模式。请参阅 **[Nix 和 NixOS 设置](./nix-setup.md)** 指南。
:::

---

## 手动 / 开发者安装

如果你想从仓库克隆并从源代码安装——为了贡献、运行特定分支，或完全控制虚拟环境——请参阅贡献指南中的 [开发环境设置](../developer-guide/contributing.md#development-setup) 部分。

---

## 故障排除

| 问题 | 解决方案 |
|---------|----------|
| `hermes: command not found` | 重新加载 shell（`source ~/.bashrc`）或检查 PATH |
| `API key not set` | 运行 `hermes model` 配置你的提供商，或 `hermes config set OPENROUTER_API_KEY your_key` |
| 更新后缺少配置 | 运行 `hermes config check` 然后 `hermes config migrate` |

要获取更多诊断信息，运行 `hermes doctor`——它会告诉你缺少什么以及如何修复。