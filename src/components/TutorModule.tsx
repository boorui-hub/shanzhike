import React from 'react'

const TutorModule: React.FC = () => {
  return (
    <div className="container max-w-1200 mx-auto p-4">
      <h2>导师</h2>
      <p className="sub-text">专为教学而设计的对话引擎，而非仅仅回答问题。由全球领先的 AI 模型驱动。</p>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* 左侧上下文 */}
        <div className="context w-full md:w-1/4 border rounded p-4 sticky top-4">
          <h3 className="context-title">上下文</h3>
          <ul className="context-list mt-2">
            <li className="context-item">Computational Neuroscience Lesson 2.2</li>
            <li className="context-item">Lecture_04.mp4 1:24:30</li>
            <li className="context-item">Paper_v2.pdf</li>
            <li className="context-item">diagram.png</li>
          </ul>
        </div>
        {/* 右侧对话区 */}
        <div className="chat w-full md:w-3/4">
          {/* 对话记录 */}
          <div className="chat-record border rounded p-4 mb-4 h-96 overflow-y-auto">
            {/* 用户消息 */}
            <div className="chat-item user mb-4">
              <div className="chat-avatar">用户</div>
              <div className="chat-content p-3 bg-f8f9fa rounded">
                我对电缆方程感到困惑。它与神经元实际处理信息的方式有什么关系？
              </div>
            </div>
            {/* AI消息 */}
            <div className="chat-item ai mb-4">
              <div className="chat-avatar">Claude</div>
              <div className="chat-content p-3 rounded border">
                <p>好问题！把神经元想象成一根 <span className="highlight">漏水的花园水管</span>。当你打开一端的水时，整个管道的水压不会保持恒定。</p>
                <p className="mt-2">电缆方程从数学上描述了这种「泄漏」—— 信号如何在沿着树突传播时 <span className="highlight">随距离衰减</span>。 长度常数 (λ) 告诉我们信号能传播多远才会降到原始强度的 37%。</p>
                {/* 公式块 */}
                <div className="formula-block mt-2 p-2 bg-f1f3f5 rounded">
                  $∫∑π∂∞√∇$
                </div>
              </div>
            </div>
          </div>
          {/* 输入框 */}
          <div className="chat-input flex gap-2">
            <input type="text" className="input w-full border rounded p-2" placeholder="输入你的问题..." />
            <button className="send-btn bg-0d6efd text-white px-4 rounded">发送</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorModule