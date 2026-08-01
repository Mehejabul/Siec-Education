function slideCountries(direction) {
  const container = document.getElementById("siecCountrySlider");
  const scrollAmount = 300;

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}
