# collegestreet-api

## Local Setup


## Tech Stack

 - Python 3.x 
 - Django with Django-rest Framework : For Model and everything
 - [Auth0](https://auth0.com/) : For Authentication - Not using it anymore
 - [Sanity](https://www.sanity.io/) : CDN service -  Decided to use Cloudinary
 - [Supabase](https://supabase.com/) : Postgres database and hosting it

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
