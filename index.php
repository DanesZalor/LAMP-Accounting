<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="je.css">
        <title>Journal Entry</title>
    </head>
    <body>

        <h1>Journal Entry</h1>
        <table id="table_header">
            <tr>
                <td class="date-column">Date</td>
                <td class="account-column">Account</td>
                <td class="amount-column"><span id="header-debit">Debit</span><span id="header-credit">Credit</span></td>
            </tr>
        </table>
        <hr align="left">
        <!-- Main table for input here -->
        <table id="main_table">
            <!--Dynamic Elements here-->
        </table> 
        <table id="table_footer">
            <tr>
                <td class="date-column" id="note-label">Note:</td>
                <td class="account-column" id="note-input"><input type="text"></td>
                <td class="amount-column" id="totals">
                    <table><tr>
                        <td id="total-debit">0</td><td id="total-credit">0</td>
                    </tr></table>
                </td>
            </tr>
        </table>

        <!--CONTEXT MENU doesnt show up until u rightclicks-->
        <div id="context-menu" style="display:none">
            <div class=context-menu-element id="insert-row-above">Insert Row Above</div>
            <div class=context-menu-element id ="insert-row-below">Insert Row Below</div>
            <div class=context-menu-element id="remove-row">Remove Row</div>
        </div>
        <!--/CONTEXT MENU-->
    </body>
    <script src="je.js"></script>
</html>