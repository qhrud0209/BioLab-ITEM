from flask import Flask, json, request, redirect, jsonify, url_for
import sqlite3
from flask import send_from_directory
from flask import send_file
from werkzeug.utils import secure_filename
import os
app = Flask(__name__)
#app.config['SECRET_KEY'] = "secret"
#app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16MB
app.config['DOWNLOAD_FOLDER'] = '/server/file-server'
ALLOWED_EXTENSIONS = {'pdf', 'hwp'}

conn = sqlite3.connect('database.db', check_same_thread=False)

cursor = conn.cursor()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def chemical_search(keyword):
    cursor.execute('''SELECT * FROM chemicals WHERE chemicalName LIKE ? ''', ('%'+keyword+'%',))
    result = cursor.fetchall()
    #cursor.close()·
    #print(result)
    return result

def equipment_search(keyword):
    cursor.execute('''SELECT * FROM equipments WHERE equipmentName LIKE ? ''', ('%'+keyword+'%',))
    result = cursor.fetchall()
    #cursor.close()·
    #print(result)
    return result

@app.route("/search/file/<path:filename>", methods=['GET'])
def seatch_file(filename):
    path = "../server/file-server"+filename+".pdf"

    if os.path.isfile(path):
        return jsonify({"message" : "yes"})
    else:
        return jsonify({"message" : "no"})

@app.route("/upload/file/<path:filename>", methods=['POST'])
def upload_file(filename):
    
    if 'files' not in request.files:
        return "No file part"
    
    print("imhere")
    file = request.files['files']
    #print(file)

    path = "../server/file-server/"+filename+".pdf"
    print("path"+path)
    file.save(os.path.join(path))

    return jsonify({"message": "success"})

@app.route("/download/file/<path:filename>", methods=['GET'])
def download_file(filename):
    print(filename)

    path = os.path.join("../server/file-server/"+filename+".pdf")

    return send_file(path, as_attachment=True)


@app.route("/search/chemical/<keyword>", methods=['GET'])
def search_chemical_keyword(keyword):
    result = json.dumps(chemical_search(keyword), ensure_ascii=False)
    #result = search(keyword)
    #print(result)
    #return jsonify({"data": result})
    #print(result)
    return result

@app.route("/search/equipment/<keyword>", methods=['GET'])
def search_equipment_keyword(keyword):
    result = json.dumps(equipment_search(keyword), ensure_ascii=False)
    #result = search(keyword)
    #print(result)
    #return jsonify({"data": result})
    #print(result)
    return result


@app.route("/add/chemical", methods=['POST'])
def add_chemical():
    data = request.get_json()

    print(data)

    cursor.execute('''INSERT INTO chemicals(chemicalName, chemicalLocation, chemicalCaution, chemicalImage, chemicalDate, chemicalQuantity) VALUES(?, ?, ?, ?, ?, ?)''', (data['name'], data['location'], data['caution'], data['image'], data['date'], data['quantity']))
    data = cursor.fetchall()

    conn.commit()
    return jsonify({"message": "success"})

@app.route("/add/equipment", methods=['POST'])
def add_equipment():
    data = request.get_json()

    print(data)

    cursor.execute('''INSERT INTO equipments(equipmentName, equipmentLocation, equipmentFunction, equipmentImage) VALUES(?, ?, ?, ?)''', (data['name'], data['location'], data['function'], data['image']))
    data = cursor.fetchall()

    conn.commit()
    return jsonify({"message": "success"})

@app.route("/add/notice", methods=['POST'])
def add_notice():
    data = request.get_json()

    print(data)

    cursor.execute('''INSERT INTO notice(message) VALUES(?)''', (data['message'],))
    data = cursor.fetchall()

    conn.commit()
    return jsonify({"message": "success"})

@app.route("/chemicals/all", methods=['GET'])
def get_chemicals():
    cursor.execute('''SELECT * FROM chemicals''')
    result = cursor.fetchall()
    return jsonify(result)


@app.route("/notice", methods=['GET'])
def get_notice():
    cursor.execute('''SELECT * FROM notice''')
    result = cursor.fetchall()
    return jsonify(result)

@app.route("/chemicals/<id>", methods=['GET'])
def get_chemical(id):
    cursor.execute('''SELECT * FROM chemicals WHERE chemicalID = ?''', (id,))
    result = cursor.fetchall()
    return jsonify(result)

@app.route("/equipments/<id>", methods=['GET'])
def get_equipment(id):
    cursor.execute('''SELECT * FROM equipments WHERE equipmentID = ?''', (id,))
    result = cursor.fetchall()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug = True)

