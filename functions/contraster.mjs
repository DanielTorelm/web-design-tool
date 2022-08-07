import {hexToRGB} from '../helpers/hex2rgb.mjs';

class Contraster extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const template = document.createElement('template');
      

        template.innerHTML = `
        <div class="contraster-wrapper">
            <h2>Contrast checker</h2>
            <input class="dx-border-radius" type="text" id="color-1" value="#000000">
            <input class="dx-border-radius" type="text" id="color-2" value="#ffffff">
            <button class="dx-border-radius">Calculate Color Contrast</button>
            <div id="contraster-visual-wrapper"></div>
            <div id="contraster-result"></div>
        </div>
        `;
        style.innerHTML = `
            :host {display: block;}
            :host h2 {padding-block-start: var(--standard-spacing);}
            #contraster-visual-wrapper div {
                padding: 1rem;
                font-size: 1.2rem

            }
            .example-text {
                border-radius: var(--border-rad);
            }
            
        `;

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(style);
        // Apply external styles to the ShadowDOM, fun times.
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/main.css');
        shadow.appendChild(linkElem);


        // function from https://stackoverflow.com/a/9733420/3695983                     
        function luminance(r, g, b) {
            var a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        };

        // This works fine but returns decimal value of ratio. 
        //Function below works the same bur returns the ratio as a (string) ratio, eg 1/4.5
        function calculateRatio(color1, color2) {
  
            // read the colors and transform them into rgb format
            
            const color1rgb = hexToRGB(color1);
            const color2rgb = hexToRGB(color2);
          
            // calculate the relative luminance
            const color1luminance = luminance(color1rgb[0], color1rgb[1], color1rgb[2]);
            const color2luminance = luminance(color2rgb[0], color2rgb[1], color2rgb[2]);
          
            // calculate the color contrast ratio
            const ratio = color1luminance > color2luminance 
            ? ((color2luminance + 0.05) / (color1luminance + 0.05))
            : ((color1luminance + 0.05) / (color2luminance + 0.05));
          
            return ratio;
        };


          shadow.querySelector("button").addEventListener("click", function() {
            const color1 = shadow.querySelector("#color-1").value;
            const color2 = shadow.querySelector("#color-2").value;
            const ratio = calculateRatio(color1, color2);
            console.info('Ratio', ratio * 1000);
            

            function findGCD(a, b) {
                if (b) {
                    return findGCD(b, a % b);
                } else {
                    return Math.abs(a);
                }
            };

            let testar = ratio * 1000;
            let testar2 = testar.toFixed(0);
            function formatRatio(startNumber = testar2) {
                let out = findGCD(startNumber, 1000);
                let finalRatio = startNumber / out;
                let finalRatioDivader = 1000 / out;
                // Todo, make sure to numbers match the orcer of ratio, for now I just swap position in output cuz
                // relise that the oprder was wrong, was 1:4.5 when it should be 4.5:1
                let finalRatioDivader2 = finalRatioDivader / finalRatio;
                let finalRatio2 = finalRatio / finalRatio;
                return `${finalRatioDivader2.toFixed(1)} : ${finalRatio2}`;
            };
            let formattedRatio = formatRatio();
            
             


            // show results based on WCAG requirements
            const result = `
                Contrast ratio: <span class="dx-contraster-ratio">${formattedRatio}</span> <br>
                AA-level large text: 
                ${ratio < 1/3 ? '<span class="test-pass">PASS</span>' : '<span class="test-fail">FAIL</span>' }<br>
                AA-level small text: 
                ${ratio < 1/4.5 ? '<span class="test-pass">PASS</span>' : '<span class="test-fail">FAIL</span>' }<br>
                AAA-level large text: 
                ${ratio < 1/4.5 ? '<span class="test-pass">PASS</span>' : '<span class="test-fail">FAIL</span>' }<br>
                AAA-level small text: 
                ${ratio < 1/7 ? '<span class="test-pass">PASS</span>' : '<span class="test-fail">FAIL</span>' }<br><br>
                <span><a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank">AA, and AAA referens for contrast</a></span>
            `;

            const visual = `
                <h2>Example text below</h2>
                <div class="dx-border-radius example-text" style="color: ${color1}; background-color: ${color2};">This is an text with the color of the firts color and background is from the second choosen color.</div>
            `;
            //document.querySelector('main').innerHTML = result;
            shadow.querySelector('#contraster-visual-wrapper').innerHTML = visual;
            shadow.querySelector('#contraster-result').innerHTML = result;
          });  


           
        
    }
    

};
customElements.define('color-contraster', Contraster);

