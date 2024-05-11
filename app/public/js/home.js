const $createQRButton = document.getElementById('createQrButton');
const $qrTextInput = document.getElementById('textInput');

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
    const $qr = document.createElement('div');
    const $qrContainer = document.querySelector('.qr-container');
    const $data = document.createElement('div');
    const $options = document.createElement('div');
    $data.classList.add('data');
    $options.classList.add('options');
    const $qrImage = new Image();
    const $qrTitle = document.createElement('p');
    $qrTitle.textContent = $textInput.value;
    $qrImage.src = receivedData.content;

    const $copyIcon = document.createElement('ion-icon');
    const $downloadIcon = document.createElement('ion-icon');
    $copyIcon.setAttribute('name', 'copy-outline');
    $downloadIcon.setAttribute('name', 'download-outline');

    $options.appendChild($copyIcon);
    $options.appendChild($downloadIcon);

    $data.appendChild($qrTitle);
    $data.appendChild($options);
    $qr.classList.add('qr');
    $qr.appendChild($qrImage);
    $qr.appendChild($data);

    $qrContainer.appendChild($qr);
  } else {
    alert('Something Went wrong');
  }
});
