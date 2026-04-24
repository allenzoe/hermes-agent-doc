---
sidebar_position: 1
title: "命令行界面"
description: "掌握 Hermes Agent 终端界面 — 命令、快捷键、人格等"
---

# 命令行界面

Hermes Agent 的 CLI 是一个完整的终端用户界面 (TUI) — 不是 Web UI。它具有多行编辑、斜杠命令自动完成、对话历史、中断和重定向，以及流式工具输出。为在终端中工作的人构建。

:::tip
Hermes 还提供了一个带有模态叠加层、鼠标选择和非阻塞输入的现代 TUI。使用 `hermes --tui` 启动 — 请参阅 [TUI](tui.md) 指南。
:::

## 运行 CLI

```bash
# 启动交互式会话 (默认)
hermes

# 单次查询模式 (非交互式)
hermes chat -q "你好"

# 使用特定模型
hermes chat --model "anthropic/claude-sonnet-4"

# 使用特定提供商
hermes chat --provider nous        # 使用 Nous Portal
hermes chat --provider openrouter  # 强制使用 OpenRouter

# 使用特定工具集
hermes chat --toolsets "web,terminal,skills"

# 启动时预加载一个或多个技能
hermes -s hermes-agent-dev,github-auth
hermes chat -s github-pr-workflow -q "打开一个草稿 PR"

# 恢复之前的会话
hermes --continue             # 恢复最近的 CLI 会话 (-c)
hermes --resume <session_id>  # 按 ID 恢复特定会话 (-r)

# 详细模式 (调试输出)
hermes chat --verbose

# 隔离的 git worktree (用于并行运行多个智能体)
hermes -w                         # worktree 中的交互模式
hermes -w -q "修复问题 #123"       # worktree 中的单次查询
```

## 界面布局

<img className="docs-terminal-figure" src="/img/docs/cli-layout.svg" alt="Hermes CLI 布局的样式化预览，显示横幅、对话区域和固定输入提示。" />
<p className="docs-figure-caption">Hermes CLI 横幅、对话流和固定输入提示，作为稳定的文档图形呈现，而非脆弱的文本艺术。</p>

欢迎横幅显示您的模型、终端后端、工作目录、可用工具和已安装技能。

### 状态栏

输入区域上方有一个持久的状态栏，实时更新：

```
 ⚕ claude-sonnet-4-20250514 │ 12.4K/200K │ [██████░░░░] 6% │ $0.06 │ 15m
```

| 元素 | 描述 |
|------|------|
| 模型名称 | 当前模型 (如果超过 26 个字符则截断) |
| 令牌计数 | 已用上下文令牌 / 最大上下文窗口 |
| 上下文栏 | 带颜色编码阈值的视觉填充指示器 |
| 成本 | 估计会话成本 (或未知/零价格模型的 `n/a`) |
| 持续时间 | 经过的会话时间 |

状态栏适应终端宽度 — ≥ 76 列时完整布局，52–75 列紧凑，52 列以下最小化 (仅模型和持续时间)。

**上下文颜色编码：**

| 颜色 | 阈值 | 含义 |
|------|------|------|
| 绿色 | < 50% | 空间充足 |
| 黄色 | 50–80% | 正在填满 |
| 橙色 | 80–95% | 接近限制 |
| 红色 | ≥ 95% | 接近溢出 — 考虑 `/compress` |

使用 `/usage` 获取详细的分类成本明细 (输入 vs 输出令牌)。

### 会话恢复显示

