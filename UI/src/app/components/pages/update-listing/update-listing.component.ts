import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrls: ['./update-listing.component.scss']
})
export class UpdateListingComponent implements OnInit {
  listingGroup!: FormGroup;
  listingId: string | null = null;
  listing: any;

  constructor(
    private fb: FormBuilder, 
    private listingService: ListingService, 
    private route: ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    if (this.listingId) {
      this.getListingById(this.listingId);
    }
  }

  initForm(): void {
    this.listingGroup = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
      price: [''],
      location: [''],
      country: ['']
    });
  }

  getListingById(id: string): void {
    this.listingService.editListing(id).subscribe((listing: any) => {
      this.listing = listing;
      // Patching values into the form
      this.listingGroup.patchValue({
        title: listing.title,
        description: listing.description,
        image: listing.image,
        price: listing.price,
        location: listing.location,
        country: listing.country
      });
    });
  }

  onUpdate() {
    if (this.listingGroup.valid) {
      // Perform your update operation here
      const formData = this.listingGroup.value;
      this.listingService.updateListing(this.listing._id,formData).subscribe(res =>{
        console.log("Update Listing Successfully : ",res);
      })
    }
    this.router.navigate(['../']);      
  }
}
