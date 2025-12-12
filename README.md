# Vue 3 + Vite

# 代码格式化规范（Prettier）

项目使用 Prettier 统一代码格式化风格，核心配置文件为根目录下的 `.prettierrc.json`，所有规则如下：

## 核心配置规则说明

| 配置项                      | 取值          | 规则含义                                             | 适配场景                                    |
| --------------------------- | ------------- | ---------------------------------------------------- | ------------------------------------------- |
| `printWidth`                | `80`          | 单行代码最大字符数，超过自动换行                     | 避免单行代码过长，提升可读性                |
| `tabWidth`                  | `2`           | 缩进空格数为 2 个                                    | 符合 Vue/前端主流缩进规范                   |
| `useTabs`                   | `false`       | 禁用制表符（Tab），统一使用空格缩进                  | 避免不同编辑器 Tab 宽度不一致的问题         |
| `semi`                      | `true`        | 语句末尾强制添加分号                                 | 符合 JavaScript 语法规范，避免隐式换行 bug  |
| `singleQuote`               | `true`        | 字符串强制使用单引号                                 | 统一字符串引号风格，减少双引号转义场景      |
| `quoteProps`                | `"as-needed"` | 对象属性仅在必要时添加引号（如特殊字符、保留字）     | 简化对象写法，提升代码简洁性                |
| `trailingComma`             | `"none"`      | 禁止末尾逗号（如数组/对象最后一项后）                | 避免多余逗号导致的语法警告，适配低版本环境  |
| `bracketSpacing`            | `true`        | 对象大括号两侧保留空格（如 `{ a: 1 }`）              | 提升对象可读性，符合前端编码习惯            |
| `bracketSameLine`           | `false`       | 标签闭合括号换行显示（如 Vue 组件标签）              | 优化 Vue 模板长标签的排版，避免单行过长     |
| `arrowParens`               | `"avoid"`     | 箭头函数单个参数时省略括号（如 `x => x`）            | 简化箭头函数写法，代码更简洁                |
| `vueIndentScriptAndStyle`   | `true`        | Vue 文件中 `<script>`/`<style>` 标签内容跟随外层缩进 | 统一 Vue 单文件组件的缩进风格               |
| `endOfLine`                 | `crlf`        | Windows 换行符                                       | 纯 Windows 开发环境、需兼容系统默认行为     |
| `proseWrap`                 | `"preserve"`  | Markdown 文件保留原有换行格式                        | 保证文档类文件的排版可读性                  |
| `htmlWhitespaceSensitivity` | `"ignore"`    | HTML/Vue 模板中空格不敏感                            | 避免因空格导致的排版意外问题，适配 Vue 模板 |

## 生效范围

Prettier 会自动格式化以下文件：

- `.js`/`.mjs`/`.cjs`（JavaScript 文件）
- `.vue`（Vue 单文件组件，包含模板/脚本/样式）
- `.md`（Markdown 文档）
- `.html`（HTML 文件）

## 忽略格式化的文件

根目录 `.prettierignore` 文件指定了无需格式化的文件/目录：
