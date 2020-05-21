import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PurchaseService } from './../../../services/purchase/purchase.service';


@Component({
  selector: 'app-data-purchase',
  templateUrl: './data-purchase.component.html',
  styleUrls: ['./data-purchase.component.css']
})
export class DataPurchaseComponent implements OnInit {

  supplier: any;

  constructor(
    private dialogRef: MatDialogRef<DataPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private purchaseService: PurchaseService
    ) { 
      this.supplier = data
    }

  ngOnInit(): void {
  }

  deletePurchase(article: any){
     if(confirm('Seguro que desea eliminar la compra?')){
      this.purchaseService.deletePurchase(article.id_articulo, this.supplier.supplier.id_proveedor, article.proveedores_articulos.fecha_compra)
       .subscribe(
        res => {
          this.close();
        },
        err => console.log(err)
      )  
     }
  }

  close(){
    this.dialogRef.close();
    this.supplier.supplier = [];
  }

}
