# Journal entries

Here's the journal entry for a common type of transaction - a purchase - with the parts labelled in red.
You can read more about each part in the [manual](hledger.md#transactions-1) if needed.:

[![a hledger transaction entry, with parts named](https://raw.githubusercontent.com/RobertNielsen1/hledger/master/hledger%20basic%20transaction%20--%20terms.png)](https://github.com/RobertNielsen1/hledger/blob/master/hledger%20basic%20transaction%20--%20terms.png)
This entry means: "on april 10th 2018, there was a $9.19 car-related expense, paid with the Acme credit card".

A few more notes:

1. To reduce errors, we use Double Entry Bookkeeping.
   This means we always record both the source and the destination of money -
   where it came from and where it went.

2. Expenses:Automotive, a spending category, is just another kind of account.
   It's not a physical account like your wallet (AKA assets:cash), or a bank account (like Liabilities:Acme Credit Card); 
   it's an expense account.

3. We use a convenient sign notation: money leaving an account (a Credit, in bookkeeping language) is written as a negative number, 
   and money entering an account (a Debit) is written as a positive number. 
   
4. Because of 1 and 3, the amounts in a transaction's journal entry must always add up to zero.
   This helps prevent errors and guides us toward writing correct entries.

5. Why is there no amount next to Liabilities:Acme Credit Card ?
   As a convenience, we are allowed to leave one amount blank, and
   it will be inferred automatically (eg $-9.19 is inferred above).
   This is optional; it saves typing.

<!--
Thanks to this notation, you won't ever need to think about Credit and Debit, unless you want to.
Many users find it easier to think of the signs and the direction of flow between accounts.
-->

<br>

(Part of [hledger by example](hbe.md).)