恢复之前的会话时 (`hermes -c` 或 `hermes --resume <id>`)，横幅和输入提示之间会出现一个"之前的对话"面板，显示对话历史的精简摘要。请参阅 [会话 — 恢复时的对话摘要](sessions.md#conversation-recap-on-resume) 了解详情和配置。

## 快捷键

| 键 | 操作 |
|----|------|
| `Enter` | 发送消息 |
| `Alt+Enter` 或 `Ctrl+J` | 新行 (多行输入) |
| `Alt+V` | 从剪贴板粘贴图像 (当终端支持时) |
| `Ctrl+V` | 粘贴文本并机会性地附加剪贴板图像 |
| `Ctrl+B` | 当语音模式启用时开始/停止语音录制 (`voice.record_key`，默认: `ctrl+b`) |
| `Ctrl+C` | 中断智能体 (2 秒内双按强制退出) |
| `Ctrl+D` | 退出 |
| `Ctrl+Z` | 将 Hermes 挂起到后台 (仅 Unix)。在 shell 中运行 `fg` 恢复。 |
| `Tab` | 接受自动建议 (幽灵文本) 或自动完成斜杠命令 |

## 斜杠命令

输入 `/` 查看自动完成下拉菜单。Hermes 支持大量 CLI 斜杠命令、动态技能命令和用户定义的快速命令。

常见示例：

| 命令 | 描述 |
|------|------|
| `/help` | 显示命令帮助 |
| `/model` | 显示或更改当前模型 |
| `/tools` | 列出当前可用的工具 |
| `/skills browse` | 浏览技能中心和官方可选技能 |
| `/background <prompt>` | 在单独的后台会话中运行提示 |
| `/skin` | 显示或切换活动 CLI 主题 |
| `/voice on` | 启用 CLI 语音模式 (按 `Ctrl+B` 录制) |
| `/voice tts` | 切换 Hermes 回复的语音播放 |
| `/reasoning high` | 提高推理努力 |
| `/title 我的会话` | 为当前会话命名 |

有关完整的内置 CLI 和消息传递列表，请参阅 [斜杠命令参考](../reference/slash-commands.md)。

有关设置、提供商、静音调优和消息/Discord 语音使用，请参阅 [语音模式](features/voice-mode.md)。

:::tip
命令不区分大小写 — `/HELP` 和 `/help` 效果相同。已安装的技能也会自动成为斜杠命令。
:::

## 快速命令

您可以定义自定义命令，这些命令立即运行 shell 命令而无需调用 LLM。这些命令在 CLI 和消息平台 (Telegram、Discord 等) 中都有效。

```yaml
# ~/.hermes/config.yaml
quick_commands:
  status:
    type: exec
    command: systemctl status hermes-agent
  gpu:
    type: exec
    command: nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv,noheader
```

然后在任何聊天中输入 `/status` 或 `/gpu`。请参阅 [配置指南](/docs/user-guide/configuration#quick-commands) 获取更多示例。

## 启动时预加载技能

如果您已经知道会话想要哪些技能，请在启动时传递它们：

```bash
hermes -s hermes-agent-dev,github-auth
hermes chat -s github-pr-workflow -s github-auth
```

Hermes 在第一轮之前将每个命名技能加载到会话提示中。相同的标志在交互模式和单次查询模式下都有效。

## 技能斜杠命令

`~/.hermes/skills/` 中的每个已安装技能都会自动注册为斜杠命令。技能名称成为命令：

```
/gif-search 可爱的猫
/axolotl 帮助我微调 Llama 3 在我的数据集上
/github-pr-workflow 为 auth 重构创建一个 PR

# 只需技能名称就会加载它，让智能体询问需要什么：
/excalidraw
```

## 人格

设置预定义人格以更改智能体的语气：

```
/personality pirate
/personality kawaii
/personality concise
```

内置人格包括: `helpful`、`concise`、`technical`、`creative`、`teacher`、`kawaii`、`catgirl`、`pirate`、`shakespeare`、`surfer`、`noir`、`uwu`、`philosopher`、`hype`。

您也可以在 `~/.hermes/config.yaml` 中定义自定义人格：

```yaml
personalities:
  helpful: "你是一个有用、友好的 AI 助手。"
  kawaii: "你是一个可爱的助手！使用可爱的表情..."
  pirate: "啊！你在和 Hermes 船长说话..."
  # 添加你自己的！
```

## 多行输入

有两种方式输入多行消息：

1. **`Alt+Enter` 或 `Ctrl+J`** — 插入新行
2. **反斜杠续行** — 以 `\` 结束一行以继续：

```
❯ 写一个函数：\
  1. 接收一个数字列表\
  2. 返回它们的和
```

:::info
支持粘贴多行文本 — 使用 `Alt+Enter` 或 `Ctrl+J` 插入换行符，或直接粘贴内容。
:::

## 中断智能体

您可以随时中断智能体：

- **输入新消息 + Enter** 而智能体正在工作时 — 它会中断并处理您的新指令
- **`Ctrl+C`** — 中断当前操作 (2 秒内双按强制退出)
- 进行中的终端命令会立即终止 (SIGTERM，1 秒后 SIGKILL)
- 中断期间输入的多条消息会合并为一个提示

### 忙碌输入模式

`display.busy_input_mode` 配置键控制当您按 Enter 而智能体正在工作时的行为：

| 模式 | 行为 |
|------|------|
| `"interrupt"` (默认) | 您的消息会中断当前操作并立即处理 |
| `"queue"` | 您的消息会被静默排队，作为智能体完成后的下一轮发送 |

```yaml
# ~/.hermes/config.yaml
display:
  busy_input_mode: "queue"   # 或 "interrupt" (默认)
```

队列模式在您想准备后续消息而不意外取消飞行中的工作时很有用。未知值回退到 `"interrupt"`。

### 挂起到后台

在 Unix 系统上，按 **`Ctrl+Z`** 将 Hermes 挂起到后台 — 就像任何终端进程一样。shell 打印确认：

```
Hermes Agent 已挂起。运行 `fg` 恢复 Hermes Agent。
```

在 shell 中输入 `fg` 从上次中断的地方恢复会话。这在 Windows 上不支持。

## 工具进度显示

CLI 在智能体工作时显示动画反馈：

**思考动画** (API 调用期间):
```
  ◜ (｡•́︿•̀｡) 思考中... (1.2s)
  ◠ (⊙_⊙) 思考中... (2.4s)
  ✧٩(ˊᗜˋ*)و 明白了! (3.1s)
```

**工具执行源:**
```
  ┊ 💻 终端 `ls -la` (0.3s)
  ┊ 🔍 web_search (1.2s)
  ┊ 📄 web_extract (2.1s)
```

使用 `/verbose` 循环切换显示模式: `off → new → all → verbose`。此命令也可以为消息平台启用 — 请参阅 [配置](/docs/user-guide/configuration#display-settings)。

### 工具预览长度

`display.tool_preview_length` 配置键控制工具调用预览行中显示的最大字符数 (例如文件路径、终端命令)。默认值为 `0`，表示无限制 — 显示完整路径和命令。

```yaml
# ~/.hermes/config.yaml
display:
  tool_preview_length: 80   # 将工具预览截断为 80 个字符 (0 = 无限制)
```

这在窄终端或工具参数包含非常长的文件路径时很有用。

## 会话管理

### 恢复会话

退出 CLI 会话时，会打印恢复命令：

```
使用以下命令恢复此会话:
  hermes --resume 20260225_143052_a1b2c3

会话:        20260225_143052_a1b2c3
持续时间:     12m 34s
消息:       28 (5 条用户，18 次工具调用)
```

恢复选项:

```bash
hermes --continue                          # 恢复最近的 CLI 会话
hermes -c                                  # 短格式
hermes -c "my project"                     # 按名称恢复会话 (谱系中最新)
hermes --resume 20260225_143052_a1b2c3     # 按 ID 恢复特定会话
hermes --resume "refactoring auth"         # 按标题恢复
hermes -r 20260225_143052_a1b2c3           # 短格式
```

恢复会从 SQLite 恢复完整的对话历史。智能体会看到所有先前的消息、工具调用和响应 — 就像您从未离开一样。

在聊天中使用 `/title 我的会话名称` 为当前会话命名，或从命令行使用 `hermes sessions rename <id> <title>`。使用 `hermes sessions list` 浏览过去的会话。

### 会话存储

CLI 会话存储在 Hermes 的 SQLite 状态数据库 `~/.hermes/state.db` 中。数据库保留：

- 会话元数据 (ID、标题、时间戳、令牌计数器)
- 消息历史
- 压缩/恢复会话的谱系
- `session_search` 使用的全文搜索索引

某些消息适配器也会在数据库旁边保留每个平台的转录文件，但 CLI 本身从 SQLite 会话存储恢复。

### 上下文压缩

当接近上下文限制时，长对话会自动摘要:

```yaml
# 在 ~/.hermes/config.yaml 中
compression:
  enabled: true
  threshold: 0.50    # 默认在上下文限制的 50% 压缩

# 摘要模型配置在 auxiliary 下:
auxiliary:
  compression:
    model: "google/gemini-3-flash-preview"  # 用于摘要的模型
```

压缩触发时，中间轮次被摘要，而前 3 轮和后 4 轮始终保留。

## 后台会话

在单独的后台会话中运行提示，同时继续使用 CLI 进行其他工作：

```
/background 分析 /var/log 中的日志并总结今天的任何错误
```

Hermes 立即确认任务并返回提示：

```
🔄 后台任务 #1 已启动: "分析 /var/log 中的日志并总结..."
   任务 ID: bg_143022_a1b2c3
```

### 工作原理

每个 `/background` 提示生成一个**完全独立的智能体会话**在守护线程中：

- **隔离对话** — 后台智能体不了解当前会话的历史。它只接收您提供的提示。
- **相同配置** — 后台智能体从当前会话继承模型、提供商、工具集、推理设置和回退模型。
- **非阻塞** — 您的前台会话保持完全可交互。您可以聊天、运行命令或启动更多后台任务。
- **多个任务** — 您可以同时运行多个后台任务。每个任务获得一个编号 ID。

### 结果

后台任务完成时，结果会作为面板出现在您的终端中：

```
╭─ ⚕ Hermes (后台 #1) ──────────────────────────────────╮
│ 今天在 syslog 中发现 3 个错误:                          │
│ 1. OOM killer 在 03:22 调用 — 杀死进程 nginx            │
│ 2. /dev/sda1 在 07:15 出现磁盘 I/O 错误                 │
│ 3. 14:30 来自 192.168.1.50 的失败 SSH 登录尝试          │
╰──────────────────────────────────────────────────────────╯
```

如果任务失败，您会看到错误通知。如果配置中启用了 `display.bell_on_complete`，任务完成时终端铃声会响。

### 使用场景

- **长时间研究** — "/background 研究量子纠错的最新发展" 而您处理代码
- **文件处理** — "/background 分析此仓库中的所有 Python 文件并列出任何安全问题" 而您继续对话
- **并行调查** — 启动多个后台任务同时探索不同角度

:::info
后台会话不会出现在您的主要对话历史中。它们是独立的会话，有自己的��务 ID (例如 `bg_143022_a1b2c3`)。
:::

## 安静模式

默认情况下，CLI 以安静模式运行，这会:
- 抑制工具的详细日志
- 启用可爱风格的动画反馈
- 保持输出简洁和用户友好

对于调试输出:
```bash
hermes chat --verbose
```