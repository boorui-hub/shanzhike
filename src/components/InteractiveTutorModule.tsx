import React, { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  role: 'user' | 'ai'
  content: string
  formula?: string
  timestamp: string
}

const InteractiveTutorModule: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'user',
      content: '我对电缆方程感到困惑。它与神经元实际处理信息的方式有什么关系？',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      role: 'ai',
      content: '好问题！把神经元想象成一根漏水的花园水管。当你打开一端的水时，整个管道的水压不会保持恒定。电缆方程从数学上描述了这种「泄漏」—— 信号如何在沿着树突传播时随距离衰减。 长度常数 (λ) 告诉我们信号能传播多远才会降到原始强度的 37%。',
      formula: '$∫∑π∂∞√∇$',
      timestamp: new Date().toISOString()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  
  const context = [
    'Computational Neuroscience Lesson 2.2',
    'Lecture_04.mp4 1:24:30',
    'Paper_v2.pdf',
    'diagram.png'
  ]
  
  useEffect(() => {
    // 自动滚动到底部
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // 添加用户消息
    const newUserMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setInputValue('')
    
    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'ai',
        content: '这是一个模拟的AI回复。在实际应用中，这里会调用真实的AI模型生成回复。',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  return (
    <div className="container max-w-1200 mx-auto p-4">
      <h2>导师</h2>
      <p className="sub-text">专为教学而设计的对话引擎，而非仅仅回答问题。由全球领先的 AI 模型驱动。</p>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* 左侧上下文 */}
        <div className="context w-full md:w-1/4 border rounded p-4 sticky top-4">
          <h3 className="context-title">上下文</h3>
          <ul className="context-list mt-2">
            {context.map((item, index) => (
              <li key={index} className="context-item">{item}</li>
            ))}
          </ul>
        </div>
        {/* 右侧对话区 */}
        <div className="chat w-full md:w-3/4">
          {/* 对话记录 */}
          <div 
            ref={chatRef}
            className="chat-record border rounded p-4 mb-4 h-96 overflow-y-auto"
          >
            {messages.map(message => (
              <div key={message.id} className={`chat-item ${message.role} mb-4`}>
                <div className="chat-avatar">{message.role === 'user' ? '用户' : 'Claude'}</div>
                <div className="chat-content p-3 rounded border">
                  <p>{message.content}</p>
                  {message.formula && (
                    <div className="formula-block mt-2 p-2 bg-f1f3f5 rounded">
                      {message.formula}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* 输入框 */}
          <div className="chat-input flex gap-2">
            <input 
              type="text" 
              className="input w-full border rounded p-2" 
              placeholder="输入你的问题..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="send-btn bg-0d6efd text-white px-4 rounded"
              onClick={handleSendMessage}
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveTutorModule