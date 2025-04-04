from flask_restful import Resource, request
from models import Task, db
from schemas import task_schema, tasks_schema
from http import HTTPStatus
from marshmallow import ValidationError

class TaskListResource(Resource):
    def get(self):
        """Mendapatkan semua tugas"""
        try:
            tasks = Task.query.all()
            return tasks_schema.dump(tasks), HTTPStatus.OK
        except Exception as e:
            return {'message': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR

    def post(self):
        """Membuat tugas baru"""
        data = request.get_json()
        try:
            task = task_schema.load(data)
            db.session.add(task)
            db.session.commit()
            return task_schema.dump(task), HTTPStatus.CREATED
        except ValidationError as err:
            return {'message': str(err)}, HTTPStatus.BAD_REQUEST
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR

class TaskResource(Resource):
    def get(self, task_id):
        """Mendapatkan tugas berdasarkan ID"""
        try:
            task = Task.query.get_or_404(task_id)
            return task_schema.dump(task), HTTPStatus.OK
        except Exception as e:
            return {'message': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR

    def put(self, task_id):
        """Memperbarui tugas"""
        data = request.get_json()
        try:
            task = Task.query.get_or_404(task_id)
            task = task_schema.load(data, instance=task, partial=True)
            db.session.commit()
            return task_schema.dump(task), HTTPStatus.OK
        except ValidationError as err:
            return {'message': str(err)}, HTTPStatus.BAD_REQUEST
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR

    def delete(self, task_id):
        """Menghapus tugas"""
        try:
            task = Task.query.get_or_404(task_id)
            db.session.delete(task)
            db.session.commit()
            return {'message': 'Tugas dihapus'}, HTTPStatus.OK
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR