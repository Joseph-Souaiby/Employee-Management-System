from dbinit import db,ma
from marshmallow import fields
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    def __init__(self,id,name,description):
        self.id=id
        self.name=name
        self.description=description

class TaskSchema(ma.Schema):
    id = fields.Integer(required=True)  
    name = fields.String(required=True)  
    description = fields.String()



task_schema = TaskSchema()
tasks_schema=TaskSchema(many=True)