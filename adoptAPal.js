// shopping cart

// Pet variables
const bear = document.getElementById("bear");
const dog = document.getElementById("dog");
const cat = document.getElementById("cat");
const giraffe = document.getElementById("giraffe");
const bunny = document.getElementById("bunny");
const panda = document.getElementById("panda");
const elephent = document.getElementById("elephant");
const dino = document.getElementById("dino");
const unicorn = document.getElementById("unicorn");

// Pet roster variable
const displayOption = document.querySelector("#movies");
const movies = document.querySelectorAll("#movies img");

// Adjusting cart variables
const cartForm = document.getElementById("cart_form");
const cartInput = document.getElementById("cart_input");
const selectedMovie = document.getElementById("selected_movie");
const submit = document.getElementById("submit");
const cancel = document.getElementById("cancel");
const added = document.getElementById("added");
const back = document.getElementById("back");

// Cart variables related to cost and quantity
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const subtotal = document.getElementById("subtotal");
const cartTotal1 = document.getElementById("cart_total1");
const cartTotal2 = document.getElementById("cart_total2");

// Checkout variables
const checkout1 = document.getElementById("checkout1");
const checkout2 = document.getElementById("checkout2");
const checkout2Div = document.getElementById("checkout2_div"); // The div isn't an input so I don't think I can use it to manipulate the "submit" type in the checkout event listener
const checkoutForm = document.getElementById("checkout_form"); // Update on above comment: never mind, submit doesn't work but I'm keeping checkout2Div bc it's too much work to get rid of it
const checkoutDirections = document.getElementById("checkout_directions");
const summaryCheckout = document.getElementById("summary_checkout");
const continueShopping = document.getElementById("continue_shopping");
const checkoutReset = document.getElementById("checkout_reset");
const placeOrder = document.getElementById("place_order");
const radioAmex = document.getElementById("radio_amex");
const radioVisa = document.getElementById("radio_visa");


// Get today's date
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const minDate = `${currentYear}-${currentMonth}`;
const maxDate = `${currentYear + 5}-12`;

if (document.getElementById('creditExpDate')) {
    const monthInput = document.getElementById('creditExpDate'); // Set the min and max attributes dynamically
    monthInput.min = minDate;
    monthInput.max = maxDate;
}


// Cart array variable
const cart = [];

// Keep track of adopted quantity
let petQuan = 0;

// Other tracking vars
let petArray = [];
let titleArray = [];
let petFile = '';

