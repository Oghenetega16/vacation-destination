(function (){
    "use strict";

    const detailsForm = document.getElementById('destinations');

    detailsForm.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event){
        event.preventDefault();

    // extract the value from each form field
        const destName = event.target.elements["name"].value;
        const destLocation = event.target.elements["location"].value;
        const destPhoto = event.target.elements["photo"].value;
        const destDescrip = event.target.elements["description"].value;

        // clear out the form fields
        for (let i = 0; i < detailsForm.length; i++) {
            detailsForm.elements[i].value = '';
        }

        // run a function that creates the new card
        const destCard = createDestinationCard(destName, destLocation, destPhoto, destDescrip);

        // if needed, change the header at the top of the destination list
        const wishListContainer = document.getElementById('destination-container');
        if (wishListContainer.children.length === 0) {
            document.getElementById('title').innerHTML = 'My Wish List';
        }

        // add the card
        document.querySelector('destination-container').appendChild(destCard);
    }

    function createDestinationCard(name, location, photoURL, description) {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.setAttribute('alt', name);

        const constantPhotoURL = './images/signpost.jpg';
        if (photoURL.length === 0) {
            image.setAttribute('src', constantPhotoURL);
        }
        else {
            image.setAttribute('src', photoURL);
        }
        card.appendChild(image);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h3");
        cardTitle.innerText = name;
        cardBody.appendChild(cardTitle);

        const cardSubtitle = document.createElement("h4");
        cardSubtitle.innerText = location;
        cardBody.appendChild(cardSubtitle);

        if (description.length !== 0) {
            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerText = description;
            cardBody.appendChild(cardText);
        }

        const cardDeleteBtn = document.createElement("button");
        cardDeleteBtn.innerText = "Remove";

        cardDeleteBtn.addEventListener("click", removeDestination);
        cardBody.appendChild(cardDeleteBtn);

        card.appendChild(cardBody);

        return card;
    }

    function removeDestination(event) {
        const card = event.target.parentElement.parentElement;
        card.remove();
    }
})();