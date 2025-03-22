from flask_marshmallow import Marshmallow
from models import Task

ma = Marshmallow()

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        load_instance = True

    id = ma.auto_field(dump_only=True)  # Hanya untuk output
    name = ma.auto_field(required=True)  # Wajib diisi
    completed = ma.auto_field()

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)