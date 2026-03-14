from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import courses, extract, tutor, users

app = FastAPI(
    title="山之课 AI API",
    description="AI 学习平台后端 API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(courses.router, prefix="/api/courses", tags=["课程"])
app.include_router(extract.router, prefix="/api/extract", tags=["内容提炼"])
app.include_router(tutor.router, prefix="/api/tutor", tags=["AI 导师"])
app.include_router(users.router, prefix="/api/users", tags=["用户"])


@app.get("/")
async def root():
    return {"message": "山之课 AI API", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
