// 课程服务
class CourseService {
  constructor() {
    this.courses = {
      1: {
        id: 1,
        title: '计算神经科学',
        progress: 45,
        chapters: [
          {
            id: 1,
            title: '01. 神经编码',
            sections: []
          },
          {
            id: 2,
            title: '02. 生物物理模型',
            sections: [
              { id: 1, title: 'Hodgkin-Huxley 模型', active: true },
              { id: 2, title: '电缆理论' },
              { id: 3, title: '分区模型' }
            ],
            active: true
          },
          {
            id: 3,
            title: '03. 突触可塑性',
            sections: []
          },
          {
            id: 4,
            title: '04. 网络动力学',
            sections: []
          }
        ],
        currentContent: {
          title: '课时 2.2 电缆理论',
          content: [
            '电缆理论描述了电信号如何沿着神经元突起传播。神经元被建模为具有被动电学特性的圆柱体，其特征由膜电阻和电容决定。',
            '控制信号传播的基本方程是电缆方程，它将电压变化与距离和时间联系起来。这个数学框架让我们能够理解突触输入如何被整合，从树突传递到胞体。',
            '关键参数包括 长度常数 (λ) 和时间常数 (τ)，它们决定了信号能在神经元内传播多远和多快。'
          ],
          formula: '$∇²V = (λ)⁻²V + τ ∂V/∂t$'
        }
      }
    }
  }

  getCourse(id) {
    return this.courses[id] || null
  }

  getAllCourses() {
    return Object.values(this.courses)
  }

  updateProgress(courseId, progress) {
    if (this.courses[courseId]) {
      this.courses[courseId].progress = progress
      return this.courses[courseId]
    }
    return null
  }
}

module.exports = new CourseService()