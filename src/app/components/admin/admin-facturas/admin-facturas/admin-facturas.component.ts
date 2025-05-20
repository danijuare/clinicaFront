import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { FacturaRestService } from 'src/app/services/factura-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-facturas',
  templateUrl: './admin-facturas.component.html',
  styleUrls: ['./admin-facturas.component.css']
})
export class AdminFacturasComponent implements OnInit {
  selection = new SelectionModel<any>(false, []);
  displayedColumns: string[] = [
    'select', 'idfactura', 'idreservaciones', 'fecha_emision', 'total', 'subtotal', 'otros_servicios',
    'descripcion'
  ];
  dataSource = new MatTableDataSource();
  isAllSelected() {
    return false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  masterToggle() {
  }

  constructor(
    private facturaRest: FacturaRestService
  ) { }

  ngOnInit(): void {
    this.getFacturas();
  }

  getFacturas(){
    this.facturaRest.getFacturas().subscribe({
      next: (res:any)=>{
        const datosTable = [];
        for(const venta of res.data){
          datosTable.push({
            idfactura: venta.idfactura,
            idreservaciones: venta.idreservaciones,
            fecha_emision: venta.fecha_emision,
            total: venta.total,
            subtotal: venta.subtotal,
            otros_servicios: venta.otros_servicios,
            descripcion: venta.descripcion
          });
        }
        this.dataSource.data = datosTable;
      }
    })
  }

  actuarSobreSeleccionadas() {
    this.selection.selected.forEach(item =>{
      
    });
  }

  generarPDF(){
    this.selection.selected.forEach(item =>{
      const idfactura = item.idfactura;
      console.log("id de la venta a generar el pdf ", idfactura);
      this.facturaRest.generatePDFByVenta(idfactura).subscribe({
        next: (res:any)=>{
          //console.log("res para el pdf ",res);
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `factura_${idfactura}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err)=>{console.log(err)}
      });
    });
  }

}
