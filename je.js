
{
    var mouseX = 0;
    var mouseY = 0;

    var maintable = document.getElementById("main_table");
    var contextMenu = document.getElementById("context-menu");
    var currentRow =  maintable.getElementsByTagName("tr")[0];

    document.onmousedown = function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    document.oncontextmenu = function(e){
        e.preventDefault();
    }
    
    function newRow(){
        var new_tr = document.createElement("tr");
        new_tr.className = "row";

        var dc = document.createElement("td");
        var d = new Date();
        dc.innerHTML = d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear(); 
        dc.className = "date-column";

        var acc = document.createElement("td");
        acc.className = "account-column";
        var acinp = document.createElement("input");
        acinp.type = "text";
        acc.appendChild(acinp);

        var amc = document.createElement("td");
        amc.className = "amount-column";
        var aminp = document.createElement("input");
        aminp.type = "number";
        amc.appendChild(aminp); 

        new_tr.appendChild(dc);
        new_tr.appendChild(acc);
        new_tr.appendChild(amc);
        new_tr.oncontextmenu = () => { row_rightClicked(new_tr);};
        return new_tr;
    }

    function row_rightClicked(thisguy){
        try{
            e.preventDefault();
        }catch(Exception){}
        if (contextMenu.style.display=="none"){
            contextMenu.style.display = "block";
            contextMenu.style.left = mouseX;
            contextMenu.style.top = mouseY;
            currentRow = thisguy;
        }
        else contextMenu.style.display = "none";
    }

    for(var i=0; i<5; i++) maintable.appendChild(newRow());
    
    //insert row below
    document.getElementById("insert-row-below").onclick = function(e){
        currentRow.insertAdjacentElement("afterend",newRow(e));
        row_rightClicked();
    }

    //insert row above
    document.getElementById("insert-row-above").onclick = function(e){
        currentRow.insertAdjacentElement("beforebegin",newRow(e));
        row_rightClicked();
    }

    document.getElementById("remove-row").onclick = function(e){
        maintable.removeChild(currentRow);
    }
}