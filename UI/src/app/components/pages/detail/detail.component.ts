import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  listingId: string | null = null;
  listing: any;

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id');
    if (this.listingId) {
      this.getListingById(this.listingId);
  }
}

   getListingById(id:string):void{
    this.http.get(`http://localhost:3000/listings/${id}`).subscribe(res =>{
      this.listing = res
    });
   }

}
