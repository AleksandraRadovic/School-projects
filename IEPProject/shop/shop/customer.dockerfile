FROM python:3

RUN mkdir -p /opt/src/shop/customer
WORKDIR /opt/src/shop/customer

COPY shop/application_customer.py ./application_customer.py
COPY shop/configuration.py ./configuration.py
COPY shop/models.py ./models.py
COPY shop/requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

ENV PYHONPATH="/opt/src/shop/customer"

ENTRYPOINT ["python", "./application_customer.py"]
