export default class KeyGenerator {
    private static instance: KeyGenerator;
    private counter: number = 0;
    private constructor() {}
    public static getInstance(): KeyGenerator {
        !KeyGenerator.instance
            ? (KeyGenerator.instance = new KeyGenerator())
            : null;
        return KeyGenerator.instance;
    }
    public getNewKey() {
        this.counter += 1;
        return Math.random().toString().substring(5) + this.counter.toString();
    }
}
