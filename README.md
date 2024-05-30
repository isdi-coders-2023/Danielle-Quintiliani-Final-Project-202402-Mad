# Moto Market

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Application description

Application run with Angular 17 in front with a Nest framework on backend.
Is an SPA running on a MySQL database.
The application in composite with a main and header.
Header will render the menu option and the logo only.
Main will render all the application.
The core have the service and guard for the correct run of the application.
I follow the repository patterns and all the method that bring data from server are stored in repo service.
The state service is who permits that application will be reactive with user change.
I added some guard like owner guard that permits only to user that publish the item can remove it.
The application use JSON token for the log in and auth. Auth0 is the future feature.
The application is a social e-commerce like ebay or wallapop with all item related on the world of the motorbike.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
