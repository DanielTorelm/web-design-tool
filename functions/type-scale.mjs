// https://github.com/jeremychurch/type-scale
//https://type-scale.com/

class TypeScale extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const template = document.createElement('template');
        let value = ''; //ToDo make this better, right now a bit hacky for handling the h2

        template.innerHTML = `
        <div class="type-scale-wrapper">
            <h2>Fontscale: </h2>
            <select id="font-scale" class="select-font-scale dx-border-radius">
                <option>Choose scale below</option>
                <option value="1.618">Golden Ratio (1.618)</option>
                <option value="1.500">Perfect Fifth (1.500)</option>
                <option value="1.414">Augmented Fourth (1.414)</option>
                
                <option value="1.333">Perfect Fourth (1.333)</option>
                <option value="1.250">Major third (1.250)</option>
                <option value="1.200">Minor Third (1.200)</option>
                
                <option value="1.125">Major Second (1.125)</option>
                <option value="1.333">Minor Second (1.067)</option>
                

            </select>
            <div id="type-scale-result">
                <ul></ul>
            </div>
        </div>
        `;
        style.innerHTML = `
            .host {display: block;}
            ul {list-style-type: none;}
            
        `;

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(style);
        // Apply external styles to the ShadowDOM, fun times.
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/main.css');
        shadow.appendChild(linkElem);
 
       
        let startValue = 0.5;
        let fontScaleList = [];
        
        let fontScaleSelect = shadow.querySelector('.select-font-scale');
        fontScaleSelect.addEventListener('change', function() {
            let value = fontScaleSelect.value;
            shadow.querySelector(':host h2').innerText = `Fontscale: ${value}`;
            
            //High Contrast Type Scales
            if (value === '1.618') {fontScalar(startValue, Number(1.618))};
            if (value === '1.500') {fontScalar(startValue, Number(1.500))};
            if (value === '1.414') {fontScalar(startValue, Number(1.414))};
            
            //Medium Contrast Type Scales
            if (value === '1.333') {fontScalar(startValue, Number(1.333))};
            if (value === '1.250') {fontScalar(startValue, Number(1.250))};
            if (value === '1.200') {fontScalar(startValue, Number(1.200))};

            //Low Contrast Type Scales
            if (value === '1.067') {fontScalar(startValue, Number(1.067))};
            if (value === '1.125') {fontScalar(startValue, Number(1.125))};
            
        });

        
        function fontScalar(fromNumber, ratio) { //rewrite
            let element = shadow.querySelector('#type-scale-result > ul');
            element.innerHTML = '';
            function log(num){
                if(num > 30) {
                    return;
                }
                let element = shadow.querySelector('#type-scale-result > ul');
                let result = num * ratio;
                element.insertAdjacentHTML('afterbegin', `<li>${result.toFixed(2)} rem</li>`);
                log(result);
                
            };
            log(1);

            
        };

        /*function fontScalar(fromNumber, ratio) { //rewrite
            let nextNumber = fromNumber * ratio;
            fontScaleList.push(nextNumber);
            if (nextNumber < 8) {
                fontScalar(nextNumber, ratio);
            };
            let elements = '';
            fontScaleList.forEach(element => {
                elements += `<li>${element.toFixed(2)} rem</li>`;
            });
            console.log({elements});
            let result = shadow.querySelector('#type-scale-result');
            result.innerHTML = `<ul class="test">${elements}</ul>`;
            
        };*/



    }// end constructor

 
    
    

}; // end class
customElements.define('type-scale', TypeScale);

