const $createQRButton = document.getElementById('createQrButton');

$createQRButton.addEventListener('click', async () => {
  const $textInput = document.getElementById('textInput');

  if (!$textInput.value) {
    alert('Please add a text or an URL');
    return;
  }

  let dataToSend = {
    content: $textInput.value,
  };

  const res = await fetch(`/qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  });

  const receivedData = await res.json();

  if (receivedData.status === 'OK') {
    const qrCode = new Image();
    qrCode.src = receivedData.content;
    qrCode.classList.add('qr');

    const $qrContainer = document.querySelector('.qr-container');
    $qrContainer.appendChild(qrCode);
    const $qrs = $qrContainer.querySelectorAll('.qr');


    if ($qrs.length > 0) {
      $qrContainer.classList.add('active');
    }
  } else {
  }
});
