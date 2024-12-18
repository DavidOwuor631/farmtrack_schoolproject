import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,// Declare your components here
  ],
  imports: [
    BrowserModule, // Required for running the app in a browser
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ], // Add your services here if any
  bootstrap: [AppComponent] // Your root component
})
export class AppModule {}
