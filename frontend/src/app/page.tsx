import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-text-main mb-6 leading-tight">
          你的 AI 导师，你的学习引擎
        </h1>
        <p className="text-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
          基于全球领先的 AI 模型，为你提供个性化的学习体验，24 小时陪伴式答疑，让学习更高效、更智能
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/courses" className="btn-primary px-8 py-4 text-base">
            开始学习之旅
          </Link>
          <Link href="/tutor" className="btn-secondary px-8 py-4 text-base">
            与 AI 导师对话
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-2xl font-semibold text-text-main mb-12 text-center">
          为什么选择山之课 AI
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-6 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 className="text-h2 text-text-main mb-3">AI 智能路径规划</h3>
            <p className="text-body text-text-secondary leading-relaxed">
              基于你的学习目标和当前水平，AI 自动规划最优学习路径，让学习更有针对性
            </p>
          </div>
          <div className="card p-6 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <circle cx="18" cy="18" r="3"/>
                <circle cx="6" cy="6" r="3"/>
                <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
                <path d="M11 18H8a2 2 0 0 1-2-2V9"/>
              </svg>
            </div>
            <h3 className="text-h2 text-text-main mb-3">无尽知识图谱</h3>
            <p className="text-body text-text-secondary leading-relaxed">
              可视化知识体系，清晰把握知识脉络，帮助你建立完整的知识网络
            </p>
          </div>
          <div className="card p-6 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <h3 className="text-h2 text-text-main mb-3">24小时陪伴式答疑</h3>
            <p className="text-body text-text-secondary leading-relaxed">
              随时随地与 AI 导师交流，解决学习困惑，获得即时反馈和指导
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-primary-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-text-main mb-12">
            如何使用山之课 AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                1
              </div>
              <h3 className="text-h2 text-text-main">设定学习目标</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                告诉 AI 你的学习目标和兴趣领域，获取个性化的学习建议
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                2
              </div>
              <h3 className="text-h2 text-text-main">开始学习之旅</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                按照 AI 规划的学习路径，循序渐进地学习，遇到问题随时提问
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                3
              </div>
              <h3 className="text-h2 text-text-main">巩固与提升</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                通过测验、思维导图等方式巩固所学知识，不断提升学习效果
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-text-main mb-6">
          开启你的智能学习之旅
        </h2>
        <p className="text-body text-text-secondary max-w-2xl mx-auto mb-10">
          加入山之课 AI，体验全新的学习方式，让 AI 成为你最贴心的学习伙伴
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="btn-primary px-8 py-4 text-base">
            立即注册
          </Link>
          <Link href="/courses" className="btn-secondary px-8 py-4 text-base">
            浏览课程
          </Link>
        </div>
      </section>
    </div>
  )
}
