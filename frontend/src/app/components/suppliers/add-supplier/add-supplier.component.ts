import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier/Supplier';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  supplier: Supplier;

  constructor(
    private supplierService: SupplierService, 
    private router: Router) {

      this.supplier = new Supplier();
     }

  ngOnInit(): void {
  }

  addSupplier(form: NgForm){
    this.supplierService.addSupplier(form.value)
      .subscribe(
        res=>{
          this.router.navigate(['/suppliers']);
        },
        err=>{
          console.log(err)
        }
      ) 
  }
}
