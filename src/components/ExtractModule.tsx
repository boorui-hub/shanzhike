import React from 'react'

const ExtractModule: React.FC = () => {
  return (
    <div className="container max-w-1200 mx-auto p-4">
      <h2>提炼</h2>
      <p className="sub-text">化繁为简。将数小时的视频内容和复杂文档转化为精准、结构化的知识体系。</p>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* 左侧输入来源 */}
        <div className="input-source w-full md:w-3/10 border rounded p-4">
          <h3 className="source-title">输入来源</h3>
          <ul className="source-list mt-2">
            <li className="source-item">Lecture_04_Roman_History.mp4</li>
            <li className="source-item">youtube.com/watch?v=history_of_rome</li>
            <li className="source-item">Paper_v2.pdf</li>
            <li className="source-item">triangle-formula.png</li>
            <li className="source-item">notes.md</li>
          </ul>
          <button className="upload-btn mt-4 w-full">添加来源</button>
        </div>
        {/* 右侧整合输出 */}
        <div className="output-content w-full md:w-7/10">
          {/* 标签切换 */}
          <div className="output-tab">
            <button className="tab-item active">总结</button>
            <button className="tab-item">思维导图</button>
            <button className="tab-item">测验</button>
            <button className="tab-item">代码</button>
            <button className="tab-item">笔记</button>
          </div>
          {/* 输出内容区 */}
          <div className="output-card border rounded p-4 mt-2">
            <h3 className="output-title">总结</h3>
            <p className="output-text mt-2">
              机器学习是人工智能的一个分支，使系统能够从数据中学习。它包含三种主要范式：监督学习使用标注数据进行分类和回归，无监督学习在未标注数据中发现隐藏模式，强化学习通过试错和奖励优化决策。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtractModule