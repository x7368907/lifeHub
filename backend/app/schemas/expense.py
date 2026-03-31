from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel


class ExpenseCreate(BaseModel):
    amount: Decimal
    category: str


class ExpenseOut(BaseModel):
    id: int
    amount: Decimal
    category: str
    created_at: datetime

    class Config:
        from_attributes = True


class ExpenseSummary(BaseModel):
    month: str
    total: Decimal
    by_category: dict[str, Decimal]
