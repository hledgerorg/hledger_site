# Tags tutorial

Last updated: 2023

Author: Robert Nielsen (YouTube: hledger fan) with invaluable input from Simon Michael

Don’t be scared away from using tags in your hledger accounting this Halloween, or any other time for that matter. This is a tutorial on using tags with hledger, so if the idea of using tags has been haunting you, but you are not really sure how to use them, read on.

Let’s start with a file showing someone’s hledger accounting around the time of Halloween:
 
```journal

2022/09/25 ACME Costume
   Expenses:Entertainment     $45.99 ; Amoeba Man
   Liabilities:CreditCard

2022/10/30 Cheap-O-Gas
   Expenses:Automotive     $37.15
   Liabilities:CreditCard 

2022/11/01 Medical Associates
   Expenses:Medical  $80.00 ; upset stomach
   Liabilities:CreditCard

2022/12/15 West End Dentistry
   Expenses:Dental  $160.00 ; two fillings
   Liabilities:CreditCard


```

We want to categorize three of the above transactions (costume, doctor visit after overeating candy, and fillings as a result of too consuming too many sugary Halloween treats) as expenses attributable to Halloween. One option would be to create a new category of expenses for Halloween, but what if we want to also keep the other categories, such as Entertainment, Medical, and Dental? For example, we want to have the visit to the dentist categorized as a dental expense, but at the same time we should be able to find it under expenses related to Halloween. One solution is to add a tag for Halloween.

## Mechanics of Writing a Tag

One of the simplest tags is a word, which is inside a comment, immediately followed by a colon. In the file below, you will see that three of the transactions have a tag, named Halloween, added to them:

```journal

2022/09/25 ACME Costume ; Halloween:
   Expenses:Entertainment     $45.99 ; Amoeba Man
   Liabilities:CreditCard

2022/10/30 Cheap-O-Gas 
   Expenses:Automotive     $37.15
   Liabilities:CreditCard 

2022/11/01 Medical Associates ; Halloween:
   Expenses:Medical  $80.00 ; upset stomach
   Liabilities:CreditCard

2022/12/15 West End Dentistry ; Halloween:
   Expenses:Dental  $160.00 ; two fillings
   Liabilities:CreditCard
 
```

## Using Tags
 
Once we incorporate tags in our hledger file, we can use them in a variety of ways. Here, we will look at one way, which is to use the tags to filter a command. 
 
This command:
 
```cli
$ hledger register Expenses tag:Halloween
```
 
Produces something like the following output (i.e., all the Expenses tagged “Halloween”):

```
2016/09/25     ACME Costume           Liabilities:CreditCard   -$45.99          -$45.99
2016/11/01     Medical Associates     Liabilities:CreditCard   -$80.00          -$125.99
2016/12/15     West End Dentistry     Liabilities:CreditCard  -$160.00          -$285.99
```

Notice that the automotive expense for gasoline does not appear in the above output. This is because the transaction was not tagged as “Halloween.” Thus, you see how you can narrow the scope of a command such as register, so that the command applies to just those transactions with a specific tag.

And because we chose to use a tag, as opposed to creating a new expense category, we can still find out what we spent on dentistry, doctor’s bills, and so on.
 
## Adding Values to Tags
 
Just being able to create a simple tag is frighteningly useful. However, you can also add values to tags, so that you can narrow a search to a tag value. This is a real treat to learn how to do!

For this example, we will be using expenses of the mummy, a monster popular in fiction and film.
Our mummy in question likes to have a variety of changes of wrappings, and so it has made several purchases from its favorite online store:

```journal
2022/05/13 AcmeWrappings.com
    Expenses:Clothing                         $28.00
    Liabilities:MonsterCard

2022/05/15 AcmeWrappings.com
    Expenses:Clothing                         $44.90  
    Liabilities:MonsterCard

2022/05/17 AcmeWrappings.com
    Expenses:Clothing                         $36.50  
    Liabilities:MonsterCard

2022/05/20 AcmeWrappings.com
    Expenses:Clothing                         $58.99  
    Liabilities:MonsterCard

2022/05/28 AcmeWrappings.com
    Expenses:Clothing                         $39.00  
    Liabilities:MonsterCard
```
 
## The Mechanics
 
The mummy would like to note the color of each wrapping it purchases. Therefore, it creates a tag “color” and adds one or more words telling the color. For example, the transaction below has the tag “color” and the value is “ancient white”:
 
```journal
2022/05/15 AcmeWrappings.com  
    Expenses:Clothing  $44.90  ; color:ancient white
    Liabilities:MonsterCard
```
 
Note that you can optionally put a space after the colon, as shown immediately below:
 
```journal
2022/05/15 AcmeWrappings.com  
    Expenses:Clothing  $44.90  ; color: ancient white
    Liabilities:MonsterCard
```
 
Here is the file that we will be working with:
 
