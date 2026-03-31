from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.services.ai_service import generate_daily_plan
from app.models.user import User

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/plan")
def plan_day(current_user: User = Depends(get_current_user)):
    return {"plan": generate_daily_plan()}
