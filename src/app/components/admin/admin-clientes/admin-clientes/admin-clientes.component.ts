import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteRestService } from 'src/app/services/cliente-rest.service';

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.css']
})
export class AdminClientesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumnsArticulos: string[] = [
    'idcliente', 'nombre', 'apellido', 'email', 'telefono','documento_identidad'
  ];
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private clienteRest:ClienteRestService
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.clienteRest.getClientes().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((cliente: any) => ({
          idcliente: cliente.idcliente,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          telefono: cliente.telefono,
          documento_identidad: cliente.documento_identidad
        }));
        this.dataSource.data = datosTable;
      }
    })
  }
}
