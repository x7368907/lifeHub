from datetime import datetime


def generate_daily_plan() -> str:
    today = datetime.utcnow().strftime("%Y-%m-%d")
    return (
        f"Daily Plan for {today}\n"
        "1. Review top 3 tasks and time-block 90 minutes.\n"
        "2. Triage inbox and expenses (15 minutes).\n"
        "3. Focus session: deep work on highest-impact task (60 minutes).\n"
        "4. Health break: short walk + hydration.\n"
        "5. Wrap up: mark completions and plan tomorrow (10 minutes)."
    )
