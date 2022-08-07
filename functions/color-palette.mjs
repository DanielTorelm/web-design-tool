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
            <input id="primary" class="input" type="text"> Primary<br>
         
                <button id="primary-btn">Generate</button>
       
            <input hidden class="js-color" type="color">
            <div class="color-list"></div>
         
        </div>
        `;
        style.innerHTML = `
            :host {display: block;}
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
                
            }
            :host .color-palette-ref {
                filter: invert(100%);
            }
            :host .color-palette-value {
                filter: invert(100%);
                font-size: 90%;
            }
            :host input {
                border: 0;
                border-bottom: 2px solid hotpink
            }
            :host h1, h2, h3 {
                    margin-block-start: 0;
                    padding-block-start: 0;
                }
       
          
           
        `;

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(style);
        // Apply external styles to the ShadowDOM, fun times.
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/main.css');
        shadow.appendChild(linkElem);

        

        const colorInputElement = shadow.querySelector('.js-color');
        let choosenColor = '';
        colorInputElement.addEventListener("input", function() {
            choosenColor = colorInputElement.value;
            let hslColorValue = hexToHSL(choosenColor);
            createColorPalette(hslColorValue)
        }, false);

        let colorInputElementPrimary = shadow.querySelector('#primary');
        shadow.querySelector('#primary-btn').addEventListener("click", function() {
            let choosenColorPrimary = colorInputElementPrimary.value;
            let hslColorValuePrimary = hexToHSL(choosenColorPrimary);
            createColorPalette(hslColorValuePrimary);
        }, false);

        /*const colorInputElementSecondary = shadow.querySelector('#secondary');
        shadow.querySelector('#secondary-btn').addEventListener("click", function() {
            let choosenColorSecondary = colorInputElementSecondary.value;
            let hslColorValueSecondary = hexToHSL(choosenColorSecondary);
            createColorPalette(hslColorValueSecondary);
        }, false);*/

        // this function should if data later on save data to the memory storage.
        function primColoreStorage() {
            let data = sessionStorage.getItem('colorTest');
            console.log('DData in session storage: ', data);
            
            if(data) {
                let objOutPut = shadow.querySelector('.color-list');
                objOutPut.innerHTML = `Data from session storage: ${data}`;
            };
        };
        primColoreStorage();

        function createColorPalette(hslColorValue) { 
            console.log(`Color value for fnc createColorPalette ${hslColorValue}`);  
            let colorList = '';
            let colorStyle = '';
            let dataToExport = ''; /* need work */
            let iterations = 0;
            while (iterations < 10) {
                iterations++;
                hslColorValue[2] = iterations * 10; //Increase the lightness by 10% each iteration.
                dataToExport += `color${iterations}: hsl(${hslColorValue[0]}, ${hslColorValue[1]}%, ${hslColorValue[2]}%)), `;
                colorList += `<div class="dx-colors dx-color-${iterations}"><span class="color-palette-ref">primary-${(iterations) * 10}</span><br><span class="color-palette-value">HSL value: ${hslColorValue}</span></div>`;
                colorStyle += `
                .dx-color-${iterations} {
                    background-color: hsl(${hslColorValue[0]}, ${hslColorValue[1]}%, ${hslColorValue[2]}%);
                    color: hsl(${hslColorValue[0]}, ${hslColorValue[1]}%, ${hslColorValue[2]}%);
                }
                `;
               
            };

            // Storage tests, TODO fix above funtion, only store the color values not the whole html
            /*window.colorsObj.primary.colorList = dataToExport;
            console.log(`Colors saved: ${window.colorsObj.primary.colorList} :end save.`);
            sessionStorage.setItem('colorTest', window.colorsObj.primary.colorList);*/

            let exportAll = `<style>${colorStyle}</style> ${colorList}`;
            window.colorsObj.primary.colorList = exportAll;
            console.log(`Colors saved: ${window.colorsObj.primary.colorList} :end save.`);
            sessionStorage.setItem('colorTest', window.colorsObj.primary.colorList);
           
           
            //ToDo make this override the template
            shadow.querySelector('.color-list').innerHTML = colorList;
            shadow.querySelector('style').insertAdjacentHTML('beforeend', colorStyle);

           

            // get the element, tricky to get working Houdini scom
            /*const myElement = shadow.querySelector('.dx-color-1');
            const elementWidth = myElement.computedStyleMap();
            const ffg = elementWidth.get('color');
            //const elementWidth = myElement.computedStyleMap().get('width');
            console.log('Color elementer',ffg);*/
        

           

        };
           
        
    };
    

};
customElements.define('color-palette', ColorPalette);



