class Observable {
    constructor(state) {
        this.state = state;
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notifyObservers() {
        this.observers.forEach(observer => observer());
    }
}

export class ObserverClass {
    constructor(state) {
        this.observable = new Observable(state);
        this.observable.addObserver(this.notifyStateChanged.bind(this));
        console.log("Old state is ::: ", this.observable.state);
    }
    notifyStateChanged() {
        console.log("New state is ::: ", this.observable.state);
    }
    updateState(state) {
        this.observable.state = state;
        this.observable.notifyObservers();
    }
}

