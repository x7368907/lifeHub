from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "mysql+pymysql://root:password@localhost:3306/lifehub"
    secret_key: str = "change_me"
    access_token_expire_minutes: int = 60 * 24
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
