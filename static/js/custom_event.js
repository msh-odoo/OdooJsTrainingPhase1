
class BaseComponent {
    start() {
        this.render();
        this.bindEvents();
    }
    render() {
        const div = document.createElement('div');
        this.el = div;
    }
    bindEvents() {

    }
}

class Content extends BaseComponent {
    
    render() {
        super.render();
        this.el.setAttribute('class', 'o_content');
        const button = document.createElement('button');
        button.textContent = 'Click Me!';
        button.setAttribute('class', 'o_click_content_btn');
        this.el.appendChild(button);
    }

    bindEvents() {
        this.el.querySelector('.o_click_content_btn')
            .addEventListener('click', this.clickButton.bind(this));
    }

    clickButton(ev) {
        const event = new window.CustomEvent('add-item-to-sidebar', { detail: { amount: Math.random() }, bubbles: true });
        this.el.dispatchEvent(event);
    }
}

class Sidebar extends BaseComponent {
    render() {
        super.render();
        this.el.setAttribute('class', 'o_sidebar');
        this.el.textContent = "This is Sidebar";
    }
    bindEvents() {
        document.addEventListener('add-item-to-sidebar', this.onAddItem.bind(this));
    }
    onAddItem(ev) {
        // TODO: Display custom event data
        debugger;
        const div = document.createElement('div');
        div.textContent = ev.detail.amount;
        document.querySelector('.o_content').appendChild(div);
    }
}

export class MainComponent {
    start() {
        const content = new Content();
        content.start();
        const sidebar = new Sidebar();
        sidebar.start();
        const div = document.createElement('div');
        div.appendChild(content.el);
        div.appendChild(sidebar.el);
        this.el = div;
        this.el.addEventListener('add-item-to-sidebar', (ev) => {
            // ev.stopPropagation();
        });
    }
}