if (bear){ 
    petArray = [];

    function shoppingCart(event) {
        event.preventDefault();
        let currentMovie = event.currentTarget;
        cartInput.classList.remove("hidden");
        selectedMovie.innerHTML = "You picked: " + currentMovie.title;
        selectedMovie.dataset.animalType = currentMovie.src;
        selectedMovie.name = currentMovie.title;
        
        console.log("Current pet file name is: " + currentMovie.dataset.fileName); // Is fileName defined?
        console.log("Shopping Cart function works!");
    }

    quantity.addEventListener("change", subtotalFunc);

    function subtotalFunc() {
        let userQuantity = parseInt(quantity.value);
        let userPrice = parseFloat(price.value);
        let calcSubtotal = userQuantity * userPrice;
    
        subtotal.value = calcSubtotal.toFixed(2);

        console.log("Subtotal value is:", subtotal.value);
        console.log("Subtotal function works!");
    }

    function addToCart() {
        let movieTitle = selectedMovie.innerText.replace("You picked: ", "").trim();
        let userQuantity = parseInt(quantity.value);
        let userPrice = parseFloat(price.value);
        let calcSubtotal = userQuantity * userPrice;
    
        let existingMovie = cart.find(item => item.title === movieTitle);

        console.log("User quantity is " + userQuantity);

        if (existingMovie) {
            existingMovie.quantity += userQuantity;
            existingMovie.subtotal += calcSubtotal;
        }
        else {
            cart.push({
                title: movieTitle,
                quantity: userQuantity,
                subtotal: calcSubtotal
            });
            
            let petFile =  selectedMovie.dataset.animalType; // Is animalType defined?
            let petTitle = selectedMovie.name;

            for (let i=0; i < userQuantity; i++){
                petArray.push(petFile);
                titleArray.push(petTitle);
            }

            console.log("Pet array is: " + petArray);
            console.log("Title array is: " + titleArray);
        }

        updateCartTotal();
        console.log("Here's what's in the cart:", cart);
        console.log("Cart length:", cart.length);
        console.log("Add To Cart function works!");

        // let getStarted = document.querySelector("#getStarted");
        // console.log("almost getting started!");
    }

    function updateCartTotal() {
        let totalMovies = cart.length;
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        let totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);
        // cartTotal1.classList.remove("hidden");
        cartTotal1.innerHTML = `
            <p>Total Pet Types: ${totalMovies}</p>
            <p>Total Pets: ${totalQuantity}</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        `;
        cartTotal2.innerHTML = `
            <p>Total Pet Types: ${totalMovies}</p>
            <p>Total Pets: ${totalQuantity}</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        `;

        if (parseInt(totalQuantity) == 5){
            
            cartTotal2.innerHTML =`
            <p>Total Pet Types: ${totalMovies}</p>
            <p style = "color: red;">Total Pets: ${totalQuantity} *You've reached the maximum!*</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        `
        }
        console.log("Update Cart Total function works!");
    }

    radioAmex.addEventListener("change", checkoutFunc);
    radioVisa.addEventListener("change", checkoutFunc);

    function checkoutFunc() {
            checkoutDirections.classList.remove("hidden");
            checkoutForm.classList.remove("hidden");
            displayOption.style.display = "none";

            let totalMovies = cart.length;
            let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            let totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);
            let checkoutSubtotal = totalCost

            summaryCheckout.innerHTML = `
            <p>Pet Types: ${totalMovies}</p>
            <p>Pets: ${totalQuantity}</p>
            <p>Total: $${checkoutSubtotal.toFixed(2)}</p>
            `;
            console.log("radioAmex.checked:", radioAmex?.checked);
            console.log("radioVisa.checked:", radioVisa?.checked);
            console.log("Checkout function works!");
    }

    function contShopFunc() {
        checkoutForm.reset();
        checkoutDirections.classList.add("hidden");
        checkoutForm.classList.add("hidden");
        
        movies.forEach((movie) => {
            movie.classList.remove("hidden");
            
        });
        displayOption.style.display = "flex";
    }

    function receipt(event) { // This is more like the order and receipt function but I didn't want the name to be too long
        if (event.submitter === placeOrder) { // Check if the target was the specific submit button aka the Place Order button
            console.log("Place Order button was clicked");
            localStorage.setItem('petArray', JSON.stringify(petArray));
            localStorage.setItem('titleArray', JSON.stringify(titleArray));
            
            let text = "<h2 id='thanks'>Thanks for visiting Adopt a Pal &lt;3</h2><p id='your_receipt'>Here is your receipt!</p><ul>";
            let isValid = true; // Flag to track validity
            let cardTypeSelected = radioAmex.checked || radioVisa.checked;
            
            let totalCost = cart.reduce((sum, item) => sum + item.subtotal, 0);
            let checkoutSubtotal = totalCost;

            text += `<li>Total: $${checkoutSubtotal.toFixed(2)}</li>`;

            // The for loop below iterates over various responses when the Place Order button is clicked
            // Examples include error messages, a receipt window that appears if there's no error, etc.
            for (let i = 0; i < checkoutForm.elements.length; i++) { 
                const element = checkoutForm.elements[i];
                if (element.type === "submit" || element.type === "reset") { // Makes sure that the Continue Shopping, Reset, and Place Order buttons are... 
                    continue;                                                // skipped in the loop, preventing their value from being included in the receipt
                }
                if (element.name === "phone") {
                    const phoneNumberPattern = /^\d{10}$/; // Regular expression for exactly 10 digits
                    // const phoneNumberPattern = /^(\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/; // Regular expression for 10 digits with flexible formatting
                    if (!phoneNumberPattern.test(element.value)) {
                        console.log("Invalid phone number at i =", i);
                        alert("Please enter a valid 10-digit phone number");
                        element.value = "";
                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else {
                        element.style.backgroundColor = "";
                    }
                }
                if (element.name === "credit_card") {
                    const cardNumberPattern = /^\d{15,16}$/; // Regular expression for exactly 15 OR 16 digits
                    if (!cardNumberPattern.test(element.value)) {
                        console.log("Invalid card number at i =", i);
                        alert("Please enter a valid 15-digit or 16-digit card number");
                        element.value = "";
                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else {
                        element.style.backgroundColor = "";
                    }
                }
                if (element.name === "creditCVV") {
                    const cardNumberPattern = /^\d{3,4}$/; // Regular expression for exactly 3 OR 4 digits
                    if (!cardNumberPattern.test(element.value)) {
                        console.log("Invalid card number at i =", i);
                        alert("Please enter a valid 3-digit or 4-digit CVV or CVC");
                        element.value = "";
                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else {
                        element.style.backgroundColor = "";
                    }
                }
                if (element.value === "" || element.value === null) {
                    
                    console.log("Alert triggered at i =", i);
                    
                    // Different alert messages pop up depending on which input the user has incorrectly filled out
                    if (element.name === "first_name") {
                        alert("Please enter a first name");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else if (element.name === "last_name") {
                        alert("Please enter a last name");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else if (element.name === "email") {
                        alert("Please enter an email address");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                    else if (element.name === "creditExpDate") {
                        alert("Please enter a valid expiration date");

                        element.focus();
                        element.select();
                        element.style.backgroundColor = "rgb(255, 222, 228)";
                        isValid = false;
                        return;
                    }
                }
                else {
                    element.style.backgroundColor = "";
                }
            } // The first nested for loop is closed; the stuff below is directly inside the if statement

            if (isValid && !cardTypeSelected) {
                console.log("Card type not selected");
                alert("Please select a credit card");
                return;
            }

            // Below is the receipt information 
            for (let i = 0; i < checkoutForm.elements.length; i++) { // Iterates over elements in the checkout form
                const element = checkoutForm.elements[i];

                if (element.type === "radio") {
                    if (radioAmex.checked && element.id === "radio_amex") {
                        text += "<li>Credit Card: Amex</li>";
                    }
                    else if (radioVisa.checked && element.id === "radio_visa") {
                        text += "<li>Credit Card: Visa</li>";
                    }
                }
                else {
                    if (element.name === "first_name") {
                        text += "<li>First Name: " + element.value + "</li>";
                    }
                    if (element.name === "last_name") {
                        text += "<li>Last Name: " + element.value + "</li>";
                    }
                    if (element.name === "email") {
                        text += "<li>Email: " + element.value + "</li>";
                    }
                    if (element.name === "phone") {
                        text += "<li>Phone Number: " + element.value + "</li>";
                    }
                    if (element.name === "credit_card") {
                        const cardNumber = element.value;
                        if (cardNumber.length === 15 || cardNumber.length === 16) {
                            // Mask the card number
                            const maskedNumber = cardNumber.slice(0, -4).replace(/\d/g, "*") + cardNumber.slice(-4);
    
                            text += "<li> Credit Card Number: " + maskedNumber + "</li>"; // Card number is masked
                        }
                    }
                }
                // Display credit card + all hidden checkout elements in the receipt here
            }

            console.log("Order placed successfully!"); // Nested in the if statement to avoid incorrect logs & duplicates
            console.log("Here's what's in the cart:", cart); // Info for certificate!
            
            text += "</ul>";
            // Open receipt in a new document
            document.open();
            document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Your Receipt</title>
                    <style>
                        @font-face {
                            font-family: cursive_font;
                            src: url("fonts/Sunset\ Beach\ Personal\ Use.ttf")
                            /* src: url("fonts/I\ Love\ Glitter\ -\ OTF.otf") */
                        }
                        
                        .top-links {
                            display: flex; /* Use Flexbox for alignment */
                            justify-content: center; /* Center items horizontally */
                            align-items: center; /* Center items vertically */
                            gap: 15px; /* Space between buttons */
                            padding-top: 0px; /* Optional: Adds padding around the links */
                            padding-bottom: 15px;
                        }

                        .top-links .nav-link {
                            display: inline-block;
                            margin: 0 15px;
                            padding: 10px 20px;
                            text-decoration: none;
                            color: white;
                            background-color: rgb(28, 88, 147); /* Dark blue */
                            border-radius: 5px;
                            font-family: helvetica, sans-serif;
                            font-size: 16px;
                            transition: background-color 0.3s ease, transform 0.2s ease;
                        }

                        .top-links .nav-link:hover {
                            background-color: #d7f5ff; /* Light blue */
                            color: rgb(28, 88, 147); /* Dark blue text */
                            transform: scale(1.1);
                        }
                        
                        /* Nav styles */
                        nav{
                            margin: 0px;
                            padding-bottom: 25px;
                        }

                        nav ul {
                            list-style: none;
                            background-color: #a7e5fa;
                            text-align: center;
                            padding: 0;
                            margin: 0;
                            display: flex;
                        }

                        nav ul li {
                            flex-grow: 1;
                            padding: 20px;
                            position: relative;
                            text-align: center;
                        }

                        nav ul li a {
                            text-decoration: none;
                            color: rgb(28, 88, 147);
                            padding: 15px 20px;
                            display: block;
                            font-size: 1.8vw;
                            font-family: helvetica;
                        }

                        nav ul li:hover,
                        nav ul li a:hover {
                            background-color: #d7f5ff;
                        }

                        body { 
                            background: linear-gradient(rgb(209, 255, 255), rgb(240, 255, 255)) no-repeat fixed center center / cover;
                            margin-left: 0px;
                            margin-right: 0px;
                        }
                        
                        h1 {
                            color: rgb(28, 88, 147);     /* Dark blue accents */
                            margin: 7px;
                            text-align: center;
                            font-size: 50px;
                            font-family: cursive_font;
                        }

                        h1:hover {
                            transform: scale(1.05);
                        }

                        #adoption_tab {
                            width: 50%;
                        }

                        #hangout_tab {
                            width: 50%;
                        }

                        #receipt {
                            font-family: helvetica;
                            font-weight: bold;
                            font-size: 18px;
                            border: rgb(28, 88, 147);
                            border-width: 5px;
                            border-style: solid;
                            border-radius: 25px;
                            background-color: white;
                            color: rgb(28, 88, 147);
                            max-width: 500px;
                            margin: 20px auto;
                            padding: 20px;
                            box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.248);
                        }
                        
                        #thanks {
                            text-align: center;
                        }
                        
                        #your_receipt {
                            text-align: center;
                        }
                        
                        #go_certify {
                            font-size: 16px;
                            font-weight: bold;
                            font-family: helvetica;
                            padding: 5px 10px;
                            background-color: white;
                            border-radius: 1px;
                            border-color: whitesmoke;
                            color: rgb(28, 88, 147);
                        }

                        #certify_div {
                            margin: auto;
                            text-align: center;
                        }

                        ul{
                            line-height: 25px;
                        }

                        #info {
                            list-style-type: none;
                            padding: 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Adopt A Pal</h1>
                    <div class="top-links">
                        <a href="signup.php" class="nav-link">Sign Up</a>
                        <a href="login.php" class="nav-link">Login</a>
                        <a href="search.php" class="nav-link">Search</a>
                    </div>
                    <nav>
                        <ul>
                            <li id="adoption_tab">
                                <a href = "adoption.html">
                                    <b>Adoption Center</b>
                                </a>
                            </li>
                    
                            <li id="hangout_tab">
                                <a href = "hangout.html">
                                    <b>Hangout</b>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div id="receipt">`+ text +`
                        <div id="certify_div">
                            <label for="go_certify"></label>
                            <input type="submit" id="go_certify" name="go_certify" value="Certify Your Adoption!">
                        </div>
                    </div>
                    <script>
                        let goCertify = document.querySelector("#go_certify");

                        goCertify.addEventListener('click', function() {
                            window.location.href = 'certification.html';
                        });
                    </script>
                </body>
                </html>`
            );
            console.log(text);
        }
    } // End of receipt function

    // Add event listeners for each pet image when clicked
    for (let poster = 0; poster < movies.length; poster++){
        movies[poster].addEventListener("click", (event) => {
            event.preventDefault();
            shoppingCart(event);
            subtotalFunc();
            added.classList.add("hidden");
            
            cartTotal1.classList.add("hidden");
            cartTotal2.classList.remove("hidden");
            checkout2Div.classList.add("hidden"); // Second Checkout button disappears when selecting a pet
            
            cartForm.reset();
        })
    }

    cancel.addEventListener("click", (event) => {
        event.preventDefault();
        cartInput.classList.add('hidden');
        
        cartTotal1.classList.remove("hidden");
        cartTotal2.classList.add("hidden");
        
        if (cart.length >= 1) { // Second Checkout button appears on Cancel button click if cart length >= 1
            checkout2Div.classList.remove("hidden");
        }
        
        console.log("Cart length:", cart.length);
        
        cartForm.reset();
    })

    back.addEventListener("click", (event) => {
        event.preventDefault();
        added.classList.add("hidden");
        
        cartTotal1.classList.remove("hidden");
        cartTotal2.classList.add("hidden");
        checkout2Div.classList.remove("hidden"); // Second Checkout button appears on Back button click
        
        console.log("Cart length:", cart.length);
        
        cartForm.reset();
    })

    submit.addEventListener("click", (event) => {
        event.preventDefault();

        console.log(parseInt(quantity.value));

        if (parseInt(quantity.value) > 5){
            console.log("max exceeded");
            alert("You've exceeded our Pal Adoption limit! To ensure the best care for our adopted Pals, we have a 5-pal limit. Please re-enter your desired quanity.");
            cartForm.reset();
            return;
        }

        else if ((petQuan + parseInt(quantity.value)) > 5){
            console.log("max exceeded");
            console.log("current total = " + (petQuan + parseInt(quantity.value)));
            alert("You've exceeded our Pal Adoption limit! To ensure the best care for our adopted Pals, we have a 5-pal limit. Please re-enter your desired quanity.");
            cartForm.reset();
            return;
        }

        // If the user inputs an integer number greater than zero
        else if (quantity.value > 0 && Number.isInteger(+quantity.value) == true) { 
            addToCart();
            cartInput.classList.add("hidden");
            added.classList.remove("hidden");
            
            console.log("User quantity input value:", quantity.value);
            // console.log(Number.isInteger(+quantity.value));

            petQuan += parseInt(quantity.value);

            cartForm.reset();
            return;
        }

        // If the user leaves the space blank
        else if (quantity.value === "") { 
            alert("Please enter a quantity");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }

        // If the user inputs a number less than or equal to 0
        else if (quantity.value <= 0) { 
            alert("Please enter a quantity greater than zero");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }

        // If the user inputs a decimal number/float less than 1 but greater than zero
        else if (quantity.value <1 && quantity.value >0) { 
            alert("Please use whole numbers when entering a quantity");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }

        else { // If the user inputs a decimal number/float greater than 1
            alert("Please use whole numbers when entering a quantity");
            
            console.log("User quantity input value:", quantity.value);
            
            cartForm.reset();
            return;
        }
    })

    checkout1.addEventListener("click", (event) => {
        event.preventDefault();
        added.classList.add("hidden");

        movies.forEach((movie) => {
            movie.classList.add("hidden");
        });

        cartTotal1.classList.add("hidden");
        cartTotal2.classList.add("hidden");
        
        checkoutFunc();
    })

    checkout2.addEventListener("click", (event) => {
        event.preventDefault();
        added.classList.add("hidden");
        checkout2Div.classList.add("hidden"); // Makes the second Checkout button and the div that it's in disappear
        
        movies.forEach((movie) => {
            movie.classList.add("hidden");
        });
        
        cartTotal1.classList.add("hidden");
        cartTotal2.classList.add("hidden");
        
        checkoutFunc();
    })

    continueShopping.addEventListener("click", (event) => {
        event.preventDefault();
        cartTotal1.classList.remove("hidden");
        checkout2Div.classList.remove("hidden"); // Second Checkout button appears on Continue Shopping button click
        summaryCheckout.innerHTML = "";
        
        contShopFunc();
    })

    checkoutReset.addEventListener("click", (event) => {
        event.preventDefault();
        checkoutForm.reset();
        for (let i = 0; i < checkoutForm.elements.length; i++) { 
            const element = checkoutForm.elements[i];
            element.style.backgroundColor = "";
        }
    })

    checkoutForm.addEventListener("submit", (event) => { // Everything that happens when the user tries to place an order during checkout
        event.preventDefault();
        receipt(event);
    })
}

// certificate
let certiSubmit = document.querySelector("#certiSubmit");

if (certiSubmit) {
    console.log("Certificate(s) in progress!")
    //let certInfo = document.querySelector("#certInfo");

    addCertificates();

    function addCertificates () {

        let petArray = JSON.parse(localStorage.getItem('petArray')) || [];
        let titleArray = JSON.parse(localStorage.getItem('titleArray')) || [];
        let addedCertificates = document.querySelector("#addedCertificates");
        let certiSubmit = document.querySelector("#certiSubmit");
    
        console.log("The petArray.length is: " + petArray.length);
        console.log("The petArray is: " + petArray);
    
        for (let i=0; i < petArray.length; i++){
            console.log("I'm here! " + petArray[i]);

            let newCertificate = document.createElement("div");
            newCertificate.classList.add("newCertificate");

            let photo = document.createElement("div");
            let profilePic = document.createElement("img");
            profilePic.src = petArray[i];
            profilePic.classList.add("profilePic")
            photo.appendChild(profilePic);

            let customInfo = document.createElement("div");
            customInfo.classList.add("customInfo")

                let certiTitle = document.createElement('h3');
                certiTitle.id = 'certiTitle'+[i];
                certiTitle.innerHTML = titleArray[i];
                certiTitle.classList.add("certiTitle");

                let palNameLabel = document.createElement('label');
                let palName = document.createElement('input');
                palName.id = 'palNameInput'+[i];
                palName.required = true;
                palNameLabel.htmlFor = 'palNameInput'+[i];
                palNameLabel.innerHTML = "Name: ";

                let pronounsLabel = document.createElement('label');
                let pronouns = document.createElement('input');
                pronouns.id = 'pronounsInput' + [i];
                pronouns.required = true;
                pronounsLabel.htmlFor = 'pronounsInput' + [i];
                pronounsLabel.innerHTML = "<br>Pronouns: ";

                let personalityLabel = document.createElement('label');
                let personality = document.createElement('input');
                personality.id = 'personalityInput'+[i];
                personality.required = true;
                personalityLabel.htmlFor = 'personalityInput'+[i];
                personalityLabel.innerHTML = "<br>Personality: ";

                let hobbiesLabel = document.createElement('label');
                let hobbies = document.createElement('input');
                hobbies.id = 'hobbiesInput'+[i];
                hobbies.required = true;
                hobbiesLabel.htmlFor = 'hobbiesInput'+[i];
                hobbiesLabel.innerHTML = "<br>Hobbies: ";

                let favColorLabel = document.createElement('label');
                let favColor = document.createElement('input');
                favColor.id = 'favColorInput'+[i];
                favColor.required = true;
                favColorLabel.htmlFor = 'favColorInput'+[i];
                favColorLabel.innerHTML = "<br>Favorite Color: ";

                let favFoodLabel = document.createElement('label');
                let favFood = document.createElement('input');
                favFood.id = 'favFoodInput'+[i];
                favFood.required = true;
                favFoodLabel.htmlFor = 'favFoodnput'+[i];
                favFoodLabel.innerHTML = "<br>Favorite Food: ";

                let dislikesLabel = document.createElement('label');
                let dislikes = document.createElement('input');
                dislikes.id = 'dislikesInput'+[i];
                dislikes.required = true;
                dislikesLabel.htmlFor = 'dislikesInput'+[i];
                dislikesLabel.innerHTML = "<br>Dislikes: ";
            
            customInfo.append(certiTitle, palNameLabel,palName,pronounsLabel,pronouns,personalityLabel,personality,hobbiesLabel,hobbies,favColorLabel,favColor,favFoodLabel,favFood,dislikesLabel,dislikes);
            newCertificate.append(photo,customInfo);
            addedCertificates.appendChild(newCertificate);

        } // For loop is closed
    
        function savePetData() {
            let petData = [];
            const certificates = document.querySelectorAll(".newCertificate");
            
            for (let i=0; i < certificates.length; i++){
                let pet = {
                    certiTitle: titleArray[i],
                    profilePic: petArray[i], 
                    palName: document.querySelector("#palNameInput" + [i]).value,
                    pronouns: document.querySelector("#pronounsInput" + [i]).value,
                    personality: document.querySelector("#personalityInput" + [i]).value,
                    hobbies: document.querySelector("#hobbiesInput" + [i]).value,
                    favColor: document.querySelector("#favColorInput" + [i]).value,
                    favFood: document.querySelector("#favFoodInput" + [i]).value,
                    dislikes: document.querySelector("#dislikesInput" + [i]).value,
                    dateAdopted: JSON.parse(localStorage.getItem('dateAdoptedData'))
                };
                petData.push(pet);
            };
            localStorage.setItem('petData', JSON.stringify(petData));
        }
        
        addedCertificates.addEventListener("submit", goHangout); // Is this a button in the HTML? Should this be changed to the Hangout nav?

        let hangoutOnCertif = document.querySelector(".hangoutOnCertif");

        hangoutOnCertif.addEventListener('click', function(event) {
                event.preventDefault(); // Stop the link from navigating
                alert('Please finish your certifying before going to hangout!');
        });

        function goHangout(event){
            event.preventDefault();
            function retrieveTime(){
                let now = new Date();
                console.log(now);

                let month = now.getMonth() + 1;
                console.log("month is " + month);

                let date = now.getDate();
                console.log("date is " + date);

                let year = now.getFullYear();
                console.log("year is " + year);

                let time = month + "/" + date + "/" + year;
                console.log(time);

                return time;
            }
            localStorage.setItem('dateAdoptedData', JSON.stringify(retrieveTime()));
            savePetData()
            window.location.href = 'hangout.html';
        }
    }
}

// hangout
const hangout = document.querySelector("#hangout");
const welcome = document.querySelector("#welcome");
const area = document.querySelector("#area");
const setting = document.querySelector("#setting");
const test = document.querySelector("#test");
let numInfoOpened = 0;
let palId = 0;

if (area){
    welcome.innerText = "Welcome to your Hangout!";

    let addedPals = document.querySelectorAll('.newPal');

    console.log("in ur area!")

    hangout.style.background = JSON.parse(localStorage.getItem('background'))
    welcome.innerText = JSON.parse(localStorage.getItem('backgroundTitle'))

    // make dynamic based on background
    setting.addEventListener("change", changeSet);

    function changeSet(){
        if (setting.value){
            const hangoutTheme = setting.value;
            let selectedOption = setting.options[setting.selectedIndex];
            console.log(selectedOption)

            welcome.innerText = "Welcome to your " + selectedOption.dataset.name + "!";
            
            hangout.style.background = "url('images/" + selectedOption.dataset.code + "') no-repeat scroll left bottom /cover";
            localStorage.setItem('background', JSON.stringify(hangout.style.background));
            localStorage.setItem('backgroundTitle', JSON.stringify(welcome.innerText));
        }

    }

    // once certificate submitted, take you to this page, add animal
    // test.addEventListener("click", addAnimal);
    console.log(area);
    console.log("hello");
        
    addAnimal()
    function addAnimal() {
        let petArray = JSON.parse(localStorage.getItem('petArray')) || [];
        
        console.log("Adding animals...");
        console.log("Pet array length: " + petArray.length);
    
        petArray.forEach((src, index) => {
            let newPal = document.createElement('div');
            newPal.classList.add("newPal");
            newPal.draggable = true;
    
            let animalPic = document.createElement('img');
            animalPic.src = src;
            animalPic.classList.add("animalPic");
            animalPic.draggable = true;
    
            // Use the index to ensure a unique ID for each element
            let uniqueId = `newPal${index}`;
            newPal.id = uniqueId;
            animalPic.id = `animalPic${index}`;
    
            newPal.appendChild(animalPic);
            area.appendChild(newPal);
    
            animalPic.addEventListener('dragstart', function(e) {
                console.log('Dragstart fired');
                e.dataTransfer.setData('text/plain', uniqueId);
                setTimeout(() => newPal.classList.add('dragging'), 0);
            });
    
            animalPic.addEventListener('dragend', function() {
                newPal.classList.remove('dragging');
            });
    
            animalPic.addEventListener('click', function(event) {
                event.stopPropagation();
                let openUp = document.querySelector("#openUp");
                openUp.play()
                openInfo(event, index);
            });
    
            area.addEventListener('dragover', function(e) {
                e.preventDefault();  // Allow dropping
            });
    
            area.addEventListener('drop', function(e) {
                e.preventDefault();  // Get the ID of the dragged image
                let draggedId = e.dataTransfer.getData('text/plain');
                let draggedPal = document.getElementById(draggedId);
                if (draggedPal) {
                    let areaRect = area.getBoundingClientRect();
                    let dropX = e.clientX - areaRect.left - (draggedPal.offsetWidth / 2);
                    let dropY = e.clientY - areaRect.top - (draggedPal.offsetHeight / 2);
                    draggedPal.style.left = `${dropX}px`;
                    draggedPal.style.top = `${dropY}px`;
                    savePosition(draggedId, `${dropX}px`, `${dropY}px`);
                }
            });
        });
    
        loadPositions();
    }
    
    function savePosition(id, left, top) {
        const savedPositions = JSON.parse(localStorage.getItem('savedPositions')) || {};
        savedPositions[id] = { left, top };
        localStorage.setItem('savedPositions', JSON.stringify(savedPositions));
    }
    
    function loadPositions() {
        const savedPositions = JSON.parse(localStorage.getItem('savedPositions')) || {};
        document.querySelectorAll('.newPal').forEach(pal => {
            const position = savedPositions[pal.id];
            if (position) {
                pal.style.left = position.left;
                pal.style.top = position.top;
            }
        });
    }

    function openInfo(event, index){
        event.stopPropagation();

        let petData = JSON.parse(localStorage.getItem('petData')) || [];
        console.log(petData);

        if (numInfoOpened < 1){
            let infoBox = document.createElement('div');
            infoBox.classList.add('info');
            let infoName = document.createElement('h2');
            infoName.innerHTML = "<b><u>" + petData[index].palName + " the " + petData[index].certiTitle + "</u></b>"; //name of pal + the + animal type
            infoName.classList.add('palName');
            let infoPronoun = document.createElement('p');
            infoPronoun.innerHTML = "<i> (" + petData[index].pronouns + ") </i>" ; //pronouns
            infoPronoun.classList.add('palPronoun');
            let infoPersonality = document.createElement('p');
            infoPersonality.innerHTML = "<b> Personality: </b> " + petData[index].personality;
            let infoHobbies = document.createElement('p');
            infoHobbies.innerHTML = "<b> Hobbies: </b> " + petData[index].hobbies;
            let infoColor = document.createElement('p');
            infoColor.innerHTML = "<b> Favorite Color: </b> " + petData[index].favColor;
            let infoFood = document.createElement('p');
            infoFood.innerHTML = "<b> Favorite Food: </b> " + petData[index].favFood;
            let infoDislike = document.createElement('p');
            infoDislike.innerHTML = "<b> Dislikes: </b> " + petData[index].dislikes;
            infoDislike.innerHTML += "<hr>"

            let infoDateAdopted = document.createElement('p');
            infoDateAdopted.innerHTML = " <i> Adopted on: " + petData[index].dateAdopted + " </i> <br>";

            let exitBt = document.createElement('div');
            exitBt.classList.add('exit');
            exitBt.innerText = '×';  
            
            // add info to certificate box
            infoBox.append(infoName, infoPronoun, infoPersonality, infoHobbies, infoColor, infoFood, infoDislike, infoDateAdopted, exitBt);

            document.getElementById('newPal' + index).appendChild(infoBox); // change to add to created animal pic div

            numInfoOpened += 1;

            exitBt.onclick = function(){
                let close = document.querySelector("#close");
                close.play()
                numInfoOpened -= 1;
                infoBox.remove();
            };
        }
    } 
};    
