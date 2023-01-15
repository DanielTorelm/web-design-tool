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
            <h2>TypeScale: </h2>
            <select id="font-scale" class="select-font-scale dx-border-radius">
                <option>Choose scale below</option>

                <optgroup label="High Contrast Type Scales">
                    <option value="1.618">Golden Ratio (1.618)</option>
                    <option value="1.500">Perfect Fifth (1.500)</option>
                    <option value="1.414">Augmented Fourth (1.414)</option>
                </optgroup>
                <optgroup label="Medium Contrast Type Scales">
                    <option value="1.333">Perfect Fourth (1.333)</option>
                    <option value="1.250">Major third (1.250)</option>
                    <option value="1.200">Minor Third (1.200)</option>
                </optgroup>
                <optgroup label="Low Contrast Type Scales">
                    <option value="1.125">Major Second (1.125)</option>
                    <option value="1.333">Minor Second (1.067)</option>
                </optgroup>
                

            </select>
            <div id="type-scale-result">
                <ul></ul>
            </div>
        </div>
        `;
        style.innerHTML = `
            :host {display: block;}
            ul {list-style-type: none;}
            
        `;

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(style);
        // Apply external styles to the ShadowDOM, fun times.
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/main.css');
        shadow.appendChild(linkElem);
 
       
        
        let fontScaleSelect = shadow.querySelector('.select-font-scale');
        fontScaleSelect.addEventListener('change', function() {
            const outputElement = shadow.querySelector('#type-scale-result');
            outputElement.innerHTML = '';
            let value = fontScaleSelect.value;
            shadow.querySelector(':host h2').innerText = `TypeScale: ${value}`;
            
            //High Contrast Type Scales
            if (value === '1.618') {fontScalar(Number(1.618))};
            if (value === '1.500') {fontScalar(Number(1.500))};
            if (value === '1.414') {fontScalar(Number(1.414))};
            
            //Medium Contrast Type Scales
            if (value === '1.333') {fontScalar(Number(1.333))};
            if (value === '1.250') {fontScalar(Number(1.250))};
            if (value === '1.200') {fontScalar(Number(1.200))};

            //Low Contrast Type Scales
            if (value === '1.125') {fontScalar(Number(1.125))};
            if (value === '1.067') {fontScalar(Number(1.067))};
            
            
        });

        function fontScalar(ratio) {
            // This is kind of hacky and bad solution but it works and make the scale we want. Future note: try refactor and find an more elegant solution:


            // for over base
            let scaleFactor = ratio;
            let baseValue = 16;

            let makeArray = new Array(3);
            makeArray.fill(scaleFactor);
            let value = baseValue;
            const arr1 = makeArray.map(function(item) {
            let sum = item * value;
                value = sum;
                console.log({value});
                return sum.toFixed(2);
            });

        
            //making negative scale
            const lowerArray = [scaleFactor,scaleFactor]
            let value2 = baseValue;
            const arr2 = lowerArray.map(function(item) {
            let sum = value2 / item;
                value2 = sum;
                return sum.toFixed(2);
            });


            // construct final array:
            arr1.reverse(); // yes, this is a bit hacky :).
            const sumArray = [...arr1, 16, ...arr2];
  

            let output = shadow.querySelector('#type-scale-result');
            sumArray.forEach(function(value, index){
                output.insertAdjacentHTML('afterbegin', `<span style="font-size: ${value}px">H${index+1} Heading</span>
                <span>(${value}px)</span><br><br>`);
            });
        
        };

        
        
    }// end constructor

 
    
    

}; // end class
customElements.define('type-scale', TypeScale);

