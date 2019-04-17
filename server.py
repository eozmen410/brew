from flask import Flask, render_template
# from flask_googlemaps import GoogleMaps
# from flask_googlemaps import Map
from flask import Response, request, jsonify
app = Flask(__name__)



coffee_data = {
    "AeroPress" : {
        "images" :["../static/images/aeropress1.jpg","../static/images/aeropress2.jpg","../static/images/aeropress3.jpg","../static/images/aeropress4.jpg","../static/images/aeropress5.jpg","../static/images/aeropress6.jpg","../static/images/aeropress7.jpg","../static/images/aeropress8.jpg","../static/images/aeropress9.jpg","../static/images/aeropress10.jpg"],
        "nb_steps" : 10,
        "timer" : [0,0.1,2,0,0,0,0,0,0,0,0]
    },
    "Chemex": {
        "images": ["../static/images/chemex1.jpg","../static/images/chemex2.jpg","../static/images/chemex3.jpg","../static/images/chemex4.jpg","../static/images/chemex5.jpg","../static/images/chemex6.jpg","../static/images/chemex7.jpg"],
        "nb_steps" : 7,
        "timer" : [0,0.1,2,0,0,0,0,0,0]
    },
    "Cold Brew": {
        "images": ["../static/images/coldbrew1.jpg","../static/images/coldbrew2.jpg","../static/images/coldbrew3.jpg","../static/images/coldbrew4.jpg","../static/images/coldbrew5.jpg","../static/images/coldbrew6.jpg","../static/images/coldbrew7.jpg","../static/images/coldbrew8.jpg","../static/images/coldbrew9.jpg","../static/images/coldbrew10.jpg","../static/images/coldbrew11.jpg"],
        "nb_steps" : 11,
        "timer" : [0,0.1,2,0,0,0,0,0,0,0,0,11]
    },
    "Espresso" : {
        "images": ["../static/images/esp1.jpg","../static/images/esp2.jpg","../static/images/esp3.jpg","../static/images/esp4.jpg","../static/images/esp5.jpg","../static/images/esp6.jpg","../static/images/esp7.jpg"],
        "nb_steps" : 7,
        "timer" : [0,0.1,2,0,0,0,0,0,0]
    },
    "French Press": {
        "images": ["../static/images/french1.jpg","../static/images/french2.jpg","../static/images/french3.jpg","../static/images/french4.jpg"],
        "nb_steps" : 4,
        "timer" : [0,0.1,2,0,0,0]
    },
    "Siphon": {
        "images" :["../static/images/siphon1.jpg","../static/images/siphon2.jpg","../static/images/siphon3.jpg","../static/images/siphon4.jpg","../static/images/siphon5.jpg","../static/images/siphon6.jpg","../static/images/siphon7.jpg","../static/images/siphon8.jpg","../static/images/siphon9.jpg","../static/images/siphon10.jpg"],
        "nb_steps" : 10,
        "timer" : [0,0.1,2,0,0,0,0,0,0,0,0]
    },
    "New Orleans Iced Coffee": {
        "images": ["../static/images/no1.jpg","../static/images/no2.jpg","../static/images/no3.jpg","../static/images/no4.jpg","../static/images/no5.jpg","../static/images/no6.jpg","../static/images/no7.jpg"],
        "nb_steps" : 7,
        "timer" : [0,0.1,2,0,0,0,0,0,0]
    }
}

wish_list = []
done_list =[]
@app.route('/')
def home():
    global coffee_data
    return render_template("welcome.html", data=coffee_data)

@app.route('/coffee/<selected>', methods=['GET', 'POST'])
def coffee(selected):
    global coffee_data
    choice = coffee_data[selected]
    return render_template("coffee.html", data=coffee_data, brew=choice)

@app.route('/add_wish', methods=['POST'])
def add_wish():
    global coffee_data
    global wish_list
    adding = request.get_json()
    if adding not in wish_list:
        wish_list.append(adding)
    return jsonify(wish_list=wish_list)

@app.route('/add_done', methods=['POST'])
def add_done():
    global done_list
    global coffee_data
    return jsonify(done_list=done_list)

@app.route('/remove_wish', methods=['POST'])
def remove_wish():
    removing = request.get_json()
    wish_list.remove(removing)
    return jsonify(wish_list=wish_list)

@app.route('/wish_list')
def wishList():
    global coffee_data
    global wish_list
    return render_template("wish_list.html", data=coffee_data, wish_list=wish_list, done_list=done_list)

if __name__ == '__main__':
	app.run(debug = True)