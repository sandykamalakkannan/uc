from flask import Flask, render_template
app = Flask(__name__)
@app.route('/')
def home():
    return render_template('foodlossproject.html')
@app.route('/DB1/')
def Dashboard1():
    return render_template('Dashboard1.html')
@app.route('/DB2/')
def Dashboard2():
    return render_template('Dashboard2.html')
@app.route('/DB3/')
def Dashboard3():
    return render_template('Dashboard3.html')
@app.route('/DB5/')
def Dashboard5():
    return render_template('next4.html')

@app.route('/DB4/')
def Dashboard4():
    return render_template('Conclusion.html')


if __name__ == '__main__':
    app.run(debug=True)