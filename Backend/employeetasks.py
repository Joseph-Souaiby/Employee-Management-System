from dbinit import db,ma

class EmployeeTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    percent_completion = db.Column(db.Float)

    def __init__(self, employee_id, task_id, percent_completion=None):
        self.employee_id = employee_id
        self.task_id = task_id
        self.percent_completion = percent_completion