// スタンプを押すための関数
function updateStamp(stampId) {
  const stampElement = document.getElementById(stampId);
  stampElement.style.backgroundColor = "#4CAF50"; // スタンプを押したときに背景色を変更
  stampElement.innerHTML = "スタンプ済み";
}

// QRコードスキャンボタンを押すとカメラが起動
document.getElementById('scanQRBtn').addEventListener('click', function() {
  document.getElementById('stampCard').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';

  // カメラを起動して映像を表示
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      const video = document.getElementById('preview');
      video.srcObject = stream;
      video.play();

      // QRコードをスキャンする
      const scanQRCode = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          // QRコードが認識されたら、QRコードのデータでスタンプを押す
          if (code.data === "stamp1") {
            updateStamp('stamp1');
          } else if (code.data === "stamp2") {
            updateStamp('stamp2');
          } else if (code.data === "stamp3") {
            updateStamp('stamp3');
          } else if (code.data === "stamp4") {
            updateStamp('stamp4');
          } else if (code.data === "stamp5") {
            updateStamp('stamp5');
          } else if (code.data === "stamp6") {
            updateStamp('stamp6');
          }
        }
        requestAnimationFrame(scanQRCode);
      };
      scanQRCode();
    })
    .catch(function(error) {
      alert("カメラが起動できませんでした。");
    });
});

// スキャン停止ボタン
document.getElementById('stopScanBtn').addEventListener('click', function() {
  document.getElementById('scanner').style.display = 'none';
  document.getElementById('stampCard').style.display = 'block';
});
