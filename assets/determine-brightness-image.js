var imageBanner = document.getElementById('banner-media').src;
var callback = callback(brightness);

function getBrightness(imageSrc, callback) {
  const img = document.createElement('img');
  img.src = imageSrc;
  img.crossOrigin = 'anonymous';
  img.style.display = 'none';
  document.body.appendChild(img);
  let colorSum = 0;

  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
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
  }
};

getBrightness(imageBanner, (b) => console.log(b));


console.log(callback);

// var imageBrightness = getBrightness(x);
// console.log(imageBrightness);
// 
// if (imageBrightness > 127.5) {
//     console.log('true');
//   } else {
//     console.log('false');
//   }
// }


