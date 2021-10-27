var determineBrightness;

function getImageBrightness(image,callback) {
    var determineBrightnessID = image.attr("id");

    var img = document.createElement("img");
    img.src = image.attr("src");

    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

          for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(determineBrightnessID, brightness);
    }
}

$("img").on("click", function(){
    determineBrightness = $(this)

    getImageBrightness( $(this),function( determineBrightnessID, brightness ) {     
        document.getElementsByTagName('pre')[0].innerHTML = "Brightness: "+brightness+"<br><br>- Red border means class added -> dark,<br>- yellow border mean class added -> light";

        if(brightness<127.5){
            $("#"+determineBrightnessID).addClass("dark");
        }else{
            $("#"+determineBrightnessID).addClass("light");
        }
    });
});
