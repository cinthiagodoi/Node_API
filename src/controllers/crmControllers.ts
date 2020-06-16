import * as mongoose from 'mongoose';
import {ContactSchema} from '../models/crmModel';
import {Request, Response} from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {

  public addNewContact (request: Request, response: Response) {
    let newContact = new Contact(request.body);

    newContact.save((err, contact) => {
      if(err) {
        response.send(err);
      }
      response.json(contact);
    })
  }

  public getContacts(request: Request, response: Response) {
    Contact.find({}, (err, contact) => {
      if(err){
        response.send(err);
      }
      response.json(contact);
    })
  } 

  public getContactWithID(request: Request, response: Response) {
    Contact.findById(request.params.contactId, (err, contact) => {
      if(err){
        response.send(err);
      }
      response.json(contact);
    });
  }

  public updateContact (request: Request, response: Response) {
    Contact.findOneAndUpdate({ _id: request.params.contactId},
      request.body, {new: true}, (err, contact) => {
        if(err) {
          response.send(err);
        }
        response.json(contact);
      })
  }

  public deleteContact (request: Request, response: Response) {
    Contact.remove({ _id: request.params.contactId}, (err, contact) => {
      if(err){
        response.send(err);
      }
      response.json({message: 'Contact removed'})
    });
  }
}