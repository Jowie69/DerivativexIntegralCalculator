/*
    Building of Swordax ❤️
        find me on:
        Github:     https://github.com/SwordaxSy
        Codepen:    https://codepen.io/SwordaxSy
        Twitter:    https://twitter.com/SwordaxSy
        Face/Insta: swordax.sy
*/

// Calculation Code
class Calculus {
    constructor() {}

    #destructure(input) {
        const [value, power] = input.split("^");
        const coefficient = parseFloat(value);
        const variable = value.replace(/[^a-zA-Z]+/g, "");
        return { value, coefficient, variable, power };
    }

    derive(input) {
        let { value, coefficient, variable, power } = this.#destructure(input);
        let output;

        if (!power) {
            if (!isNaN(value)) {
                return 0;
            } else {
                return parseFloat(value);
            }
        } else {
            let product = coefficient * +power--;

            if (power === 0) {
                output = product;
            } else if (power === 1) {
                output = `${product}${variable}`;
            } else {
                output = `${product}${variable}^${power}`;
            }
        }

        return output;
    }

    integrate(input) {
        let { value, coefficient, variable, power } = this.#destructure(input);

        if (!variable) {
            return `${coefficient}x + C`;
        }

        if (!power) power = 1;
        power = parseFloat(power);
        power++;

        return `${coefficient / power}${variable}^${power} + C`;
    }
}

// Calculus Instance
const calculus = new Calculus();
export default calculus;
