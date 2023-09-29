function displayTourData(event) {
  event.preventDefault();
  const tourId = event.target.getAttribute("data-tour-id");

  // Create the URL for the tourdescription.html page with the tourId as a query parameter
  const tourDescriptionURL = `tourdescription.html?tourId=${tourId}`;

  // Redirect to the tourdescription.html page
  window.location.href = tourDescriptionURL;
}


document.addEventListener("DOMContentLoaded", function () {
  // Function to parse query parameters from the URL
  function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
  }

  // Get the tourId from the URL
  const tourId = getQueryParam("tourId");

  // Define the URL of the JSON file
  const jsonUrl = "js/tourData.json"; // Corrected the path to the JSON file

  // Target the container element to display tour data
  const tourContainer = document.getElementById("tourDescription");

  // Function to load and display tour data
  function loadTourData() {
    // Make a GET request to fetch the JSON data
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((tours) => {
        // Find the tour with the matching tourId
        const tour = tours.find((tour) => tour.id === tourId);

        if (tour) {
          // Create HTML elements to display the tour data
          const tourElement = document.createElement("article");
          tourElement.classList.add("product-big");
          

          const carouselImages = tour.photos.map((imageSrc, index) => `
          <div class="sliderSize carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${imageSrc}" alt="Image ${index + 1}">
          </div>
        `).join("");

          // Populate the tour element with data
          tourElement.innerHTML = `
          <div class="container">
  <div class="unit flex-column flex-md-row align-items-md-stretch align-items-end">
    <div class="image-slider">
      <div id="imageCarousel" class="product-big-figure unit-left carousel slide" data-ride="carousel" style="width:500px">
        <ol class="carousel-indicators">
          ${tour.photos.map((_, index) => `
            <li data-target="#imageCarousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
          `).join("")}
        </ol>
        <div class="sliderSize carousel-inner">
          ${tour.photos.map((photo, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${photo}" alt="Image ${index + 1}">
            </div>
          `).join("")}
        </div>
        <a class="carousel-control-prev" href="#imageCarousel" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#imageCarousel" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
      <div class="pricing-and-included">
        <div class="pricing mt-5">
          ${generatePricingHtml(tour)}
        </div>
      </div>
    </div>
    <div class="product-big-body">
      <h5 class="product-big-title mb-4 mt-3" id="tourTitle">${tour.name}</h5>
      <p class="product-big-text" id="tourDescription">${tour.description}</p>
      <div class="product-big-price-wrap"><span class="product-big-price" id="price">$${tour.price}</span></div>
      <div class="overView ">
        <h5 class="product-big-title mb-3 mt-5">OverView</h5>
        <p class="product-big-text" id="overView">${tour.overview}</p>
      </div>
      <div class="whatIncluded">
        <h5 class="product-big-title mb-3 mt-5" style="align-content: center;">Destinations</h5>
        <ul class="product-big-text" id="includedList">
          ${tour.destinations.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>
  <div class="group-md group-middle justify-content-sm-center">

    <a id="viewTourButton" class="reservButton button button-black-outline button-ujarak" href="contact-us.html?#getInTouch"> Contact us for reservation</a>
    
    </a>
  </div>
</div>
          `;
          function generatePricingHtml(tour) {
            return `
            <div class="pricing-and-included">
                    
            <div class="pricing mt-5">
                <div class="pricing-option mb-3">
                    <h5 class="product-big-title mb-3">Private Car + Tour Guide + Entry Fees + Lunch</h5>
                    <ul class="product-big-text">
                        <li>Single Person = $${tour.fullPackage1person}</li>
                        <li>2 People = $${tour.fullPackage2person}</li>
                        <li>From 3 to 5 People = $${tour.fullPackage3to5person}</li>
                        <li>Above 6 People = $${tour.fullPackageabove6Person}</li>
                        <li>Child From 6 to 11 Y = $${tour.fullPackagechildfrom6}</li>
                        <li>Child Under 6 Y = $${tour.fullPackagechildunder6}</li>
                    </ul>
                </div>
                <div class="pricing-option mb-3">
                  <h5 class="product-big-title mb-3">Private Car + Tour Guide + Entry Fees</h5>
                  <ul class="product-big-text">
                      <li>Single Person = $${tour.CarTourEntry1person}</li>
                      <li>2 People = $${tour.CarTourEntry2person}</li>
                      <li>From 3 to 5 People = $${tour.CarTourEntry3to5person}</li>
                      <li>Above 6 People = $${tour.CarTourEntryAbove6person}</li>
                      <li>Child From 6 to 11 Y = $${tour.CarTourEntrychildFrom6person}</li>
                      <li>Child Under 6 Y = $${tour.CarTourEntryChildUnder6person}</li>
                  </ul>
              </div>
              <div class="pricing-option mb-3">
                <h5 class="product-big-title mb-3">Private Car + Tour Guide</h5>
                <ul class="product-big-text">
                    <li>Single Person = $${tour.CarTour1Person}</li>
                    <li>2 People = $${tour.CarTour2Person}</li>
                    <li>From 3 to 5 People = $${tour.CarTour3to5Person}</li>
                    <li>Above 6 People = $${tour.CarTourAbove6Person}</li>
                    <li>Child From 6 to 11 Y = $${tour.CarTourChildFrom6Person}</li>
                    <li>Child Under 6 Y = $${tour.CarTourChildUnder6Person}</li>
                </ul>
            </div>

               
            <div class="pricing-option mb-3">
              <h5 class="product-big-title mb-3">Only Private Car with Driver</h5>
              <ul class="product-big-text">
                  <li>Single Person = $${tour.carOnly1person}</li>
                  <li>2 People = $${tour.carOnly2person}</li>
                  <li>From 3 to 5 People = $${tour.carOnly2person}</li>
                  <li>Above 6 People = $${tour.carOnlyAbove6person}</li>
                  <li>Child From 6 to 11 Y = $${tour.carOnlyAbove6person}</li>
                  <li>Child Under 6 Y = $${tour.carOnly1ChildUnder6person}</li>
              </ul>
          </div>

        
            </div>

        </div>
            `;
          }

          // Append the tour element to the container
          tourContainer.appendChild(tourElement);
        } else {
          // Handle the case where the tour with the given tourId is not found
          console.error(`Tour with ID ${tourId} not found.`);
        }
      })
      .catch((error) => {
        console.error("Error loading tour data:", error);
      });
  }

  // Call the function to load tour data
  loadTourData();
});
