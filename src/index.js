addEventListener("DOMContentLoaded", () => {
  //Global variables
  const dataURL = " http://localhost:3000/pups";
  const dogDiv = document.querySelector("div#dog-bar");
  const img = document.createElement("img");
  const pupName = document.createElement("h2");
  const btn = document.createElement("button");
  const divInfo = document.querySelector("div#dog-info");

  ////////Helpers

  /*3. When a user clicks on a pup's span in the div#dog-bar, that pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info". Display the pup's info in the div with the following elements:
  - an img tag with the pup's image url
  - an h2 with the pup's name
  - a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false 
  */
  const displayPupInfo = pup => {
    img.src = pup.image;
    img.alt = pup.name;
    pupName.textContent = pup.name;
    btn.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
    btn.id = pup.id;
    btn.addEventListener("click", onGoodDogButtonClick);

    divInfo.append(img, pupName, btn);
  };

  /*2. On the page, there is a div with the id of "dog-bar". When the page loads, use fetch to get all of the pup data from your server. When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).
   */
  const appendDogName = pup => {
    const span = document.createElement("span");
    span.textContent = pup.name;
    span.addEventListener("click", () => displayPupInfo(pup)); // Attach the listener here deliverable 3 (intro)
    dogDiv.appendChild(span);
  };

  const getData = () => {
    fetch(dataURL)
      .then(res => res.json())
      .then(dogArray => {
        dogArray.forEach(appendDogName);
      });
  };

  // Deliverable 3 (last bullet) as callback for btn.addEventListener
  const toggleButton = e => {
    let newToggleText =
      e.target.textContent === "Bad Dog!" ? "Good Dog!" : "Bad Dog!";
    e.target.textContent = newToggleText;
  };

  //////////Execute

  getData();
  btn.addEventListener("click", toggleButton); // Attach the listener here deliverable 3 (last bullet)
});
