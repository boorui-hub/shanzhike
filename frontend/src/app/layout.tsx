import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: '山之课 AI - 勇攀高峰，学无止境',
  description: 'AI 驱动的学习平台，个性化课程与导师辅导',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <div className="min-h-screen bg-primary-bg">
            <header className="border-b border-border sticky top-0 bg-white z-50">
              <div className="max-w-content mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <h1 className="text-lg font-semibold text-text-main">山之课 AI</h1>
                  <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
                    <a href="/courses" className="hover:text-text-main transition-colors">课程大厅</a>
                    <a href="/extract" className="hover:text-text-main transition-colors">内容提炼</a>
                    <a href="/tutor" className="hover:text-text-main transition-colors">AI 导师</a>
                  </nav>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <a href="/login" className="text-text-secondary hover:text-text-main transition-colors">登录</a>
                  <a href="/register" className="btn-primary">注册</a>
                </div>
              </div>
            </header>
            <main className="max-w-content mx-auto px-4 py-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
