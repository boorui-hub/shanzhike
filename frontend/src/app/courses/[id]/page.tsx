'use client'

import { useState, useEffect } from 'react'

interface Course {
  id: string
  title: string
  progress: number
  sections: {
    id: string
    title: string
    lessons: {
      id: string
      title: string
      completed: boolean
    }[]
  }[]
}

interface LessonContent {
  title: string
  content: string
  code?: string
  images?: string[]
}

const mockCourse: Course = {
  id: 'course-1',
  title: '计算神经科学',
  progress: 45,
  sections: [
    {
      id: 's1',
      title: '01. 神经编码',
      lessons: [
        { id: 'l1', title: '神经编码基础', completed: true },
        { id: 'l2', title: '动作电位', completed: true },
      ],
    },
    {
      id: 's2',
      title: '02. 生物物理模型',
      lessons: [
        { id: 'l3', title: 'Hodgkin-Huxley 模型', completed: true },
        { id: 'l4', title: '电缆理论', completed: false },
        { id: 'l5', title: '分区模型', completed: false },
      ],
    },
    {
      id: 's3',
      title: '03. 突触可塑性',
      lessons: [
        { id: 'l6', title: 'Hebb 规则', completed: false },
      ],
    },
  ],
}

const mockLessonContents: Record<string, LessonContent> = {
  l1: {
    title: '课时 1.1 神经编码基础',
    content: `神经编码是神经系统中信息表示和处理的基础。它研究神经元如何将外部刺激转换为电信号，并在神经网络中传递和处理这些信息。

神经编码的核心问题包括：信息如何被编码、如何被解码，以及编码的效率和可靠性。不同的编码策略包括频率编码、时间编码和群体编码等。`,
  },
  l2: {
    title: '课时 1.2 动作电位',
    content: `动作电位是神经元传递信息的基本单位。当神经元受到足够强的刺激时，膜电位会快速去极化，产生一个全或无的电信号。

动作电位的产生和传播机制由离子通道的开闭控制，特别是钠通道和钾通道的协同作用。这个过程是神经信号快速、长距离传递的基础。`,
  },
  l3: {
    title: '课时 2.1 Hodgkin-Huxley 模型',
    content: `Hodgkin-Huxley 模型是描述动作电位产生和传播的经典数学模型。它由 Alan Hodgkin 和 Andrew Huxley 在 1952 年提出，基于对枪乌贼巨大轴突的实验研究。

该模型使用一组微分方程描述了细胞膜上的离子电流，包括钠电流、钾电流和漏电流，以及它们如何共同产生动作电位。`,
    code: `C_m dV/dt = -g_Na (V - E_Na) - g_K (V - E_K) - g_L (V - E_L) + I`,
  },
  l4: {
    title: '课时 2.2 电缆理论',
    content: `电缆理论描述了电信号如何沿着神经元突起传播。神经元被建模为具有被动电学特性的圆柱体，其特征由膜电阻和电容决定。

控制信号传播的基本方程是电缆方程，它将电压变化与距离和时间联系起来。这个数学框架让我们能够理解突触输入如何被整合，从树突传递到胞体。

关键参数包括长度常数 (λ) 和时间常数 (τ)，它们决定了信号能在神经元内传播多远和多快。`,
    code: `λ = √(rm / ri) = √(Rₘ / Rᵢ)`,
  },
  l5: {
    title: '课时 2.3 分区模型',
    content: `分区模型是简化的神经元模型，将神经元划分为多个电耦合的 compartments。每个 compartment 可以是一个树突段、胞体或轴突部分。

这种模型在计算效率和生物现实性之间取得了平衡，允许研究人员模拟具有复杂形态的神经元的电活动。`,
  },
  l6: {
    title: '课时 3.1 Hebb 规则',
    content: `Hebb 规则是突触可塑性的基本原理，由 Donald Hebb 在 1949 年提出。它指出："当一个神经元 A 的轴突足够接近以激发神经元 B 并反复或持续地参与其激活时，这两个神经元之间的突触连接会增强。"

这个规则为理解学习和记忆的神经基础提供了重要框架，也是许多人工神经网络学习算法的基础。`,
  },
}

