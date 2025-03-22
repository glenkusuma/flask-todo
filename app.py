from flask import Flask
from flask_restful import Api
from config import Config
from models import db
from schemas import ma
from resources import TaskListResource, TaskResource

app = Flask(__name__)
app.config.from_object(Config)

# Inisialisasi ekstensi
db.init_app(app)
ma.init_app(app)
api = Api(app)

# Mendaftarkan resource
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<int:task_id>')

# Membuat tabel database saat pertama kali dijalankan
@app.before_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)