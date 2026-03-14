import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-text-main mb-2">登录山之课 AI</h1>
        <p className="text-body text-text-secondary">
          欢迎回来，继续你的学习之旅
        </p>
      </div>
      
      <div className="card p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-small text-text-secondary mb-2">
              电子邮箱
            </label>
            <input
              type="email"
              id="email"
              className="input w-full"
              placeholder="请输入你的邮箱"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-small text-text-secondary mb-2">
              密码
            </label>
            <input
              type="password"
              id="password"
              className="input w-full"
              placeholder="请输入你的密码"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-accent"
            />
            <label htmlFor="remember" className="text-small text-text-secondary">
              记住我
            </label>
          </div>
          <Link href="#" className="text-small text-accent hover:underline">
            忘记密码？
          </Link>
        </div>
        
        <button className="btn-primary w-full py-3">
          登录
        </button>
        
        <div className="text-center text-small text-text-secondary">
          还没有账号？{' '}
          <Link href="/register" className="text-accent hover:underline">
            立即注册
          </Link>
        </div>
      </div>
    </div>
  )
}