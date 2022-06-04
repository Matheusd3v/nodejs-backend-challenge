class MyDateLib {
    private deadlinePatter: RegExp;

    constructor() {
        this.deadlinePatter =
            /(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|[1][0-2])\/[0-9]+\s(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-5][0-9])/i;
    }

    public get deadlinePattern(): RegExp {
        return this.deadlinePatter;
    }

    public async convertToDateTime(dateString: string) {
        return new Date(dateString);
    }

    public async todoIsOverdue(deadline: Date) {
        const now = await this.currentBrazilianDatetime();

        if (now > deadline) {
            return true;
        }

        return false;
    }

    private async currentBrazilianDatetime() {
        const brFormatDate = new Date().toLocaleString("pt-BR").split(" ");

        const hours: Array<string | number> = brFormatDate[1].split(":");

        hours[0] = Number(hours[0]) - 3;

        brFormatDate[1] = hours.join(":");

        return new Date(brFormatDate.join(" "));
    }
}

export { MyDateLib };
