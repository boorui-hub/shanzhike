# Mentorbook.ai API 文档

## 一、API 基础信息

### 1. 基础 URL
- 开发环境：http://localhost:5000/api
- 生产环境：[生产环境URL]/api

### 2. 响应格式
所有 API 响应均为 JSON 格式，包含以下结构：

```json
{
  "success": true, // 操作是否成功
  "data": {}, // 响应数据
  "error": null // 错误信息（仅在失败时返回）
}
```

### 3. 错误处理
API 使用标准 HTTP 状态码表示错误：
- 400: 请求参数错误
- 404: 资源不存在
- 500: 服务器内部错误

## 二、课程相关 API

### 1. 获取课程列表
- **URL**: /course
- **方法**: GET
- **响应**: 课程列表

```json
[
  {
    "id": 1,
    "title": "计算神经科学",
    "progress": 45,
    "chapters": [
      {
        "id": 1,
        "title": "01. 神经编码",
        "sections": []
      },
      {
        "id": 2,
        "title": "02. 生物物理模型",
        "sections": [
          { "id": 1, "title": "Hodgkin-Huxley 模型", "active": true },
          { "id": 2, "title": "电缆理论" },
          { "id": 3, "title": "分区模型" }
        ],
        "active": true
      }
    ],
    "currentContent": {
      "title": "课时 2.2 电缆理论",
      "content": [
        "电缆理论描述了电信号如何沿着神经元突起传播...",
        "控制信号传播的基本方程是电缆方程..."
      ],
      "formula": "$∇²V = (λ)⁻²V + τ ∂V/∂t$"
    }
  }
]
```

### 2. 获取单个课程
- **URL**: /course/{id}
- **方法**: GET
- **参数**: id (课程ID)
- **响应**: 课程详情

### 3. 更新课程进度
- **URL**: /course/{id}/progress
- **方法**: PUT
- **参数**: 
  - id (课程ID)
  - progress (进度值，0-100)
- **响应**: 更新后的课程信息

## 三、提炼相关 API

### 1. 获取提炼内容
- **URL**: /extract
- **方法**: GET
- **响应**: 提炼内容

```json
{
  "id": 1,
  "sources": [
    "Lecture_04_Roman_History.mp4",
    "youtube.com/watch?v=history_of_rome",
    "Paper_v2.pdf",
    "triangle-formula.png",
    "notes.md"
  ],
  "outputs": {
    "summary": "机器学习是人工智能的一个分支...",
    "mindmap": {
      "id": 1,
      "name": "机器学习概述",
      "children": [
        {
          "id": 2,
          "name": "监督学习",
          "children": [
            { "id": 3, "name": "分类" },
            { "id": 4, "name": "回归" }
          ]
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "以下哪种学习范式使用标注数据？",
        "options": ["监督学习", "无监督学习", "强化学习", "半监督学习"],
        "answer": 0,
        "explanation": "监督学习使用标注数据进行模型训练。"
      }
    ],
    "code": "def hello_world():\n    print(\"Hello, World!\")",
    "notes": "机器学习的核心是从数据中学习模式..."
  }
}
```

### 2. 添加提炼来源
- **URL**: /extract/add-source
- **方法**: POST
- **参数**: source (来源路径或URL)
- **响应**: 更新后的来源列表

```json
{
  "success": true,
  "sources": [
    "Lecture_04_Roman_History.mp4",
    "youtube.com/watch?v=history_of_rome",
    "Paper_v2.pdf",
    "triangle-formula.png",
    "notes.md",
    "new-source.pdf"
  ]
}
```

## 四、导师对话相关 API

### 1. 获取对话会话
- **URL**: /tutor
- **方法**: GET
- **响应**: 对话会话信息

```json
{
  "id": 1,
  "context": [
    "Computational Neuroscience Lesson 2.2",
    "Lecture_04.mp4 1:24:30",
    "Paper_v2.pdf",
    "diagram.png"
  ],
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "我对电缆方程感到困惑...",
      "timestamp": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "role": "ai",
      "content": "好问题！把神经元想象成一根漏水的花园水管...",
      "formula": "$∫∑π∂∞√∇$",
      "timestamp": "2024-01-01T00:00:01Z"
    }
  ]
}
```

### 2. 发送消息
- **URL**: /tutor/message
- **方法**: POST
- **参数**: content (消息内容)
- **响应**: 更新后的消息列表

```json
{
  "success": true,
  "messages": [
    // 包含新消息的完整列表
  ]
}
```

### 3. 流式响应（SSE）
- **URL**: /tutor/stream
- **方法**: GET
- **参数**: content (消息内容)
- **响应**: 流式 SSE 响应

**SSE 数据格式：**
```
data: {"content": "好问题！把神经元想象成一根漏水的花园水管..."}

data: {"content": "当你打开一端的水时，整个管道的水压不会保持恒定..."}

data: {"done": true}
```

## 五、数据结构定义

### 1. 课程结构
```typescript
interface Course {
  id: number
  title: string
  progress: number
  chapters: Chapter[]
  currentContent: Content
}

interface Chapter {
  id: number
  title: string
  sections: Section[]
  active?: boolean
}

interface Section {
  id: number
  title: string
  active?: boolean
}

interface Content {
  title: string
  content: string[]
  formula: string
}
```

### 2. 提炼结构
```typescript
interface Extract {
  id: number
  sources: string[]
  outputs: {
    summary: string
    mindmap: Mindmap
    quiz: Quiz[]
    code: string
    notes: string
  }
}

interface Mindmap {
  id: number
  name: string
  children: MindmapNode[]
}

interface MindmapNode {
  id: number
  name: string
  children?: MindmapNode[]
}

interface Quiz {
  id: number
  question: string
  options: string[]
  answer: number
  explanation: string
}
```

### 3. 对话结构
```typescript
interface TutorSession {
  id: number
  context: string[]
  messages: Message[]
}

interface Message {
  id: number
  role: 'user' | 'ai'
  content: string
  formula?: string
  timestamp: string
}
```

## 六、开发说明

### 1. 缓存策略
- 高频访问的资源（如课程列表、提炼内容）使用内存缓存，缓存时间为 5 分钟
- 数据更新时自动清除相关缓存

### 2. 流式处理
- AI 对话采用 Server-Sent Events (SSE) 实现流式响应
- 前端使用 EventSource API 接收流式数据

### 3. 错误处理
- 前端应处理网络错误、超时等异常情况
- 后端返回统一的错误格式，前端根据错误码进行相应处理

### 4. 性能优化
- 前端使用 axios 进行 API 调用，配置请求超时和拦截器
- 后端实现缓存机制，减少数据库查询
- 流式响应减少前端等待时间，提升用户体验