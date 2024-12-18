import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from '@angular/common';
import { CropTrackingComponent } from "./components/crop-tracking/crop-tracking.component";
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule, FormsModule,CheckoutComponent ,CropTrackingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AgriConnect';

  isSidebarVisible: boolean = false;

  onToggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Check if the click is outside the sidebar and the toggle button
    const clickedInsideSidebar = targetElement.closest('.sidebar');
    const clickedInsideToggleBtn = targetElement.closest('.dashboard-toggle-btn');

    if (!clickedInsideSidebar && !clickedInsideToggleBtn && this.isSidebarVisible) {
      this.isSidebarVisible = false;
    }
  }


}
