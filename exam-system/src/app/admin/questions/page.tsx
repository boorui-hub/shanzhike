'use client'

import { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import * as XLSX from 'xlsx'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      type: 'single' as const,
      content: 'JavaScript中，以下哪个方法用于添加或删除数组元素？',
      options: {
        A: 'push()',
        B: 'slice()',
        C: 'splice()',
        D: 'concat()'
      },
      correctAnswer: 'C',
      explanation: 'splice()方法可以添加、删除或替换数组元素'
    },
    {
      id: '2',
      type: 'multiple' as const,
      content: '以下哪些是React的核心概念？',
      options: {
        A: '组件',
        B: '状态',
        C: '生命周期',
        D: '虚拟DOM'
      },
      correctAnswer: ['A', 'B', 'D'],
      explanation: '组件、状态和虚拟DOM是React的核心概念，生命周期在React 16.8+中已被Hooks替代'
    },
    {
      id: '3',
      type: 'boolean' as const,
      content: 'JavaScript是一种编译型语言',
      options: {
        A: '正确',
        B: '错误'
      },
      correctAnswer: '错误',
      explanation: 'JavaScript是一种解释型语言'
    }
  ])
  const [file, setFile] = useState<File | null>(null)
  const [importSuccess, setImportSuccess] = useState(false)

  // 下载模板
  const handleDownloadTemplate = () => {
    // 创建模板数据
    const templateData = [
      ['题目类型', '题目内容', '选项A', '选项B', '选项C', '选项D', '正确答案', '解析'],
      ['single', '单选题示例', '选项1', '选项2', '选项3', '选项4', 'A', '解析内容'],
      ['multiple', '多选题示例', '选项1', '选项2', '选项3', '选项4', 'A,B', '解析内容'],
      ['boolean', '判断题示例', '正确', '错误', '', '', '正确', '解析内容']
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(templateData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '题库模板')
    XLSX.writeFile(workbook, '题库模板.xlsx')
  }

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setImportSuccess(false)
    }
  }

  // 导入题库
  const handleImport = () => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        // 跳过表头
        const questionsData = jsonData.slice(1)
        const newQuestions = questionsData.map((row: any, index: number) => {
          const [type, content, optionA, optionB, optionC, optionD, correctAnswer, explanation] = row
          
          // 构建选项对象
          const options: Record<string, string> = {}
          if (optionA) options.A = optionA
          if (optionB) options.B = optionB
          if (optionC) options.C = optionC
          if (optionD) options.D = optionD

          // 处理正确答案
          let processedCorrectAnswer: string | string[] | '正确' | '错误' = correctAnswer
          if (type === 'multiple' && typeof correctAnswer === 'string') {
            processedCorrectAnswer = correctAnswer.split(',').map(item => item.trim())
          } else if (type === 'boolean' && typeof correctAnswer === 'string') {
            processedCorrectAnswer = correctAnswer === '正确' ? '正确' : '错误'
          }

          return {
            id: `imported-${Date.now()}-${index}`,
            type: type as 'single' | 'multiple' | 'boolean',
            content,
            options,
            correctAnswer: processedCorrectAnswer,
            explanation
          }
        })

        setQuestions(prev => [...prev, ...newQuestions])
        setImportSuccess(true)
        setFile(null)
      } catch (error) {
        console.error('导入失败:', error)
      }
    }
    reader.readAsBinaryString(file)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">题库管理</h1>

        {/* 操作区 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">题库操作</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleDownloadTemplate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              下载模板
            </button>
            <div className="flex-1">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handleImport}
              disabled={!file}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              导入题库
            </button>
          </div>
          {importSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
              导入成功！
            </div>
          )}
        </div>

        {/* 题库列表 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">题库列表</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">ID</th>
                  <th className="text-left py-2 px-4">类型</th>
                  <th className="text-left py-2 px-4">题目</th>
                  <th className="text-left py-2 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id} className="border-b">
                    <td className="py-2 px-4">{question.id}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        question.type === 'single' ? 'bg-blue-100 text-blue-800' :
                        question.type === 'multiple' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {question.type === 'single' ? '单选' :
                         question.type === 'multiple' ? '多选' : '判断'}
                      </span>
                    </td>
                    <td className="py-2 px-4 max-w-md truncate">
                      {question.content}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">编辑</button>
                        <button className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}