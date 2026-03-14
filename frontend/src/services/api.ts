// API配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const api = {
  // 课程相关
  courses: `${API_BASE_URL}/api/course`,
  courseById: (id: number) => `${API_BASE_URL}/api/course/${id}`,
  updateProgress: (id: number) => `${API_BASE_URL}/api/course/${id}/progress`,
  
  // 提炼相关
  extract: `${API_BASE_URL}/api/extract`,
  addSource: `${API_BASE_URL}/api/extract/add-source`,
  
  // 导师对话相关
  tutor: `${API_BASE_URL}/api/tutor`,
  sendMessage: `${API_BASE_URL}/api/tutor/message`,
  streamResponse: `${API_BASE_URL}/api/tutor/stream`,
};

export default api;