export class Generator{
    public static genId(){
        return Math.random().toString(36).replace('0.', '');
    }
}
