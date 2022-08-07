

class ColorPaletteGrey extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const template = document.createElement('template');

        template.innerHTML = `
        <div>
            <h2>Neutral colors</h2>
            <div class="color-list-grey">
                <div class="dx-color-grey grey-1">grey-1</div>
                <div class="dx-color-grey grey-2">grey-2</div>
                <div class="dx-color-grey grey-3">grey-3</div>
                <div class="dx-color-grey grey-4">grey-4</div>
                <div class="dx-color-grey grey-5">grey-5</div>
            
            </div>
        </div>
        `;
        style.innerHTML = `
            :host {display: block;}
            :host .color-list-grey {
                margin-block-start: 1rem;
                display: flex; 
                flex-direction: row;
                flex-wrap: wrap;
                
            }
            :host .dx-color-grey {
                min-height: 120px;
                min-width: 120px;
                text-align: center;
                box-sizing: border-box;
                padding: var(--standard-spacing);
            }
            :host .color-palette-text {
                filter: invert(100%);
            }

            :host .grey-1 {
                background-color: #343d46;
            }
            :host .grey-2 {
                background-color: #4f5b66;
            }
            :host .grey-3 {
                background-color: #65737e;
            }
            :host .grey-4 {
                background-color: #a7adba;
            }
            :host .grey-5 {
                background-color: #c0c5ce;
            }
         
           
        `;

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(style);
        // Apply external styles to the ShadowDOM, fun times.
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/main.css');
        shadow.appendChild(linkElem);

 
        
    };
    

};
customElements.define('color-palette-grey', ColorPaletteGrey);
