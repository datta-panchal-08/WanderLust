import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from 'src/app/services/listing.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listings:any[] =[];
  constructor(private listingService:ListingService,private router:Router) { }

  ngOnInit(): void {
    this.getListings();
  }

  getListings(){
    this.listingService.getAllListings().subscribe(result => {
      this.listings = result;
      console.log(result)
    });
  }
  
  goTo(){
    this.router.navigate(['/listings/new']);
  }
 
  delete(id:any){
    this.listingService.deleteListing(id).subscribe(res =>{
      console.log("Listing Delted ",res);
  })
  window.location.reload();
}

  edit(id:any){
    this.router.navigate([`/listings/${id}/edit`]);
  }
   
}
