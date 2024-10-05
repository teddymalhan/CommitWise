import requests

OLLAMA_BASE_URL = "http://localhost:11434/api"

def generate_completion(model: str, prompt: str, stream: bool = True, options: dict = None):
    data = {
        "model": model,
        "prompt": prompt,
        "stream": stream
    }
    if options:
        data["options"] = options
    
    response = requests.post(f"{OLLAMA_BASE_URL}/generate", json=data, stream=stream)
    
    if stream:
        # Handle streaming response
        for line in response.iter_lines():
            if line:
                yield line.decode('utf-8')
    else:
        # Handle non-streaming response
        return response.json()

def generate_chat_completion(model: str, messages: list, stream: bool = True, options: dict = None):
    data = {
        "model": model,
        "messages": messages,
        "stream": stream
    }
    if options:
        data["options"] = options
    
    response = requests.post(f"{OLLAMA_BASE_URL}/chat", json=data, stream=stream)
    
    if stream:
        for line in response.iter_lines():
            if line:
                yield line.decode('utf-8')
    else:
        return response.json()

