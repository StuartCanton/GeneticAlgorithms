<template>
    <div>  
      <v-container>
        <v-row>
          <v-col cols="4">
            Target: <br/> {{ target }}
          </v-col>
          <v-col cols="4">
            {{ everything }}
          </v-col>
          <v-col cols="4">
            {{ animationId }}
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script setup lang="ts">
import {DNA} from "~~/composables/DNA"
const everything = ref("");
const animationId = ref(0);
// Mutation rate
let mutationRate = 0.01;
// Population Size
let populationSize = 150;
// Population array
let population:DNA[] = [];
// Target phrase
const target = ref("to be or not to be");

function getRandomElement(arr:any[]) {
  if (arr.length === 0) {
    return undefined; // Return undefined if the array is empty
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

function setup() {
  //createCanvas(640, 240);
  //{!3} Step 1: Initialize Population
  for (let i = 0; i < populationSize; i++) {   
    population[i] = new DNA(target.value.length);
  }
}

const draw =()=>{
  // Step 2: Selection
  //{!3} Step 2a: Calculate fitness.
  for (let phrase of population) {
    phrase.calculateFitness(target.value);
  }

  // Step 2b: Build mating pool.
  let matingPool:DNA[] = [];

  for (let phrase of population) {
    //{!4} Add each member n times according to its fitness score.
    let n = Math.floor(phrase.fitness * 100);
    for (let j = 0; j < n; j++) {
      matingPool.push(phrase);
    }
  }

  // Step 3: Reproduction
  for (let i = 0; i < population.length; i++) {    
    let partnerA = getRandomElement(matingPool);
    let partnerB = getRandomElement(matingPool);
    // Step 3a: Crossover
    let child = partnerA.crossover(partnerB);
    // Step 3b: Mutation
    child.mutate(mutationRate);

    //{!1} Note that we are overwriting the population with the new
    // children.  When draw() loops, we will perform all the same
    // steps with the new population of children.
    population[i] = child;
  }

  everything.value = "";
  for (let i = 0; i < population.length; i++) {
    everything.value += population[i].getPhrase() + "    ";
  }
  //background(255);
  //textFont("Courier");
  //textSize(12);
  //text(everything, 12, 0, width, height);
  //return everything;
  animationId.value = requestAnimationFrame(draw);
};

  const startAnimation=()=> {
    animationId.value = requestAnimationFrame(draw);
  };
  const stopAnimation=()=> {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
    }
  };



onBeforeUnmount(()=>{
  stopAnimation();
})
onMounted(()=>{
  startAnimation();
})
onBeforeMount(()=>{
    setup();
})
//function draw() {
  // Step 2: Selection
  //{!3} Step 2a: Calculate fitness.
//   for (let phrase of population) {
//     phrase.calculateFitness(target);
//   }

//   // Step 2b: Build mating pool.
//   let matingPool = [];

//   for (let phrase of population) {
//     //{!4} Add each member n times according to its fitness score.
//     let n = floor(phrase.fitness * 100);
//     for (let j = 0; j < n; j++) {
//       matingPool.push(phrase);
//     }
//   }

//   // Step 3: Reproduction
//   for (let i = 0; i < population.length; i++) {
//     let partnerA = random(matingPool);
//     let partnerB = random(matingPool);
//     // Step 3a: Crossover
//     let child = partnerA.crossover(partnerB);
//     // Step 3b: Mutation
//     child.mutate(mutationRate);

//     //{!1} Note that we are overwriting the population with the new
//     // children.  When draw() loops, we will perform all the same
//     // steps with the new population of children.
//     population[i] = child;
//   }

//   let everything = "";
//   for (let i = 0; i < population.length; i++) {
//     everything += population[i].getPhrase() + "    ";
//   }
//   background(255);
//   textFont("Courier");
//   textSize(12);
//   text(everything, 12, 0, width, height);
// }
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

</script>

<style lang="scss" scoped>

</style>