export default function CoursePage() {
  const [activeLesson, setActiveLesson] = useState('l4')
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  // 模拟加载效果
  const handleLessonChange = (lessonId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveLesson(lessonId)
      setIsLoading(false)
    }, 500)
  }

  // 模拟完成课程
  const handleCompleteLesson = () => {
    // 这里可以添加完成课程的逻辑
    alert('课程已标记为完成！')
  }

  const activeContent = mockLessonContents[activeLesson] || mockLessonContents.l4

  return (
    <div className="space-y-6">
      {/* 课程标题和进度 */}
      <div className="mb-8">
        <h1 className="text-h1 text-text-main mb-4">{mockCourse.title}</h1>
        <div className="flex items-center gap-4">
          <div className="progress-bar flex-1 max-w-md">
            <div 
              className="progress-bar-fill transition-all duration-1000 ease-out" 
              style={{ width: `${mockCourse.progress}%` }} 
            />
          </div>
          <span className="text-small text-text-secondary font-medium">
            {mockCourse.progress}% 完成
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 课程目录 */}
        <aside className="w-full md:w-1/4">
          <div className="card sticky top-20">
            <h2 className="text-h2 text-text-main mb-6 flex items-center justify-between">
              课程目录
              <span className="text-small text-text-secondary">共 {mockCourse.sections.reduce((acc, section) => acc + section.lessons.length, 0)} 课时</span>
            </h2>
            <nav className="space-y-2">
              {mockCourse.sections.map((section) => (
                <div key={section.id} className="space-y-1">
                  <div className="text-small text-text-secondary py-2 font-medium border-b border-border">
                    {section.title}
                  </div>
                  <ul className="space-y-1">
                    {section.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => handleLessonChange(lesson.id)}
                          className={`w-full text-left px-3 py-2.5 rounded text-sm transition-all duration-300 hover:shadow-sm ${
                            activeLesson === lesson.id
                              ? 'bg-accent-light text-accent font-medium'
                              : 'text-text-secondary hover:bg-primary-bg-secondary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{lesson.title}</span>
                            {lesson.completed && (
                              <span className="text-green-600 transition-transform hover:scale-110">✓</span>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* 课程内容 */}
        <article className="w-full md:w-2/3">
          <div className="card overflow-hidden">
            <div className="p-6">
              <h2 className="text-h2 text-text-main mb-6">{activeContent.title}</h2>
              
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4 text-body text-text-main leading-relaxed">
                    {activeContent.content.split('\n\n').map((paragraph, idx) => (
                      <p 
                        key={idx} 
                        className="transition-opacity duration-500 hover:opacity-90"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {activeContent.code && (
                    <div className="mt-6 p-4 bg-code-bg rounded-lg transition-all duration-300 hover:shadow-sm">
                      <code className="font-mono text-sm text-text-main">
                        {activeContent.code}
                      </code>
                    </div>
                  )}
                  
                  {/* 互动元素 */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={handleCompleteLesson}
                      className="btn-primary px-6 py-3 hover:scale-102 transition-transform"
                    >
                      标记为完成
                    </button>
                    <button 
                      onClick={() => setShowNotes(!showNotes)}
                      className="btn-secondary px-6 py-3 hover:scale-102 transition-transform"
                    >
                      {showNotes ? '隐藏笔记' : '添加笔记'}
                    </button>
                  </div>
                  
                  {/* 笔记输入 */}
                  {showNotes && (
                    <div className="mt-4 space-y-4 animate-fade-in">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="在这里添加你的笔记..."
                        className="input h-32 resize-none"
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
        </article>

        {/* 侧边工具栏 */}
        <aside className="w-full md:w-1/5">
          <div className="card sticky top-20 space-y-4">
            <button className="btn-primary w-full py-3 hover:scale-102 transition-transform">
              向 AI 提问
            </button>
            <button className="btn-secondary w-full py-3 hover:scale-102 transition-transform">
              查看笔记
            </button>
            <button className="btn-secondary w-full py-3 hover:scale-102 transition-transform">
              高亮重点
            </button>
            <button className="btn-secondary w-full py-3 hover:scale-102 transition-transform">
              下载资料
            </button>
            
            {/* 课程统计 */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">总课时</span>
                <span className="text-text-main font-medium">{mockCourse.sections.reduce((acc, section) => acc + section.lessons.length, 0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">已完成</span>
                <span className="text-text-main font-medium">{mockCourse.sections.reduce((acc, section) => acc + section.lessons.filter(l => l.completed).length, 0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">预计剩余时间</span>
                <span className="text-text-main font-medium">2 小时</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
