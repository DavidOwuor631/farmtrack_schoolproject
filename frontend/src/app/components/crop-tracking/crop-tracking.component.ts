import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crop-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crop-tracking.component.html',
  styleUrl: './crop-tracking.component.css'
})
export class CropTrackingComponent {
  cropForm!: FormGroup;
  crops: any[] = []; // to be replaced a backend service

  constructor(private fb: FormBuilder,private http: HttpClient)  { }

  
    ngOnInit(): void {
      this.cropForm = this.fb.group({
        temperature: [''],
        humidity: [''],
        ph: [''],
        rainfall: [''],
        nitrogen: [''],
        phosphorus: [''],
        potassium: [''],
        
      });
    }
  
    onSubmit(): void {
      const cropData = this.cropForm.value;
      this.http.post('http://localhost:8000/recommend-crop/', cropData).subscribe({
        next: (response: any) => {
          console.log('Crop recommendation response:', response);
          alert(`Recommended Crop: ${response.recommended_crop}`);
        },
        error: (err) => {
          console.error('Error fetching crop recommendation:', err);
        }
      });
    }
  
}
/*ngOnInit(): void {
    this.cropForm = this.fb.group({
      cropType: [''],
      plantingDate: [''],
      expectedHarvestDate: [''],
      growthStage: [''],
      healthStatus: [''],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.cropForm.valid) {
      this.crops.push(this.cropForm.value);
      this.cropForm.reset();
    }
  }*/