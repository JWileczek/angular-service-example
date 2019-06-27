# ServiceExample

This project shows simple ways services can be provided and initialized throughout the application.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Different build configurations can be setup through `angular.json`. 
These implementations are linked via a name property in the environment file to a configuration file in the `assets` folder of the application.

I.E. 
```json5
{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
     ...
}
```
This section of `angular.json` creates a production configuration that loads the `confg.prod.json` file when the app is initialized for settings.
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
