from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import json

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str
    timestamp: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    context: Optional[List[str]] = None
    history: Optional[List[Message]] = None


class ChatResponse(BaseModel):
    message: Message
    done: bool


@router.post("/chat")
async def chat(request: ChatRequest):
    async def generate():
        response_text = f"收到你的问题：「{request.message}」。这是一个模拟的 AI 导师回复。在实际应用中，这里会调用 LangChain + OpenAI/Claude API 来生成回复。"

        for char in response_text:
            await asyncio.sleep(0.02)
            yield f"data: {json.dumps({'content': char})}\n\n"

        yield f"data: {json.dumps({'done': True})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )


@router.get("/contexts")
async def get_contexts():
    return {
        "contexts": [
            "Computational Neuroscience Lesson 2.2",
            "Lecture_04.mp4 1:24:30",
            "Paper_v2.pdf",
            "diagram.png",
        ]
    }
