import {hexToHSL} from '../helpers/hex2hsl.mjs';

class ColorPalette extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const template = document.createElement('template');

        template.innerHTML = `
        <div>
            <h2>Choose color to get color palette</h2>
            <div id="color-palette-button-access"></div> 
            <input id="primary" class="input" type="text" name="primary-input"> 
            <label for="primary-input">Primary</label><br>
            <button id="generate-color-list-btn">Generate</button>
            <div class="color-list"></div>
         
        </div>
        `;
        style.innerHTML = `
            :host {
                display: block;
            }
            :host .color-list {
                margin-block-start: 1rem;
                display: flex; 
                flex-direction: column;
                flex-wrap: nowrap;
                align-content: center;
                gap: 1rem;
                
            }
            :host .dx-colors {
                min-height: 120px;
                min-width: 120px;
                text-align: center;
                box-sizing: border-box;
                padding: var(--standard-spacing);
                border-radius: 0.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                                
            }

            :host input {
                border: 0;
                border-bottom: 2px solid hotpink
            }
            :host h1, h2, h3 {
                    margin-block-start: 0;
                    padding-block-start: 0;
            }

            :host #color-palette-button-access {
                margin-block-end: 1rem;
            }
       
          
           
        `;

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(style);
        // Apply external styles to the ShadowDOM, fun times.
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/main.css');
        shadow.appendChild(linkElem);

        
        /* Function for showing buttons, depending of data saved */
        function createColorPaletteButtons() {
            let button = `<button class="btn-default" id="Primary">Primary</button>&nbsp;<button class="btn-default" id="Secondary">Secondary</button>&nbsp;<button class="btn-default" id="Neutrals">Neutrals</button>`;
            let element = shadow.querySelector('#color-palette-button-access');
            console.log('element',element);
            element.insertAdjacentHTML('afterbegin', button);

        };
        createColorPaletteButtons();

        
        

        /* Dont think we need this. const colorInputElement = shadow.querySelector('.js-color');
        let choosenColor = '';
        colorInputElement.addEventListener("input", function() {
            choosenColor = colorInputElement.value;
            let hslColorValue = hexToHSL(choosenColor);
            createColorPalette(hslColorValue);
        }, false);*/

        // This runs when clicking on the "Generate button"
        let colorInputElementPrimary = shadow.querySelector('#primary');
        shadow.querySelector('#generate-color-list-btn').addEventListener("click", function() {
            let choosenColorPrimary = colorInputElementPrimary.value;
            let hslColorValuePrimary = hexToHSL(choosenColorPrimary);
            let colorList = createColorPalette(hslColorValuePrimary);
            
            
            // Todo,This should be its own function, also try separate storage/save and output
            window.colorsObj.primary.colorList = colorList;
            console.log('ListOBJ', window.colorsObj.primary.colorList);
            let outputList = shadow.querySelector('.color-list');
            outputList.innerHTML = window.colorsObj.primary.colorList;

            let labelText = shadow.querySelector('label[for="primary-input"]');
            console.log('labelTextlabelText', labelText.innerText);
            
            switch(labelText.innerText) {
                case 'Primary':
                    sessionStorage.setItem('colorListPrimary',colorList);
                    break;
                case 'Secondary':
                    sessionStorage.setItem('colorListSecondary',colorList);
                    break;
                case 'Neutrals':
                    sessionStorage.setItem('colorListNeutrals',colorList);
                    break;
                default:
                    console.log('cant save, no allowed colorList set')
            };


        }, false);

    

        let colorLists = shadow.querySelector('#color-palette-button-access');
        colorLists.addEventListener("click", function(event) {
            // For getting label text and change it.
            let labelText = shadow.querySelector('label[for="primary-input"]');
            if(event.target.id=='Primary'){labelText.textContent = 'Primary'; getcolorList('colorListPrimary');}
            if(event.target.id=='Secondary'){labelText.textContent = 'Secondary'; getcolorList('colorListSecondary');}
            if(event.target.id=='Neutrals'){labelText.textContent = 'Neutrals'; getcolorList('colorListNeutrals');}
        }, false);


        /* This returns HTML and styling for the list, ready for showing */
        function createColorPalette(hslColorValue) { 
            console.log(`Color value for fnc createColorPalette ${hslColorValue}`);  
            let colorList = '';
            let colorStyle = '';
            let dataToExport = '';
            let iterations = 0;
            while (iterations < 10) {
                iterations++;
                hslColorValue[2] = iterations * 10; //Increase the lightness by 10% each iteration.
                dataToExport += `color${iterations}: hsl(${hslColorValue[0]}, ${hslColorValue[1]}%, ${hslColorValue[2]}%)), `;
                colorList += `<div class="dx-colors dx-color-${iterations}">
                    <div>
                        <div class="color-palette-ref">primary-${(iterations) * 10}</div>
                        <div class="color-palette-value">HSL-value: ${hslColorValue}</div>
                        </div>
                    </div>
                `;
                colorStyle += `
                    .dx-color-${iterations} {
                        background-color: hsl(${hslColorValue[0]}, ${hslColorValue[1]}%, ${hslColorValue[2]}%);
                        color: color-contrast(hsl(${hslColorValue[0]}, ${hslColorValue[1]}%, ${hslColorValue[2]}%) vs black, white);
                    }
                `;
            };
            return `<style>${colorStyle}</style> ${colorList}`;

        };
        // End createColorPalette


        // this function should if data later on save data to the memory storage. (old test obj in storage: colorTest)
        function getcolorList(colorList = 'colorListPrimary') {
            let data = sessionStorage.getItem(colorList);   
            if(data) {
                let objOutput = shadow.querySelector('.color-list');
                objOutput.innerHTML = `Data from session storage (${colorList}): ${data}`;
            };
        };



            
        // get the element, tricky to get working Houdini scom
        /*const myElement = shadow.querySelector('.dx-color-1');
        const elementWidth = myElement.computedStyleMap();
        const ffg = elementWidth.get('color');
        //const elementWidth = myElement.computedStyleMap().get('width');
        console.log('Color elementer',ffg);*/
   
           
        
    };
    

};
customElements.define('color-palette', ColorPalette);



