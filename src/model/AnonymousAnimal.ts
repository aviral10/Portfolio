import panda from "../assets/Panda.png"
class AnonymousAnimal {
    private anonymousAnimals = [
        "Alligator.png",
        "Anteater.png",
        "Armadillo.png",
        "Auroch.png",
        "Axolotl.png",
        "Badger.png",
        "Bat.png",
        "Beaver.png",
        "Buffalo.png",
        "Camel.png",
        "Capybara.png",
        "Chameleon.png",
        "Cheetah.png",
        "Chinchilla.png",
        "Chipmunk.png",
        "Chupacabra.png",
        "Cormorant.png",
        "Coyote.png",
        "Crow.png",
        "Dingo.png",
        "Dinosaur.png",
        "Dolphin.png",
        "Duck.png",
        "Elephant.png",
        "Ferret.png",
        "Fox.png",
        "Frog.png",
        "Giraffe.png",
        "Gopher.png",
        "Grizzly.png",
        "Hedgehog.png",
        "Hippo.png",
        "Hyena.png",
        "Ibex.png",
        "Ifrit.png",
        "Iguana.png",
        "Jackal.png",
        "Kangaroo.png",
        "Koala.png",
        "Kraken.png",
        "Lemur.png",
        "Leopard.png",
        "Liger.png",
        "Llama.png",
        "Manatee.png",
        "Mink.png",
        "Monkey.png",
        "Moose.png",
        "Narwhal.png",
        "Nyan Cat.png",
        "Orangutan.png",
        "Otter.png",
        "Panda.png",
        "Penguin.png",
        "Platypus.png",
        "Pumpkin.png",
        "Python.png",
        "Quagga.png",
        "Rabbit.png",
        "Raccoon.png",
        "Rhino.png",
        "Sheep.png",
        "Shrew.png",
        "Skunk.png",
        "Squirrel.png",
        "Tiger.png",
        "Turtle.png",
        "Walrus.png",
        "Wolf.png",
        "Wolverine.png",
        "Wombat.png",
    ];

    private static instance: AnonymousAnimal;

    private currentAnimalName = this.anonymousAnimals[0];
    private currentAnimal = panda;

    private constructor() {
        this.fetchAnimal()
    }

    private async fetchAnimal(){
        let animalNameUrl = this.anonymousAnimals[Math.floor(Math.random() * this.anonymousAnimals.length)];
        let imageUrl = `https://raw.githubusercontent.com/aviral10/Public-assets/main/animals/${animalNameUrl}`
        let animalName = `Anonymous ${animalNameUrl.split(".")[0]}`

        async function fetchImageFromUrl(this: any, response: Response){
            const blob = await response.blob();
            AnonymousAnimal.getInstance().setAnimal(animalName, URL.createObjectURL(blob))
        }
        
        try {
            const response = await fetch(imageUrl);
            
            (response.ok)? fetchImageFromUrl(response):console.error("Failed to fetch animal logo");

        } catch (error) {
            console.error("Error fetching animal logo:", error);
        } 

    }

    setAnimal(animalName: string, animal: string){
        this.currentAnimalName = animalName
        this.currentAnimal = animal
    }

    public static getInstance() {
        this.instance ? null : (this.instance = new AnonymousAnimal());
        return this.instance;
    }

    getAnimal() {
        return {name: this.currentAnimalName, randomAnimal: this.currentAnimal};
    }
}

export default AnonymousAnimal;
