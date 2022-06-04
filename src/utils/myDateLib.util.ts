class MyDateLib {
    private deadlinePatter: RegExp;

    constructor() {
        this.deadlinePatter =
            /(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|[1][0-2])\/[0-9]+\s(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])/i;
    }

    public get deadlinePattern(): RegExp {
        return this.deadlinePatter;
    }

    public async convertToDateTime(dateString: string) {
        const [day, month, year] = dateString
            .split(" ")[0]
            .split("/")
            .map((value) => Number(value));

        const [hours, minutes, seconds] = dateString
            .split(" ")[1]
            .split(":")
            .map((value) => Number(value));

        const newDate = new Date(year, month - 1, day, hours, minutes, seconds);

        return newDate;
    }
}

export { MyDateLib };
