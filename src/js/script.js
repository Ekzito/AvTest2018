const currentDocument = document.currentScript.ownerDocument;
class DateInput {
    constructor({input}) {
        this.input = input;
        this.input.addEventListener('change', () => this.onChange())
    }

    onChange() {
        if (new Date(this.input.value).getFullYear() >= 100) {
            console.log(event.target.value)
            this.inputValue = new Date(event.target.value);
            this.updateTime = new Date();
            return this.inputValue;
        }    
    }              
}

class DateRange extends DateInput {
    constructor({input, container}) {
        super({input})
        this.container = container;        
    }

    createItems(period) {
        let dates = [];
        for (let i = +period.start; i < +period.end; i += 3600000 * 168) {
            dates.push(i)
        }
        let periods = [];
        for (let i = 0; i < dates.length; i++) {
            let date = new Date(dates[i]);
            if (date.getDay() > 0) periods[i] = `${new Date(date.setHours(-24 * (date.getDay() - 1))).toLocaleDateString()} - ${new Date(date.setHours(144)).toLocaleDateString()}`
            else if (date.getDay() == 0) periods[i] = `${new Date(date.setHours(-144)).toLocaleDateString()} - ${new Date(date.setHours(144)).toLocaleDateString()}`
        }
        return periods;
    }

    renderItems(items) {
        this.container.innerHTML = '';
        let element = currentDocument.createElement('div');
        this.container.appendChild(element)
        element.textContent = `Последнее изменение: ${this.updateTime.getDate() + '.' + ((this.updateTime.getMonth() < 9) ? '0' + (this.updateTime.getMonth() + 1) : this.updateTime.getMonth() + 1)}`
            items.forEach((item) => {
                const element = document.createElement('div');
                element.innerText = item;
                this.container.appendChild(element);
            })
        }
        
    onChange() {
        super.onChange();
        this.renderItems(this.createItems(this.createPeriod(this.inputValue)));
    }

    createPeriod(date) {
        let newYear = date.getFullYear() + 1;
        let newDate = new Date(newYear, 0, 1)
        return {
            start: date,
            end: newDate
        }
    }
}
    range = new DateRange({
        input: currentDocument.querySelector('.input input'),
        container: currentDocument.querySelector('.containerForLastUpdateRecordAndPeriodItems')
    });