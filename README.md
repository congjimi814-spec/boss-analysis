# BOSS直聘招聘数据分析可视化

<div align="center">

![Python](https://img.shields.io/badge/Python-3.x-blue)
![Flask](https://img.shields.io/badge/Flask-Web框架-green)
![License](https://img.shields.io/badge/License-MIT-orange)

</div>

---

## 项目简介

本项目使用 **Python + Flask** 构建，旨在对 BOSS直聘平台的招聘数据进行爬取、清洗、分析与可视化展示，帮助求职者直观了解当前就业市场的行业趋势、薪资分布、岗位需求等关键信息，为求职决策提供数据支撑。

## 技术栈

| 类别 | 技术/工具 |
|------|-----------|
| 编程语言 | Python 3.x |
| Web 框架 | Flask |
| 数据处理 | Pandas、NumPy |
| 数据可视化 | Matplotlib、Plotly |
| 数据存储 | SQLite / MySQL |
| 前端页面 | HTML + CSS + JavaScript |

## 项目结构

```
boss-zhipin-analysis/
├── backend/          # 后端逻辑目录
│   └── app.py        # Flask 应用主文件
├── frontend/         # 前端页面目录
│   └── index.html    # 主页模板
├── data/             # 数据文件目录
├── requirements.txt  # 项目依赖包列表
├── .gitignore        # Git 忽略文件配置
└── README.md         # 项目说明文档
```

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/conglimi814/boss-zhipin-analysis.git
cd boss-zhipin-analysis
```

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 运行项目

```bash
python backend/app.py
```

### 4. 访问应用

在浏览器中打开：[http://localhost:5000](http://localhost:5000)

## 功能模块

- **数据爬取**：自动抓取 BOSS直聘平台的招聘岗位信息（岗位名称、公司名称、薪资范围、工作地点、学历要求等）
- **数据清洗**：去除无效数据、统一格式、处理缺失值
- **数据分析**：按城市、行业、学历等维度统计薪资与岗位需求
- **可视化展示**：通过柱状图、折线图、饼图、词云等图表直观呈现分析结果

## 环境要求

- Python >= 3.8
- pip 包管理工具
- 稳定的网络连接（用于爬取数据）

## 注意事项

- 本项目仅用于学习和个人研究目的，请遵守相关法律法规及 BOSS直聘平台的使用条款
- 爬取数据时请注意控制请求频率，避免对目标服务器造成压力
- 建议配置 `.gitignore` 将虚拟环境和敏感配置文件排除在外

## 贡献指南

欢迎提交 Issue 或 Pull Request 来改进本项目！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- GitHub: [conglimi814](https://github.com/conglimi814)
- 如有问题或建议，欢迎通过 GitHub Issues 联系
