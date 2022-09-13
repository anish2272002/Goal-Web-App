FROM python:3.11-rc-alpine

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . .

RUN ls .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000