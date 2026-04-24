---
sidebar_position: 1
title: "快速入门"
description: "与 Hermes Agent 的首次对话——从安装到聊天，5 分钟内完成"
---

# 快速入门

本指南帮助你从零开始搭建可投入实际使用的 Hermes 环境。安装、选择提供商、验证聊天正常工作，并知道出问题时怎么做。

## 这是给谁的

- 完全新手，想最短路径搭建可用环境
- 切换提供商，不想在配置上浪费时间
- 为团队、机器人或常驻工作流设置 Hermes
- 厌倦了"安装了但什么都不会"

## 最快路径

选择符合你目标的行：

| 目标 | 首先做什么 | 然后做什么 |
|---|---|---|
| 我只想让 Hermes 在我机器上工作 | `hermes setup` | 运行真正的对话并验证响应 |
| 我已经知道我的提供商 | `hermes model` | 保存配置，然后开始聊天 |
| 我想要一个机器人或常驻设置 | CLI 正常工作后 `hermes gateway setup` | 连接 Telegram、Discord、Slack 或其他平台 |
| 我想要本地或自托管模型 | `hermes model` → custom endpoint | 验证 endpoint、模型名称和上下文长度 |
| 我想要多提供商 fallback | 首先 `hermes model` | 仅在基础聊天正常工作后添加路由和 fallback |

**经验法则：** 如果 Hermes 不能完成正常对话，先不要添加更多功能。先让一个干净的对话工作起来，然后再添加 gateway、cron、skills、voice 或 routing。

---

## 1. 安装 Hermes Agent

运行一行安装脚本：

