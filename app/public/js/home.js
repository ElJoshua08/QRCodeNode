const $createQRButton = document.getElementById('createQrButton');
const $qrTextInput = document.getElementById('textInput');
const $qrSlider = document.querySelector('.slide-buttons');
const $qrSlideButtons = $qrSlider.querySelectorAll('ion-icon');

$qrTextInput.addEventListener('keydown', (e) => {
  if (e.code == 'Enter' && $qrTextInput.value != null) {
    $createQRButton.click();
  }
});

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
    const $qrContainer = document.querySelector('.qr-container .qrs');
    const $data = document.createElement('div');
    const $options = document.createElement('div');
    $data.classList.add('data');
    $options.classList.add('options');
    const $qrImage = new Image();
    const $imageContainer = document.createElement('div');
    $imageContainer.classList.add('image-container');
    $imageContainer.appendChild($qrImage);
    const $qrTitle = document.createElement('p');
    $qrTitle.classList.add('qr-title');
    $qrTitle.textContent = $textInput.value;
    $qrImage.src = receivedData.content;

    const $copyIcon = document.createElement('ion-icon');
    const $downloadIcon = document.createElement('ion-icon');
    $copyIcon.setAttribute('name', 'copy-outline');
    $downloadIcon.setAttribute('name', 'download-outline');

    $copyIcon.addEventListener('click', () => {
      copyToClipboard($qrImage);
    });

    $downloadIcon.addEventListener('click', () => {
      const $a = document.createElement('a');
      $a.href = receivedData.content;
      $a.download = $textInput.value;
      $a.click();
    });

    $qrImage.addEventListener('click', () => {
      expandQR($qr);
    });

    $options.appendChild($copyIcon);
    $options.appendChild($downloadIcon);

    $data.appendChild($qrTitle);
    $data.appendChild($options);
    $qr.classList.add('qr');
    $qr.appendChild($imageContainer);
    $qr.appendChild($data);

    $qrContainer.appendChild($qr);

    $qrTextInput.value = '';

    const $qrs = $qrContainer.querySelectorAll('.qr');
    if ($qrs.length > 1) {
      $qrSlider.classList.add('active');
      $qr.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      $qrSlider.classList.remove('active');
    }
  } else {
    alert('Something Went wrong');
  }
});

$qrSlideButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const $qrs = document.querySelectorAll('.qr');
    $qrs.forEach((qr, i) => {
      if (i === index) {
        qr.scrollIntoView({
          behavior: 'smooth',
        });
      } else {
        qr.classList.remove('active');
      }
    });
  });
});

function copyToClipboard(imgElement) {
  // Obtener la imagen base64 del elemento img
  const base64String = imgElement.src;

  // Convertir la imagen base64 a un Blob de tipo PNG
  fetch(base64String)
    .then((response) => response.blob())
    .then((blob) => {
      // Copiar el Blob al portapapeles
      navigator.clipboard
        .write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ])
        .then(function () {})
        .catch(function (err) {});
    })
    .catch((error) => console.error('Error fetching image:', error));
}

window.addEventListener('load', () => {
  const $qrExpanded = document.querySelector('.qr-expanded');
  const $qrExpandedClose = $qrExpanded.querySelector('.qr-expanded-close');
  $qrExpandedClose.addEventListener('click', () => {
    $qrExpanded.classList.remove('active');
  });
});

function expandQR(qr) {
  const $qrExpanded = document.querySelector('.qr-expanded');
  const $qrExpandedImage = $qrExpanded.querySelector('.qr-expanded-image');
  const $qrExpandedTitle = $qrExpanded.querySelector('.qr-expanded-title');
  console.log(qr, $qrExpandedImage);

  $qrExpanded.classList.add('active');
  $qrExpandedImage.src = qr.querySelector('img').src;
  $qrExpandedTitle.innerHTML = qr.querySelector('.qr-title').innerHTML;
}
