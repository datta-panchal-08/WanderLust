import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from 'src/app/services/listing.service';
@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {
  listingGroup!:FormGroup;
  constructor(private fb:FormBuilder,private listing:ListingService,private router:Router) { }

  ngOnInit(): void {
    this.listingGroup = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      imageUrl:['',Validators.required],
      price:['',Validators.required],
      location:['',Validators.required],
      country:['',Validators.required]            
    })
  }
  
  onSubmit() {
    if (this.listingGroup.valid) {
      const formData = {
        title: this.listingGroup.value.title!,
        description: this.listingGroup.value.description!,
        image: this.listingGroup.value.imageUrl!,
        price: this.listingGroup.value.price!,
        location: this.listingGroup.value.location!,
        country: this.listingGroup.value.country
      };
      this.listingGroup.reset();
      this.listing.addListing(formData).subscribe({
        next: (res) => {
          console.log("Data saved:", res);
          this.goBack();
        },
        error: (error) => {
          console.error("Error saving data:", error);
        }
      });
    }
  }
  
  goBack() {
    this.router.navigate(['../']);
}
}