from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

router = APIRouter()


class ExtractType(str, Enum):
    summary = "summary"
    mindmap = "mindmap"
    quiz = "quiz"
    code = "code"
    notes = "notes"


class Source(BaseModel):
    id: str
    name: str
    type: str


class ExtractRequest(BaseModel):
    sources: List[str]
    extract_type: ExtractType


class ExtractResponse(BaseModel):
    type: ExtractType
    content: str
    mindmap: Optional[dict] = None
    quiz: Optional[List[dict]] = None


@router.post("", response_model=ExtractResponse)
async def extract_content(request: ExtractRequest):
    if not request.sources:
        raise HTTPException(status_code=400, detail="请提供至少一个来源")

    mock_responses = {
        ExtractType.summary: "机器学习是人工智能的一个分支，使系统能够从数据中学习。它包含三种主要范式：监督学习、无监督学习和强化学习。",
        ExtractType.mindmap: {
            "id": "root",
            "name": "机器学习",
            "children": [
                {
                    "id": "1",
                    "name": "监督学习",
                    "children": [
                        {"id": "1-1", "name": "分类"},
                        {"id": "1-2", "name": "回归"},
                    ],
                },
                {
                    "id": "2",
                    "name": "无监督学习",
                    "children": [
                        {"id": "2-1", "name": "聚类"},
                        {"id": "2-2", "name": "降维"},
                    ],
                },
                {
                    "id": "3",
                    "name": "强化学习",
                    "children": [
                        {"id": "3-1", "name": "Q-learning"},
                        {"id": "3-2", "name": "Policy Gradient"},
                    ],
                },
            ],
        },
        ExtractType.quiz: [
            {
                "question": "机器学习的三种主要范式是什么？",
                "options": ["监督学习", "无监督学习", "强化学习", "迁移学习"],
                "correct": [0, 1, 2],
                "explanation": "机器学习主要包括监督学习、无监督学习和强化学习三种范式。",
            }
        ],
        ExtractType.code: "```python\nimport numpy as np\n\ndef linear_regression(X, y):\n    # 最小二乘法\n    X_b = np.c_[np.ones((len(X), 1)), X]\n    theta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y\n    return theta\n```",
        ExtractType.notes: "# 机器学习笔记\n\n## 监督学习\n使用标注数据进行训练...\n\n## 无监督学习\n在未标注数据中发现模式...",
    }

    content = mock_responses.get(request.extract_type, "")

    return ExtractResponse(
        type=request.extract_type,
        content=str(content),
        mindmap=content if request.extract_type == ExtractType.mindmap else None,
        quiz=content if request.extract_type == ExtractType.quiz else None,
    )
