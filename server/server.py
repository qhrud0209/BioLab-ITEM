from flask import Flask, json, request, redirect, jsonify
import sqlite3

app = Flask(__name__)

conn = sqlite3.connect('database.db', check_same_thread=False)

cursor = conn.cursor()

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

if __name__ == "__main__":
    app.run(debug = True)

