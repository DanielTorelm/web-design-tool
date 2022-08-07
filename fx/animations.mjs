export { fade };


function fade(element, durations = 1000) {
    console.log('HI: ', element);
    const fade = [
        { opacity: '0' },
        { opacity: '1' }
    ];
    
    const optionsfadeTiming = {
        duration: durations,
        iterations: 1,
    };
    
    let item = document.querySelector(`${element}`);
    item.animate(fade, optionsfadeTiming);

};




  