const billingToggle = document.getElementById("billingToggle");

const prices = document.querySelectorAll(".price");
const periods = document.querySelectorAll(".period");

billingToggle.addEventListener("change", () => {

    if (billingToggle.checked) {

        prices.forEach(price => {
            price.textContent = price.dataset.yearly;
        });

        periods.forEach(period => {
            period.textContent = "/year";
        });

    } else {

        prices.forEach(price => {
            price.textContent = price.dataset.monthly;
        });

        periods.forEach(period => {
            period.textContent = "/month";
        });
    }
});


// Pricing button interaction
const buttons = document.querySelectorAll(".pricing-card button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        alert("You selected the " + button.textContent + " plan!");

    });

});