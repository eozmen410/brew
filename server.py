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
        "timer" : [0,0,0,0,0,0,0.5,1,0,0,0,0],
        "time": "1.5 minutes", 
        "lvl" : "Intermediate",
        "background": "A space-age contraption with gravity-defying aspirations, the AeroPress was invented by Aerobie just 38 miles from our Oakland roastery. Aerobie is responsible for creating the long-flying “superdisc” that broke Guiness World Records when it soared 1,333 feet into the air. (Take that, frisbee!) The same mastery of aerodynamics comes into play here, with this peculiar and lovely device for brewing coffee.",
        "materials" : ["AeroPress", "AeroPress Filters", "AeroPress funnel", "Kettle", "Grinder", "Scale", "Timer", "Stirring tool", "Coffee cup or other container"],
        "explanations" : ["Bring 7 oz (200 g) of water to a boil. Weigh out 15–18 grams of coffee (depending on your preferred strength). Grind to a texture slightly finer than sea salt.","Insert a paper filter into the AeroPress's detachable plastic cap.","Use some of your hot water to wet your filter and cap. The water serves a dual function here: It helps the filter adhere to the cap, and heats your brewing vessel. This can be challenging as the water is hot and the cap is quite small: Hold the cap by its “ears” and pour the water very slowly so it can be absorbed by the filter.","Assemble your AeroPress. Make sure the entire assembly is dry, since any residual moisture can compromise the device’s seal.","Place it on your scale with the flared end up, then tare the weight. The numbers should appear upside-down. It’s possible to attach the black filter cap and place it right side-up, but this tends to cause leakage and make accurate brewing difficult.","Add your ground coffee. Be careful not to spill any grounds into the ring-shaped gutter at the top of the AeroPress.","Add twice the weight of water than you have grounds (e.g., for 15 grams coffee, add 30 grams water). The water should be about 200 degrees F. Start the timer!Make sure the coffee is saturated evenly, tamping slightly with the paddle or butter knife if necessary, and let it sit for 30 seconds.", "Use the remainder of the hot water to fill the chamber.After a minute has elapsed, stir grounds 10 times to agitate.","Fasten the cap, ensuring it locks into the grooves tightly. Flip the whole assembly over with haste and control. Position it atop your brew vessel and begin applying downward pressure. You will experience about 30 pounds of resistance here. If the pushing feels too easy, your grind is likely too coarse; if it’s very hard to push, chances are the grind is too fine. Your coffee is fully brewed once it begins to make a hissing sound. This means there is no more water to push through the device.","Once you’ve unscrewed the cap, you can pop out the filter and the puck of condensed grounds by simply pushing AeroPress’s interior section a final inch."]
    },
    "Chemex": {
        "name": "Chemex",
        "images": ["../static/images/chemex1.jpg","../static/images/chemex2.jpg","../static/images/chemex3.jpg","../static/images/chemex4.jpg","../static/images/chemex5.jpg","../static/images/chemex6.jpg","../static/images/chemex7.jpg"],
        "nb_steps" : 7,
        "timer" : [0,0,0,0,0.9,0,0,0,0],
        "time": "3-4 minutes",
        "lvl" : "Intermediate",
        "background" : "Equal parts brilliance and common sense, the Chemex remains a staple in every coffee enthusiast's arsenal. Its design has endured, unchanged (wood handle, leather cord, tapered glass and all), since its invention in 1941 by Peter Schlumbohm. Schlumbohm’s designs were characterized as “a synthesis of logic and madness,” and we're inclined to agree. Coffee from a Chemex is very similar to that from a drip, but there’s more room for error. To guarantee the best results, grind your beans more coarsely than you would for a ceramic drip, and offer extra attention to the pour rate. This level of care yields a delicate and nuanced coffee, with plenty left over to share with friends.",
        "materials": ["Chemex carafe","Cehemx filters", "Kettle", "Grinder", "Digital Scale", "Timer"],
        "explanations" : ["The amount of coffee and water varies depending on the type of coffee you are brewing and your preferred strength. As a starting point, we recommend using 50 grams of coffee and 700 grams of water (about 25 ounces), and then adjust according to your taste. \n Weigh out the coffee and grind to a coarseness resembling sea salt.", "Unfold your filter and place it in your Chemex, ensuring that the triple-fold portion is facing the pour spout and lays across without obstructing it.","Fully saturate the filter and warm the vessel with hot water. Discard this water through the pour spout.","Pour your ground coffee into the filter and give it a gentle shake. This will flatten the bed, allowing for a more-even pour.","There will be four pours total, and this is the first.Starting at the bed’s center, gently pour twice the amount of water that you have coffee into your grounds (for example, 50 grams of water if you have 25 grams of coffee). Work your way gently outward, and avoid pouring down the sides of the filter. You’ll notice that adding this amount of water causes the coffee to expand, or “bloom.” Allow it to do so for 45–55 seconds. A solid bloom ensures even saturation.","Pour water in a circular pattern starting in the center. Spiral out toward the edge of the slurry before spiraling back toward the middle. Avoid pouring on the filter. Allow the water to drip through the grounds until the slurry drops 1 inch from the bottom of the filter. You should use about 200 grams of water for this pour.","Repeat the same pour pattern as in Step 6, adding water in 200-gram increments. Repeat once more, allowing the water to percolate through the grounds until the slurry drops 1 inch from the bottom of the filter before beginning the next pour.","Allow the water to drip through the grounds entirely. And enjoy your coffee!"]
    },
    "Cold Brew": {
        "name": "Cold Brew",
        "images": ["../static/images/coldbrew1.jpg","../static/images/coldbrew2.jpg","../static/images/coldbrew3.jpg","../static/images/coldbrew4.jpg","../static/images/coldbrew5.jpg","../static/images/coldbrew6.jpg","../static/images/coldbrew7.jpg","../static/images/coldbrew8.jpg","../static/images/coldbrew9.jpg","../static/images/coldbrew10.jpg","../static/images/coldbrew11.jpg"],
        "nb_steps" : 11,
        "time" : "12 hours",
        "timer" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "lvl" : "Advanced",
        "explanations": ["Measure out 2,000 grams (two liters) of water.", "Place the Filtron’s rubber cap in the hole at the bottom of the device.","Wet the wool filter and place it in the circular groove at the bottom of the Filtron. You’ll want to make sure this is in evenly; otherwise, the extraction may be subpar.", "Unfold your filter and place it in the Filtron. It will be a slightly loose fit. Secure it evenly and fold where necessary.","Weigh out one pound (454 grams) of coffee.","Grind the coffee finely into a large nonreactive bowl.","Add your coffee to the Filtron, then give it a few shakes to level the bed.","Pour your water over the grounds—gradually and carefully—in a series of concentric circles.","Submerge the grounds with a butter knife or bamboo paddle.", "Place the plastic disc filter on top of the filter, then place the plastic top component on top of that. Let steep for 12 hours.","Here’s where you’ll need a friend. Carefully position the Filtron over your carafe and swiftly pull out the rubber stopper. Often, you have a couple of seconds before the flow of coffee begins."]
    }
    ,
    "Espresso" : {
        "name": "Espresso",
        "images": ["../static/images/esp1.jpg","../static/images/espr2.jpg","../static/images/espr3.jpg","../static/images/espr4.jpg","../static/images/espr5.jpg","../static/images/espr6.jpg","../static/images/espr7.jpg"],
        "nb_steps" : 7,
        "time": "25-30 seconds",
        "timer" : [0,0.1,2,0,0,0,0,0,0],
        "lvl" : "Simple"
    },
    "French Press": {
        "name" : "French Press",
        "images": ["../static/images/french1.jpg","../static/images/french2.jpg","../static/images/french3.jpg","../static/images/french4.jpg"],
        "nb_steps" : 4,
        "timer" : [0,1,0.5,4],
        "time": "4-5 minutes",
        "lvl" : "Simple",
        "background" : "French press coffee is dense and heavy, yet it has its own sort of elegance. As with any method, the devil is in the details: To achieve a full expression of the coffee, decant it immediately after brewing so it doesn’t become bitter or chalky. Then, sink into this rich and heady cup. It only takes four minutes to brew.",
        "materials" : ["French press", "Grinder", "Kettle", "Scale", "Timer", "Wooden Spoon", "1:12 Coffee to Water Ratio"],
        "explanations" : ["Bring enough water to fill the French press to a boil. For a 17-oz press, you'll need about 350 grams (12 ounces)\nWhile the water is heating, grind your coffee. French press coffee calls for a coarse, even grind. We recommend starting with a 1:12 coffee-to-water ratio. If you're using 350 grams of water, you’ll want 30 grams of coffee.","To start, gently pour twice the amount of water than you have coffee onto your grounds. For example, if you have 30 grams of coffee, you’ll want to start with 60 grams of water.","Give the grounds a gentle stir with a bamboo paddle or chopstick. Allow the coffee to bloom for 30 seconds.", "Pour the remaining water and place the lid gently on top of the grounds. Don’t plunge just yet. Let the coffee steep for four minutes. Four. Don’t guess."]
    },
    "Siphon": {
        "name":"Siphon",
        "images" :["../static/images/siphon1.jpg","../static/images/siphon2.jpg","../static/images/siphon3.jpg","../static/images/siphon4.jpg","../static/images/siphon5.jpg","../static/images/siphon6.jpg","../static/images/siphon7.jpg","../static/images/siphon8.jpg","../static/images/siphon9.jpg","../static/images/siphon10.jpg"],
        "nb_steps" : 10,
        "time" : "2-2.5 minutes",
        "timer" : [0,0.1,2,0,0,0,0,0,0,0,0],
        "lvl" : "Advanced"

    },
    "New Orleans Iced Coffee": {
        "name": "New Orleans Iced Coffee",
        "images": ["../static/images/no1.jpg","../static/images/no2.jpg","../static/images/no3.jpg","../static/images/no4.jpg","../static/images/no5.jpg","../static/images/no6.jpg","../static/images/no7.jpg"],
        "nb_steps" : 7,
        "time" : "12 hours",
        "timer" : [0,0.1,2,0,0,0,0,0,0],
        "lvl": "Advanced"
    }
}

wish_list = []
done_list =[]
@app.route('/')
def home():
    global coffee_data
    return render_template("welcome.html", data=coffee_data, wish_list=wish_list)

@app.route('/coffee/<selected>', methods=['GET', 'POST'])
def coffee(selected):
    global coffee_data
    choice = coffee_data[selected]
    return render_template("coffee.html", data=coffee_data, brew=choice, choice = selected)

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
    global wish_list
    adding = request.get_json()
    add = False
    for x in done_list:
        if x['brew']['name'] == adding['brew']['name']:
            x['rating'] = adding['rating']
            add = True
            break
    if(not add):
        done_list.append(adding)
    if adding['brew']['name'] in wish_list:
        wish_list.remove(adding['brew']['name'])
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

@app.route('/quiz/<select>')
def makeQuiz(select):
    global coffee_data
    choice = coffee_data[select]
    return render_template("quiz.html", data=coffee_data, brew=choice)

@app.route('/outline/<select>')
def outline(select):
    global coffee_data
    choice = coffee_data[select]
    return render_template("outline.html", data=coffee_data, brew=choice, choice=select)


if __name__ == '__main__':
	app.run(debug = True)
