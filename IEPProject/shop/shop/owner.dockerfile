FROM python:3

RUN mkdir -p /opt/src/shop/owner
WORKDIR /opt/src/shop/owner

COPY shop/application_owner.py ./application_owner.py
COPY shop/configuration.py ./configuration.py
COPY shop/models.py ./models.py
COPY shop/requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

ENV PYHONPATH="/opt/src/shop/owner"

ENTRYPOINT ["python", "./application_owner.py"]
