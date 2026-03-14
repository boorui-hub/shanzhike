import axios from 'axios'

// API基础URL
const API_BASE_URL = 'http://localhost:5000/api'

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加认证token等
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 统一错误处理
    console.error('API Error:', error)
    if (error.response) {
      // 服务器返回错误状态码
      switch (error.response.status) {
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error('请求失败:', error.response.data)
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，无法连接到服务器')
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

// 类型定义
interface Course {
  id: number
  title: string
  progress: number
  chapters: {
    id: number
    title: string
    sections: {
      id: number
      title: string
      active?: boolean
    }[]
    active?: boolean
  }[]
  currentContent: {
    title: string
    content: string[]
    formula: string
  }
}

interface Extract {
  id: number
  sources: string[]
  outputs: {
    summary: string
    mindmap: any
    quiz: any[]
    code: string
    notes: string
  }
}

interface TutorSession {
  id: number
  context: string[]
  messages: {
    id: number
    role: 'user' | 'ai'
    content: string
    formula?: string
    timestamp: string
  }[]
}

// API接口
const apiService = {
  // 课程相关
  course: {
    getCourses: (): Promise<Course[]> => api.get('/course'),
    getCourse: (id: number): Promise<Course> => api.get(`/course/${id}`),
    updateProgress: (id: number, progress: number): Promise<Course> => api.put(`/course/${id}/progress`, { progress })
  },
  
  // 提炼相关
  extract: {
    getExtract: (): Promise<Extract> => api.get('/extract'),
    addSource: (source: string): Promise<{ success: boolean; sources: string[] }> => api.post('/extract/add-source', { source })
  },
  
  // 导师对话相关
  tutor: {
    getSession: (): Promise<TutorSession> => api.get('/tutor'),
    sendMessage: (content: string): Promise<{ success: boolean; messages: any[] }> => api.post('/tutor/message', { content }),
    streamResponse: (content: string): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const eventSource = new EventSource(`${API_BASE_URL}/tutor/stream?content=${encodeURIComponent(content)}`)
        let fullResponse = ''
        
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.done) {
              eventSource.close()
              resolve(fullResponse)
            } else if (data.content) {
              fullResponse += data.content
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error)
          }
        }
        
        eventSource.onerror = (error) => {
          eventSource.close()
          reject(error)
        }
      })
    }
  }
}

export default apiService