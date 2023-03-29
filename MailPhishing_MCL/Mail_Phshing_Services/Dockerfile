FROM python:3.9-slim-buster
WORKDIR /app
RUN apt-get update
RUN python -m pip install --upgrade pip
RUN apt-get install libre2-dev git wget vim python3-enchant libenchant-dev -y
RUN apt-get install libre2-5
RUN apt-get install enchant -y
# RUN pip3 install Flask
COPY requirements.txt .
# RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install -r requirements.txt
COPY . .  
RUN [ "python3", "-c", "import nltk; nltk.download('punkt')" ]
EXPOSE 6777
# CMD [ "python3", "inference.py"]
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=6777"]
