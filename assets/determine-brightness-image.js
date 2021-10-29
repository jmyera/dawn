const mediumBrightnessValue = 127.5;
var imageBanner = document.getElementById('banner-media').src;

function getBrightness(imageSrc, callback) {
  const img = document.createElement("img");
  img.src = imageSrc;
  img.crossOrigin = "anonymous";
  img.style.display = "none";
  document.body.appendChild(img);
  let colorSum = 0;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r, g, b, avg;

    for (let x = 0, len = data.length; x < len; x += 4) {
      r = data[x];
      g = data[x + 1];
      b = data[x + 2];
      avg = Math.floor((r + g + b) / 3);
      colorSum += avg;
    }
    const brightness = Math.floor(colorSum / (this.width * this.height));
    callback(brightness);
  };
}
// getBrightness(imageBanner, (b) => console.log(b));
// getBrightness(imageBanner,function(brightness){
//    console.log(brightness);
// });

// getBrightness(imageBanner, function (brightness) {
//   if (brightness < mediumBrightnessValue) {
//     console.log(brightness + ' es más pequeño que ' + mediumBrightnessValue);
//   } else {
//     console.log(brightness + ' es más grande que ' + mediumBrightnessValue);
//   }
// });

// function getImageLightness(imageSrc,callback) {
//   var img = document.createElement("img");
//   img.src = imageSrc;
//   img.style.display = "none";
//   document.body.appendChild(img);
// 
//   var colorSum = 0;
// 
//   img.onload = function() {
//       // create canvas
//       var canvas = document.createElement("canvas");
//       canvas.width = this.width;
//       canvas.height = this.height;
// 
//       var ctx = canvas.getContext("2d");
//       ctx.drawImage(this,0,0);
// 
//       var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
//       var data = imageData.data;
//       var r,g,b,avg;
// 
//       for(var x = 0, len = data.length; x < len; x+=4) {
//           r = data[x];
//           g = data[x+1];
//           b = data[x+2];
// 
//           avg = Math.floor((r+g+b)/3);
//           colorSum += avg;
//       }
// 
//       var brightness = Math.floor(colorSum / (this.width*this.height));
//       callback(brightness);
//   }
// }
// 
// getImageLightness(imageBanner,function(brightness){
//   console.log(brightness);
// });