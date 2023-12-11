# collegestreet-api

## Local Setup


## Tech Stack

 - Python 3.x 
 - Django with Django-rest Framework : For Model and everything
 - [Auth0](https://auth0.com/) : For Authentication - Not using it anymore
 - [Sanity](https://www.sanity.io/) : CDN service -  Decided to use Cloudinary
 - [Supabase](https://supabase.com/) : Postgres database and hosting it


 ## Available APIs
 
 **Users**

*/api/users/register* - User Registration

*/api/users/login* - User Login

*/api/users/logout* - Logout

*/api/users/user* - User Info

*/api/users/changepass* - Change/update user password

*/api/users/login/refresh* -  User Re-login

*/api/users/token* - User Auth token

*/api/users/token/refresh* - User Auth token


**Products**

*/api/products/all* - Get all products

*/api/products/create* - Create a product

*/api/products/<int:pd_id>* - Get a product by Id

*/api/products/update/<int:pd_id>* - update a product by Id

*/api/products/delete/<int:pd_id>* - delete a product by Id


 ## Steps to run

 1. Create virtual env
 2. Activate virtual env
 3. Install all the dependencies
    ```bash
    python -r install requirements.txt
    ```
4. Copies all the env variables from .env.examples to .env
5. Update all the .env variables values
6. run the migrations
   ```bash
   python manage.py migrate
   ```
7. Run the server
   ```bash
   python manage.py run-server
   ```
