shiver = "";
spiderman = "";

leftWristX = 0; 
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;   
leftWristScore = 0;
playedSong = "";
rightWristScore = 0;
statusSong = "";

function preload(){
mario = loadSound("shiver.mp3");
spiderman = loadSound("toby.mp3");
}

function setup(){
    canvas = canvasCreate(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotPoses);
}

function gotPoses(results) {
    if (results.length > 0 ) {
        console.log(results);
        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("rightWristScore"+ rightWristScore + "leftWristScore" + leftWristScore);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function modelLoaded(){
    console.log("PoseNet has started");
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#0062ff");
    stroke("#0062ff");
    circle(rightWristX,rightWristY,20);

    

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
        }
}

function start(){
    shiver.play;
}

function isPlaying(){
    shiver.stop();
    spiderman.stop();

}