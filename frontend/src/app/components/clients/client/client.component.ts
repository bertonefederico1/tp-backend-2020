import { Component, OnInit } from '@angular/core';

import { ClientService } from "../../../services/client/client.service";

import { Client } from '../../../models/client/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(public clientService: ClientService) { }

  clients: Client[];

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clientService.getClients()
      .subscribe(res => {
        this.clients = res as Client[];
      });
  }

  deleteClient(id: number){
    if(confirm("Seguro que desea eliminar?")){
      this.clientService.deleteClient(id)
        .subscribe(
          res => this.getAll(),
          err => console.log(err)
        );
    }else {
      return;
    }
  }

}
