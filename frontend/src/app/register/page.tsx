import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-text-main mb-2">注册山之课 AI</h1>
        <p className="text-body text-text-secondary">
          加入我们，开启智能学习之旅
        </p>
      </div>
      
      <div className="card p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-small text-text-secondary mb-2">
              姓名
            </label>
            <input
              type="text"
              id="name"
              className="input w-full"
              placeholder="请输入你的姓名"
            />
          </div>
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
              placeholder="请设置你的密码"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-small text-text-secondary mb-2">
              确认密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input w-full"
              placeholder="请再次输入密码"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-accent"
          />
          <label htmlFor="terms" className="text-small text-text-secondary">
            我同意山之课 AI 的{' '}
            <Link href="#" className="text-accent hover:underline">
              服务条款
            </Link>{' '}
            和{' '}
            <Link href="#" className="text-accent hover:underline">
              隐私政策
            </Link>
          </label>
        </div>
        
        <button className="btn-primary w-full py-3">
          注册
        </button>
        
        <div className="text-center text-small text-text-secondary">
          已有账号？{' '}
          <Link href="/login" className="text-accent hover:underline">
            立即登录
          </Link>
        </div>
      </div>
    </div>
  )
}