'use client'

import { useState } from 'react'

type TabType = 'summary' | 'mindmap' | 'quiz' | 'code' | 'notes'

const mockSources = [
  'Lecture_04_Roman_History.mp4',
  'youtube.com/watch?v=history_of_rome',
  'Paper_v2.pdf',
  'triangle-formula.png',
  'notes.md',
]

const mockSummary = `机器学习是人工智能的一个分支，使系统能够从数据中学习。它包含三种主要范式：

**监督学习**使用标注数据进行分类和回归，典型算法包括线性回归、决策树、支持向量机和神经网络。

**无监督学习**在未标注数据中发现隐藏模式，常见任务包括聚类、降维和生成模型。

**强化学习**通过试错和奖励优化决策智能体在环境中的行为。`

export default function ExtractPage() {
  const [activeTab, setActiveTab] = useState<TabType>('summary')
  const [sources, setSources] = useState(mockSources)

  const tabs: { key: TabType; label: string }[] = [
    { key: 'summary', label: '总结' },
    { key: 'mindmap', label: '思维导图' },
    { key: 'quiz', label: '测验' },
    { key: 'code', label: '代码' },
    { key: 'notes', label: '笔记' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h1 text-text-main">内容提炼</h1>
        <p className="text-body text-text-secondary mt-2">
          化繁为简。将数小时的视频内容和复杂文档转化为精准、结构化的知识体系。
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-3/10">
          <div className="card">
            <h2 className="text-h2 text-text-main mb-4">输入来源</h2>
            <ul className="space-y-2">
              {sources.map((source, idx) => (
                <li
                  key={idx}
                  className="text-small text-text-secondary py-2 border-b border-border last:border-0"
                >
                  {source}
                </li>
              ))}
            </ul>
            <button className="btn-secondary w-full mt-4">添加来源</button>
          </div>
        </aside>

        <section className="w-full md:w-7/10">
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-accent border-b-2 border-accent -mb-px'
                    : 'text-text-secondary hover:text-text-main'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="card mt-4">
            <h2 className="text-h2 text-text-main">{tabs.find(t => t.key === activeTab)?.label}</h2>
            <div className="mt-4 text-body text-text-main leading-relaxed whitespace-pre-line">
              {mockSummary}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
