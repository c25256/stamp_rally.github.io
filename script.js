document.getElementById('loginBtn').addEventListener('click', function() {
  // QRコード読み取り機能を呼び出し、認証ページにリダイレクト
  alert('QRコードを読み取ってください');
  // Google Sheets APIを使ってユーザー情報を保存
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nickname = document.getElementById('nickname').value;
  const number = document.getElementById('number').value;

  // Google Sheets APIに新規ユーザー情報を送信
  // APIリクエストを作成
  alert('登録が完了しました！');
  window.location.href = 'stamp_card.html';
});

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

// ログインフォームの処理
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();  // フォームが送信されないように

  // 入力されたニックネームと番号を取得
  const nickname = document.getElementById('nickname').value;
  const number = document.getElementById('number').value;

  // 仮にデータが正しいときに遷移
  if (nickname === "testUser" && number === "12345") {
    // ログイン成功: スタンプカードページに遷移
    window.location.href = 'stamp_card.html';
  } else {
    // ログイン失敗: エラーメッセージを表示
    alert('ニックネームまたは番号が間違っています。');
  }
});
// 「アカウントをお持ちでない方」ボタンをクリックした場合
document.getElementById('registerBtn').addEventListener('click', function() {
  window.location.href = 'register.html';  // register.htmlに遷移
});

// 「すでにアカウントをお持ちの方」ボタンをクリックした場合
document.getElementById('backToLoginBtn').addEventListener('click', function() {
  window.location.href = 'index.html';  // index.htmlに遷移
});
