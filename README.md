# REDCap API Write Example

A quick example Python notebook and Node server that write to REDCap API. 

## To use
Drop you API key and your institution's path to REDCap API endpoint into an .env file (generate .env if needed using .env.example)

Run the Python notebook at REDCapWrite.ipynb 

Run the Node server by running in terminal ```node index.js``` and then navigating to http://localhost:3333/ping to test if the server is up (you should get ```{"ping":"success"}``` back) and then http://localhost:3333/test-write to write to you REDCap project db.


## Notes
Make sure that the table you are writing to has *user_id* field or alter your data payload to reflect your data structures.   

Each write request generates a unique id for the record, otherwise records will be overwritten. This is a bit brute force and assumes that you will be filtering data on other fields for the final data analysis.