```bash
# Linux / macOS / WSL2 / Android (Termux)
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

:::tip Android / Termux
如果要在手机上安装，请参阅专门的 [Termux 指南](./termux.md)，了解经过测试的手动路径、支持的功能和当前 Android 特定的限制。
:::

:::tip Windows 用户
首先安装 [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)，然后在 WSL2 终端中运行上面的命令。
:::

完成后，重新加载 shell：

```bash
source ~/.bashrc   # 或者 source ~/.zshrc
```

有关详细的安装选项、前置条件和故障排除，请参阅 [安装指南](./installation.md)。

## 2. 选择提供商

最重要的设置步骤。使用 `hermes model` 交互式选择：

```bash
hermes model
```

好的默认值：

| 情况 | 推荐路径 |
|---|---|
| 最简单 | Nous Portal 或 OpenRouter |
| 已经有了 Claude 或 Codex 认证 | Anthropic 或 OpenAI Codex |
| 你想要本地/私有推理 | Ollama 或任何自定义 OpenAI 兼容端点 |
| 你想要多提供商路由 | OpenRouter |
| 你有自定义 GPU 服务器 | vLLM、SGLang、LiteLLM 或任何 OpenAI 兼容端点 |

对于大多数初次用户：选择提供商，接受默认值，除非你知道为什么改变它们。完整提供商目录和环境变量设置步骤在 [提供商](../integrations/providers.md) 页面。

:::caution 最小上下文：64K tokens
Hermes Agent 需要至少 **64,000 tokens** 上下文的模型。上下文窗口较小的模型无法为多步工具调用工作流保持足够的内存，会在启动时被拒绝。大多数托管模型（Claude、GPT、 Gemini、Qwen、DeepSeek）都轻松满足此要求。如果运行本地模型，将其上下文大小设置为至少 64K（例如 llama.cpp 的 `--ctx-size 65536` 或 Ollama 的 `-c 65536`）。
:::

:::tip
你可以随时使用 `hermes model` 切换提供商——无锁定。所有支持的提供商完整列表和设置详情，请参阅 [AI 提供商](../integrations/providers.md)。
:::

### 如何存储设置

Hermes 将 secrets 和普通配置分开：

- **Secrets 和 tokens** → `~/.hermes/.env`
- **非秘密设置** → `~/.hermes/config.yaml`

通过 CLI 设置值的最简单方法：

```bash
hermes config set model anthropic/claude-opus-4.6
hermes config set terminal.backend docker
hermes config set OPENROUTER_API_KEY sk-or-...
```

正确的值自动进入正确的文件。

## 3. 运行你的第一个聊天

```bash
hermes            # 经典 CLI
hermes --tui      # 现代 TUI（推荐）
```

你会看到欢迎横幅，显示你的模型、可用工具和技能。使用具体且易于验证的提示：

:::tip 选择你的界面
Hermes 附带两个终端界面：经典的 `prompt_toolkit` CLI 和新的 [TUI](../user-guide/tui.md)，具有模态叠加、鼠标选择和非阻塞输入。两者共享相同的会话、斜杠命令和配置——分别尝试 `hermes` 和 `hermes --tui`。
:::

```
Summarize this repo in 5 bullets and tell me what the main entrypoint is.
```

```
Check my current directory and tell me what looks like the main project file.
```

```
Help me set up a clean GitHub PR workflow for this codebase.
```

**成功的表现：**

- 横幅显示你选择的模型/提供商
- Hermes 回复且无错误
- 它可以使用工具（如需要）：终端、文件读取、网页搜索
- 对话正常持续超过一轮

如果成功了，你就过了最困难的部分。

## 4. 验证会话工作

在继续之前，确保恢复工作正常：

```bash
hermes --continue    # 恢复最近的会话
hermes -c            # 简写形式
```

这应该回到你刚才的会话。如果没有，检查你是否在同一配置集中以及会话是否实际保存。这在你管理多个设置或机器时很重要。

## 5. 尝试关键功能

### 使用终端

```
❯ What's my disk usage? Show the top 5 largest directories.
```

智能体代表你运行终端命令并显示结果。

### 斜杠命令

输入 `/` 查看所有命令的自动完成下拉列表：

| 命令 | 功能 |
|---------|-------------|
| `/help` | 显示所有可用命令 |
| `/tools` | 列出可用工具 |
| `/model` | 交互式切换模型 |
| `/personality pirate` | 尝试有趣的人格 |
| `/save` | 保存对话 |

### 多行输入

按 `Alt+Enter` 或 `Ctrl+J` 添加新行。非常适合粘贴代码或编写详细提示。

### 打断智能体

如果智能体花费时间太长，输入新消息并按 Enter——它会中断当前任务并切换到你的新指令。`Ctrl+C` 也可以工作。

## 6. 添加下一层

仅在基础聊天正常工作后。选择你需要的：

### 机器人或共享助手

```bash
hermes gateway setup    # 交互式平台配置
```

连接 [Telegram](/docs/user-guide/messaging/telegram)、[Discord](/docs/user-guide/messaging/discord)、[Slack](/docs/user-guide/messaging/slack)、[WhatsApp](/docs/user-guide/messaging/whatsapp)、[Signal](/docs/user-guide/messaging/signal)、[Email](/docs/user-guide/messaging/email) 或 [Home Assistant](/docs/user-guide/messaging/homeassistant)。

### 自动化和工具

- `hermes tools` — per platform 调整工具访问
- `hermes skills` — 浏览和安装可重用工作流
- Cron — 仅在你的 bot 或 CLI 稳定后

### 沙箱终端

为安全起见，在 Docker 容器或远程服务器上运行智能体：

```bash
hermes config set terminal.backend docker    # Docker 隔离
hermes config set terminal.backend ssh       # 远程服务器
```

### 语音模式

```bash
pip install "hermes-agent[voice]"
# 包括免费的本地语音转文字 faster-whisper
```

然后在 CLI 中：`/voice on`。按 `Ctrl+B` 录音。参阅 [语音模式](../user-guide/features/voice-mode.md)。

### 技能

```bash
hermes skills search kubernetes
hermes skills install openai/skills/k8s
```

或在聊天会话中使用 `/skills`。

### MCP 服务器

```yaml
# 添加到 ~/.hermes/config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
```

### 编辑器集成（ACP）

```bash
pip install -e '.[acp]'
hermes acp
```

参阅 [ACP 编辑器集成](../user-guide/features/acp.md)。

---

## 常见故障模式

这些是浪费最多时间的问题：

| 症状 | 可能原因 | 修复 |
|---|---|---|
| Hermes 打开但是回复空或损坏 | 提供商认证或模型选择错误 | 再次运行 `hermes model` 并确认提供商、模型和认证 |
| 自定义端点"工作"但返回垃圾 | 错误的 base URL、模型名称或实际不是 OpenAI 兼容 | 首先在单独的客户端验证端点 |
| Gateway 启动但没有人能发消息 | Bot token、allowlist 或平台设置不完整 | 重新运行 `hermes gateway setup` 并检查 `hermes gateway status` |
| `hermes --continue` 找不到旧会话 | 切换了配置集或会话从未保存 | 检查 `hermes sessions list` 并确认你在正确的配置集中 |
| 模型不可用或奇怪的 fallback 行为 | 提供商路由或 fallback 设置太激进 | 在基础提供商稳定之前保持路由关闭 |
| `hermes doctor` 标记配置问题 | 配置值丢失或过时 | 修复配置，在添加功能之前先测试普通聊天 |

## 恢复工具包

当感觉不对时，按这个顺序使用：

1. `hermes doctor`
2. `hermes model`
3. `hermes setup`
4. `hermes sessions list`
5. `hermes --continue`
6. `hermes gateway status`

这个序列可以让你快速从"不好的感觉"回到已知状态。

---

## 快速参考

| 命令 | 描述 |
|---------|-------------|
| `hermes` | 开始聊天 |
| `hermes model` | 选择你的 LLM 提供商和模型 |
| `hermes tools` | 配置每个平台启用的工具 |
| `hermes setup` | 完整设置向导（一次配置 everything） |
| `hermes doctor` | 诊断问题 |
| `hermes update` | 更新到最新版本 |
| `hermes gateway` | 启动消息网关 |
| `hermes --continue` | 恢复最后会话 |

## 下一步

- **[CLI 指南](../user-guide/cli.md)** — 掌握终端界面
- **[配置指南](../user-guide/configuration.md)** — 自定义你的设置
- **[消息网关](../user-guide/messaging/index.md)** — 连接 Telegram、Discord、Slack、WhatsApp、Signal、Email 或 Home Assistant
- **[工具与工具集](../user-guide/features/tools.md)** — 探索可用功能
- **[AI 提供商](../integrations/providers.md)** — 完整提供商列表和设置详情
- **[技能系统](../user-guide/features/skills.md)** — 可重用工作流和知识
- **[技巧与最佳实践](../guides/tips.md)** — 高效用户技巧