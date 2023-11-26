FROM python:3

RUN mkdir -p /opt/src/shop/courier
WORKDIR /opt/src/shop/courier

COPY shop/application_courier.py ./application_courier.py
COPY shop/configuration.py ./configuration.py
COPY shop/models.py ./models.py
COPY shop/requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

ENV PYHONPATH="/opt/src/shop/courier"

ENTRYPOINT ["python", "./application_courier.py"]
