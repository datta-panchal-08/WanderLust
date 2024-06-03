import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
   API_URL = 'http://localhost:3000';
  constructor(private http:HttpClient ) { }

  getAllListings():Observable<any>{
    return this.http.get<any>(`${this.API_URL}/listings`);
  }  
  
  createListing():Observable<any>{
    return this.http.get<any>(`${this.API_URL}/listings/new`);
  }
  
  addListing(data:any):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/listings`,data);
  }

  deleteListing(id:string){
   return this.http.delete(`${this.API_URL}/listings/${id}`);
  }

  editListing(id:string):Observable<any>{
     return this.http.get(`${this.API_URL}/listings/${id}/edit`);
  }
  
  updateListing(id:string,data:any){
     return this.http.put(`${this.API_URL}/listings/${id}`,data);
  }
  
}
