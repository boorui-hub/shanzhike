// 用户类型
export interface User {
  uid: string
  role: 'admin' | 'user'
  name: string
  department?: string
}

// 题目类型
export interface Question {
  id: string
  type: 'single' | 'multiple' | 'boolean'
  content: string
  options: Record<string, string>
  correctAnswer: string | string[] | '正确' | '错误'
  explanation: string
}

// 考试配置类型
export interface Exam {
  id: string
  title: string
  duration: number // 时长(分钟)
  passScore: number // 及格线
  questions: string[] // 包含的题目ID列表
  status: 'draft' | 'published' | 'closed'
  antiCheat?: {
    shuffleOptions: boolean
    screenMonitor: boolean
  }
}

// 答题记录类型
export interface ExamRecord {
  id: string
  userId: string
  examId: string
  answers: Record<string, string | string[]>
  score: number
  submittedAt: Date
  duration: number // 用时(分钟)
}

// 答题状态类型
export interface AnswerStatus {
  answered: boolean
  correct?: boolean
  userAnswer?: string | string[]
}

// 考试会话类型
export interface ExamSession {
  examId: string
  answers: Record<string, string | string[]>
  startTime: Date
  currentQuestionIndex: number
  answeredQuestions: Set<string>
}