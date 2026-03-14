// 导师对话服务
class TutorService {
  constructor() {
    this.sessions = {
      1: {
        id: 1,
        context: [
          'Computational Neuroscience Lesson 2.2',
          'Lecture_04.mp4 1:24:30',
          'Paper_v2.pdf',
          'diagram.png'
        ],
        messages: [
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
        ]
      }
    }
  }

  getSession(id) {
    return this.sessions[id] || null
  }

  addMessage(sessionId, message) {
    if (this.sessions[sessionId]) {
      const newMessage = {
        id: this.sessions[sessionId].messages.length + 1,
        ...message,
        timestamp: new Date().toISOString()
      }
      this.sessions[sessionId].messages.push(newMessage)
      return newMessage
    }
    return null
  }

  // 流式响应模拟
  streamResponse(sessionId, userMessage, res) {
    if (!this.sessions[sessionId]) {
      res.status(404).json({ error: 'Session not found' })
      return
    }

    // 设置SSE响应头
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // 模拟流式输出
    const responseParts = [
      '好问题！把神经元想象成一根漏水的花园水管。',
      '当你打开一端的水时，整个管道的水压不会保持恒定。',
      '电缆方程从数学上描述了这种「泄漏」—— 信号如何在沿着树突传播时随距离衰减。',
      '长度常数 (λ) 告诉我们信号能传播多远才会降到原始强度的 37%。'
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < responseParts.length) {
        const chunk = responseParts[index]
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`)
        index++
      } else {
        clearInterval(interval)
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
        res.end()
      }
    }, 1000)

    // 清理
    res.on('close', () => {
      clearInterval(interval)
    })
  }
}

module.exports = new TutorService()