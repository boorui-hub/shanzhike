'use client'

import { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'

export default function ExamsPage() {
  const [exams, setExams] = useState([
    {
      id: '1',
      title: 'JavaScript基础测试',
      duration: 60,
      passScore: 60,
      questions: ['1', '2', '3'],
      status: 'published' as const,
      antiCheat: {
        shuffleOptions: true,
        screenMonitor: true
      }
    },
    {
      id: '2',
      title: 'React进阶测试',
      duration: 90,
      passScore: 70,
      questions: [],
      status: 'draft' as const,
      antiCheat: {
        shuffleOptions: false,
        screenMonitor: false
      }
    }
  ])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreateExam = () => {
    // 这里可以实现创建考试的逻辑
    setShowCreateModal(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">考试管理</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            创建考试
          </button>
        </div>

        {/* 考试列表 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">考试列表</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">ID</th>
                  <th className="text-left py-2 px-4">考试名称</th>
                  <th className="text-left py-2 px-4">时长</th>
                  <th className="text-left py-2 px-4">及格线</th>
                  <th className="text-left py-2 px-4">状态</th>
                  <th className="text-left py-2 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="border-b">
                    <td className="py-2 px-4">{exam.id}</td>
                    <td className="py-2 px-4">{exam.title}</td>
                    <td className="py-2 px-4">{exam.duration}分钟</td>
                    <td className="py-2 px-4">{exam.passScore}分</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        exam.status === 'published' ? 'bg-green-100 text-green-800' :
                        exam.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {exam.status === 'published' ? '已发布' :
                         exam.status === 'draft' ? '草稿' : '已关闭'}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">编辑</button>
                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">发布</button>
                        <button className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 创建考试模态框 */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">创建考试</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    考试名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      考试时长（分钟）
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      及格分数
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    组卷方式
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="fixed"
                        name="paperType"
                        defaultChecked
                        className="mr-2"
                      />
                      <label htmlFor="fixed">固定试卷</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="random"
                        name="paperType"
                        className="mr-2"
                      />
                      <label htmlFor="random">随机抽题</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    防作弊设置
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="shuffleOptions"
                        className="mr-2"
                      />
                      <label htmlFor="shuffleOptions">选项乱序</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="screenMonitor"
                        className="mr-2"
                      />
                      <label htmlFor="screenMonitor">切屏警告</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateExam}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    创建
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}