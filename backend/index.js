const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 导入微服务
const courseService = require('./services/courseService');
const extractService = require('./services/extractService');
const tutorService = require('./services/tutorService');

const app = express();
const port = 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 模拟缓存
const cache = new Map();
const CACHE_TTL = 300000; // 5分钟

// 缓存中间件
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  if (cache.has(key)) {
    const cached = cache.get(key);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }
    cache.delete(key);
  }
  next();
};

// API 路由

// 课程相关
app.get('/api/course', cacheMiddleware, (req, res) => {
  const courses = courseService.getAllCourses();
  cache.set(req.originalUrl, { data: courses, timestamp: Date.now() });
  res.json(courses);
});

app.get('/api/course/:id', cacheMiddleware, (req, res) => {
  const { id } = req.params;
  const course = courseService.getCourse(parseInt(id));
  if (course) {
    cache.set(req.originalUrl, { data: course, timestamp: Date.now() });
    res.json(course);
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

app.put('/api/course/:id/progress', (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  const updatedCourse = courseService.updateProgress(parseInt(id), progress);
  if (updatedCourse) {
    // 清除缓存
    cache.delete('/api/course');
    cache.delete(`/api/course/${id}`);
    res.json(updatedCourse);
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

// 提炼相关
app.get('/api/extract', cacheMiddleware, (req, res) => {
  const extract = extractService.getExtract(1);
  cache.set(req.originalUrl, { data: extract, timestamp: Date.now() });
  res.json(extract);
});

app.post('/api/extract/add-source', (req, res) => {
  const { source } = req.body;
  const updatedExtract = extractService.addSource(1, source);
  if (updatedExtract) {
    // 清除缓存
    cache.delete('/api/extract');
    res.json({ success: true, sources: updatedExtract.sources });
  } else {
    res.status(404).json({ error: 'Extract not found' });
  }
});

// 导师对话相关
app.get('/api/tutor', cacheMiddleware, (req, res) => {
  const session = tutorService.getSession(1);
  cache.set(req.originalUrl, { data: session, timestamp: Date.now() });
  res.json(session);
});

app.post('/api/tutor/message', (req, res) => {
  const { content } = req.body;
  const userMessage = {
    role: 'user',
    content
  };
  const newMessage = tutorService.addMessage(1, userMessage);
  
  // 模拟AI回复
  const aiResponse = {
    role: 'ai',
    content: '这是一个模拟的AI回复。在实际应用中，这里会调用真实的AI模型生成回复。'
  };
  tutorService.addMessage(1, aiResponse);
  
  // 清除缓存
  cache.delete('/api/tutor');
  
  res.json({ success: true, messages: tutorService.getSession(1).messages });
});

// 流式响应API
app.get('/api/tutor/stream', (req, res) => {
  const { content } = req.query;
  if (!content) {
    res.status(400).json({ error: 'Content is required' });
    return;
  }
  const userMessage = {
    role: 'user',
    content
  };
  tutorService.addMessage(1, userMessage);
  
  // 流式响应
  tutorService.streamResponse(1, userMessage, res);
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});