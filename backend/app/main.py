from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, tasks, expenses, ai

app = FastAPI(title="LifeHub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(expenses.router)
app.include_router(ai.router)


@app.get("/")
def read_root():
    return {"status": "LifeHub API running"}
