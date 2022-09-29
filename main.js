Status = "" ;
Video = "" ;
objects = [];



function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.size(480, 380);
    Video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(Video, 0, 0, 480, 380);
    if(Status != "")
    {
        objectDetector.detect(Video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : objects detected";

            fill("black")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            input_object = document.getElementById("input").value;
            if (object[i].label == input_object)
            {
                document.getElementById("found_object").innerHTML = "Object found";
            }
            else
            {
                document.getElementById("found_object").innerHTML = "Object not found";
            }
        }
        
    }
}