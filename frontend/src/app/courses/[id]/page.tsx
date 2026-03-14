'use client'

import { useState } from 'react'

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

const mockContent = {
  title: '课时 2.2 电缆理论',
  content: `电缆理论描述了电信号如何沿着神经元突起传播。神经元被建模为具有被动电学特性的圆柱体，其特征由膜电阻和电容决定。

控制信号传播的基本方程是电缆方程，它将电压变化与距离和时间联系起来。这个数学框架让我们能够理解突触输入如何被整合，从树突传递到胞体。

关键参数包括长度常数 (λ) 和时间常数 (τ)，它们决定了信号能在神经元内传播多远和多快。`,
}

export default function CoursePage() {
  const [activeLesson, setActiveLesson] = useState('l4')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h1 text-text-main">{mockCourse.title}</h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="progress-bar flex-1 max-w-xs">
            <div className="progress-bar-fill" style={{ width: `${mockCourse.progress}%` }} />
          </div>
          <span className="text-small text-text-secondary">{mockCourse.progress}%</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <div className="card sticky top-20">
            <h2 className="text-h2 text-text-main mb-4">课程目录</h2>
            <nav className="space-y-1">
              {mockCourse.sections.map((section) => (
                <div key={section.id}>
                  <div className="text-small text-text-secondary py-2 font-medium">
                    {section.title}
                  </div>
                  <ul className="space-y-1">
                    {section.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => setActiveLesson(lesson.id)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            activeLesson === lesson.id
                              ? 'bg-accent-light text-accent'
                              : 'text-text-secondary hover:bg-primary-bg-secondary'
                          }`}
                        >
                          {lesson.title}
                          {lesson.completed && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <article className="w-full md:w-2/3">
          <div className="card">
            <h2 className="text-h2 text-text-main">{mockContent.title}</h2>
            <div className="mt-4 space-y-4 text-body text-text-main leading-relaxed">
              {mockContent.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 p-4 bg-code-bg rounded">
              <code className="font-mono text-sm">
                λ = √(rm / ri) = √(Rₘ / Rᵢ)
              </code>
            </div>
          </div>
        </article>

        <aside className="w-full md:w-1/5">
          <div className="card sticky top-20 space-y-3">
            <button className="btn-primary w-full">提问</button>
            <button className="btn-secondary w-full">笔记</button>
            <button className="btn-secondary w-full">高亮</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
