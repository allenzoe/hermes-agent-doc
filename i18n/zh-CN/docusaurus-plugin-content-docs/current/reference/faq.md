---
sidebar_position: 3
title: "常见问题和故障排除"
description: "Hermes Agent 常见问题解答和解决方案"
---

# 常见问题和故障排除

快速解答和修复最常见的问题和疑问。

---

## 常见问题

### Hermes 支持哪些 LLM 提供商？

Hermes Agent 与任何 OpenAI 兼容 API 配合使用。支持的提供商包括:

- **[OpenRouter](https://openrouter.ai/)** — 通过一个 API 密钥访问数百个模型 (推荐用于灵活性)
- **Nous Portal** — Nous Research 自己的推理端点
- **OpenAI** — GPT-4o、o1、o3 等
- **Anthropic** — Claude 模型 (通过 OpenRouter 或兼容代理)
- **Google** — Gemini 模型 (通过 OpenRouter 或兼容代理)
- **z.ai / 智谱 AI** — GLM 模型
- **Kimi / Moonshot AI** — Kimi 模型
- **MiniMax** — 国际和国内端点
- **本地模型** — 通过 [Ollama](https://ollama.com/)、[vLLM](https://docs.vllm.ai/)、[llama.cpp](https://github.com/ggerganov/llama.cpp)、[SGLang](https://github.com/sgl-project/sglang) 或任何 OpenAI 兼容服务器

使用 `hermes model` 设置您的提供商，或通过编辑 `~/.hermes/.env` 配置。请参阅 [环境变量](./environment-variables.md) 参考了解所有提供商密钥。

### 它能在 Windows 上运行吗？

**原生不支持。** Hermes Agent 需要类 Unix 环境。在 Windows 上，先安装 [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)，然后从中运行 Hermes。标准安装命令在 WSL2 中完美运行:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### 它能在 Android / Termux 上运行吗？

可以 — Hermes 现在有经过测试的 Android Termux 安装路径。

快速安装:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

有关详细手动步骤、支持的功能和当前限制，请参阅 [Termux 指南](../getting-started/termux.md)。

重要说明: 由于 `voice` extra 依赖 `faster-whisper` → `ctranslate2`，而 `ctranslate2` 不发布 Android 轮子，目前无法在 Android 上使用完整的 `.[all]` extra。使用经过测试的 `.[termux]` extra。

### 我的数据会发送到任何地方吗？

API 调用**仅发送到您配置的 LLM 提供商** (例如 OpenRouter、您的本地 Ollama 实例)。Hermes Agent 不收集遥测、使用数据或分析。您的对话、记忆和技能本地存储在 `~/.hermes/` 中。

### 我可以离线使用 / 与本地模型一起使用吗？

可以。运行 `hermes model`，选择**自定义端点**，然后输入您服务器的 URL:

```bash
hermes model
# 选择: 自定义端点 (手动输入 URL)
# API 基础 URL: http://localhost:11434/v1
# API 密钥: ollama
# 模型名称: qwen3.5:27b
# 上下文长度: 32768   ← 设置为您服务器的实际上下文窗口
```

或直接在 `config.yaml` 中配置:

```yaml
model:
  default: qwen3.5:27b
  provider: custom
  base_url: http://localhost:11434/v1
```

Hermes 在 `config.yaml` 中持久化端点、提供商和基础 URL，所以它会在重启后保留。如果您本地服务器恰好加载了一个模型，`/model custom` 会自动检测。您也可以在 config.yaml 中设置 `provider: custom` — 它是一等提供商，不是任何东西的别名。

这适用于 Ollama、vLLM、llama.cpp 服务器、SGLang、LocalAI 等。请参阅 [配置指南](../user-guide/configuration.md) 了解更多详情。

:::tip Ollama 用户
如果您在 Ollama 中设置了自定义 `num_ctx` (例如 `ollama run --num_ctx 16384`)，请确保在 Hermes 中设置匹配的上下文长度 — Ollama 的 `/api/show` 报告模型的*最大*上下文，而不是您配置的有效 `num_ctx`。
:::

:::tip 本地模型超时
Hermes 自动检测本地端点并放宽流式超时 (读取超时从 120 秒提高到 1800 秒，禁用陈旧的流检测)。如果您在非常大的上下文上仍然遇到超时，在 `.env` 中设置 `HERMES_STREAM_READ_TIMEOUT=1800`。请参阅 [本地 LLM 指南](../guides/local-llm-on-mac.md#timeouts) 了解更多详情。
:::

### 使用它需要多少费用？

Hermes Agent 本身是**免费和开源的** (MIT 许可证)。您只需支付所选提供商的 LLM API 使用费用。本地模型完全免费运行。

### 多人可以使用同一实例吗？

可以。[消息网关](../user-guide/messaging/index.md) 允许多个用户通过 Telegram、Discord、Slack、WhatsApp 或 Home Assistant 与同一 Hermes Agent 实例交互。访问通过允许列表 (特定用户 ID) 和 DM 配对 (第一个消息的用户声明访问权限) 控制。

### 记忆和技能有什么区别？

- **记忆** 存储**事实** — 智能体了解您、您的项目和偏好的内容。记忆基于相关性自动检索。
- **技能** 存储**程序** — 逐步说明如何做事情。技能在智能体遇到类似任务时被召回。

两者都跨会话持久化。请参阅 [记忆](../user-guide/features/memory.md) 和 [技能](../user-guide/features/skills.md) 了解更多详情。

### 我可以在自己的 Python 项目中使用它吗？

可以。导入 `AIAgent` 类并以编程方式使用 Hermes:

```python
from run_agent import AIAgent

agent = AIAgent(model="anthropic/claude-opus-4.7")
response = agent.chat("简要解释量子计算")
```

请参阅 [Python 库指南](../user-guide/features/code-execution.md) 了解完整的 API 使用方法。

---

## 故障排除

### 安装问题

#### 安装后 `hermes: command not found`

**原因:** 您的 shell 没有重新加载更新的 PATH。

**解决方案:**
```bash
# 重新加载您的 shell 配置
source ~/.bashrc    # bash
source ~/.zshrc     # zsh

# 或启动新的终端会话
```

如果仍然不工作，验证安装位置:
```bash
which hermes
ls ~/.local/bin/hermes
```

:::tip
安装程序将 `~/.local/bin` 添加到您的 PATH。如果您使用非标准 shell 配置，请手动添加 `export PATH="$HOME/.local/bin:$PATH"`。
:::

#### Python 版本太旧

**原因:** Hermes 需要 Python 3.11 或更高版本。

**解决方案:**
```bash
python3 --version   # 检查当前版本

# 安装更新的 Python
sudo apt install python3.12   # Ubuntu/Debian
brew install python@3.12      # macOS
```

安装程序自动处理这个 — 如果在手动安装期间看到这个错误，请先升级 Python。

#### 终端命令说 `node: command not found` (或 `nvm`、`pyenv`、`asdf`、…)

**原因:** Hermes 通过在启动时运行 `bash -l` 一次来构建每个会话环境快照。bash 登录 shell 读取 `/etc/profile`、`~/.bash_profile` 和 `~/.profile`，但**不会获取 `~/.bashrc`** — 所以在那里安装自己的工具 (`nvm`、`asdf`、`pyenv`、`cargo`、自定义 `PATH` 导出) 对快照不可见。这最常见于在 systemd 下运行 Hermes 或在最小 shell 中。

**解决方案:** Hermes 默认自动获取 `~/.bashrc`。如果不够 — 例如您是 zsh 用户，您的 PATH 在 `~/.zshrc` 中，或者您从独立文件初始化 `nvm` — 在 `~/.hermes/config.yaml` 中列出要获取的额外文件:

```yaml
terminal:
  shell_init_files:
    - ~/.zshrc                     # zsh 用户: 将 zsh 管理的 PATH 拉入 bash 快照
    - ~/.nvm/nvm.sh                # 直接 nvm 初始化 (无论 shell 如何都有效)
    - /etc/profile.d/cargo.sh      # 系统范围的 rc 文件
```

缺失的文件会静默跳过。获取发生在 bash 中，所以依赖 zsh 专用语法的文件可能会出错 — 如果这是一个问题，直接获取路径设置部分 (例如 nvm 的 `nvm.sh`) 而不是整个 rc 文件。

禁用自动获取行为 (严格登录 shell 语义):

```yaml
terminal:
  auto_source_bashrc: false
```

#### `uv: command not found`

**原因:** `uv` 包管理器未安装或不在 PATH 中。

**解决方案:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
```

#### 安装期间权限拒绝错误

**原因:** 写入安装目录的权限不足。

**解决方案:**
```bash
# 不要使用 sudo 运行安装程序 — 它安装到 ~/.local/bin
# 如果您之前用 sudo 安装过，清理:
sudo rm /usr/local/bin/hermes
# 然后重新运行标准安装程序
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

---

### 提供商和模型问题

#### `/model` 只显示一个提供商 / 无法切换提供商

**原因:** `/model` (在聊天会话内) 只能切换您**已经配置**的提供商。如果您只设置了 OpenRouter，那就是 `/model` 会显示的全部。

**解决方案:** 退出您的会话，在终端使用 `hermes model` 添加新提供商:

```bash
# 先退出 Hermes 聊天会话 (Ctrl+C 或 /quit)

# 运行完整提供商设置向导
hermes model

# 这让您: 添加提供商、运行 OAuth、输入 API 密钥、配置端点
```

通过 `hermes model` 添加新提供商后，启动新聊天会话 — `/model` 现在会显示您所有配置的提供商。

:::tip 快速参考
| 想要... | 使用 |
|--------|-----|
| 添加新提供商 | `hermes model` (从终端) |
| 输入/更改 API 密钥 | `hermes model` (从终端) |
| 会话中切换模型 | `/model <名称>` (会话内) |
| 切换到不同的配置提供商 | `/model provider:model` (会话内) |
:::

#### API 密钥不工作

**原因:** 密钥缺失、过期、设置错误或用于错误的提供商。

**解决方案:**
```bash
# 检查您的配置
hermes config show

# 重新配置您的提供商
hermes model

# 或直接设置
hermes config set OPENROUTER_API_KEY sk-or-v1-xxxxxxxxxxxx
```

:::warning
确保密钥与提供商匹配。OpenAI 密钥不能与 OpenRouter 一起使用，反之亦然。检查 `~/.hermes/.env` 中的冲突条目。
:::

#### 模型不可用 / 找不到模型

**原因:** 模型标识符不正确或您的提供商上没有该模型。

**解决方案:**
```bash
# 列出您提供商的可用模型
hermes model

# 设置有效模型
hermes config set HERMES_MODEL anthropic/claude-opus-4.7

# 或按会话指定
hermes chat --model openrouter/meta-llama/llama-3.1-70b-instruct
```

#### 速率限制 (429 错误)

**原因:** 您已超过提供商的速率限制。

**解决方案:** 等一会儿再试。对于持续使用，考虑:
- 升级您的提供商计划
- 切换到不同的模型或提供商
- 使用 `hermes chat --provider <alternative>` 路由到不同的后端

#### 超出上下文长度

**原因:** 对话对于模型的上下文窗口来说太长了，或者 Hermes 检测到您模型的上下文长度错误。

**解决方案:**
```bash
# 压缩当前会话
/compress

# 或启动新会话
hermes chat

# 使用具有更大上下文窗口的模型
hermes chat --model openrouter/google/gemini-3-flash-preview
```

如果这发生在第一个长对话中，Hermes 可能对您的模型有错误的上下文长度。检查它检测到的值:

查看 CLI 启动行 — 它显示检测到的上下文长度 (例如 `📊 上下文限制: 128000 个令牌`)。您也可以在会话期间用 `/usage` 检查。

要修复上下文检测，在 `config.yaml` 中显式设置:

```yaml
# 在 ~/.hermes/config.yaml
model:
  default: your-model-name
  context_length: 131072  # 您的模型实际上下文窗口
```

---

### 终端问题

#### 命令被阻止为危险

**原因:** Hermes 检测到潜在破坏性命令 (例如 `rm -rf`、`DROP TABLE`)。这是一个安全功能。

**解决方案:** 出现提示时，审查命令并输入 `y` 批准。您也可以:
- 要求智能体使用更安全的替代方案
- 在 [安全文档](../user-guide/security.md) 中查看危险模式完整列表

:::tip
这正在按预期工作 — Hermes 永远不会静默运行破坏性命令。批准提示向您显示确切将要执行的内容。
:::

#### 通过消息网关 `sudo` 不工作

**原因:** 消息网关在没有交互式终端的情况下运行，所以 `sudo` 无法提示输入密码。

**解决方案:**
- 在消息中避免使用 `sudo` — 要求智能体找到替代方案
- 如果必须使用 `sudo`，在 `/etc/sudoers` 中为特定命令配置无密码 sudo
- 或切换到终端界面进行管理任务: `hermes chat`

#### Docker 后端无法连接

**原因:** Docker 守护进程未运行或用户没有权限。

**解决方案:**
```bash
# 检查 Docker 是否运行
docker info

# 将您的用户添加到 docker 组
sudo usermod -aG docker $USER
newgrp docker

# 验证
docker run hello-world
```

---

### 消息问题

#### 机器人不响应消息

**原因:** 机器人未运行、未授权，或您的用户不在允许列表中。

**解决方案:**
```bash
# 检查网关是否运行
hermes gateway status

# 启动网关
hermes gateway start

# 检查日志中的错误
cat ~/.hermes/logs/gateway.log | tail -50
```

#### 消息不投递

**原因:** 网络问题、机器人令牌过期或平台 webhook 配置错误。

**解决方案:**
- 用 `hermes gateway setup` 验证您的机器人令牌有效
- 检查网关日志: `cat ~/.hermes/logs/gateway.log | tail -50`
- 对于基于 webhook 的平台 (Slack、WhatsApp)，确保您的服务器可公开访问

#### 允许列表混乱 — 谁可以与机器人交谈？

**原因:** 授权模式决定谁获得访问权限。

**解决方案:**

| 模式 | 如何工作 |
|------|---------|
| **允许列表** | 只有配置中列出的用户 ID 可以交互 |
| **DM 配对** | 第一个在 DM 中消息的用户声明独占访问权限 |
| **开放** | 任何人都可以交互 (生产中不推荐) |

在 `~/.hermes/config.yaml` 中网关设置下配置。请参阅 [消息文档](../user-guide/messaging/index.md)。

#### 网关无法启动

**原因:** 缺少依赖项、端口冲突或令牌配置错误。

**解决方案:**
```bash
# 安装消息依赖项
pip install "hermes-agent[telegram]"   # 或 [discord], [slack], [whatsapp]

# 检查端口冲突
lsof -i :8080

# 验证配置
hermes config show
```

#### WSL: 网关持续断开连接或 `hermes gateway start` 失败

**原因:** WSL 的 systemd 支持不可靠。许多 WSL2 安装没有启用 systemd，即使启用，服务可能无法在 WSL 重启或 Windows 空闲关机后存活。

**解决方案:** 使用前台模式而非 systemd 服务:

```bash
# 选项 1: 直接前台 (最简单)
hermes gateway run

# 选项 2: 通过 tmux 持久化 (终端关闭后保持)
tmux new -s hermes 'hermes gateway run'
# 稍后重新附加: tmux attach -t hermes

# 选项 3: 通过 nohup 后台运行
nohup hermes gateway run > ~/.hermes/logs/gateway.log 2>&1 &
```

如果您仍想尝试 systemd，请确保已启用:

1. 打开 `/etc/wsl.conf` (如果不存在则创建)
2. 添加:
   ```ini
   [boot]
   systemd=true
   ```
3. 从 PowerShell: `wsl --shutdown`
4. 重新打开 WSL 终端
5. 验证: `systemctl is-system-running` 应该显示 "running" 或 "degraded"

:::tip Windows 启动时自动启动
对于可靠的自动启动，使用 Windows 任务计划程序在登录时启动 WSL + 网关:
1. 创建运行 `wsl -d Ubuntu -- bash -lc 'hermes gateway run'` 的任务
2. 设置在用户登录时触发
:::

#### macOS: Node.js / ffmpeg / 其他工具对网关不可见

**原因:** launchd 服务继承最小 PATH (`/usr/bin:/bin:/usr/sbin:/sbin`)，不包括 Homebrew、nvm、cargo 或其他用户安装的工具目录。这通常会破坏 WhatsApp 桥接 (`node not found`) 或语音转录 (`ffmpeg not found`)。

**解决方案:** 网关在您运行 `hermes gateway install` 时捕获您的 shell PATH。如果您在该工具后安装了工具，重新运行安装以捕获更新的 PATH:

```bash
hermes gateway install    # 重新快照您当前的 PATH
hermes gateway start      # 检测到更新的 plist 并重新加载
```

---

### 性能问题

#### 响应慢

**原因:** 大模型、远程 API 服务器或带有许多工具的繁重系统提示。

**解决方案:**
- 尝试更小/更快的模型: `hermes chat --model openrouter/meta-llama/llama-3.1-8b-instruct`
- 减少活动工具集: `hermes chat -t "terminal"`
- 检查到提供商的网��延迟
- 对于本地模型，确保您有足够的 GPU VRAM

#### 高令牌使用量

**原因:** 长对话、冗长的系统提示或累积上下文的许多工具调用。

**解决方案:**
```bash
# 压缩对话以减少令牌
/compress

# 检查会话令牌使用量
/usage
```

:::tip
在长会话期间定期使用 `/compress`。它总结对话历史，在保留上下文的同时显著减少令牌使用量。
:::

#### 会话变得太长

**原因:** 扩展对话累积消息和工具输出，接近上下文限制。

**解决方案:**
```bash
# 压缩当前会话 (保留关键上下文)
/compress

# 在引用旧会话的情况下启动新会话
hermes chat

# 稍后需要时恢复特定会话
hermes chat --continue
```

---

### MCP 问题

#### MCP 服务器无法连接

**原因:** 服务器二进制文件未找到、命令路径错误或缺少运行时。

**解决方案:**
```bash
# 确保 MCP 依赖已安装 (标准安装已包含)
cd ~/.hermes/hermes-agent && uv pip install -e ".[mcp]"

# 对于基于 npm 的服务器，确保 Node.js 可用
node --version
npx --version

# 手动测试服务器
npx -y @modelcontextprotocol/server-filesystem /tmp
```

验证您的 `~/.hermes/config.yaml` MCP 配置:
```yaml
mcp_servers:
  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/docs"]
```

#### MCP 工具不出现

**原因:** 服务器启动但工具发现失败，工具被配置过滤，或者服务器不支持您期望的 MCP 能力。

**解决方案:**
- 检查网关/智能体日志中的 MCP 连接错误
- 确保服务器响应 `tools/list` RPC 方法
- 审查该服务器下任何 `tools.include`、`tools.exclude`、`tools.resources`、`tools.prompts` 或 `enabled` 设置
- 记住资源/提示实用工具只在会话实际支持这些能力时才会注册
- 配置更改后使用 `/reload-mcp`

```bash
# 验证 MCP 服务器已配置
hermes config show | grep -A 12 mcp_servers

# 配置更改后重启 Hermes 或重新加载 MCP
hermes chat
```

另请参阅:
- [MCP (模型上下文协议)](/docs/user-guide/features/mcp)
- [将 MCP 与 Hermes 结合使用](/docs/guides/use-mcp-with-hermes)
- [MCP 配置参考](/docs/reference/mcp-config-reference)

#### MCP 超时错误

**原因:** MCP 服务器响应时间过长，或者它在执行期间崩溃。

**解决方案:**
- 如果支持，在 MCP 服务器配置中增加超时
- 检查 MCP 服务器进程是否仍在运行
- 对于远程 HTTP MCP 服务器，检查网络连接

:::warning
如果 MCP 服务器在请求中间崩溃，Hermes 会报告超时。检查服务器自己的日志 (不仅仅是 Hermes 日志) 以诊断根本原因。
:::

---

## 配置文件

### 配置文件与 HERMES_HOME 有什么区别？

配置文件是 `HERMES_HOME` 之上的托管层。您*可以*在每个命令前手动设置 `HERMES_HOME=/some/path`，但配置文件会处理所有管道: 创建目录结构、生成 shell 别名 (`hermes-work`)、在 `~/.hermes/active_profile` 中跟踪活动配置文件，以及跨所有配置文件自动同步技能更新。它们还与标签完成集成，所以您不需要记住路径。

### 两个配置文件可以共享同一个机器人令牌吗？

不能。每个消息平台 (Telegram、Discord 等) 需要对机器人令牌的独占访问权限。如果两个配置文件尝试同时使用同一个令牌，第二个网关将无法连接。为每个配置文件创建一个单独的机器人 — 对于 Telegram，与 [@BotFather](https://t.me/BotFather) 交谈以制作额外的机器人。

### 配置文件共享记忆或会话吗？

不能。每个配置文件有自己的记忆存储、会话数据库和技能目录。它们完全隔离。如果您想用现有记忆和会话启动新配置文件，使用 `hermes profile create newname --clone-all` 复制所有内容。

### 运行 `hermes update` 时会发生什么？

`hermes update` 拉取最新代码并重新安装依赖项**一次** (不是按配置文件)。然后它自动将更新的技能同步到所有配置文件。您只需要运行一次 `hermes update` — 它覆盖机器上的每个配置文件。

### 我可以将配置文件移动到不同的机器吗？

可以。将配置文件导出为便携档案，然后在另一台机器上导入:

```bash
# 在源机器上
hermes profile export work ./work-backup.tar.gz

# 将文件复制到目标机��，然后:
hermes profile import ./work-backup.tar.gz work
```

导入的配置文件将包含导出中的所有配置、记忆、会话和技能。如果新机器有不同设置，您可能需要更新路径或重新验证提供商的认证。

### 我可以运行多少个配置文件？

没有硬限制。每个配置文件只是 `~/.hermes/profiles/` 下的一个目录。实际限制取决于您的磁盘空间和系统可以处理多少并发网关 (每个网关是一个轻量级 Python 进程)。运行数十个配置文件没问题；每个空闲配置文件不使用资源。

---

## 工作流和模式

### 对不同任务使用不同模型 (多模型工作流)

**场景:** 您将 GPT-5.4 作为日常司机使用，但 Gemini 或 Grok 写社交媒体内容更好。每次手动切换模型很繁琐。

**解决方案: 委托配置。** Hermes 可以自动将子智能体路由到不同模型。在 `~/.hermes/config.yaml` 中设置:

```yaml
delegation:
  model: "google/gemini-3-flash-preview"   # 子智能体使用此模型
  provider: "openrouter"                    # 子智能体的提供商
```

现在当您告诉 Hermes"为我写一个关于 X 的 Twitter 主题"并且它生成 `delegate_task` 子智能体时，该子智能体在 Gemini 上运行，而不是您的主模型。您的主要对话保持在 GPT-5.4 上。

您也可以在提示中明确: *"委托一个任务来写关于我们产品发布的社交媒体帖子。使用您的子智能体进行实际写作。"* 智能体会使用 `delegate_task`，它会自动获取委托配置。

有关委托工作原理的更多信息，请参阅 [子智能体委托](../user-guide/features/delegation.md)。

### 在一个 WhatsApp 号码上运行多个智能体 (按聊天绑定)

**场景:** 在 OpenClaw 中，您有绑定到特定 WhatsApp 聊天的多个独立智能体 — 一个用于家庭购物清单群组，另一个用于您的私人聊天。Hermes 能做到吗？

**当前限制:** Hermes 配置文件每个需要自己的 WhatsApp 号码/会话。您不能将多个配置文件绑定到同一 WhatsApp 号码上的不同聊天 — WhatsApp 桥接 (Baileys) 对每个号码使用一个认证会话。

**变通方案:**

1. **使用单一配置文件的性格切换。** 创建不同的 `AGENTS.md` 上下文文件或使用 `/personality` 命令更改行为���智能体看到它在哪个聊天中，可以适应。

2. **使用 cron 作业进行专门任务。** 对于购物清单跟踪器，设置监控特定聊天并管理列表的 cron 作业 — 不需要单独的智能体。

3. **使用单独的号码。** 如果您需要真正独立的智能体，为每个配置文件配对自己的 WhatsApp 号码。来自 Google Voice 等服务的虚拟号码可用于此。

4. **改用 Telegram 或 Discord。** 这些平台更自然地支持按聊天绑定 — 每个 Telegram 群或 Discord 频道获得自己的会话，您可以为每个配置文件运行多个机器人令牌 (在同一账户上)。

请参阅 [配置文件](../user-guide/profiles.md) 和 [WhatsApp 设置](../user-guide/messaging/whatsapp.md) 了解更多详情。

### 控制 Telegram 中显示的内容 (隐藏日志和推理)

**场景:** 您在 Telegram 中看到网关执行日志、Hermes 推理和工具调用细节，而不是仅最终输出。

**解决方案:** `config.yaml` 中的 `display.tool_progress` 设置控制显示多少工具活动:

```yaml
display:
  tool_progress: "off"   # 选项: off, new, all, verbose
```

- **`off`** — 仅最终响应。无工具调用，无推理，无日志。
- **`new`** — 在发生时显示新工具调用 (简短的一行)。
- **`all`** — 显示所有工具活动包括结果。
- **`verbose`** — 完整细节包括工具参数和输出。

对于消息平台，`off` 或 `new` 通常是您想要的。编辑 `config.yaml` 后，重启网关使更改生效。

您也可以通过 `/verbose` 命令 (如果启用) 按会话切换:

```yaml
display:
  tool_progress_command: true   # 在网关中启用 /verbose
```

### 在 Telegram 上管理技能 (斜杠命令限制)

**场景:** Telegram 有 100 个斜杠命令限制，您的技能正在超过它。您想在 Telegram 上禁用不需要的技能，但 `hermes skills config` 设置似乎不生效。

**解决方案:** 使用 `hermes skills config` 按平台禁用技能。这会写入 `config.yaml`:

```yaml
skills:
  disabled: []                    # 全局禁用的技能
  platform_disabled:
    telegram: [skill-a, skill-b]  # 仅在 telegram 上禁用
```

更改后，**重启网关** (`hermes gateway restart` 或终止并重新启动)。Telegram 机器人命令菜单在启动时重建。

:::tip
带有��常长描述的技能被截断为 40 个字符以保持在 Telegram 菜单的有效载荷大小限制内。如果技能没有出现，可能是总有效载荷大小问题而不是 100 个命令计数限制 — 禁用未使用的技能有助于两者。
:::

### 共享线程会话 (多个用户，一个对话)

**场景:** 您有一个 Telegram 或 Discord 线程，多个人提到机器人。您希望该线程中的所有提及成为一次共享对话，而不是单独的用户会话。

**当前行为:** Hermes 在大多数平台上按用户 ID 创建会话，因此每个人获得自己的对话上下文。这是设计使然，为隐私和上下文隔离。

**变通方案:**

1. **使用 Slack。** Slack 会话按线程而非用户键控。同一线程中的多个用户共享一个对话 — 这正是您描述的行为。这是最自然的匹配。

2. **使用带有单一用户的群聊。** 如果一个人是指定的"操作员"转发问题，会话保持统一。其他人可以阅读。

3. **使用 Discord 频道。** Discord 会话按频道键控，因此同一频道中的所有用户共享上下文。使用专用频道进行共享对话。

### 导出 Hermes 到另一台机器

**场景:** 您在一台机器上构建了技能、cron 作业和记忆，想将所有内容移至新的专用 Linux 机器。

**解决方案:**

1. 在新机器上安装 Hermes Agent:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
   ```

2. 复制您整个 `~/.hermes/` 目录**除了** `hermes-agent` 子目录 (那是代码仓库 — 新安装有自己的):
   ```bash
   # 在源机器上
   rsync -av --exclude='hermes-agent' ~/.hermes/ newmachine:~/.hermes/
   ```

   或使用配置文件导出/导入:
   ```bash
   # 在源机器上
   hermes profile export default ./hermes-backup.tar.gz

   # 在目标机器上
   hermes profile import ./hermes-backup.tar.gz default
   ```

3. 在新机器上运行 `hermes setup` 验证 API 密钥和提供商配置是否正常工作。重新验证任何消息平台 (特别是 WhatsApp，它使用 QR 配对)。

`~/.hermes/` 目录包含所有内容: `config.yaml`、`.env`、`SOUL.md`、`memories/`、`skills/`、`state.db` (会话)、`cron/` 和任何自定义插件。代码本身位于 `~/.hermes/hermes-agent/`，全新安装。

### 重新加载后安装的 shell 时权限被拒绝

**场景:** 运行 Hermes 安装程序后，`source ~/.zshrc` 给出权限拒绝错误。

**原因:** 这通常发生在 `~/.zshrc` (或 `~/.bashrc`) 文件权限不正确时，或者安装程序无法干净地写入它。这不是 Hermes 特定的问题 — 这是 shell 配置权限问题。

**解决方案:**
```bash
# 检查权限
ls -la ~/.zshrc

# 如有需要修复 (应该是 -rw-r--r-- 或 644)
chmod 644 ~/.zshrc

# 然后重新加载
source ~/.zshrc

# 或只需打开新的终端窗口 — 它会自动获取 PATH 更改
```

如果安装程序添加了 PATH 行但权限不正确，您可以手动添加:
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
```

### 首次智能体运行时错误 400

**场景:** 设置完成，但第一次聊天尝试失败，HTTP 400。

**原因:** 通常是模型名称不匹配 — 配置的模型在您的提供商上不存在，或 API 密钥无权访问它。

**解决方案:**
```bash
# 检查配置的模型和提供商
hermes config show | head -20

# 重新运行模型选择
hermes model

# 或使用已知良好的模型测试
hermes chat -q "你好" --model anthropic/claude-opus-4.7
```

如果使用 OpenRouter，确保您的 API 密钥有积分。OpenRouter 的 400 通常意味着模型需要付费计划或模型 ID 有拼写错误。

---

## 仍然卡住？

如果您的问题不在这里:

1. **搜索现有问题:** [GitHub Issues](https://github.com/NousResearch/hermes-agent/issues)
2. **询问社区:** [Nous Research Discord](https://discord.gg/nousresearch)
3. **提交错误报告:** 包括您的操作系统、Python 版本 (`python3 --version`)、Hermes 版本 (`hermes --version`) 和完整错误消息