import React, { useState } from 'react'

const InteractiveExtractModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary')
  const [sources, setSources] = useState([
    'Lecture_04_Roman_History.mp4',
    'youtube.com/watch?v=history_of_rome',
    'Paper_v2.pdf',
    'triangle-formula.png',
    'notes.md'
  ])
  
  const tabs = [
    { id: 'summary', label: '总结' },
    { id: 'mindmap', label: '思维导图' },
    { id: 'quiz', label: '测验' },
    { id: 'code', label: '代码' },
    { id: 'notes', label: '笔记' }
  ]
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  
  const handleAddSource = () => {
    const newSource = `New Source ${sources.length + 1}`
    setSources([...sources, newSource])
  }
  
  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="output-card border rounded p-4 mt-2">
            <h3 className="output-title">总结</h3>
            <p className="output-text mt-2">
              机器学习是人工智能的一个分支，使系统能够从数据中学习。它包含三种主要范式：监督学习使用标注数据进行分类和回归，无监督学习在未标注数据中发现隐藏模式，强化学习通过试错和奖励优化决策。
            </p>
          </div>
        )
      case 'mindmap':
        return (
          <div className="output-card border rounded p-4 mt-2">
            <h3 className="output-title">思维导图</h3>
            <div className="mindmap-container p-4 bg-f1f3f5 rounded">
              <div className="mindmap-node">机器学习概述</div>
              <div className="mindmap-level">
                <div className="mindmap-node">监督学习</div>
                <div className="mindmap-level">
                  <div className="mindmap-node">分类</div>
                  <div className="mindmap-node">回归</div>
                </div>
              </div>
              <div className="mindmap-level">
                <div className="mindmap-node">无监督学习</div>
                <div className="mindmap-level">
                  <div className="mindmap-node">聚类</div>
                  <div className="mindmap-node">降维</div>
                </div>
              </div>
              <div className="mindmap-level">
                <div className="mindmap-node">强化学习</div>
                <div className="mindmap-level">
                  <div className="mindmap-node">Q学习</div>
                  <div className="mindmap-node">策略梯度</div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'quiz':
        return (
          <div className="output-card border rounded p-4 mt-2">
            <h3 className="output-title">测验</h3>
            <div className="quiz-item mb-4">
              <p className="quiz-question">1. 以下哪种学习范式使用标注数据？</p>
              <div className="quiz-options">
                <div className="quiz-option">
                  <input type="radio" name="q1" id="q1a" />
                  <label htmlFor="q1a">监督学习</label>
                </div>
                <div className="quiz-option">
                  <input type="radio" name="q1" id="q1b" />
                  <label htmlFor="q1b">无监督学习</label>
                </div>
                <div className="quiz-option">
                  <input type="radio" name="q1" id="q1c" />
                  <label htmlFor="q1c">强化学习</label>
                </div>
                <div className="quiz-option">
                  <input type="radio" name="q1" id="q1d" />
                  <label htmlFor="q1d">半监督学习</label>
                </div>
              </div>
            </div>
          </div>
        )
      case 'code':
        return (
          <div className="output-card border rounded p-4 mt-2">
            <h3 className="output-title">代码</h3>
            <pre className="code-block p-4 bg-f1f3f5 rounded">
              <code>
{`def hello_world():
    print("Hello, World!")

# 机器学习示例
def train_model(X, y):
    """训练机器学习模型"""
    from sklearn.linear_model import LogisticRegression
    model = LogisticRegression()
    model.fit(X, y)
    return model`}
              </code>
            </pre>
          </div>
        )
      case 'notes':
        return (
          <div className="output-card border rounded p-4 mt-2">
            <h3 className="output-title">笔记</h3>
            <p className="output-text mt-2">
              机器学习的核心是从数据中学习模式，而不是硬编码规则。
            </p>
            <p className="output-text mt-2">
              关键概念：
            </p>
            <ul className="notes-list ml-4 mt-2">
              <li>特征工程：选择和转换输入特征</li>
              <li>模型训练：使用算法学习数据模式</li>
              <li>模型评估：使用测试数据评估性能</li>
              <li>模型部署：将模型应用到实际场景</li>
            </ul>
          </div>
        )
      default:
        return null
    }
  }
  
  return (
    <div className="container max-w-1200 mx-auto p-4">
      <h2>提炼</h2>
      <p className="sub-text">化繁为简。将数小时的视频内容和复杂文档转化为精准、结构化的知识体系。</p>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* 左侧输入来源 */}
        <div className="input-source w-full md:w-3/10 border rounded p-4">
          <h3 className="source-title">输入来源</h3>
          <ul className="source-list mt-2">
            {sources.map((source, index) => (
              <li key={index} className="source-item">{source}</li>
            ))}
          </ul>
          <button className="upload-btn mt-4 w-full" onClick={handleAddSource}>添加来源</button>
        </div>
        {/* 右侧整合输出 */}
        <div className="output-content w-full md:w-7/10">
          {/* 标签切换 */}
          <div className="output-tab">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* 输出内容区 */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default InteractiveExtractModule