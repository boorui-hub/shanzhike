import React from 'react'

const CourseModule: React.FC = () => {
  return (
    <div className="container max-w-1200 mx-auto p-4">
      {/* 课程标题区 */}
      <div className="module-title mb-4">
        <h2>计算神经科学</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: '45%' }}></div>
          <span className="progress-text">45%</span>
        </div>
      </div>
      {/* 核心分栏 */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* 左侧目录 */}
        <div className="catalog w-full md:w-1/4 sticky top-4">
          <ul>
            <li className="catalog-item">01. 神经编码</li>
            <li className="catalog-item active">02. 生物物理模型</li>
            <ul className="catalog-sub">
              <li className="catalog-sub-item active">Hodgkin-Huxley 模型</li>
              <li className="catalog-sub-item">电缆理论</li>
              <li className="catalog-sub-item">分区模型</li>
            </ul>
            <li className="catalog-item">03. 突触可塑性</li>
            <li className="catalog-item">04. 网络动力学</li>
          </ul>
        </div>
        {/* 中间内容区 */}
        <div className="content w-full md:w-2/3">
          <div className="content-card p-6 border rounded">
            <h3>课时 2.2 电缆理论</h3>
            <p className="content-text mt-4">
              电缆理论描述了电信号如何沿着神经元突起传播。神经元被建模为具有 <span className="highlight">被动电学特性</span> 的圆柱体，其特征由膜电阻和电容决定。
            </p>
            <p className="content-text mt-2">
              控制信号传播的基本方程是 <span className="highlight">电缆方程</span>，它将电压变化与距离和时间联系起来。这个数学框架让我们能够理解 <span className="highlight">突触输入如何被整合</span>，从树突传递到胞体。
            </p>
            <p className="content-text mt-2">
              关键参数包括 长度常数 (λ) 和时间常数 (τ)，它们决定了信号能在神经元内传播多远和多快。
            </p>
            {/* 公式块 */}
            <div className="formula-block mt-4 p-4 bg-f1f3f5 rounded">
              $∇²V = (λ)⁻²V + τ ∂V/∂t$
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

export default CourseModule