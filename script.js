const upload = document.getElementById("upload");
const image = document.getElementById("image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturation = document.getElementById("saturation");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const sepia = document.getElementById("sepia");
const hue = document.getElementById("hue");
const invert = document.getElementById("invert");
const opacity = document.getElementById("opacity");

upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    resetFilters();
  };
  reader.readAsDataURL(file);
});

[
  brightness, contrast, saturation, grayscale,
  blur, sepia, hue, invert, opacity
].forEach(slider => slider.addEventListener("input", applyFilters));

function applyFilters() {
  image.style.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturation.value}%)
    grayscale(${grayscale.value}%)
    blur(${blur.value}px)
    sepia(${sepia.value}%)
    hue-rotate(${hue.value}deg)
    invert(${invert.value}%)
  `;
  image.style.opacity = opacity.value / 100;
}

function resetFilters() {
  brightness.value = contrast.value = saturation.value = opacity.value = 100;
  grayscale.value = blur.value = sepia.value = hue.value = invert.value = 0;
  applyFilters();
}

function applyPreset(type) {
  resetFilters();

  if (type === "vintage") {
    sepia.value = 30;
    contrast.value = 120;
    brightness.value = 110;
  }
  if (type === "bw") {
    grayscale.value = 100;
    contrast.value = 120;
  }
  if (type === "warm") {
    hue.value = 30;
    saturation.value = 130;
  }
  if (type === "cool") {
    hue.value = 220;
    saturation.value = 120;
  }
  if (type === "dramatic") {
    contrast.value = 150;
    brightness.value = 90;
  }
  if (type === "fade") {
    contrast.value = 90;
    brightness.value = 105;
    opacity.value = 90;
  }
  if (type === "insta") {
    brightness.value = 110;
    contrast.value = 120;
    saturation.value = 140;
  }

  applyFilters();
}

function downloadImage() {
  if (!image.src) return alert("Upload an image first");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = image.style.filter;
  ctx.globalAlpha = image.style.opacity;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
