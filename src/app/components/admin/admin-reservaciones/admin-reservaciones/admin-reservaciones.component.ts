import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReservacionRestService } from 'src/app/services/reservacion-rest.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-reservaciones',
  templateUrl: './admin-reservaciones.component.html',
  styleUrls: ['./admin-reservaciones.component.css'],
  providers: [DatePipe]
})
export class AdminReservacionesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumnsArticulos: string[] = [
    'idreservaciones', 'idcliente', 'idhabitacion', 'fecha_inicio', 'fecha_fin','estado'
  ];
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private ReservacionRest:ReservacionRestService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.getReservaciones();
  }

  getReservaciones(){
    this.ReservacionRest.getReservaciones().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((reservacion: any) => ({
          idreservaciones: reservacion.idreservaciones,
          idcliente: reservacion.idcliente,
          idhabitacion: reservacion.idhabitacion,
          fecha_inicio: this.datePipe.transform(reservacion.fecha_inicio, 'yyyy-MM-dd'),
          fecha_fin: this.datePipe.transform(reservacion.fecha_fin, 'yyyy-MM-dd'),
          estado: reservacion.estado
        }));
        this.dataSource.data = datosTable;
      }
    })
  }
}
