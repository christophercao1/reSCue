from flask import Flask, render_template, redirect, url_for, request, json

app = Flask(__name__)

@app.route('/')
def home(): 
	return render_template('index.html')

@app.route('/indoor')
def indoors(): 
	return render_template('indoor.html')



@app.route('/modifyMap', methods=['POST'])
def modifyMap():
	x = request.form['dummyPoints']; 
	print(x)
	return json.dumps({'status': 'OK', 'points': x})

@app.route('/modifyIndoor', methods=['POST'])
def modifyIndoor():
	x = request.form['dummyPoints'];
	return json.dumps({'status': 'OK', 'points': x})

if __name__ == "__main__": 
	app.run(debug=True)