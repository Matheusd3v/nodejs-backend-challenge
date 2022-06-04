class MyDateLib {
    private deadlinePatter: RegExp;

    constructor() {
        this.deadlinePatter =
            /(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|[1][0-2])\/[0-9]+\s(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-5][0-9])/i;
    }

    public get deadlinePattern(): RegExp {
        return this.deadlinePatter;
    }

    public async todoIsOverdue(deadline: string) {
        const brDateString = await this.currentBrazilianDateString();
        const nowDateTime = new Date(brDateString);

        const deadlineInDatetime = new Date(deadline);

        if (nowDateTime > deadlineInDatetime) {
            return true;
        }

        return false;
    }

    public async currentBrazilianDateString() {
        const brFormatDate = new Date().toLocaleString("pt-BR").split(" ");

        const hours: Array<string | number> = brFormatDate[1].split(":");

        hours[0] = Number(hours[0]) - 3;

        brFormatDate[1] = hours.join(":");

        return brFormatDate.join(" ");
    }
}

export { MyDateLib };
