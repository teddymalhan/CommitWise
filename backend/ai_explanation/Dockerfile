FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY ./app /app

RUN pip install boto3 requests

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
