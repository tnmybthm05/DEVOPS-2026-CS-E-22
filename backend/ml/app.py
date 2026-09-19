from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="News Recommendation ML Service",
    description="Microservice providing machine learning news recommendations",
    version="1.0.0"
)

class RecommendationResponse(BaseModel):
    user_id: str
    recommended_article_ids: List[str]
    model_version: str

@app.get("/")
def read_root():
    return {
        "service": "News Recommendation ML Service",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ml-engine"}

@app.get("/recommendations/{user_id}", response_model=RecommendationResponse)
def get_recommendations(user_id: str, limit: Optional[int] = 10):
    return RecommendationResponse(
        user_id=user_id,
        recommended_article_ids=[],
        model_version="hybrid_v1_stub"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
