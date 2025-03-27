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
  1: [
    "Singapore (SG)",
    "Timor-Leste (TL)",
    "Macau SAR China (MO)",
    "Malaysia (MY)",
    "Myanmar (MM)",
    "Brunei (BN)",
    "Cambodia (KH)",
    "Hong Kong SAR China (HK)",
    "Laos (LA)",
    "PhilippinesThe (PH)",
    "Thailand (TH)",
    "Vietnam (VN)",
    "China (CN)",
    "Guangzhou (CAN)",
    "Dongguan (DGM)",
    "Fuzhou (FOC)",
    "South China Area (HAK)",
    "Chaoshan & Huizhou (SWA)",
    "Shenzhen (SZX)",
    "Fujian Province (XMN)",
    "Zhujiang Delta Area (ZUH)",
    "Henan Province (CGO)",
    "Japan (JP)"
  ],
  2: ["Thailand (TH)", "Taiwan (TW)"],
  3: ["Japan", "South Korea"],
  4: ["Australia", "New Zealand"],
  5: ["USA", "Canada"],
  6: ["UK", "France", "Germany", "Italy", "Spain"],
  7: ["Russia", "Brazil", "South Africa"],
  8: ["Argentina", "Chile", "Peru"],
};

const lionParcelCountries = {
  "$5 USD": ["Singapore (SG)", "Macau SAR China (MO)", "Malaysia (MY)"],
  "$15 USD": ["Brunei (BN)", "Hong Kong SAR China (HK)", "Philippines (PH)"],
  "$20 USD": ["Thailand (TH)"],
  "$10 USD": ["Taiwan (TW)"],
};

function getShippingProviders(country) {
  let providers = [];

  if (country === "Singapore (SG)") {
    providers.push({ provider: "J&T Singapore", fee: "$5 USD", duration: "3 - 7 Business Days" });
  }

  for (const [zone, countries] of Object.entries(shippingZones)) {
    if (countries.includes(country)) {
      let fee = "$25 USD";
      if (zone == 4) fee = "$30 USD";
      if (zone >= 5 && zone <= 7) fee = "$35 USD";
      if (zone == 8) fee = "$50 USD";
      providers.push({ provider: "DHL", fee, duration: "1 - 3 Business Days" });
    }
  }

  for (const [fee, countries] of Object.entries(lionParcelCountries)) {
    console.log("lion parcel countries :)");
    if (countries.includes(country)) {
      console.log("masuk if countries", country);
      let duration = "";
      if(country == "Brunei (BN)") {
        duration = "6 - 8 Business Days";
      }
      if(country == "Hong Kong SAR China (HK)") {
        duration = "6 - 7 Business Days";
      }
      if(country == "Macau SAR China (MO)") {
        duration = "6 - 8 Business Days";
      }
      if(country == "Malaysia (MY)") {
        duration = "5 - 7 Business Days";
      }
      if(country == "Philippines (PH)") {
        duration = "7 - 11 Business Days";
      }
      if(country == "Taiwan (TW)") {
        duration = "5 - 7 Business Days";
      }
      if(country == "Thailand (TH)") {
        duration = "9 - 12 Business Days";
      }
      if(country == "Singapore (SG)") {
        duration = "2 - 3 Business Days";
      }
      providers.push({ provider: "Lion Parcel", fee, duration: duration });
    }
  }

  return providers.sort((a, b) => parseFloat(a.fee.replace("$", "")) - parseFloat(b.fee.replace("$", "")));
}

function drawTable(country) {
  
  console.log("country on drawtable: ", country);
  
  const shipFee = document.getElementById("ship-fee");
  shipFee.innerHTML = ""; // Clear previous content

  const providers = getShippingProviders(country);
  if (providers.length === 0) {
    shipFee.innerText = "No available shipping options.";
    return;
  }

  // Header Text
  let headerMsg = `Shipping Available to ${country}`;
  const headerText = document.createElement("div");
  headerText.innerText = headerMsg;
  headerText.style.color = "black";
  headerText.style.fontWeight = "600";
  headerText.style.marginBottom = "1rem";
  shipFee.appendChild(headerText);

  const shipTable = document.createElement("table");
  shipTable.style.width = "100%";
  shipTable.style.borderCollapse = "collapse";

  const headerRow = document.createElement("tr");
  ["Provider", "Fee", "Duration"].forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    header.style.border = "1px solid gray";
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
      cell.style.border = "1px solid gray";
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
        console.log("country: ", txtValue);
        // drawTable(txtValue.replace(/ \(.*\)/, ""));
        drawTable(txtValue);
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