# Questionnaire 

# Question 1

There is an API endpoint for each combination of crypto-asset and exchange. This
could have been simplified by having one endpoint for each crypto-asset and then 
passing in an exchange as an argument. 

# Question 2 

The use of express is not necesarilly needed. Each call to the exchange API's 
could've been made within the React frontend through a useEffect hook. 

# Question 3

To scale the solution to this level, I would rework the way in which the exchange 
API's are called, removing the timed interval with useEffect. Instead, I would 
make these calls on a timed interval within express and save the price information 
in a small database so that the prices presented are consistent across all users.  

# Question 4

If I had more time, I would've added some functionality to take in user input about 
which crypto-asset they are interested in as well as whether they would like to buy
or sell. Using this input, I would then display the comparison across exchanges for 
the particular action which the user is interested in. 
