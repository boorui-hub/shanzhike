'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [activeFeature, setActiveFeature] = useState(0)

  // 滚动动画效果
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const newVisibility: Record<string, boolean> = {}
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        newVisibility[section.id] = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
      })
      setIsVisible(newVisibility)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始检查
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 特性轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: 'AI 智能路径规划',
      description: '基于你的学习目标和当前水平，AI 自动规划最优学习路径，让学习更有针对性',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    },
    {
      title: '无尽知识图谱',
      description: '可视化知识体系，清晰把握知识脉络，帮助你建立完整的知识网络',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <circle cx="18" cy="18" r="3"/>
          <circle cx="6" cy="6" r="3"/>
          <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
          <path d="M11 18H8a2 2 0 0 1-2-2V9"/>
        </svg>
      )
    },
    {
      title: '24小时陪伴式答疑',
      description: '随时随地与 AI 导师交流，解决学习困惑，获得即时反馈和指导',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section 
        id="hero" 
        className="py-24 text-center relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-accent"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-accent"></div>
        </div>
        
        <div className="relative z-10">
          <h1 
            className={`text-[clamp(2rem,5vw,3.5rem)] font-semibold text-text-main mb-6 leading-tight transition-all duration-1000 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            勇攀高峰，学无止境 —— 你的专属 AI 导师
          </h1>
          <p 
            className={`text-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            基于全球领先的 AI 模型，为你提供个性化的学习体验，24 小时陪伴式答疑，让学习更高效、更智能
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Link 
              href="/courses" 
              className="btn-primary px-8 py-4 text-base hover:scale-105 transition-transform"
            >
              开始学习之旅
            </Link>
            <Link 
              href="/tutor" 
              className="btn-secondary px-8 py-4 text-base hover:scale-105 transition-transform"
            >
              与 AI 导师对话
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-20"
      >
        <h2 
          className={`text-2xl font-semibold text-text-main mb-16 text-center transition-all duration-1000 ${isVisible['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          为什么选择山之课 AI
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`card p-6 hover:shadow-md transition-all duration-500 ${activeFeature === index ? 'ring-2 ring-accent scale-105' : 'hover:scale-102'}`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="w-16 h-16 bg-accent-light rounded-lg flex items-center justify-center mb-6 transition-transform hover:rotate-12">
                {feature.icon}
              </div>
              <h3 className="text-h2 text-text-main mb-4">{feature.title}</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section 
        id="how-it-works" 
        className="py-20 bg-primary-bg-secondary"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-2xl font-semibold text-text-main mb-16 transition-all duration-1000 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            如何使用山之课 AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: '设定学习目标',
                description: '告诉 AI 你的学习目标和兴趣领域，获取个性化的学习建议'
              },
              {
                step: 2,
                title: '开始学习之旅',
                description: '按照 AI 规划的学习路径，循序渐进地学习，遇到问题随时提问'
              },
              {
                step: 3,
                title: '巩固与提升',
                description: '通过测验、思维导图等方式巩固所学知识，不断提升学习效果'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`space-y-6 transition-all duration-700 delay-${index * 200} ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-h2 text-text-main">{item.title}</h3>
                <p className="text-body text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta" 
        className="py-24 text-center relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-accent"></div>
          <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-accent"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 
            className={`text-2xl font-semibold text-text-main mb-6 transition-all duration-1000 ${isVisible['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            开启你的智能学习之旅
          </h2>
          <p 
            className={`text-body text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isVisible['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            加入山之课 AI，体验全新的学习方式，让 AI 成为你最贴心的学习伙伴
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Link 
              href="/register" 
              className="btn-primary px-8 py-4 text-base hover:scale-105 transition-transform"
            >
              立即注册
            </Link>
            <Link 
              href="/courses" 
              className="btn-secondary px-8 py-4 text-base hover:scale-105 transition-transform"
            >
              浏览课程
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
