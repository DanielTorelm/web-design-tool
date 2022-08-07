function saving(data) {
    console.log('Data to save: ', data);
};

/* Under contruction */


/*document.querySelector(".js-file").onclick = async () => {
   console.log('this runs');
    const options = {
      types: [
        {
          description: "Test files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
    };
    
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    
    await writable.write("Hello World");
    await writable.close();
    
    return handle;
   };*/
