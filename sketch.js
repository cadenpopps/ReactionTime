var start;
var scoreScreen;
var waitingForPlayer;
var tooFast;
var timeout;
var timeoutCounter;
var font;
var waitTime;
var reactTime;
var allTimes;
var darkMode;
const LOADFONT = false;

function preload() {
    if (LOADFONT) {
        font = loadFont('data/SourceCodePro-Light.otf');
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    textAlign(CENTER);

    frameRate(60);

    allTimes = [];
    darkMode = false;
    start = true;
    timeoutCounter = 0;
    if (LOADFONT) {
        textFont(font);
    }
    else {
        textFont('monospace');
    }

    init();
}

function draw() {

    if (start) {
        if (darkMode) {
            background(30);
            fill(255);
        } else {
            background(240);
            fill(0);
        }
        textSize(width / 15);
        text("Click or press any key", width / 2, height / 2);
        if (darkMode) {
            textSize(width / 40);
            text("You might react slower due to less color difference", width / 2, height / 2 + (height / 10));
            text("(1 to switch back)", width / 2, height / 2 + (height / 6));

        }
        else {
            textSize(width / 30);
            text("Press 1 for dark mode (stealth mode)", width / 2, height / 2 + (height / 10));
        }
    }
    else if (scoreScreen) {
        if (darkMode) {
            background(30);
            fill(255);
        } else {
            background(240);
            fill(0);
        }
        var averageTime = 0;

        for (let t of allTimes) {
            averageTime += t;
        }

        averageTime /= allTimes.length;

        textSize(width / 40)
        text("Your average time is " + floor(averageTime) + " milliseconds (" + floor(averageTime) / 1000 + " seconds)", width / 2, height / 5);

        var rank = "";

        if (averageTime <= 130) {
            rank = "a cheater"
        }
        else if (averageTime <= 150) {
            rank = "inhumanly fast";
        }
        else if (averageTime <= 180) {
            rank = "blazing fast";
        }
        else if (averageTime <= 200) {
            rank = "very fast";
        }
        else if (averageTime <= 230) {
            rank = "fast";
        }
        else if (averageTime <= 250) {
            rank = "above average";
        }
        else if (averageTime <= 290) {
            rank = "average";
        }
        else if (averageTime <= 330) {
            rank = "below average";
        }
        else if (averageTime <= 370) {
            rank = "slow";
        }
        else if (averageTime <= 430) {
            rank = "very slow";
        }
        else if (averageTime > 500) {
            rank = "my grandma while she is asleep";
        }
        textSize(width / 45);
        text("You are " + rank + " compared to everyone else.", width / 2, (height / 4));

        textSize(width / 20);
        text("Your time was " + floor(reactTime) + " milliseconds", width / 2, height / 2);

        textSize(width / 35);
        text("Thats " + floor(reactTime) / 1000 + " seconds.", width / 2, height - (height / 3));

    }
    else if (tooFast) {
        if (darkMode) {
            background(30);
            fill(255);
        } else {
            background(255, 255, 50);
            fill(0);
        }
        textSize(width / 20);
        if (timeout > 0) {
            text("You were too fast", width / 2, height / 2);
            textSize(width / 30);
            text("Timeout for " + (floor(timeout / 60) + 1) + " seconds", width / 2, height - (height / 4));

        }
        else {
            switch (timeoutCounter) {
                case 0:
                    text("You were faster than light!", width / 2, height / 2);
                    break;
                case 1:
                    text("Slow down please", width / 2, height / 2);
                    break;
                case 2:
                    textSize(width / 27);
                    text("Seriously don't go before it's green", width / 2, height / 2);
                    break;
                case 3:
                    text("Really?", width / 2, height / 2);
                    break;
                case 4:
                    textSize(width / 27);
                    text("Are you trying to break the rules?", width / 2, height / 2);
                    break;
                case 5:
                    text("You aren't impressing anyone...", width / 2, height / 2);
                    break;
                case 6:
                    text("Is this a game to you?", width / 2, height / 2);
                    break;
                case 7:
                    text("This is not a toy!", width / 2, height / 2);
                    break;
                case 8:
                    textSize(width / 30);
                    text("Ok I see you want to see all the messages", width / 2, height / 2);
                    break;
                case 9:
                    textSize(width / 30);
                    text("Let's just keep this easter egg between us ok?", width / 2, height / 2);
                    break;
                case 10:
                    textSize(width / 30);
                    text("Don't tell your friends,\njust let me know when you've found it ok?", width / 2, height / 2);
                    break;
                case 11:
                    textSize(width / 30);
                    text("So now that you're here, let's talk about you.", width / 2, height / 2);
                    break;
                case 12:
                    text("How are you today?", width / 2, height / 2);
                    break;
                case 13:
                    text("More importantly, who are you?", width / 2, height / 2);
                    break;
                case 14:
                    text("Where are you from?", width / 2, height / 2);
                    break;
                case 15:
                    textSize(width / 30);
                    text("I'm just joking, I know theres no way to answer", width / 2, height / 2);
                    break;
                case 16:
                    text("I'll tell you about me then.", width / 2, height / 2);
                    break;
                case 17:
                    textSize(width / 25);
                    text("I'm Caden Popps, I like to make games.", width / 2, height / 2);
                    break;
                case 18:
                    textSize(width / 25);
                    text("I made this game for myself mostly", width / 2, height / 2);
                    break;
                case 19:
                    textSize(width / 25);
                    text("I want to improve my reaction time", width / 2, height / 2);
                    break;
                case 20:
                    textSize(width / 30);
                    text("As I'm writing this, my average time is 250-300 ms", width / 2, height / 2);
                    break;
                case 21:
                    textSize(width / 30);
                    text("I've heard you can't improve reaction time much", width / 2, height / 2);
                    break;
                case 22:
                    text("But I want to prove that wrong", width / 2, height / 2);
                    break;
                case 23:
                    text("Enough about me.", width / 2, height / 2);
                    break;
                case 24:
                    text("How's the weather by the way?", width / 2, height / 2);
                    break;
                case 25:
                    textSize(width / 25);
                    text("Joking again, I know you can't answer", width / 2, height / 2);
                    break;
                case 26:
                    textSize(width / 25);
                    text("These messages are taking me longer\nto write than the game itself", width / 2, height / 2);
                    break;
                case 27:
                    textSize(width / 35);
                    text("More importantly (if you play the game correctly),\nthese messages should be taking you a long time to see", width / 2, height / 2);
                    break;
                case 28:
                    textSize(width / 35);
                    text("I was thinking about obfuscating my code,\nto discourage viewing these messages without waiting", width / 2, height / 2);
                    break;
                case 29:
                    textSize(width / 30);
                    text("But if you are clever enough to look at the code,\n I'll let you :)", width / 2, height / 2);
                    break;
                case 30:
                    text("I've gotta go. Goodbye!", width / 2, height / 2);
                    break;
            }
            if (timeoutCounter > 30) {
                text("<3", width / 2, height / 2);
            }

            textSize(width / 30);
            text("Click or press any key to restart", width / 2, height - height / 4);

        }
    }
    else if (!waitingForPlayer) {
        if (darkMode) {
            background(30);
            fill(255);
        } else {
            background(255, 50, 50);
            fill(0);
        }
        textSize(width / 15);
        text("Wait for it...", width / 2, height / 2);
        if (millis() > waitTime) {
            waitingForPlayer = true;
        }
    }
    else {
        if (darkMode) {
            background(100);
            fill(255);
        } else {
            background(50, 255, 50);
            fill(0);
        }

        text("React now!", width / 2, height / 2);
    }

    if (timeout > 0) {
        timeout--;
    }
}

function init() {
    start = true;
    scoreScreen = false;
    tooFast = false;
    timeout = 0;
    waitingForPlayer = false;
}

function mousePressed() {

    if (waitingForPlayer) {
        if (millis() - waitTime > 70) {
            reactTime = millis() - waitTime;
            allTimes.push(reactTime);
            waitingForPlayer = false;
            scoreScreen = true;
        }
    }
    else if (start) {
        start = false;
        waitTime = millis() + 1000 + random(3000);
    }
    else if (scoreScreen) {
        init();
    }
    else if (tooFast && timeout <= 0) {
        timeoutCounter++;
        init();
    }
    else {
        tooFast = true;
        waitingForPlayer = false;
        timeout = 300 + (60 * timeoutCounter);
    }

}

function keyPressed() {
    if (keyCode == 49) {
        darkMode = !darkMode;
    } else {
        if (waitingForPlayer) {
            if (millis() - waitTime > 70) {
                reactTime = millis() - waitTime;
                allTimes.push(reactTime);
                waitingForPlayer = false;
                scoreScreen = true;
            }
        }
        else if (start) {
            start = false;
            waitTime = millis() + 1000 + random(3000);
        }
        else if (scoreScreen) {
            init();
        }
        else if (tooFast && timeout <= 0) {
            timeoutCounter++;
            init();
        }
        else {
            tooFast = true;
            waitingForPlayer = false;
            timeout = 300 + (60 * timeoutCounter);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
