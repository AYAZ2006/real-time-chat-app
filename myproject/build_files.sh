pip install -r requirements.txt
python3.9 manage.py collectstatic --no-input
python manage.py migrate
