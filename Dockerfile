FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY src src

COPY main.py main.py
COPY tasks.py tasks.py
COPY wrapper.sh wrapper.sh
RUN chmod 0744 wrapper.sh

CMD ./wrapper.sh