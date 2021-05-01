export abstract class DateService {

    public static nowInSeconds() : number {
        return new Date().getTime() / 1000;
    };

    public static now() : number {
        return new Date().getTime();
    };

}
