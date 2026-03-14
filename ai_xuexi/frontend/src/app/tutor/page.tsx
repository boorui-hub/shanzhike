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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '好问题！把神经元想象成一根漏水的花园水管。当你打开一端的水时，整个管道的水压不会保持恒定。\n\n电缆方程从数学上描述了这种「泄漏」—— 信号如何在沿着树突传播时随距离衰减。长度常数 (λ) 告诉我们信号能传播多远才会降到原始强度的 37%。',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsStreaming(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h1 text-text-main">AI 导师</h1>
        <p className="text-body text-text-secondary mt-2">
          专为教学而设计的对话引擎，而非仅仅回答问题。由全球领先的 AI 模型驱动。
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <div className="card sticky top-20">
            <h2 className="text-h2 text-text-main mb-4">上下文</h2>
            <ul className="space-y-2">
              {mockContexts.map((ctx, idx) => (
                <li
                  key={idx}
                  className="text-small text-text-secondary py-2 border-b border-border last:border-0"
                >
                  {ctx}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="w-full md:w-3/4">
          <div className="card h-96 overflow-y-auto mb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                      msg.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-primary-bg-secondary text-text-secondary border border-border'
                    }`}
                  >
                    {msg.role === 'user' ? '你' : 'AI'}
                  </div>
                  <div
                    className={`flex-1 p-3 rounded ${
                      msg.role === 'user'
                        ? 'bg-primary-bg-secondary text-text-main'
                        : 'border border-border text-text-main'
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isStreaming && (
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded flex items-center justify-center text-xs font-medium bg-primary-bg-secondary text-text-secondary border border-border">
                    AI
                  </div>
                  <div className="flex items-center">
                    <span className="text-text-secondary text-sm">正在输入...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题..."
              className="input flex-1"
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="btn-primary px-6"
            >
              发送
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
