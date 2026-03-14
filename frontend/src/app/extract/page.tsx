'use client'

import { useState, useEffect } from 'react'

type TabType = 'summary' | 'mindmap' | 'quiz' | 'code' | 'notes'

const mockSources = [
  'Lecture_04_Roman_History.mp4',
  'youtube.com/watch?v=history_of_rome',
  'Paper_v2.pdf',
  'triangle-formula.png',
  'notes.md',
]

const mockContent = {
  summary: `机器学习是人工智能的一个分支，使系统能够从数据中学习。它包含三种主要范式：

**监督学习**使用标注数据进行分类和回归，典型算法包括线性回归、决策树、支持向量机和神经网络。

**无监督学习**在未标注数据中发现隐藏模式，常见任务包括聚类、降维和生成模型。

**强化学习**通过试错和奖励优化决策智能体在环境中的行为。`,
  mindmap: `
    机器学习
    ├── 监督学习
    │   ├── 分类
    │   ├── 回归
    │   └── 算法：线性回归、决策树、SVM、神经网络
    ├── 无监督学习
    │   ├── 聚类
    │   ├── 降维
    │   └── 生成模型
    └── 强化学习
        ├── 马尔可夫决策过程
        ├── Q-学习
        └── 策略梯度
  `,
  quiz: [
    {
      question: '以下哪种学习范式使用标注数据？',
      options: ['监督学习', '无监督学习', '强化学习', '半监督学习'],
      answer: '监督学习'
    },
    {
      question: '聚类属于哪种学习范式？',
      options: ['监督学习', '无监督学习', '强化学习', '半监督学习'],
      answer: '无监督学习'
    }
  ],
  code: `# 线性回归示例
import numpy as np
from sklearn.linear_model import LinearRegression

# 生成样本数据
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# 创建并训练模型
model = LinearRegression()
model.fit(X, y)

# 预测
print(model.predict([[6]]))  # 输出: [12]`,
  notes: `
- 机器学习的核心是从数据中学习模式
- 监督学习需要标注数据
- 无监督学习可以发现数据中的隐藏模式
- 强化学习通过奖励机制学习最优策略
`
}

export default function ExtractPage() {
  const [activeTab, setActiveTab] = useState<TabType>('summary')
  const [sources, setSources] = useState(mockSources)
  const [isLoading, setIsLoading] = useState(false)
  const [showAddSource, setShowAddSource] = useState(false)
  const [newSource, setNewSource] = useState('')
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, string>>({})

  // 模拟加载效果
  const handleTabChange = (tab: TabType) => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveTab(tab)
      setIsLoading(false)
    }, 300)
  }

  // 添加新来源
  const handleAddSource = () => {
    if (newSource.trim()) {
      setSources([...sources, newSource.trim()])
      setNewSource('')
      setShowAddSource(false)
    }
  }

  // 处理测验答案选择
  const handleQuizAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: 'summary', label: '总结' },
    { key: 'mindmap', label: '思维导图' },
    { key: 'quiz', label: '测验' },
    { key: 'code', label: '代码' },
    { key: 'notes', label: '笔记' },
  ]

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-h1 text-text-main mb-4">内容提炼</h1>
        <p className="text-body text-text-secondary max-w-3xl">
          化繁为简。将数小时的视频内容和复杂文档转化为精准、结构化的知识体系。
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 输入来源 */}
        <aside className="w-full md:w-3/10">
          <div className="card">
            <h2 className="text-h2 text-text-main mb-6 flex items-center justify-between">
              输入来源
              <span className="text-small text-text-secondary">{sources.length} 个文件</span>
            </h2>
            <ul className="space-y-3">
              {sources.map((source, idx) => (
                <li
                  key={idx}
                  className="text-small text-text-secondary py-3 px-4 border border-border rounded-lg hover:bg-primary-bg-secondary transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>{source}</span>
                    <button className="text-text-secondary hover:text-red-500 transition-colors">
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* 添加来源按钮 */}
            <div className="mt-6 space-y-3">
              {!showAddSource ? (
                <button 
                  onClick={() => setShowAddSource(true)}
                  className="btn-secondary w-full py-3 hover:scale-102 transition-transform"
                >
                  添加来源
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    placeholder="输入文件路径或URL..."
                    className="input"
                  />
                  <div className="flex gap-3">
                    <button 
                      onClick={handleAddSource}
                      className="btn-primary flex-1 py-2"
                    >
                      添加
                    </button>
                    <button 
                      onClick={() => setShowAddSource(false)}
                      className="btn-secondary flex-1 py-2"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* 内容区域 */}
        <section className="w-full md:w-7/10">
          {/* 标签页 */}
          <div className="flex gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-5 py-3 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab.key
                    ? 'text-accent border-b-2 border-accent -mb-px'
                    : 'text-text-secondary hover:text-text-main hover:bg-primary-bg-secondary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 内容卡片 */}
          <div className="card mt-4 overflow-hidden">
            <div className="p-6">
              <h2 className="text-h2 text-text-main mb-6">{tabs.find(t => t.key === activeTab)?.label}</h2>
              
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 总结内容 */}
                  {activeTab === 'summary' && (
                    <div className="text-body text-text-main leading-relaxed whitespace-pre-line space-y-4">
                      {mockContent.summary.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="transition-opacity duration-500 hover:opacity-90">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {/* 思维导图 */}
                  {activeTab === 'mindmap' && (
                    <div className="bg-primary-bg-secondary p-6 rounded-lg">
                      <pre className="font-mono text-sm text-text-main whitespace-pre">
                        {mockContent.mindmap}
                      </pre>
                    </div>
                  )}
                  
                  {/* 测验 */}
                  {activeTab === 'quiz' && (
                    <div className="space-y-6">
                      {mockContent.quiz.map((quiz, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <h3 className="text-sm font-medium text-text-main mb-3">{idx + 1}. {quiz.question}</h3>
                          <div className="space-y-2">
                            {quiz.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleQuizAnswerSelect(idx, option)}
                                className={`w-full text-left px-4 py-2 rounded text-sm transition-colors ${
                                  selectedQuizAnswers[idx] === option
                                    ? 'bg-accent-light text-accent'
                                    : 'text-text-secondary hover:bg-primary-bg-secondary'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button className="btn-primary w-fit px-6 py-3 hover:scale-102 transition-transform">
                        提交答案
                      </button>
                    </div>
                  )}
                  
                  {/* 代码 */}
                  {activeTab === 'code' && (
                    <div className="bg-code-bg rounded-lg p-5">
                      <pre className="font-mono text-sm text-text-main whitespace-pre">
                        {mockContent.code}
                      </pre>
                    </div>
                  )}
                  
                  {/* 笔记 */}
                  {activeTab === 'notes' && (
                    <div className="space-y-4">
                      <textarea
                        defaultValue={mockContent.notes}
                        className="input h-40 resize-none"
                        placeholder="在这里添加你的笔记..."
                      />
                      <button className="btn-secondary px-4 py-2 w-fit">
                        保存笔记
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
