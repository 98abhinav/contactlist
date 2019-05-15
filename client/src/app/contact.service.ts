import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './Model/contact';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');
  }

  addContact(contact:Contact): Observable<Contact>{
    return this.http.post<Contact>('http://localhost:3000/api/contacts', contact, httpOptions);
  }

  deleteContact(contact:Contact){
    return this.http.delete<Contact>('http://localhost:3000/api/contacts/'+contact._id);
  }
}
