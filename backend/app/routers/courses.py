from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class Lesson(BaseModel):
    id: str
    title: str
    completed: bool


class Section(BaseModel):
    id: str
    title: str
    lessons: List[Lesson]


class Course(BaseModel):
    id: str
    title: str
    progress: int
    sections: List[Section]


class CourseContent(BaseModel):
    title: str
    content: str


mock_courses = {
    "course-1": Course(
        id="course-1",
        title="计算神经科学",
        progress=45,
        sections=[
            Section(
                id="s1",
                title="01. 神经编码",
                lessons=[
                    Lesson(id="l1", title="神经编码基础", completed=True),
                    Lesson(id="l2", title="动作电位", completed=True),
                ],
            ),
            Section(
                id="s2",
                title="02. 生物物理模型",
                lessons=[
                    Lesson(id="l3", title="Hodgkin-Huxley 模型", completed=True),
                    Lesson(id="l4", title="电缆理论", completed=False),
                    Lesson(id="l5", title="分区模型", completed=False),
                ],
            ),
            Section(
                id="s3",
                title="03. 突触可塑性",
                lessons=[
                    Lesson(id="l6", title="Hebb 规则", completed=False),
                ],
            ),
        ],
    )
}

mock_content = {
    "l4": CourseContent(
        title="课时 2.2 电缆理论",
        content="""电缆理论描述了电信号如何沿着神经元突起传播。神经元被建模为具有被动电学特性的圆柱体，其特征由膜电阻和电容决定。

控制信号传播的基本方程是电缆方程，它将电压变化与距离和时间联系起来。这个数学框架让我们能够理解突触输入如何被整合，从树突传递到胞体。

关键参数包括长度常数 (λ) 和时间常数 (τ)，它们决定了信号能在神经元内传播多远和多快。""",
    )
}


@router.get("", response_model=List[Course])
async def get_courses():
    return list(mock_courses.values())


@router.get("/{course_id}", response_model=Course)
async def get_course(course_id: str):
    if course_id not in mock_courses:
        raise HTTPException(status_code=404, detail="课程不存在")
    return mock_courses[course_id]


@router.get("/{course_id}/content/{lesson_id}")
async def get_lesson_content(course_id: str, lesson_id: str):
    if course_id not in mock_courses:
        raise HTTPException(status_code=404, detail="课程不存在")
    if lesson_id not in mock_content:
        raise HTTPException(status_code=404, detail="课时不存在")
    return mock_content[lesson_id]
