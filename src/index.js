addEventListener("DOMContentLoaded", () => {
  //Global variables
  const dataURL = " http://localhost:3000/pups";
  const dogBarDiv = document.querySelector("div#dog-bar");
  const divInfo = document.querySelector("div#dog-info");

  //Helper functions

  /*4. When a user clicks the Good Dog/Bad Dog button, two things should happen:
The button's text should change from Good to Bad or Bad to Good
The corresponding pup object in the database should be updated to reflect the new isGoodDog value
You can update a dog by making a PATCH request to /pups/:id and including the updated isGoodDog status in the body of the request. 
*/
  const onGoodDogButtonClick = e => {
    let newValue;
    if (e.target.textContent.includes("Good")) {
      e.target.textContent = "Bad Dog!";
      newValue = false;
    } else {
      e.target.textContent = "Good Dog!";
      newValue = true;
    }
    toggleGoodDog(e.target.dataset.id, newValue).then(updateDogBar);
  };

  /*3. When a user clicks on a pup's span in the div#dog-bar, that pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info". Display the pup's info in the div with the following elements:
  - an img tag with the pup's image url
  - an h2 with the pup's name
  - a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false 
  */
  const displayPupInfo = pup => {
    const imgElement = document.createElement("img");
    const h2Element = document.createElement("h2");
    const btn = document.createElement("button");

    imgElement.src = pup.image;
    imgElement.alt = pup.name;
    h2Element.textContent = pup.name;
    btn.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
    btn.addEventListener("click", onGoodDogButtonClick); // Attach the listener here deliverable 4

    divInfo.append(imgElement, h2Element, btn);
  };

  /*2. On the page, there is a div with the id of "dog-bar". When the page loads, use fetch to get all of the pup data from your server. When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).
   */
  const appendDogName = pup => {
    const spanElement = document.createElement("span");
    spanElement.textContent = pup.name;
    spanElement.addEventListener("click", () => displayPupInfo(pup)); // Attach the listener here deliverable 3 (intro)
    dogBarDiv.appendChild(spanElement);
  };

  const getData = () => {
    fetch(dataURL)
      .then(res => res.json())
      .then(dogArray => {
        dogArray.forEach(appendDogName);
      });
  };
  getData();
});
