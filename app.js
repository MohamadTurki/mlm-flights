let allFlights = []
let selectedFlight = null
let searchParams = {}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function syncSearchParams() {
  if (searchParams.from && searchParams.to && searchParams.date) {
    sessionStorage.setItem("searchParams", JSON.stringify(searchParams))
  }
}

function getActiveSearchParams() {
  if (searchParams.from && searchParams.to && searchParams.date) {
    return searchParams
  }

  const stored = sessionStorage.getItem("searchParams")
  if (!stored) {
    return {}
  }

  try {
    searchParams = JSON.parse(stored) || {}
  } catch {
    searchParams = {}
  }

  return searchParams
}

async function loadFlights() {
  try {
    const response = await fetch("flights.json")
    const data = await response.json()
    allFlights = data.flights
    console.log("Flights loaded:", allFlights)
    populateCityDropdowns()
  } catch (error) {
    console.error("Error loading flights:", error)
  }
}

function getAvailableCities() {
  const cities = new Set()
  allFlights.forEach((flight) => {
    cities.add(flight.departure)
    cities.add(flight.arrival)
  })
  return Array.from(cities).sort((a, b) => a.localeCompare(b))
}

function populateCityDropdowns() {
  const cities = getAvailableCities()

  const homeFromCity = document.getElementById("homeFromCity")
  const homeToCity = document.getElementById("homeToCity")

  if (homeFromCity) {
    homeFromCity.innerHTML =
      '<option value="">Select departure city</option>' +
      cities.map((city) => `<option value="${city}">${city}</option>`).join("")
  }

  if (homeToCity) {
    homeToCity.innerHTML =
      '<option value="">Select arrival city</option>' +
      cities.map((city) => `<option value="${city}">${city}</option>`).join("")
  }

  const fromCity = document.getElementById("fromCity")
  const toCity = document.getElementById("toCity")

  if (fromCity) {
    fromCity.innerHTML =
      '<option value="">Select departure city</option>' +
      cities.map((city) => `<option value="${city}">${city}</option>`).join("")
  }

  if (toCity) {
    toCity.innerHTML =
      '<option value="">Select arrival city</option>' +
      cities.map((city) => `<option value="${city}">${city}</option>`).join("")
  }
}

document.addEventListener("DOMContentLoaded", loadFlights)

function quickSearch() {
  const fromCity = document.getElementById("homeFromCity")?.value || ""
  const toCity = document.getElementById("homeToCity")?.value || ""
  const date = document.getElementById("homeDate")?.value || ""

  if (!fromCity || !toCity || !date) {
    alert("Please fill in all search fields")
    return
  }

  searchParams = {
    from: fromCity,
    to: toCity,
    date: date,
  }

  syncSearchParams()

  globalThis.location.href = "results.html"
}

function performSearch() {
  const fromCity = document.getElementById("fromCity")?.value || ""
  const toCity = document.getElementById("toCity")?.value || ""
  const date = document.getElementById("travelDate")?.value || ""

  if (!fromCity || !toCity || !date) {
    alert("Please fill in all search fields")
    return
  }

  searchParams = {
    from: fromCity,
    to: toCity,
    date: date,
  }

  syncSearchParams()

  displayResults()
}

function displayResults() {
  const activeParams = getActiveSearchParams()
  const fromCity = activeParams.from || ""
  const toCity = activeParams.to || ""
  const date = activeParams.date || ""

  if (!fromCity || !toCity || !date) {
    return
  }

  const filteredFlights = allFlights.filter((flight) => {
    const departureMatch = flight.departure
      .toLowerCase()
      .includes(fromCity.toLowerCase())
    const arrivalMatch = flight.arrival
      .toLowerCase()
      .includes(toCity.toLowerCase())
    const dateMatch = flight.date === date

    return departureMatch && arrivalMatch && dateMatch
  })

  const resultsContainer = document.getElementById("resultsContainer")
  const resultCount = document.getElementById("resultCount")

  if (resultCount) resultCount.textContent = filteredFlights.length

  if (filteredFlights.length === 0) {
    resultsContainer.innerHTML = `
      <div class="alert alert-warning border-0 shadow-sm text-center py-4">
        <h5 class="alert-heading mb-2">No flights found</h5>
        <p class="mb-0">Try another date or different cities to see more options.</p>
      </div>
    `
    return
  }

  resultsContainer.innerHTML = filteredFlights
    .map(
      (flight) => `
    <div class="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
      <div class="card-body p-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
          <div>
            <div class="badge text-bg-primary-subtle text-primary-emphasis rounded-pill mb-2">${escapeHtml(flight.airline)}</div>
            <h5 class="card-title mb-1">${escapeHtml(flight.departure)} to ${escapeHtml(flight.arrival)}</h5>
            <p class="text-secondary mb-0">${escapeHtml(flight.date)}</p>
          </div>
          <div class="text-md-end">
            <div class="fs-3 fw-bold text-primary">$${flight.price}</div>
            <div class="text-secondary small">Taxes included</div>
          </div>
        </div>

        <div class="row g-3 align-items-center py-3 border-top border-bottom mb-3">
          <div class="col-5 text-center">
            <div class="fw-semibold fs-5">${escapeHtml(flight.departureTime)}</div>
            <div class="text-secondary small">${escapeHtml(flight.departure)}</div>
          </div>
          <div class="col-2 text-center text-secondary fs-4">→</div>
          <div class="col-5 text-center">
            <div class="fw-semibold fs-5">${escapeHtml(flight.arrivalTime)}</div>
            <div class="text-secondary small">${escapeHtml(flight.arrival)}</div>
          </div>
        </div>

        <div class="row g-3 mb-3 text-center">
          <div class="col-6">
            <div class="small text-uppercase text-secondary fw-semibold">Duration</div>
            <div class="fw-semibold">${escapeHtml(flight.duration)}</div>
          </div>
          <div class="col-6">
            <div class="small text-uppercase text-secondary fw-semibold">Seats</div>
            <div class="fw-semibold">${flight.seats}</div>
          </div>
        </div>

        <button class="btn btn-primary btn-lg w-100" onclick="selectFlight(${flight.id})">
          Select Flight
        </button>
      </div>
    </div>
  `,
    )
    .join("")

  const bookingSummary = document.getElementById("bookingSummary")
  if (bookingSummary) {
    bookingSummary.classList.add("d-none")
  }

  selectedFlight = null
}

