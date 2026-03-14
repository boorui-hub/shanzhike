import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-h1 font-semibold text-text-main mb-4">
          勇攀高峰，学无止境
        </h1>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          你的专属 AI 导师，个性化学习路径，24 小时陪伴式答疑
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/courses" className="btn-primary px-6 py-3">
            开始学习
          </Link>
          <Link href="/extract" className="btn-secondary px-6 py-3">
            提炼内容
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-h2 text-text-main mb-2">AI 智能路径规划</h3>
          <p className="text-body text-text-secondary">
            基于你的学习目标，AI 自动规划最优学习路径
          </p>
        </div>
        <div className="card">
          <h3 className="text-h2 text-text-main mb-2">无尽知识图谱</h3>
          <p className="text-body text-text-secondary">
            可视化知识体系，清晰把握知识脉络
          </p>
        </div>
        <div className="card">
          <h3 className="text-h2 text-text-main mb-2">24小时陪伴式答疑</h3>
          <p className="text-body text-text-secondary">
            随时随地与 AI 导师交流，解决学习困惑
          </p>
        </div>
      </section>
    </div>
  )
}
