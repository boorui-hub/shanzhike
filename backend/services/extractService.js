// 提炼服务
class ExtractService {
  constructor() {
    this.extracts = {
      1: {
        id: 1,
        sources: [
          'Lecture_04_Roman_History.mp4',
          'youtube.com/watch?v=history_of_rome',
          'Paper_v2.pdf',
          'triangle-formula.png',
          'notes.md'
        ],
        outputs: {
          summary: '机器学习是人工智能的一个分支，使系统能够从数据中学习。它包含三种主要范式：监督学习使用标注数据进行分类和回归，无监督学习在未标注数据中发现隐藏模式，强化学习通过试错和奖励优化决策。',
          mindmap: {
            id: 1,
            name: '机器学习概述',
            children: [
              {
                id: 2,
                name: '监督学习',
                children: [
                  { id: 3, name: '分类' },
                  { id: 4, name: '回归' }
                ]
              },
              {
                id: 5,
                name: '无监督学习',
                children: [
                  { id: 6, name: '聚类' },
                  { id: 7, name: '降维' }
                ]
              },
              {
                id: 8,
                name: '强化学习',
                children: [
                  { id: 9, name: 'Q学习' },
                  { id: 10, name: '策略梯度' }
                ]
              }
            ]
          },
          quiz: [
            {
              id: 1,
              question: '以下哪种学习范式使用标注数据？',
              options: ['监督学习', '无监督学习', '强化学习', '半监督学习'],
              answer: 0,
              explanation: '监督学习使用标注数据进行模型训练。'
            }
          ],
          code: 'def hello_world():\n    print("Hello, World!")',
          notes: '机器学习的核心是从数据中学习模式，而不是硬编码规则。'
        }
      }
    }
  }

  getExtract(id) {
    return this.extracts[id] || null
  }

  addSource(extractId, source) {
    if (this.extracts[extractId]) {
      this.extracts[extractId].sources.push(source)
      return this.extracts[extractId]
    }
    return null
  }

  generateOutput(extractId, type, content) {
    if (this.extracts[extractId]) {
      this.extracts[extractId].outputs[type] = content
      return this.extracts[extractId]
    }
    return null
  }
}

module.exports = new ExtractService()