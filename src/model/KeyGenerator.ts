export default class KeyGenerator{
    private static instance: KeyGenerator;
    private counter: number = 0;
    private constructor(){}
    public static getInstance(): KeyGenerator {
        if (!KeyGenerator.instance) {
            KeyGenerator.instance = new KeyGenerator();
        }
        return KeyGenerator.instance;
    }
    public getKey(){
        this.counter += 1
        console.log(this.counter)
        return Math.random().toString().substring(2)+this.counter.toString()
    }
}
