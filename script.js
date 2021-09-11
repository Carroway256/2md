const text = document.querySelector("#resizingText");
const btn = document.querySelector("#moreButton");
const cardContainer = document.querySelector("#cardContainer");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

var records = [];
var imageCounter = 0;

var mydate =new Date();
var day = mydate.getSeconds()
console.log(day)
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
    fetchPhotos();
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");

  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});
btn.addEventListener("click", (e) => {
  if (text.classList.contains("truncate")) {
    showMoreText();
  } else showLessText();
});

function showMoreText() {
  text.classList.remove("truncate");
  cardContainer.classList.remove("mt-40");
  cardContainer.classList.add("mt-20");
  cardContainer.classList.remove("h-96");
  cardContainer.classList.add("h-278");
}
function showLessText() {
  text.classList.add("truncate");
  cardContainer.classList.remove("mt-20");
  cardContainer.classList.add("mt-40");
  cardContainer.classList.remove("h-278");
  cardContainer.classList.add("h-96");
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

async function fetchPhotos() {
  fetch("https://picsum.photos/v2/list?limit=10")
    .then((response) => response.json())
    .then(
      (data) => (
        (document.getElementById("gallery").src = data[0].download_url,  document.getElementById("authorsName").innerText=data[0].author),
        (records = data),
        console.log("records:", records)
      )
    );
}
function changePhoto(direction) {
  if (direction === "next") {
    if (imageCounter < 9) {
      imageCounter++;
      document.getElementById("gallery").src =
        records[imageCounter].download_url;
        document.getElementById("authorsName").innerText=
        records[imageCounter].author;
    } else {
      imageCounter = 0;
      document.getElementById("gallery").src =
        records[imageCounter].download_url;
        document.getElementById("authorsName").innerText=
        records[imageCounter].author;
    }
  }
  if (direction === "previous") {
    if (imageCounter > 0) {
      imageCounter--;
      document.getElementById("gallery").src =
        records[imageCounter].download_url;
        document.getElementById("authorsName").innerText=
        records[imageCounter].author;
    } else {
      imageCounter = 9;
      document.getElementById("gallery").src =
        records[imageCounter].download_url;
        document.getElementById("authorsName").innerText=
        records[imageCounter].author;
    }
  }
}
