song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
score = 0;
status_1 = "";

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log('Left wristx:' + leftWristx + ' Left wrist y:' + leftWristy);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log('Right wristx:' + rightWristx + ' right wrist y:' + rightWristy);
        score = results[0].pose.keypoints[9].score;

    }
}

function modelLoaded(){
    console.log("Pose net is initi");
}

function draw(){
    image(video, 0, 0, 600, 500);
    status_1 = song.isPlaying();
    fill("red");
    stroke("red");
    if(leftWristy > 0.2){
        circle(leftWristx,leftWristy,20);
        song.stop;
        if(status_1 == false){
            song.play();
            document.getElementById('heading').innerHTML =  song.name();
        }
    }
}