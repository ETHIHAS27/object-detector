img = ""
status = ""
objects = []

function preload(){
    img = loadImage("dog_cat.jpg")
}

function setup(){
    canvas = createCanvas(640,420)
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML = 'Status: Detecting objects'
}

function draw(){
    image(img, 0,0,640,420)

   /* fill("#ff0000")
    text("Dog",90,80)

    noFill();
    stroke("#ff0000")
    rect(75,45,500,360)

    fill("#ff0000")
    text("cat",350,100)

    noFill();
    stroke("#ff0000")
    rect(290,70,300,330)*/

    if(status != ""){
        for(a=0; a < objects.length; a++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#ff0000")
            percentage = floor(objects[a].confidence * 100)
            text(objects[a].label + " " + percentage + "%",objects[a].x+5,objects[a].y+15)

            noFill();

            stroke('#ff0000')
            rect(objects[a].x,objects[a].y,objects[a].width,objects[a].height)

        }
    }
}

function modelLoaded(){
    console.log("Model Loaded")

    status = true;

    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){

    if(error){
        console.log(error);
    }
    else{
        console.log(results)
        objects = results;
    }

}