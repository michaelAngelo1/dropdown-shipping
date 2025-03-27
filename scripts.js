const shippingProvider = [
  {
    "name": "J&T",
    "shippingFee": "$5 USD",
    "duration": "3 - 7 days"
  },
  {
    "name": "DHL",
    "shippingFee": "$25 USD",
    "duration": "1 - 3 days"
  }
];


console.log(shippingProvider[1]);

function myFunction() {
  console.log("dropdown shown");
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("myInput").value = "";
  document.getElementById("ship-fee").innerText = "";
  document.getElementById("dropdown-countries").style.display = "block";
}

function searchAppear() {
  document.getElementById('myInput').classList.toggle("show");
  console.log('search appear');
}

/**
 * Flow:
 * 1. Button Check your shipping fee onpress => Search field appears, but without the dropdown countries
 * 2. User ngetik (onKeyUp) => filterFunction() -> list-countries toggle show & filter.
 * 3. User choose country (onClick <a>) -> populate search field value with chosen country
 * 4. Onclick populated search bar -> unpopulate it, show placeholder "Search"
 * 5. Onclick anything outside search bar, turn into Check your shipping fee button
 */

function runBoth() {
  myFunction();
  filterFunction();
}

// function createGridLayout(rows, cols) {
//   const gridContainer = document.createElement('div');
//   gridContainer.style.display = 'grid';
//   gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
//   gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
//   gridContainer.style.gap = '10px'; // Optional gap between grid items
//   gridContainer.style.width = '300px'; // example width you can change or omit for automatic
//   gridContainer.style.height = '300px'; // example height you can change or omit for automatic.
//   gridContainer.style.border = '1px solid black'; // example border for visibility, remove if needed.

//   for (let i = 0; i < rows * cols; i++) {
//     const gridItem = document.createElement('div');
//     gridItem.textContent = `Item ${i + 1}`;
//     gridItem.style.backgroundColor = `hsl(${i * 30}, 70%, 80%)`; //Example styling, remove or change.
//     gridItem.style.textAlign = 'center';
//     gridItem.style.padding = '10px';
//     gridContainer.appendChild(gridItem);
//   }

//   return gridContainer;
// }

const shippingZones = {
  1: ["Singapore", "Malaysia", "Brunei", "Hong Kong", "Macau", "Philippines"],
  2: ["Thailand", "Taiwan"],
  3: ["Japan", "South Korea"],
  4: ["Australia", "New Zealand"],
  5: ["USA", "Canada"],
  6: ["UK", "France", "Germany", "Italy", "Spain"],
  7: ["Russia", "Brazil", "South Africa"],
  8: ["Argentina", "Chile", "Peru"],
};

const lionParcelCountries = {
  "$5 USD": ["Singapore", "Macau", "Malaysia"],
  "$15 USD": ["Brunei", "Hong Kong", "Philippines"],
  "$20 USD": ["Thailand"],
  "$10 USD": ["Taiwan"],
};

function getShippingProviders(country) {
  let providers = [];

  if (country === "Singapore") {
    providers.push({ provider: "J&T Singapore", fee: "$5 USD", duration: "3 - 7 days" });
  }

  for (const [zone, countries] of Object.entries(shippingZones)) {
    if (countries.includes(country)) {
      let fee = "$25 USD";
      if (zone == 4) fee = "$30 USD";
      if (zone >= 5 && zone <= 7) fee = "$35 USD";
      if (zone == 8) fee = "$50 USD";
      providers.push({ provider: `DHL`, fee, duration: "1 - 3 days" });
    }
  }

  for (const [fee, countries] of Object.entries(lionParcelCountries)) {
    if (countries.includes(country)) {
      providers.push({ provider: "Lion Parcel", fee, duration: "3 - 7 days" });
    }
  }

  return providers;
}

function drawTable(country) {
  const shipFee = document.getElementById("ship-fee");
  shipFee.innerHTML = ""; // Clear previous content

  const providers = getShippingProviders(country);
  if (providers.length === 0) {
    shipFee.innerText = "No available shipping options.";
    return;
  }

  const shipTable = document.createElement("table");
  shipTable.style.width = "100%";
  shipTable.style.borderCollapse = "collapse";

  const headerRow = document.createElement("tr");
  ["Provider", "Fee", "Duration"].forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    header.style.border = "1px solid black";
    header.style.padding = "8px";
    header.style.backgroundColor = "gray";
    header.style.color = "white";
    headerRow.appendChild(header);
  });
  shipTable.appendChild(headerRow);

  providers.forEach(({ provider, fee, duration }) => {
    const row = document.createElement("tr");
    [provider, fee, duration].forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      cell.style.border = "1px solid black";
      cell.style.borderRadius = "12px";
      cell.style.padding = "8px";
      cell.style.textAlign = "center";
      row.appendChild(cell);
    });
    shipTable.appendChild(row);
  });

  shipFee.appendChild(shipTable);
}

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const dropdownCountries = document.getElementById("dropdown-countries");
  const options = dropdownCountries.getElementsByTagName("a");

  let anyVisible = false;
  for (let option of options) {
    const txtValue = option.textContent || option.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      option.style.display = "";
      anyVisible = true;
      option.onclick = function (event) {
        event.preventDefault();
        input.value = txtValue;
        drawTable(txtValue.replace(/ \(.*\)/, "")); // Remove country code from selection
        dropdownCountries.style.display = "none";
      };
    } else {
      option.style.display = "none";
    }
  }

  dropdownCountries.style.display = anyVisible ? "block" : "none";
}





window.onclick = function(event) {
  const myDropdownStyle = window.getComputedStyle(document.querySelector("#myDropdown")).display
  console.log('myDropdownStyle: ', myDropdownStyle);
  if(
    event.target.matches('.dropdown-countries a') || 
    event.target.matches('.dropdown-content') || 
    event.target.matches('#myInput')
  ) {
    console.log("click");
    // document.querySelector("#myDropdown").style.display = "block";
    // document.querySelector(".dropdown-countries").style.display = "none";
    // document.querySelector(".dropbtn").style.display = "none";
    // console.log(document.querySelector(".dropdown-countries a").innerText);
    // console.log('check shipping button clicked!')
    // console.log('dropdown content container clicked!')
    // console.log(document.querySelector("#ship-fee"));
  } else {
    console.log("unclick");
    document.querySelector(".dropdown-countries").style.display = "none";
    // document.querySelector("#myDropdown").style.display = "none";
    // document.querySelector(".dropbtn").style.display = "block";
  }
}