var selectednumber = 0;

const { ipcRenderer } = require('electron')

function selected(e) {
    console.log(selectednumber);
    if (e.value == "ON") {
        console.log("OFF");
        e.value="OFF";
        e.classList.remove("selected");
        let parent = e.parentElement;
        let child = parent.childNodes[3]; 
        ipcRenderer.send("buttonpressed", child.innerHTML, selectednumber);
        ipcRenderer.on("reply", (event, results)=>{
            for(let i=0; i<results.length; i++) {
                document.getElementById(results[i].Name).classList.remove("found");
            }
        })
        selectednumber--;
    }
    else if (selectednumber<3){
        console.log("ON");
        e.value="ON";
        e.classList.add("selected");
        let parent = e.parentElement;
        let child = parent.childNodes[3];   /* don't remove this '3' */
        // console.log(child.innerHTML);
        if (selectednumber==0)
        {
            ipcRenderer.send("buttonpressed", child.innerHTML, selectednumber);
            ipcRenderer.on("reply", (event, results)=>{
                for(let i=0; i<results.length; i++) {
                document.getElementById(results[i].Name).classList.add("found");
                }
            })
        }

        else
        {
            ipcRenderer.send("buttonpressed", child.innerHTML, selectednumber);
            ipcRenderer.on("reply", (event, results)=>{
                for(let i=0; i<results.length; i++) {
                    document.getElementById(results[i].Name).classList.remove("found");
                }
            })
        }
        selectednumber++;
    }
}