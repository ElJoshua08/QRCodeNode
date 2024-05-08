const $createQRButton = document.getElementById('createQrButton');

$createQRButton.addEventListener('click', async () => {
  const $textInput = document.getElementById('textInput');
  const $imgInput = document.getElementById('imageInput');

  if (!$textInput.value && !$imgInput.value) {
    alert('Please Complete one field');
    return;
  }

  let res = await fetch(`/qr/${$textInput.value}`)
  let data = await res.json()

  if (data.status == "OK") {
    const qrCode = new Image()
    qrCode.src = data.message

    document.body.appendChild(qrCode)
  }
  console.log(data)
});
