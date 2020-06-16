import {Request, Response, NextFunction, request} from 'express';
import { ContactController } from '../controllers/crmControllers';

export class Routes {
  public contactController: ContactController = new ContactController();

  public routes(app): void {

    app.route('/')
    .get((request: Request, response: Response) => {
      response.status(200).send({
        message: 'GET request successfull'
      })
    })


    app.route('/contact')
      .post(this.contactController.addNewContact)
      .get(this.contactController.getContacts);

    app.route('/contact/:contactId')
      .get(this.contactController.getContactWithID)
      .put(this.contactController.updateContact)
      .delete(this.contactController.deleteContact)
  };
}