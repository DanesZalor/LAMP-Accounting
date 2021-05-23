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
        CalculateTotals();
    }
    
    function Validate(){//Checks if the entry is valid for submission
        var errormsg = "ERROR(s):\n";
        //check the validity of the note
        var note = document.getElementById("note-input").children[0].value;
        var hasnote = (note!="" && note.length>4);
        if(!hasnote) errormsg += "- Note must contain something \n";

        var balanced = CalculateTotals();
        if(!balanced) errormsg += "- Debit and Credit must be equal\n"

        var validrows = true;   //THIS SECTION CHECKS the validity of the table
        var numofrowocc = 0;    //table is valid if atleast 2 rows are occupied and they are non 0s
        for(var i=0; i<maintable.children.length; i++){
            var acc = maintable.children[i].children[1].children[0].value;
            var amm = maintable.children[i].children[2].children[0].value;
            var row_occ = (acc!="" && amm!="" && Number(amm)>0);
            if( !(row_occ || (acc==""&&amm=="")) ){
                validrows = false;
                break;
            }

            if(row_occ) numofrowocc += 1;
        }
        if(!validrows) errormsg += "- Some entries are blank\n"; 
        if(numofrowocc<2) errormsg += "- Must have atleast 2 accounts\n";
        validrows = validrows && (numofrowocc>=2);
        
        var noerror = hasnote && validrows && balanced;
        if(!noerror) alert(errormsg); 
        return  noerror && confirm('Are you sure?');
    }

    function CalculateTotals(){ //Calculates the totals and change the total label accordingly
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
        if(debit_sum!=credit_sum){
            totals_label[0].style.color = '#FF0000';
            totals_label[1].style.color = '#FF0000';
            return false;
        }else{
            totals_label[0].style.color = '#1e6e46';
            totals_label[1].style.color = '#1e6e46';
            return true;
        }
        
    }
    
    function newRow(){
        var new_tr = document.createElement("tr");
        new_tr.className = "row";

        var dc = document.createElement("td");
        dc.className = "date-column"; 

        var acc = document.createElement("td");
        acc.className = "account-column";
        var acinp = document.createElement("input");
        acinp.name = "acc[]";
        acinp.type = "text";
        acc.appendChild(acinp);

        var amc = document.createElement("td");
        amc.className = "amount-column";
        var aminp = document.createElement("input");
        aminp.className = "debit-input";
        aminp.name = "amm[]";
        aminp.oninput = function(e){ /* EVENT HANDLER - when inputted something into the textbox */
            CalculateTotals();
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
            }else if(isNaN(e.key) && e.key!="Backspace" && !e.key.startsWith("Arrow")) e.preventDefault();
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