from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter()


class User(BaseModel):
    id: str
    email: str
    name: str


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


@router.post("/register", response_model=User)
async def register(user: UserCreate):
    return User(
        id="user-1",
        email=user.email,
        name=user.name,
    )


@router.post("/login")
async def login(user: UserLogin):
    return {
        "access_token": "mock-token",
        "token_type": "bearer",
        "user": User(id="user-1", email=user.email, name="User"),
    }


@router.get("/me", response_model=User)
async def get_current_user():
    return User(
        id="user-1",
        email="user@example.com",
        name="User",
    )
