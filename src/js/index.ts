document.addEventListener('DOMContentLoaded', async () => {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const previewList = document.getElementById('previewList') as HTMLElement;
  const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
  let filesArray: File[] = [];

  fileInput.addEventListener('change', handleFiles);
  submitBtn.addEventListener('click', handleSubmit);

  function handleFiles() {
    const files = fileInput.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        filesArray.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewItem = createPreviewItem(e.target?.result as string, file.name);
          previewList.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function createPreviewItem(src: string, fileName: string): HTMLElement {
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-list__item';

    const img = document.createElement('img');
    img.src = src;
    img.alt = fileName;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'preview-list__remove';
    removeBtn.innerText = 'x';
    removeBtn.addEventListener('click', () => {
      const index = filesArray.findIndex((file) => file.name === fileName);
      if (index > -1) {
        filesArray.splice(index, 1);
      }
      previewList.removeChild(previewItem);
    });

    previewItem.appendChild(img);
    previewItem.appendChild(removeBtn);

    return previewItem;
  }

  async function handleSubmit() {
    // if (filesArray.length === 0) {
    //   alert('Нет файлов для отправки.');
    //   return;
    // }

    console.log(filesArray);

    const formData = new FormData();
    filesArray.forEach((file) => {
      formData.append('files', file);
    });
  }
});
