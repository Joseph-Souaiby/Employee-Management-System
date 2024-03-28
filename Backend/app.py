from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import request,jsonify
from flask_marshmallow import Marshmallow
from dbinit import db,ma,app
from employee import Employee, employee_schema,employees_schema
from task import Task, task_schema,tasks_schema
from employeetasks import EmployeeTask,employee_task_schema,employees_tasks_schema
from flask_cors import CORS

app = Flask(__name__)


CORS(app)

# Make sure you configure your app before binding it with SQLAlchemy instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345@localHost:3306/ems'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Marshmallow with the Flask app
db.init_app(app)
ma.init_app(app)


@app.route('/addEmployee',methods=['POST'])
def addEmployee():
    required_fields = ['id','name', 'age', 'job', 'salary']
    for field in required_fields:
        if field not in request.json:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    id = request.json.get('id')  
    name = request.json['name']
    age = request.json['age']
    job_title = request.json['job']
    salary = request.json['salary']
    strengths = request.json.get('strengths', '')  
    weaknesses = request.json.get('weaknesses', '')  
    productivity_score = request.json.get('score')  

    if (type(id)!=int):
        return jsonify({'error': 'ID must be an integer'}), 400
    if type(age)!=int or age < 0:
        return jsonify({'error': 'Age must be a non-negative integer'}), 400
    if (type(salary)!=int and type(salary)!=float) or salary < 0:
        return jsonify({'error': 'Salary must be a non-negative float'}), 400

    existing_employee = Employee.query.get(id)
    if existing_employee:
        return jsonify({'error': 'Employee with this ID already exists.'}), 409

    emp = Employee(id,name,age,job_title,salary,strengths,weaknesses,productivity_score)
    db.session.add(emp)
    db.session.commit()
    return jsonify(employee_schema.dump(emp)),201

@app.route('/addTask',methods=['Post'])
def addTask():
    required_fields = ['id','name']
    for field in required_fields:
        if field not in request.json:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    id=request.json['id']
    name = request.json['name']
    description=request.json['description']

    if (type(id)!=int):
        return jsonify({'error': 'ID must be an integer'}), 400
    existing_task = Task.query.get(id)
    if existing_task:
        return jsonify({'error': 'Task with this ID already exists.'}), 409

    task=Task(id,name,description)
    db.session.add(task)
    db.session.commit()
    return jsonify(task_schema.dump(task)),201

@app.route('/getEmployees',methods=['Get'])
def getEmp():
    employeesList=Employee.query.all()
    return jsonify(employees_schema.dump(employeesList)),201

@app.route('/getTasks',methods=['Get'])
def getTasks():
    taskList=Task.query.all()
    return jsonify(tasks_schema.dump(taskList)),201

@app.route('/assignTask',methods=['Post'])
def assignTask():
    required_fields = ['empid','taskid']
    for field in required_fields:
        if field not in request.json:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    empid=request.json['empid']
    taskid=request.json['taskid']
    
    if type(empid)!=int or type(taskid)!=int:
        return jsonify({'message':'Bad inputs'}),400
    employee_task = EmployeeTask.query.filter_by(employee_id=empid, task_id=taskid).first()
    if employee_task:
        return jsonify({"message":"Employee already assigned this task"}),400

    aet=EmployeeTask(empid,taskid)
    db.session.add(aet)
    db.session.commit()
    return jsonify(employee_task_schema.dump(aet)),201

@app.route('/updateCompletion', methods=['PUT'])
def updateCompletion():
    required_fields = ['empid','taskid','completion']
    for field in required_fields:
        if field not in request.json:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    empid = request.json['empid']
    taskid = request.json['taskid']
    new_completion = request.json['completion']
    if type(empid)!=int or type(taskid)!=int or new_completion<0 or new_completion>100:
        return jsonify({'message':'Bad inputs'}),400
    
    employee_task = EmployeeTask.query.filter_by(employee_id=empid, task_id=taskid).first()
    if employee_task:
        employee_task.percent_completion = new_completion
        db.session.commit()
        return jsonify({'message': 'Percent completion updated successfully.'}), 200
    else:
        return jsonify({'error': 'Employee task not found.'}), 404


@app.route('/getTasksForEmp',methods=['Get'])
def getTasksforEmp():
    emp_id = request.args.get('empid')
    if not emp_id:
        return jsonify({'error': 'empid parameter is missing.'}), 400

    employee_tasks = EmployeeTask.query.filter_by(employee_id=emp_id).all()
    task_data = []
    for employee_task in employee_tasks:
        task = Task.query.get(employee_task.task_id)
        task_info = task_schema.dump(task)
        task_info['completion_percentage'] = employee_task.percent_completion
        task_data.append(task_info)

    return jsonify(task_data), 200

if __name__ == '__main__':
    app.run()