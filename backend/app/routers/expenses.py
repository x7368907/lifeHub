from collections import defaultdict
from datetime import datetime
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.database import get_db
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseOut, ExpenseSummary
from app.models.user import User

router = APIRouter(prefix="/expenses", tags=["expenses"])


@router.get("", response_model=list[ExpenseOut])
def list_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
        .order_by(Expense.created_at.desc())
        .all()
    )


@router.post("", response_model=ExpenseOut, status_code=status.HTTP_201_CREATED)
def create_expense(
    payload: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expense = Expense(amount=payload.amount, category=payload.category, user_id=current_user.id)
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense


@router.get("/summary", response_model=ExpenseSummary)
def monthly_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expenses = db.query(Expense).filter(Expense.user_id == current_user.id).all()
    if not expenses:
        return ExpenseSummary(month="N/A", total=Decimal("0"), by_category={})

    month = datetime.utcnow().strftime("%Y-%m")
    total = sum((expense.amount for expense in expenses), Decimal("0"))
    by_category: dict[str, Decimal] = defaultdict(lambda: Decimal("0"))
    for expense in expenses:
        by_category[expense.category] += expense.amount

    return ExpenseSummary(month=month, total=total, by_category=dict(by_category))
