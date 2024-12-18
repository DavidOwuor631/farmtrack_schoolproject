import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userName: string = 'John Doe';
  userImage: string = 'assets/user-placeholder.png';
  isModalOpen: boolean = false;
  editUserName: string = this.userName;
  editUserEmail: string = 'johndoe@example.com';
  editUserLocation: string = 'Nairobi, Kenya';

  constructor() { }

  ngOnInit(): void {
    // Fetching user data from a service to get the user details.
  }

  openEditProfileModal(): void {
    this.isModalOpen = true;
  }

  closeEditProfileModal(): void {
    this.isModalOpen = false;
  }

  onEditProfilePic(): void {
    // Logic to change the profile picture
    alert('Edit Profile Picture clicked');
  }

  onSubmitEditProfile(): void {
    // Logic to save profile changes
    this.userName = this.editUserName;
    // Assuming email and location are also saved.
    alert('Profile updated successfully');
    this.closeEditProfileModal();
  }


}
