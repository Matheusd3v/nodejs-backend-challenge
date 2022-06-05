class MyDateLib {
    private deadlinePatter: RegExp;

    constructor() {
        this.deadlinePatter =
            /(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|[1][0-2])\/[0-9]+\s(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-5][0-9])/i;
    }

    public get deadlinePattern(): RegExp {
        return this.deadlinePatter;
    }

    public async todoIsOverdue(deadline: Date) {
        const currentDatetime = new Date();

        if (currentDatetime > deadline) {
            return true;
        }

        return false;
    }

    public async brazilianUtcToGlobalUtc(dateString: string) {
        const [date, time] = dateString.split(" ");
        const [day, month, year] = date
            .split("/")
            .map((value) => Number(value));

        const hours: Array<string | number> = time.split(":");
        let newHour = Number(hours[0]) + 3;

        if (newHour > 23) {
            newHour = 24 - newHour;
        }

        hours[0] = newHour;

        const [hour, minutes, seconds] = hours.map((value) => Number(value));

        return new Date(year, month - 1, day, hour, minutes, seconds);
    }
}

export { MyDateLib };
