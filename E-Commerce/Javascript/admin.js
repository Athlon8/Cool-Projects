const imageContainer = document.querySelector('.image-container');
const imageInput = document.querySelector('#image-input');
const caption = document.querySelector('.caption');

// Show the file input when the container is clicked
imageContainer.addEventListener('click', function() {
  imageInput.style.display = "block";
  imageInput.click();
});
imageInput.addEventListener('change', function() {
  const image = this.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    caption.style.display = "none";
    imageContainer.querySelector('img').src = event.target.result;
  }
  
  
  reader.readAsDataURL(image);
});
const imageContainers = document.querySelectorAll('.image-containerSecond');
// const captions = document.querySelectorAll('.caption');

imageContainers.forEach((imageContainer, i) => {
const imageInput = imageContainer.querySelector(`#image-input-${i+1}`);
// const caption = captions[i];

imageContainer.addEventListener('click', function() {
imageInput.style.display = "block";
imageInput.click();
});
imageInput.addEventListener('change', function() {
const image = this.files[0];
const reader = new FileReader();
reader.onload = function(event) {
caption.style.display = "none";
imageContainer.querySelector('img').src = event.target.result;
}

reader.readAsDataURL(image);
});
});

