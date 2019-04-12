from flask import Flask, render_template
# from flask_googlemaps import GoogleMaps
# from flask_googlemaps import Map
from flask import Response, request, jsonify
app = Flask(__name__)

m_data = {
    "Keith 'Bang Bang' McCurdy":
    {
        "address": '2245, 62 Grand St, New York, NY 10013',
        "price" : 1000,
        "style" : ["realist", "blackwork"],
        "images" : ["https://static1.squarespace.com/static/542dc06ae4b0a98dd74f94db/545be6b7e4b0f63315128ce2/587b4779bf629abac090b135/1484474259592/BBNYC2.jpg?format=1500w","https://static1.squarespace.com/static/542dc06ae4b0a98dd74f94db/545be6b7e4b0f63315128ce2/56b5834c746fb91846f2c6bf/1454736211923/BBw12.jpg?format=1500w"],
        "website" : "http://www.bangbangforever.com/artist-bang"
    },
    "Jonathan 'Jon Boy' Valena": {
        "address" : "3805, 163 West 4th Street, New York, NY 10014",
        "price" : 800,
        "style" : ["minimalist"],
        "images": ["https://cdntattoofilter.com/tattoo/5599/l.jpg", "https://cdntattoofilter.com/tattoo/3705/l.jpg","https://cdntattoofilter.com/tattoo/5196/l.jpg"]
    }
}

coffee_data = {
    "AeroPress" : {
        "images" :["../static/images/aeropress1.jpg","../static/images/aeropress2.jpg","../static/images/aeropress3.jpg","../static/images/aeropress4.jpg","../static/images/aeropress5.jpg","../static/images/aeropress6.jpg","../static/images/aeropress7.jpg","../static/images/aeropress8.jpg","../static/images/aeropress9.jpg","../static/images/aeropress10.jpg"],
        "nb_steps" : 10,
        "timer" : [0,0.1,2,0,0,0,0,0,0,0]
    }
}

@app.route('/map')
def map_view():
    global m_data
    return render_template("map_test.html", data=m_data)

@app.route('/coffee')
def coffee():
    global coffee_data
    return render_template("coffee.html", data=coffee_data)

if __name__ == '__main__':
	app.run(debug = True)