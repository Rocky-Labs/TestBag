from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

app.run(debug=True)
@app.route('/formProcess', methods=['POST'])
def process():
    BoxLen = request.form['BoxLen']
    BoxWid = request.form['BoxWid']

    if BoxWid and BoxLen:
        newBox = 9000
        return jsonify({'BoxLen':newBox})

    return jsonify({'error': 'Missing Data'})