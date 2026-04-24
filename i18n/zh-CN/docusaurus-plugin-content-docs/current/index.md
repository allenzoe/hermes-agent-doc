---
slug: /
sidebar_position: 0
title: "Hermes Agent 文档"
description: " Nous Research 出品的自主 AI 智能体。内置学习循环，从经验中创建技能，在使用中不断改进，并跨会话记住你的偏好。"
hide_table_of_contents: true
displayed_sidebar: docs
---

# Hermes Agent

由 [Nous Research](https://nousresearch.com) 打造的自主进化 AI 智能体。唯一具备内置学习循环的智能体——从经验中创建技能，在使用中不断改进，自发保持知识，并随着会话建立对你更深入的了解。

<div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'}}>
  <a href="/docs/getting-started/installation" style={{display: 'inline-block', padding: '0.6rem 1.2rem', backgroundColor: '#FFD700', color: '#07070d', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'}}>开始使用 →</a>
  <a href="https://github.com/NousResearch/hermes-agent" style={{display: 'inline-block', padding: '0.6rem 1.2rem', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '8px', textDecoration: 'none'}}>在 GitHub 查看</a>
</div>

## 什么是 Hermes Agent？

它不是 IDE 里的代码副手，也不是单一 API 封装的聊天机器人。**它是一个自主智能体，运行越久越聪明。** 可以部署在任何地方——$5 的 VPS、GPU 集群，或空闲时几乎不花钱的无服务器基础设施（Daytona、Modal）。可以从 Telegram 对话它，而它在你从未 SSH 连接的云虚拟机上工作。它不局限于你的笔记本电脑。

## 快速链接

| | |
|---|---|
| 🚀 **[安装指南](/docs/getting-started/installation)** | 60 秒内在 Linux、macOS 或 WSL2 上安装 |
| 📖 **[快速入门](/docs/getting-started/quickstart)** | 首次对话和需要尝试的关键功能 |
| 🗺️ **[学习路径](/docs/getting-started/learning-path)** | 根据你的经验水平找到合适的文档 |
| ⚙️ **[配置指南](/docs/user-guide/configuration)** | 配置文件、提供商、模型和选项 |
| 💬 **[消息网关](/docs/user-guide/messaging)** | 设置 Telegram、Discord、Slack 或 WhatsApp |
| 🔧 **[工具与工具集](/docs/user-guide/features/tools)** | 47 个内置工具及配置方法 |
| 🧠 **[记忆系统](/docs/user-guide/features/memory)** | 跨会话持久记忆 |
| 📚 **[技能系统](/docs/user-guide/features/skills)** | 智能体创建的程序化记忆 |
| 🔌 **[MCP 集成](/docs/user-guide/features/mcp)** | 连接 MCP 服务器、安全扩展工具 |
| 🧭 **[MCP 使用指南](/docs/guides/use-mcp-with-hermes)** | MCP 设置实操模式和教程 |
| 🎙️ **[语音模式](/docs/user-guide/features/voice-mode)** | CLI、Telegram、Discord 和 Discord VC 的实时语音交互 |
| 🗣️ **[语音使用指南](/docs/guides/use-voice-mode-with-hermes)** | Hermes 语音工作流实操设置和使用模式 |
| 🎭 **[人格与 SOUL.md](/docs/user-guide/features/personality)** | 用全局 SOUL.md 定义 Hermes 的默认声音 |
| 📄 **[上下文文件](/docs/user-guide/features/context-files)** | 塑造每次对话的项目上下文文件 |
| 🔒 **[安全设置](/docs/user-guide/security)** | 命令审批、授权、容器隔离 |
| 💡 **[技巧与最佳实践](/docs/guides/tips)** | 快速提升 Hermes 使用效率 |
| 🏗️ **[架构文档](/docs/developer-guide/architecture)** | 底层工作原理 |
| ❓ **[常见问题](/docs/reference/faq)** | 常见问题和解决方案 |

## 核心功能

- **闭环学习循环** — 智能体自发整理的记忆，周期性提醒，自主技能创建，使用中技能自我改进，FTS5 跨会话召回与 LLM 总结，以及 [Honcho](https://github.com/plastic-labs/honcho) 方言用户建模
- **运行在任何地方** — 6 种终端后端：本地、Docker、SSH、Daytona、Singularity、Modal。Daytona 和 Modal 提供无服务器持久化——空闲时休眠，几乎不花钱
- **在你常用的平台** — CLI、Telegram、Discord、Slack、WhatsApp、Signal、Matrix、Mattermost、Email、SMS、钉钉、飞书、企业微信、BlueBubbles、Home Assistant——一个网关 15+ 平台
- **模型训练器打造** — 由 [Nous Research](https://nousresearch.com) 创建，支持 Hermes、Nomos 和 Psyche。支持 [Nous Portal](https://portal.nousresearch.com)、[OpenRouter](https://openrouter.ai)、OpenAI 或任何端点
- **定时自动化** — 内置定时任务，投递到任何平台
- **委托与并行** — 为并行工作流生成独立子智能体。程序化工具调用通过 `execute_code` 将多步管道折叠为单次推理调用
- **开放标准技能** — 兼容 [agentskills.io](https://agentskills.io)。技能可移植、可分享，通过技能中心社区贡献
- **完整网页控制** — 搜索、提取、浏览、视觉、图像生成、TTS
- **MCP 支持** — 连接任何 MCP 服务器扩展工具能力
- **研究就绪** — 批量处理、轨迹导出、Atropos 强化学习训练。由 [Nous Research](https://nousresearch.com)打造——Hermes、Nomos 和 Psyche 模型背后的实验室