status= "";
objects= [];
alarm="";

function preload(){
    alarm= loadSound('alarm_clock_5.mp3');
}

function setup(){
    canvas= createCanvas(640, 420);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model Loaded")
status= true;
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(status != ""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i= 0; i <objects.length; i++) {
            document.getElementById("status").innerHTML= "Status: Object Detected";
            fill(r, g, b);
            percent= floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 10);
noFill();
stroke(r, g, b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if (objects[i].label == "person"){
    document.getElementById("result").innerHTML= "Baby Found";
            alarm.stop();
}
else{
    document.getElementById("result").innerHTML= "Baby Not Found";
    alarm.play();
}  
        }
    } 
}
