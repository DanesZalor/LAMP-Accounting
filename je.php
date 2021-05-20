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
                <td class="amount-column">Amount</td>
            </tr>
        </table>
        <hr align="left">
        <!-- Main table for input here -->
        <table id="main_table">
            <!--Dynamic Elements here-->
        </table> 
        <hr align="left">
        <table id="table_footer">
            <tr>
                <td class="date-column" id="note-label">Note:</td>
                <td class="account-column" id="note-input"><input type="text"></td>
                <td class="amount-column" id="totals">16000 16000</td>
            </tr>
        </table>

        <!--CONTEXT MENU doesnt show up until u rightclicks-->
        <table id="context-menu" style="display:none">
            <tr class=context-menu-element id="insert-row-above"><td>Insert Row Above</td></tr>
            <tr class=context-menu-element id ="insert-row-below"><td>Insert Row Below</td></tr>
            <tr class=context-menu-element id="remove-row"><td>Remove Row</td></tr>
        </table>
        <!--/CONTEXT MENU-->
    </body>
    <script src="je.js"></script>
</html>