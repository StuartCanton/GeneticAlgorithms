// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a psuedo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function getRandomNumberBetween(min:number, max:number) {
  return Math.random() * (max - min) + min;
}

// Return a random character (letter, number, symbol, space, etc)
function randomCharacter() {
    let c = Math.floor(getRandomNumberBetween(32, 127));
    return String.fromCharCode(c);
  }
  
  // Constructor (makes a random DNA)
  export class DNA {
    genes: string[];
    fitness:number;
    //{.code-wide} Create DNA randomly.
    constructor(length:number) {
      this.genes = [];
      //{!1} Adding a variable to track fitness.
      this.fitness = 0;
      for (let i = 0; i < length; i++) {
        this.genes[i] = randomCharacter();
      }
    }
  
    //Converts array to String—PHENOTYPE.
    getPhrase() {
      return this.genes.join("");
    }
  
    calculateFitness(target:string) {
      let score = 0;
      for (let i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == target.charAt(i)) {
          score++;
        }
      }
      this.fitness = score / target.length;
    }
    crossover(partner:DNA) {
      // The child is a new instance of DNA.
      // (Note that the genes are generated randomly in DNA constructor,
      // but the crossover function will override the array.)
      let child = new DNA(this.genes.length);
  
      //Picking a random “midpoint” in the genes array
      let midpoint = Math.floor(getRandomNumberBetween(0,this.genes.length));
  
      for (let i = 0; i < this.genes.length; i++) {
        // Before the midpoint genes from this DNA
        if (i < midpoint) {
          child.genes[i] = this.genes[i];
          // After the midpoint from the partner DNA
        } else {
          child.genes[i] = partner.genes[i];
        }
      }
      return child;
    }
  
    mutate(mutationRate:number) {
      //{!1} Looking at each gene in the array
      for (let i = 0; i < this.genes.length; i++) {
        //{!1} Check a random number against mutation rate
        if (Math.random() < mutationRate) {
          //Mutation, a new random character
          this.genes[i] = randomCharacter();
        }
      }
    }
  }