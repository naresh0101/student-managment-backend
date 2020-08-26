### Introduction to the Project 
    * Create organization from backed, 
    * Assign one admin to organisation,
    * Admin will login with his credentials from react panel to add Students,
    * After adding students he can se list of all students in a table


### How to run ( Project set up )

* ```git clone https://github.com/naresh0101/student-managment-backend.git ```
* ``` cd student-managment-backend ```
* ``` npm i ```
##### Now set up your Mongo db 
    * install mongo db
    * Follow the below steps 
        * Type ```monog```
        * ```db.createUser(
            {
                user : "root" || "whatever you want ",  // this is the user name     \\
                pwd : "password", // this is the password     }} Admin   
                roles : [ "root" ] // root access            //
            }```
        *  Login to db by the following steps 
            // 1. mongo
            // 2 use admin 
            // 3. db.auth("root", "password") so 1st one is root (user) and last one is password
        * ```db.createUser(
            {
                user:"username", // username of project db 
                pwd : "password", // password of user's db
                roles: [
                    {
                        db: "dbname", // db name 
                        role : "dbOwner" // owner of the db 
                    }
                ]
            }
        )```
)
* ``` NODE_ENV=development nodemon app.js ```