from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
# import PyMongo
import scrape_mars

app = Flask(__name__)

mongo = PyMongo(app)


@app.route('/')
def index():
    mars = mongo.db.mars.find_one()
    return render_template('index.html', mars=mars)


# @app.route('/scrape')
# def scrape():
#     mars = mongo.db.mars
#     mars_data = scrape_mars.scrape()
#     mars.update(
#         {},
#         mars_data,
#         upsert=True
#     )
#     return 'Scraping Successful!'


if __name__ == "__main__":
    app.run(debug=True)

# Dependencies
from flask import Flask, render_template, jsonify, redirect
import pymongo
from pymongo import MongoClient
import scrape_mars

# Flask setup
app = Flask(__name__)

conn = "mongodb://rc:C00k1eBaba@ds143245.mlab.com:43245/heroku_n5qzr3nx"
# client = MongoClient("mongodb://localhost:27017")

# conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# db = client.mars_db
db = client.heroku_n5qzr3nx

collection = db.mars

@app.route("/")
def index():
     mars_data = db.mars.find_one()
     return render_template("index.html", mars=mars_data)


@app.route('/scrape')
def scrape():
    mars = db.mars
    data = scrape_mars.scrape()

    print(data) 
    mars.update({}, data, upsert=True)

    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True

# # Dependencies
# from flask import Flask, render_template, jsonify, redirect
# import pymongo
# from pymongo import MongoClient
# import scrape_mars

# # Flask setup
# app = Flask(__name__)
# mongo = PyMongo(app)

# conn = "mongodb://rc:C00k1eBaba@ds143245.mlab.com:43245/heroku_n5qzr3nx"
# # client = MongoClient("mongodb://localhost:27017")

# # conn = 'mongodb://localhost:27017'
# client = pymongo.MongoClient(conn)

# # db = client.mars_db
# db = client.heroku_n5qzr3nx

# collection = db.mars

# @app.route('/')
# def index():
#     mars = mongo.db.mars.find_one()
#     return render_template('index.html', mars=mars)


# @app.route('/scrape')
# def scrape():
#     mars = mongo.db.mars
#     mars_data = scrape_mars.scrape()
#     mars.update(
#         {},
#         mars_data,
#         upsert=True
#     )
#     return 'Scraping Successful!'


# if __name__ == "__main__":
#     app.run(debug=True)
#     app.jinja_env.auto_reload = True
#     app.config['TEMPLATES_AUTO_RELOAD'] = True
