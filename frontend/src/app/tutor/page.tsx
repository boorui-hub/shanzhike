'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const mockContexts = [
  'Computational Neuroscience Lesson 2.2',
  'Lecture_04.mp4 1:24:30',
  'Paper_v2.pdf',
  'diagram.png',
]

const mockQuestions = [
  '电缆理论中的长度常数是什么？',
  'Hodgkin-Huxley 模型如何工作？',
  '突触可塑性的机制是什么？',
  '如何计算神经元的时间常数？',
]

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是你的 AI 导师。有什么学习上的问题可以随时问我。',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent])

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsStreaming(true)
    setStreamingContent('')
    setShowSuggestions(false)

    // 模拟流式响应
    const response = '好问题！把神经元想象成一根漏水的花园水管。当你打开一端的水时，整个管道的水压不会保持恒定。\n\n电缆方程从数学上描述了这种「泄漏」—— 信号如何在沿着树突传播时随距离衰减。长度常数 (λ) 告诉我们信号能传播多远才会降到原始强度的 37%。'
    let index = 0
    const interval = setInterval(() => {
      if (index < response.length) {
        setStreamingContent(prev => prev + response[index])
        index++
      } else {
        clearInterval(interval)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsStreaming(false)
        setStreamingContent('')
      }
    }, 30)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (question: string) => {
    setInput(question)
    setShowSuggestions(false)
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-h1 text-text-main mb-4">AI 导师</h1>
        <p className="text-body text-text-secondary max-w-3xl">
          专为教学而设计的对话引擎，而非仅仅回答问题。由全球领先的 AI 模型驱动。
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 上下文 */}
        <aside className="w-full md:w-1/4">
          <div className="card sticky top-20">
            <h2 className="text-h2 text-text-main mb-6">上下文</h2>
            <ul className="space-y-3">
              {mockContexts.map((ctx, idx) => (
                <li
                  key={idx}
                  className="text-small text-text-secondary py-3 px-4 border border-border rounded-lg hover:bg-primary-bg-secondary transition-colors"
                >
                  {ctx}
                </li>
              ))}
            </ul>
            
            {/* 快速操作 */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-small font-medium text-text-main mb-4">快速操作</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-small text-text-secondary hover:text-accent transition-colors py-2">
                  清除对话
                </button>
                <button className="w-full text-left text-small text-text-secondary hover:text-accent transition-colors py-2">
                  保存对话
                </button>
                <button className="w-full text-left text-small text-text-secondary hover:text-accent transition-colors py-2">
                  导出笔记
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* 对话区域 */}
        <section className="w-full md:w-3/4">
          {/* 对话历史 */}
          <div className="card h-[600px] overflow-y-auto mb-4">
            <div className="p-4 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-transform hover:scale-110 ${
                      msg.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-primary-bg-secondary text-text-secondary border border-border'
                    }`}
                  >
                    {msg.role === 'user' ? '你' : 'AI'}
                  </div>
                  <div
                    className={`flex-1 max-w-[80%] p-4 rounded-lg transition-all duration-300 hover:shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-accent-light text-text-main'
                        : 'bg-white border border-border text-text-main'
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {msg.content}
                    </div>
                    <div className="mt-2 text-xs text-text-secondary">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 流式响应 */}
              {isStreaming && (
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-primary-bg-secondary text-text-secondary border border-border">
                    AI
                  </div>
                  <div className="flex-1 max-w-[80%] p-4 rounded-lg bg-white border border-border">
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {streamingContent}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 建议问题 */}
              {showSuggestions && messages.length === 1 && (
                <div className="mt-8 space-y-3">
                  <h3 className="text-small font-medium text-text-secondary">常见问题</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {mockQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(question)}
                        className="text-left p-3 border border-border rounded-lg text-sm text-text-secondary hover:bg-primary-bg-secondary transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 输入区域 */}
          <div className="card p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题..."
                className="input flex-1 py-3"
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="btn-primary px-6 py-3 hover:scale-105 transition-transform"
              >
                {isStreaming ? '发送中...' : '发送'}
              </button>
            </div>
            <div className="mt-3 text-xs text-text-secondary">
              按 Enter 发送消息，Shift + Enter 换行
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
