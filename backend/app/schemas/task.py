from datetime import datetime
from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str


class TaskUpdate(BaseModel):
    title: str | None = None
    completed: bool | None = None


class TaskOut(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True
