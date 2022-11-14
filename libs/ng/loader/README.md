## Noilda Loader

This loader is the initial screen user will see until the first bundle is being loaded.    
Use the script to place the content of loader component to the `index.html`.
The script is not included on the final bundle.
On final bundle will be included only the service for managing the loader and the loader CSS+HTML.


## Usage

After installation run    
` node ./node_modules/@noilda/ng-loader/bin/cli.js `   
and follow instructions.

After runing the script you can change colors or other properties.

There are to ways to hide loader.

1. Insert loader inside root element (this has to be performed manually)
2. User `LoaderService` to hide and show loader.

Example:
Check angular lifecycles to hide loader when content is been rendered on screen.

``` typescript 
import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from '@noilda/ng-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
constructor(
  private loaderService: LoaderService,
){}


  ngAfterViewInit() {
    this.loaderService.showLoader(false);
  }
}
```

## Important
There are two HTML comments which will be inserted with the loader element.   

  `<!--  START__HERE Noilda loader  -->`   
  `<!--  END__HERE Noilda loader  -->`    

This two comments  mark the begining and the end of loader element. The package uses these comments to replace the loader if the script is re-executed.
If the comments are being removed, the script will put a new loader while keeping the previous loader elements.


## TODO

Unit tests