```journal
2022/05/13 AcmeWrappings.com
    Expenses:Clothing  $28.00  ; color:parchment
    Liabilities:MonsterCard

2022/05/15 AcmeWrappings.com
    Expenses:Clothing  $44.90  ; color:ancient white
    Liabilities:MonsterCard

2022/05/17 AcmeWrappings.com
    Expenses:Clothing  $36.50  ; color:dust
    Liabilities:MonsterCard

2022/05/20 AcmeWrappings.com
    Expenses:Clothing  $58.99  ; color:ancient white
    Liabilities:MonsterCard

2022/05/28 AcmeWrappings.com
    Expenses:Clothing  $39.00  ; color:parchment
    Liabilities:MonsterCard
```
 
In the above file, we have added values for the color of each of the wrappings that were purchased, specifically,

```
dust
parchment
ancient white
```
 
Let’s say we want to list all the wrappings that were dust colored.

We could use the command:
 
```cli
$ hledger register tag:color=dust
```
 
The above would output something like the following (i.e., the one expense that was tagged with the color dust:
 
```
2022-05-17 AcmeWrappings.com Expenses:Clothing $36.50 $36.50
```
 
On the other hand, if we wanted to list only the wrappings that were parchment color, we could use the command:
 
```cli
$ hledger register tag:color=parchment
```
 
The above command, lists the following:
 
```
2022-05-13 AcmeWrappings.com   Expenses:Clothing  $28.00 $28.00
2022-05-28 AcmeWrappings.com  Expenses:Clothing   $39.00 $67.00
```
 
## Watch Out for the Spaces
 
Now, let’s look for every wrapping colored “ancient white”. If we try:
 
```cli
$ hledger register tag:color=ancient white
```
 
We get exactly nothing. What happened? As you most likely guessed from the title of this section, the space between “ancient” and “white” is the cause of the problem. To fix this, we can put the text in quotation marks. 
 
Therefore, you will need something like the following, to find all the wrappings colored “ancient white”:
 
```cli
$ hledger register tag:color="ancient white"
```

## Combining Tags and Comments

What if you want both a tag and a comment in the same line? A tag goes in a comment, but what are the restrictions? Glad you asked that question!

Answer: hledger tags go inside a comment, and there are two options. First, the tag can go at the end of the comment.  

For example, you make a purchase of an inflatable pumpkin and want to include that fact in a comment. However, in the same line you also want to tag it as holiday:Halloween. One option is to write a comment followed by a tag:

```journal
2022/09/26 ACME Holiday Supplies 
  Expenses:Entertainment    $58.99 ; inflatable pumpkin holiday:Halloween
  Liabilities:CreditCard
```
The second option is to end the tag with a comma. You can then put a comment after the comma.

For example, we have the tag first (holiday:Halloween) followed by a comma. After the comma is a comment (inflatable pumpkin).

```journal
2022/09/26 ACME Holiday Supplies 
  Expenses:Entertainment    $58.99 ; holiday:Halloween, inflatable pumpkin
  Liabilities:CreditCard
```

Note that if you put a comment after the tag without separating the tag and comment with a comma, the comment becomes part of the tag value, and this can cause unwanted results. You do not want unwanted results when working with important data!  

Finally, it's possible to have a comment, followed by a tag, and as long as you end the tag in a comma, you can have additional comments after the comma at the end of your tag.  

## Multiple Tags
 
Our friend the mummy, introduced earlier, is very happy being able to track the color of its wrappings. In addition, however, it would also like to track the type of fabric and the width of the cloth. How does it do this?

Fortunately, hledger allows multiple tags, with each tag separated by a comma. Here is an example:


```journal 
; fabric:cotton, width:15, color:parchment
```
In addition to recording the above, our mummy wants to track which type of wrappings it buys. Specifically, it needs to track the type of fabric, the width of the cloth, and the color of the material. How does it do this?

Fortunately, hledger allows multiple tags, with each tag separated by a comma. Here is an example:

```
; fabric:cotton, width:15, color:parchment
```
 
The mummy now adds the tags to each purchase, resulting in:

```journal
2022/05/13 AcmeWrappings.com
    Expenses:Clothing  $28.00  ; fabric:cotton, width:15, color:parchment
    Liabilities:MonsterCard

2022/05/15 AcmeWrappings.com
    Expenses:Clothing  $44.90  ; fabric:nylon, width:20, color:ancient white
    Liabilities:MonsterCard

2022/05/17 AcmeWrappings.com
    Expenses:Clothing  $36.50  ; fabric:wool, width:15, color:dust
    Liabilities:MonsterCard

2022/05/20 AcmeWrappings.com
    Expenses:Clothing  $58.99  ; fabric:wool, width:20, color:ancient white
    Liabilities:MonsterCard

2022/05/28 AcmeWrappings.com
    Expenses:Clothing  $39.00  ; fabric:cotton, width:30, color:parchment
    Liabilities:MonsterCard
```

To see everything purchased made of wool, the mummy types:

```cli
$ hledger register tag:fabric=wool
```

The result is:

```
2022/05/17 AcmeWrappings.com  Expenses:Clothing  $36.50  $36.50
2022/05/20 AcmeWrappings.com  Expenses:Clothing  $58.99  $95.49
```

Or to see which wrappings had a width of 20:

```cli
$ hledger register tag:width=20
```
which outputs...
```
2022/05/15 AcmeWrappings.com  Expenses:Clothing  $44.90   $44.90
2022/05/20 AcmeWrappings.com  Expenses:Clothing  $58.99  $103.89
```

## Multiple Tags in a Query

Multiple tags can be used in the same query. For example, our monster friend wants to find out how much parchment colored cotton it has purchased:

```cli
$ hledger register tag:fabric=cotton tag:color=parchment
```
Notice that there is no comma between the two tags in the above query. You use the comma to separate tags in the data file, but not the query. 

By the way, the above command outputs:

```
2022/05/13 AcmeWrappings.com   Expenses:Clothing  $28.00  $28.00
2022/05/28 AcmeWrappings.com   Expenses:Clothing  $39.00  $67.00
```

Each wrapping purchased above is both made of cotton AND has the color of parchment.

If you wish to find all wrappings, say, made of wool OR colored parchment, you can run two queries. First, we find all the wool wrappings:

```cli
$ hledger register tag:fabric=wool
```
Then we find all the parchment colored ones:
```cli
$ hledger register tag:color=parchment
```
## Expenses per Category
One common question is how much did we spend in total for each tag value? For example, how much did the mummy spend on each color of wrapping? To find out, we can run a balance report for our expenses pivoted by color:

```cli
$ hledger balance expenses --pivot color
```

The result is:

```
             $103.89  ancient white
              $36.50  dust
              $67.00  parchment
--------------------
             $207.39
```

Aha, we see a lot of spending on “ancient white”.

Similarly, if we want to see the expenses by type of fabric, we type:

```cli
$ hledger balance expenses --pivot fabric
```
And we get:

```
              $67.00  cotton
              $44.90  nylon
              $95.49  wool
         --------------------
             $207.39
```

From the above, we observe that the mummy has spent the more on wool wrappings than on either cotton or nylon ones.
 
## Summary
 
This tutorial has shown how to:
 
-      Add a tag to an hledger transaction
-      Use tags with the register command to list only those expenses with a given tag
-      Add values to tags
-      Use tag values with the register command to list only those expenses a given tag with a given value
-      Combine comments and tags in the same line
-      Use multiple tags in the same line
-      Use the --pivot option to total expenses by tag value
 
## Hledger Tag Summary with Examples
 
### Add a tag to an hledger transaction
 
Inside a comment write a word immediately followed by a colon:
 
```journal
2022/09/25 ACME Costume ; Halloween:
   Expenses:Entertainment     $45.99
   Liabilities:CreditCard
```
 
A tag can apply to a whole transaction, as in the above, or just one of the lines as in:
 
```journal
2022/09/25 ACME Costume
   Expenses:Entertainment     $45.99 ; Halloween:
   Liabilities:CreditCard
```
 
### Use tags with the register command to list only the expenses for a given tag
 
```cli
$ hledger -f Halloween2.hledger register Expenses tag:Halloween
```
 
### Add values to tags
 
To add a value to a tag, add one or more words to the tag:
 
```journal
2022/05/20 AcmeWrappings.com
    Expenses:Clothing  $58.99  ; color:ancient white
    Liabilities:MonsterCard
```
 
### Limit a command to tags with specified values
 
```cli
$ hledger register tag:color="ancient white"
```
 
Note that if your tag value has a space in it, you must do something such as put quotation marks around the entire tag value. If there are no spaces in your tag value, the quotation marks are optional.

### Combine comments and tags

Two options. The first is to write comments first, and put tags at the end:

```journal
2022/10/31 Grocery Store   
   Expenses     $3.52   ;  on sale today item:candy
   Liabilities:CreditCard
```

The second option is to put a comma after the tag, and then add a comment after the comma:     

```journal
2022/10/31 Grocery Store   
   Expenses     $3.52   ;  item:candy, on sale today
   Liabilities:CreditCard
```

You can even have comment, tag, comma, and comment.

### Use multiple tags on the same line

Separate multiple tags with a comma:

```journal
2022/05/20 AcmeWrappings.com  
    Expenses:Clothing  $58.99  ; fabric:wool, width:20, color:ancient white
    Liabilities:MonsterCard
```
 
 
### Use the --pivot option to total expenses by tag value
 
```cli
$ hledger balance expenses --pivot color
```
 
or
 
```cli
$ hledger balance expenses --pivot fabric
```
 
## Conclusion
 
Tag, you’re it.
