var datepick = document.createElement("input");
datepick.type= "date";
datepick.value=new Date().toISOString().slice(0, 10);

var totals_label = [document.getElementById("total-debit"),document.getElementById("total-credit")];

{
    var maintable = document.getElementById("main_table"); //table with the input rows
    var contextMenu = document.getElementById("context-menu"); //RIGHT CLICK MENU
    var currentRow =  maintable.getElementsByTagName("tr")[0]; //current selected

    var mouseX = 0;
    var mouseY = 0;
    document.onmousedown = function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    document.oncontextmenu = function(e){
        e.preventDefault();
    }
    document.onclick = function(e){
        contextMenu.style.display = "none";
    }

    function CalculateTotals(){
        var debit_sum = 0;
        var credit_sum = 0;
        for(var i = 0; i<maintable.children.length; i++){
            var amount = Number(maintable.children[i].children[2].children[0].value);
            var is_debit = maintable.children[i].children[2].children[0].className=="debit-input"
            if(is_debit) debit_sum+= amount;
            else credit_sum+= amount;
        }

        totals_label[0].innerHTML = debit_sum.toString(10);
        totals_label[1].innerHTML = credit_sum.toString(10);
        
    }
    
    function newRow(){
        var new_tr = document.createElement("tr");
        new_tr.className = "row";

        var dc = document.createElement("td");
        dc.className = "date-column"; 

        var acc = document.createElement("td");
        acc.className = "account-column";
        var acinp = document.createElement("input");
        acinp.type = "text";
        acc.appendChild(acinp);

        var amc = document.createElement("td");
        amc.className = "amount-column";
        var aminp = document.createElement("input");
        aminp.className = "debit-input";
        aminp.oninput = function(e){ /* EVENT HANDLER - when inputted something into the textbox */
            var amnt = parseFloat(aminp.value);
            if(amnt<0) aminp.className = "credit-input";
            else aminp.className = "debit-input";
        }
        aminp.onkeydown = function(e){
            console.log(e.key);
            if(e.key=="Tab" || e.key=="Enter"){
                CalculateTotals();
            }else if(e.key=="Shift" || e.key==" "){
                if(aminp.className=="debit-input") aminp.className = "credit-input";
                else aminp.className="debit-input";
                e.preventDefault();
                CalculateTotals();
            }else if(isNaN(e.key) && e.key!="Backspace") e.preventDefault();
        }
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
    
    function after_table_mod(){
        row_rightClicked();
        maintable.children[0].children[0].appendChild(datepick);
    }
    //insert row below
    document.getElementById("insert-row-below").onclick = function(e){
        currentRow.insertAdjacentElement("afterend",newRow(e));
        after_table_mod();
    }

    //insert row above
    document.getElementById("insert-row-above").onclick = function(e){
        currentRow.insertAdjacentElement("beforebegin",newRow(e));
        after_table_mod();
    }

    document.getElementById("remove-row").onclick = function(e){
        if(maintable.children.length>2)
            maintable.removeChild(currentRow);
        else alert("Journal Entries should have atleast 2 rows");
        after_table_mod();
    }

    for(var i=0; i<5; i++) maintable.appendChild(newRow());
    maintable.children[0].children[0].appendChild(datepick);
}