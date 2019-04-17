from flask import Flask, render_template
# from flask_googlemaps import GoogleMaps
# from flask_googlemaps import Map
from flask import Response, request, jsonify
app = Flask(__name__)



coffee_data = {
    "AeroPress" : {
        "name": "AeroPress",
        "images" :["../static/images/aeropress1.jpg","../static/images/aeropress2.jpg","../static/images/aeropress3.jpg","../static/images/aeropress4.jpg","../static/images/aeropress5.jpg","../static/images/aeropress6.jpg","../static/images/aeropress7.jpg","../static/images/aeropress8.jpg","../static/images/aeropress9.jpg","../static/images/aeropress10.jpg"],
        "nb_steps" : 10,
        "timer" : [0,0,0,0,0,0.5,1,0,0,0,0],
        "explanations" : ["Bring 7 oz (200 g) of water to a boil. Weigh out 15–18 grams of coffee (depending on your preferred strength). Grind to a texture slightly finer than sea salt.","Insert a paper filter into the AeroPress's detachable plastic cap.","Use some of your hot water to wet your filter and cap. The water serves a dual function here: It helps the filter adhere to the cap, and heats your brewing vessel. This can be challenging as the water is hot and the cap is quite small: Hold the cap by its “ears” and pour the water very slowly so it can be absorbed by the filter.","Assemble your AeroPress. Make sure the entire assembly is dry, since any residual moisture can compromise the device’s seal.","Place it on your scale with the flared end up, then tare the weight. The numbers should appear upside-down. It’s possible to attach the black filter cap and place it right side-up, but this tends to cause leakage and make accurate brewing difficult.","Add your ground coffee. Be careful not to spill any grounds into the ring-shaped gutter at the top of the AeroPress.","Add twice the weight of water than you have grounds (e.g., for 15 grams coffee, add 30 grams water). The water should be about 200 degrees F. \n Start the timer!Make sure the coffee is saturated evenly, tamping slightly with the paddle or butter knife if necessary, and let it sit for 30 seconds.", "Use the remainder of the hot water to fill the chamber.After a minute has elapsed, stir grounds 10 times to agitate.","Fasten the cap, ensuring it locks into the grooves tightly. Flip the whole assembly over with haste and control. Position it atop your brew vessel and begin applying downward pressure. You will experience about 30 pounds of resistance here. If the pushing feels too easy, your grind is likely too coarse; if it’s very hard to push, chances are the grind is too fine. Your coffee is fully brewed once it begins to make a hissing sound. This means there is no more water to push through the device.","Once you’ve unscrewed the cap, you can pop out the filter and the puck of condensed grounds by simply pushing AeroPress’s interior section a final inch.Enjoy your coffee!"]
    },
    "Chemex": {
        "name": "Chemex",
        "images": ["../static/images/chemex1.jpg","../static/images/chemex2.jpg","../static/images/chemex3.jpg","../static/images/chemex4.jpg","../static/images/chemex5.jpg","../static/images/chemex6.jpg","../static/images/chemex7.jpg"],
        "nb_steps" : 7,
        "timer" : [0,0.1,2,0,0,0,0,0,0]
    },
    "Cold Brew": {
        "name": "Cold Brew",
        "images": ["../static/images/coldbrew1.jpg","../static/images/coldbrew2.jpg","../static/images/coldbrew3.jpg","../static/images/coldbrew4.jpg","../static/images/coldbrew5.jpg","../static/images/coldbrew6.jpg","../static/images/coldbrew7.jpg","../static/images/coldbrew8.jpg","../static/images/coldbrew9.jpg","../static/images/coldbrew10.jpg","../static/images/coldbrew11.jpg"],
        "nb_steps" : 11,
        "timer" : [0,0.1,2,0,0,0,0,0,0,0,0,11]
    },
    "Espresso" : {
        "name": "Espresso",
        "images": ["../static/images/esp1.jpg","../static/images/esp2.jpg","../static/images/esp3.jpg","../static/images/esp4.jpg","../static/images/esp5.jpg","../static/images/esp6.jpg","../static/images/esp7.jpg"],
        "nb_steps" : 7,
        "timer" : [0,0.1,2,0,0,0,0,0,0]
    },
    "French Press": {
        "name" : "French Press",
        "images": ["../static/images/french1.jpg","../static/images/french2.jpg","../static/images/french3.jpg","../static/images/french4.jpg"],
        "nb_steps" : 4,
        "timer" : [0,0.1,2,0,0,0]
    },
    "Siphon": {
        "name":"Siphon",
        "images" :["../static/images/siphon1.jpg","../static/images/siphon2.jpg","../static/images/siphon3.jpg","../static/images/siphon4.jpg","../static/images/siphon5.jpg","../static/images/siphon6.jpg","../static/images/siphon7.jpg","../static/images/siphon8.jpg","../static/images/siphon9.jpg","../static/images/siphon10.jpg"],
        "nb_steps" : 10,
        "timer" : [0,0.1,2,0,0,0,0,0,0,0,0]
    },
    "New Orleans Iced Coffee": {
        "name": "New Orleans Iced Coffee",
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
    adding = request.get_json()
    done_list.append(adding)
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
