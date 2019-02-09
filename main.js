
let ansVis = 0;
let settingVis = 1;

let difficulty;
let Polynomials = [];

let = polyFormat = "";
let = factoredFormat = "";


$(document).ready(function () {

    updateVisibility();
    applySettings();
    GeneratePolynomial();



    // Toggle visibility of answer
    $("#toggleVis").on("click", function () {
        ansVis = (ansVis == 1) ? 0 : 1;
        updateVisibility();
    });

    // Create new Polynomial
    $("#generatenewpoly").on("click", function () {
        GeneratePolynomial();
    });

    // apply setting options
    $("#ApplySettings").on("click", function (evt) {
        applySettings();
    });


    function updateVisibility() {
        if (ansVis == 1) {
            $("#factoredformat").show();
        }
        else {
            $("#factoredformat").hide();
        }
    }

    function applySettings() {

        difficulty = $("input[name='diff']:checked").val()
        //console.log(difficulty);

        // get state of all checkboxes
        for (let i = 0; i < 5; i++) {
            Polynomials[i] = $(`#p${i}`).prop("checked");
        }
        //console.log(Polynomials);

    }

    // toggle settings menu
    $(".menu-animated").on("click", function () {

        console.log("Menu Clicked");
        $(".menu-animated").toggleClass("change");
        settingVis = (settingVis == 1) ? 0 : 1;
        if (settingVis == 1) {
            $("#settings-content").show();
        }
        else {
            $("#settings-content").hide();
        }

    });




    function GeneratePolynomial() {

        let problemType;

        // select which type of factoring problem

        // try 20 attempts at picking a problem type at random
        for (let i = 0; i < 20; i++) {

            // pick one of the indexes in polynomails at random
            let ind = Math.floor(Math.random() * Polynomials.length)

            // checks if valid
            if (Polynomials[ind]) {
                problemType = ind;
                break;
            }
        }

        // console.log(`Problem type ${problemType}`);

        // if no vaild problem type found in 20 attempts, default to option 0
        if (problemType == null) {
            problemType = 0;
        }

        let a, b, c, d, e, f, k;

        // generate random factors
        switch (problemType) {



            // Quadratic quation
            case 0:

                console.log("Quadratic quation");

                //(ax + b)(cx + d)

                if (difficulty == 0) { // ### easy ###
                    a = 1;
                    c = 1;
                    // b and d in range +/- [1-4]
                    b = (Math.floor(Math.random() * 2) == 0 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
                    d = (Math.floor(Math.random() * 2) == 0 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);

                    // makes sure not perfect squares
                    if (b * -1 == d) {
                        console.log("**Accidental Perfect Squares **");
                        b++;
                    }

                    factoredFormat = `(X+ ${b})(X+ ${d})`;
                    polyFormat = `X<sup>2</sup>${(b + d) == 0 ? "" : " + " + (b + d == 1 ? "" : b + d) + "X"}${b * d == 0 ? "" : " + " + b * d}`;


                }
                else if (difficulty == 1) { // ### medium ###

                    // a in range  [1-3]
                    a = (Math.floor(Math.random() * 3) + 1)
                    c = 1;
                    // b and d in range [-6 - 6]
                    b = (Math.floor(Math.random() * 13) - 6);
                    d = (Math.floor(Math.random() * 13) - 6);

                    k = 1; // default contsant term

                    // makes sure not perfect squares
                    if (a == 1 && b * -1 == d) {
                        b++;
                    }

                    // make b and d not both zero
                    if (b == 0 && d == 0) {
                        d++
                    }

                    //console.log(`a:${a} b:${b} c:${c} d:${d}`);
                    polyFormat = `${a * c == 1 ? "" : a * c}X<sup>2</sup>${(b * c + a * d) == 0 ? "" : " + " + (b * c + a * d) + "X"}${b * d == 0 ? "" : " + " + b * d}`;

                    // ensure in simpliest form
                    if (a % 2 == 0 && b % 2 == 0) {
                        a /= 2;
                        b /= 2;
                        k = 2;
                    }
                    if (a % 3 == 0 && b % 3 == 0) {
                        a /= 3;
                        b /= 3;
                        k = 3;
                    }

                    if (k != 1) {
                        //console.log(`#### k:${k} ###`);
                    }

                    factoredFormat = `${k == 1 ? "" : k}(${a == 1 ? "" : a}X${b == 0 ? "" : " + " + b})(${c == 1 ? "" : c}X${d == 0 ? "" : " + " + d})`;



                }
                else if (difficulty == 2) { // ### hard ###

                    // a in range +/- [1-9]
                    a = (Math.floor(Math.random() * 2) == 0 ? 1 : -1) * (Math.floor(Math.random() * 9) + 1)

                    // c in range [1-9]
                    c = (Math.floor(Math.random() * 9) + 1);

                    // b and d in range [-12 - 12]
                    b = (Math.floor(Math.random() * 25) - 12);
                    d = (Math.floor(Math.random() * 25) - 12);

                    let k = 1; // constant term

                    // makes sure not perfect squares
                    if (a == b && b * -1 == d) {
                        b++;
                    }

                    // make b and d not both zero
                    if (b == 0 && d == 0) {
                        d++
                    }

                    //console.log(`a:${a} b:${b} c:${c} d:${d}`);
                    polyFormat = `${a * c == 1 ? "" : a * c}X<sup>2</sup>${(b * c + a * d) == 0 ? "" : " + " + (b * c + a * d) + "X"}${b * d == 0 ? "" : " + " + b * d}`;


                    // factor our -1 if necessary
                    if (a < 0) {
                        k *= -1;
                        a *= -1;
                        b *= -1;
                        //console.log(`Factoring -1 from first binomial`);
                    }

                    // factor constant terms in first binomial
                    for (let i = 9; i > 1; i--) {
                        if (a % i == 0 && b % i == 0) {
                            a /= i;
                            b /= i;
                            k *= i;
                            //console.log(`Factoring ${i} from first binomial`);
                        }
                    }

                    // factor constant terms in second binomial
                    for (let i = 9; i > 1; i--) {
                        if (c % i == 0 && d % i == 0) {
                            c /= i;
                            d /= i;
                            k *= i;
                            //console.log(`Factoring ${i} from second binomial`);
                        }
                    }

                    factoredFormat = `${k == 1 ? "" : k}(${a == 1 ? "" : a}X${b == 0 ? "" : " + " + b})(${c == 1 ? "" : c}X${d == 0 ? "" : " + " + d})`;


                }
                else {
                    alert("Invalid Difficulty. Contact your web developer");
                }


                break;

            // Difference of Squares 
            case 1:
                console.log("Difference of Squares quation");
                //(ax + b)(cx + d)

                if (difficulty == 0) {
                    a = 1;
                    c = a;
                    k = 1;
                    b = Math.floor(Math.random() * 5) + 1;
                    d = -1 * b;
                    //console.log(`a:${a} b:${b} c:${c} d:${d}`);

                    polyFormat = `${a * c == 1 ? "" : a * c}X<sup>2</sup>${(b * c + a * d) == 0 ? "" : " + " + (b * c + a * d) + "X"}${b * d == 0 ? "" : " + " + b * d}`;
                    factoredFormat = `${k == 1 ? "" : k}(${a == 1 ? "" : a}X${b == 0 ? "" : " + " + b})(${c == 1 ? "" : c}X${d == 0 ? "" : " + " + d})`;

                }
                else if (difficulty == 1) {
                    a = Math.floor(Math.random() * 3) + 1;
                    c = a;
                    k = 1;
                    b = Math.floor(Math.random() * 12) + 1;
                    d = -1 * b;
                    //console.log(`a:${a} b:${b} c:${c} d:${d}`);

                    polyFormat = `${a * c == 1 ? "" : a * c}X<sup>2</sup>${(b * c + a * d) == 0 ? "" : " + " + (b * c + a * d) + "X"}${b * d == 0 ? "" : " + " + b * d}`;
                    factoredFormat = `${k == 1 ? "" : k}(${a == 1 ? "" : a}X${b == 0 ? "" : " + " + b})(${c == 1 ? "" : c}X${d == 0 ? "" : " + " + d})`;

                }
                else if (difficulty == 2) {
                    a = Math.floor(Math.random() * 9) + 1;
                    c = a;
                    k = 1;
                    b = Math.floor(Math.random() * 20) + 1;
                    d = -1 * b;
                    //console.log(`a:${a} b:${b} c:${c} d:${d}`);

                    polyFormat = `${a * c == 1 ? "" : a * c}X<sup>2</sup>${(b * c + a * d) == 0 ? "" : " + " + (b * c + a * d) + "X"}${b * d == 0 ? "" : " + " + b * d}`;
                    factoredFormat = `${k == 1 ? "" : k}(${a == 1 ? "" : a}X${b == 0 ? "" : " + " + b})(${c == 1 ? "" : c}X${d == 0 ? "" : " + " + d})`;

                }
                else {
                    alert("Invalid Difficulty. Contact your web developer");
                }
                break;

            // Perfect Square Trinomial 
            case 2:
                if (difficulty == 0) { }
                else if (difficulty == 1) { }
                else if (difficulty == 2) { }
                else {
                    alert("Invalid Difficulty. Contact your web developer");
                }

                break;

            // Difference of Cubes 
            case 3:
                if (difficulty == 0) { }
                else if (difficulty == 1) { }
                else if (difficulty == 2) { }
                else {
                    alert("Invalid Difficulty. Contact your web developer");
                }

                break;

            // Sum of Cubes 
            case 4:
                if (difficulty == 0) { }
                else if (difficulty == 1) { }
                else if (difficulty == 2) { }
                else {
                    alert("Invalid Difficulty. Contact your web developer");
                }

                break;

            default:
                console.error("Invalid Problemtype");
                break;
        }

        // verify if factors in simplest form

        // store as polynomial and answer

        $("#polynomialformat").html(polyFormat);
        $("#factoredformat").html(factoredFormat);

        // hide answer
        $("#factoredformat").hide();
        ansVis = 0;

    }
});