function selectFlight(flightId) {
  const flight = allFlights.find((f) => f.id === flightId)

  if (!flight) {
    alert("Flight not found")
    return
  }

  selectedFlight = flight

  updateBookingSummary()

  const bookingSummary = document.getElementById("bookingSummary")
  if (bookingSummary) {
    bookingSummary.classList.remove("d-none")
    bookingSummary.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

function updateBookingSummary() {
  if (!selectedFlight) return

  const from = document.getElementById("summaryFrom")
  const to = document.getElementById("summaryTo")
  const date = document.getElementById("summaryDate")
  const flightInfo = document.getElementById("summaryFlight")
  const price = document.getElementById("summaryPrice")
  const checkoutBtn = document.getElementById("checkoutBtn")

  if (from) from.textContent = selectedFlight.departure
  if (to) to.textContent = selectedFlight.arrival
  if (date) date.textContent = selectedFlight.date
  if (flightInfo)
    flightInfo.textContent = `${selectedFlight.airline} - ${selectedFlight.departureTime}`
  if (price) price.textContent = selectedFlight.price
  if (checkoutBtn) checkoutBtn.classList.remove("d-none")
}

function proceedToBooking() {
  if (!selectedFlight) {
    alert("Please select a flight first")
    return
  }

  sessionStorage.setItem("selectedFlight", JSON.stringify(selectedFlight))
  sessionStorage.setItem("searchParams", JSON.stringify(searchParams))

  globalThis.location.href = "booking.html"
}

function loadBookingDetails() {
  const selectedFlightStr = sessionStorage.getItem("selectedFlight")

  if (!selectedFlightStr) {
    globalThis.location.href = "search.html"
    return
  }

  selectedFlight = JSON.parse(selectedFlightStr)

  const bookingFlightInfo = document.getElementById("bookingFlightInfo")
  const bookingDeparture = document.getElementById("bookingDeparture")
  const bookingArrival = document.getElementById("bookingArrival")
  const summaryFlightInfo = document.getElementById("summaryFlightInfo")
  const summaryDepartureTime = document.getElementById("summaryDepartureTime")
  const summaryTotalPrice = document.getElementById("summaryTotalPrice")

  if (bookingFlightInfo) bookingFlightInfo.textContent = selectedFlight.airline
  if (bookingDeparture)
    bookingDeparture.textContent = selectedFlight.departureTime
  if (bookingArrival) bookingArrival.textContent = selectedFlight.arrivalTime
  if (summaryFlightInfo)
    summaryFlightInfo.textContent = `${selectedFlight.airline} - ${selectedFlight.departureTime}`
  if (summaryDepartureTime)
    summaryDepartureTime.textContent = selectedFlight.date
  if (summaryTotalPrice) summaryTotalPrice.textContent = selectedFlight.price
}

function completeBooking() {
  const firstName = document.getElementById("firstName")?.value?.trim()
  const lastName = document.getElementById("lastName")?.value?.trim()
  const email = document.getElementById("email")?.value?.trim()
  const phone = document.getElementById("phone")?.value?.trim()
  const cardholderName = document
    .getElementById("cardholderName")
    ?.value?.trim()
  const cardNumber = document.getElementById("cardNumber")?.value?.trim()
  const expiryDate = document.getElementById("expiryDate")?.value?.trim()
  const cvv = document.getElementById("cvv")?.value?.trim()
  const billingAddress = document
    .getElementById("billingAddress")
    ?.value?.trim()
  const termsCheck = document.getElementById("termsCheck")?.checked

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !cardholderName ||
    !cardNumber ||
    !expiryDate ||
    !cvv ||
    !billingAddress
  ) {
    alert("Please fill in all required fields")
    return
  }

  if (!termsCheck) {
    alert("Please agree to the terms and conditions")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  const confirmationNumber =
    "SK" + Math.random().toString(36).slice(2, 11).toUpperCase()

  const confirmationNumberElement =
    document.getElementById("confirmationNumber")
  if (confirmationNumberElement) {
    confirmationNumberElement.textContent = confirmationNumber
  }

  const successModal = new bootstrap.Modal(
    document.getElementById("successModal"),
  )
  successModal.show()

  sessionStorage.removeItem("selectedFlight")
  sessionStorage.removeItem("searchParams")

  document.getElementById("firstName").value = ""
  document.getElementById("lastName").value = ""
  document.getElementById("email").value = ""
  document.getElementById("phone").value = ""
  document.getElementById("cardholderName").value = ""
  document.getElementById("cardNumber").value = ""
  document.getElementById("expiryDate").value = ""
  document.getElementById("cvv").value = ""
  document.getElementById("billingAddress").value = ""
  document.getElementById("termsCheck").checked = false
}
