FROM python:3

RUN mkdir -p /opt/src/shop/migration
WORKDIR /opt/src/shop/migration

COPY shop/migrate.py ./migrate.py
COPY shop/configuration.py ./configuration.py
COPY shop/models.py ./models.py
COPY shop/requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt


ENTRYPOINT ["python", "./migrate.py"]
