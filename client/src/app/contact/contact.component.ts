import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from "../Model/contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[];
  first_name: string;
  last_name: string;
  phone: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContact();
  }

  getContact() {
    this.contactService.getContacts().subscribe( contacts => {
      this.contacts = contacts;
    });
  }

  deleteContact(contact:Contact) {
    this.contactService.deleteContact(contact).subscribe(data =>{
      this.contacts = this.contacts.filter(t => t._id !== contact._id);
    });
  }

  addContact(){
    const newContact = {
      first_name:this.first_name,
      last_name:this.last_name,
      phone:this.phone
    };
    this.contactService.addContact(newContact).subscribe(contact =>{
      this.contacts.push(contact);
      this.getContact();
    });
  }

}
