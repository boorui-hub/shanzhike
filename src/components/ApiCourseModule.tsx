import React, { useState, useEffect } from 'react'
import apiService from '../services/api'

interface Chapter {
  id: number
  title: string
  sections: Section[]
  active?: boolean
}

interface Section {
  id: number
  title: string
  active?: boolean
}

interface Course {
  id: number
  title: string
  progress: number
  chapters: Chapter[]
  currentContent: {
    title: string
    content: string[]
    formula: string
  }
}

const ApiCourseModule: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeChapter, setActiveChapter] = useState(2)
  const [activeSection, setActiveSection] = useState(1)
  
  useEffect(() => {
    // 从后端获取课程数据
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await apiService.course.getCourse(1)
        setCourse(response as Course)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch course:', err)
        setError('获取课程数据失败')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCourse()
  }, [])
  
  const handleChapterClick = (chapterId: number) => {
    setActiveChapter(chapterId)
    setActiveSection(1)
  }
  
  const handleSectionClick = (sectionId: number) => {
    setActiveSection(sectionId)
  }
  
  const handleUpdateProgress = async (progress: number) => {
    if (!course) return
    try {
      await apiService.course.updateProgress(course.id, progress)
      setCourse({ ...course, progress })
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }
  
  if (loading) {
    return (
      <div className="container max-w-1200 mx-auto p-4">
        <div className="loading">加载中...</div>
      </div>
    )
  }
  
  if (error || !course) {
    return (
      <div className="container max-w-1200 mx-auto p-4">
        <div className="error">{error || '课程数据不存在'}</div>
      </div>
    )
  }
  
  return (
    <div className="container max-w-1200 mx-auto p-4">
      {/* 课程标题区 */}
      <div className="module-title mb-4">
        <h2>{course.title}</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${course.progress}%` }}></div>
          <span className="progress-text">{course.progress}%</span>
        </div>
        <div className="mt-2">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={course.progress} 
            onChange={(e) => handleUpdateProgress(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      {/* 核心分栏 */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* 左侧目录 */}
        <div className="catalog w-full md:w-1/4 sticky top-4">
          <ul>
            {course.chapters.map(chapter => (
              <li key={chapter.id}>
                <div 
                  className={`catalog-item ${activeChapter === chapter.id ? 'active' : ''}`}
                  onClick={() => handleChapterClick(chapter.id)}
                >
                  {chapter.title}
                </div>
                {chapter.sections.length > 0 && activeChapter === chapter.id && (
                  <ul className="catalog-sub">
                    {chapter.sections.map(section => (
                      <li 
                        key={section.id}
                        className={`catalog-sub-item ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => handleSectionClick(section.id)}
                      >
                        {section.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* 中间内容区 */}
        <div className="content w-full md:w-2/3">
          <div className="content-card p-6 border rounded">
            <h3>{course.currentContent.title}</h3>
            {course.currentContent.content.map((paragraph, index) => (
              <p key={index} className="content-text mt-4">
                {paragraph}
              </p>
            ))}
            {/* 公式块 */}
            <div className="formula-block mt-4 p-4 bg-f1f3f5 rounded">
              {course.currentContent.formula}
            </div>
          </div>
        </div>
        {/* 右侧功能区 */}
        <div className="function w-full md:w-1/5 sticky top-4">
          <button className="func-btn w-full mb-2">提问</button>
          <button className="func-btn w-full mb-2">笔记</button>
          <button className="func-btn w-full">高亮</button>
        </div>
      </div>
    </div>
  )
}

export default ApiCourseModule