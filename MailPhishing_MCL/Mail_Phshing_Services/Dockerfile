FROM python:3.9-slim-buster
WORKDIR /app
RUN apt-get update
RUN apt-get install libre2-dev git wget vim python3-enchant libenchant-dev -y
RUN apt-get install libre2-5
RUN apt-get install enchant -y
# COPY requirements.txt requirements.txt
# RUN pip3 install -r requirements.txt
RUN pip3 install Flask
RUN pip3 install inference
# RUN pip3 install flask-cors
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
# RUN [ "python3", "-c", "import nltk; nltk.download('stopwords')" ]
# RUN cp -r /root/nltk_data /usr/local/share/nltk_data        
EXPOSE 6777
# CMD [ "python3", "inference.py"]
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=6777"]
