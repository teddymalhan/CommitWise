from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import requests

app = FastAPI()

# Define Pydantic models for the request
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    model: str
    messages: List[Message]
    stream: bool = True
    options: Optional[dict] = None

# Endpoint that interacts with Ollama's /api/chat/ endpoint
@app.post("/ollama/chat/")
async def ollama_chat_completion(request: ChatRequest):
    try:
        # Send the request to Ollama's server
        ollama_response = requests.post(
            "http://localhost:11434/api/chat",  # URL to Ollama's server
            json=request.dict()  # Convert the request to a JSON format
        )

        # Check if the request was successful
        if ollama_response.status_code == 200:
            return ollama_response.json()
        else:
            raise HTTPException(status_code=ollama_response.status_code, detail="Failed to get a response from Ollama server")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


