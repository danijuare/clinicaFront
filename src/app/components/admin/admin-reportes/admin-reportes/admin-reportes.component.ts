import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServicioRestService } from 'src/app/services/servicio-rest.service';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;

  displayedColumns: string[] = [
    'idasignacion_consulta',
    'tipo_consulta_nombre',
    'nombre_cliente',
    'telefono_cliente',
    'fecha_hora_salida',
    'atendido',
    'revisado'
  ];

  displayedColumns_revisadas_no_atendidas: string[] = [
    'idasignacion_consulta',
    'tipo_consulta_nombre',
    'nombre_cliente',
    'telefono_cliente',
    'fecha_hora_salida',
    'atendido',
    'revisado'
  ];

  displayedColumns_total_por_ventanilla: string[] = [
    'idventanillas',
    'nombre_ventanilla',
    'total_atendidos',
  ];

  displayedColumns_general: string[] = [
    'idasignacion_consulta',
    'consulta',
    'ventanilla',
    'descripcion',
    'nombre_cliente',
    'telefono_cliente',
    'fecha_hora_salida',
    'atendido',
    'revisado'
  ];

  dataSource = new MatTableDataSource<any>();
  dataSource_revisadas_noatendidas = new MatTableDataSource<any>();
  dataSource_total_por_ventanilla = new MatTableDataSource<any>();
  dataSource_general = new MatTableDataSource<any>();


  cargando: boolean = false;
  cargando_revisadas_noatendidas: boolean = false;
  cargando_tota_por_ventanilla: boolean = false;
  cargando_general: boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicioRest: ServicioRestService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarConsultas() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa ambas fechas correctamente'
      });
      return;
    }

    this.cargando = true;
    const filtros = this.form.value;

    this.servicioRest.generateConsultasAtendidas(filtros).subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Error al cargar los datos'
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_general.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_total_por_ventanilla.filter = filterValue.trim().toLowerCase();
  }

  applyFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_revisadas_noatendidas.filter = filterValue.trim().toLowerCase();
  }

  exportarPDF() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Debes seleccionar fecha de inicio y fin.',
      });
      return;
    }

    const fechas = this.form.value;
    console.log("fechas ", fechas);

    this.servicioRest.generatePDFConsultasAtendidas(fechas).subscribe({
      next: (pdfBlob: any) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace y forzar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = `consultas_atendidas_${fechas.fecha_inicio}_a_${fechas.fecha_fin}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No se pudo generar el PDF.',
        });
      }
    });
  }


  //PARA REPORTE //2
  buscarConsultas_revisadasynoatendidas() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa ambas fechas correctamente'
      });
      return;
    }

    this.cargando_revisadas_noatendidas = true;
    const filtros = this.form.value;

    this.servicioRest.generateConsultasRevisadasNoAtendidas(filtros).subscribe({
      next: (res: any[]) => {
        this.dataSource_revisadas_noatendidas.data = res;
        this.cargando_revisadas_noatendidas = false;
      },
      error: (err) => {
        this.cargando_revisadas_noatendidas = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Error al cargar los datos'
        });
      }
    });
  }

  exportarPDF_revisadas_noatendidas() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Debes seleccionar fecha de inicio y fin.',
      });
      return;
    }

    const fechas = this.form.value;
    console.log("fechas ", fechas);

    this.servicioRest.generatePDFConsultasRevisadasNoAtendidas(fechas).subscribe({
      next: (pdfBlob: any) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace y forzar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = `consultas_revisadas_noatendidas_${fechas.fecha_inicio}_a_${fechas.fecha_fin}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No se pudo generar el PDF.',
        });
      }
    });
  }

  //PARA REPORTE 3
  buscarConsultas_total_por_ventanilla() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa ambas fechas correctamente'
      });
      return;
    }

    this.cargando_tota_por_ventanilla = true;
    const filtros = this.form.value;

    this.servicioRest.generateConsultasTotalPorVentanilla(filtros).subscribe({
      next: (res: any[]) => {
        this.dataSource_total_por_ventanilla.data = res;
        this.cargando_tota_por_ventanilla = false;
      },
      error: (err) => {
        this.cargando_tota_por_ventanilla = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Error al cargar los datos'
        });
      }
    });
  }

  exportarPDF_total_por_ventanilla() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Debes seleccionar fecha de inicio y fin.',
      });
      return;
    }

    const fechas = this.form.value;
    console.log("fechas ", fechas);

    this.servicioRest.generatePDFConsultasTotalPorVentanilla(fechas).subscribe({
      next: (pdfBlob: any) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace y forzar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = `consultas_total_por_ventanilla_${fechas.fecha_inicio}_a_${fechas.fecha_fin}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No se pudo generar el PDF.',
        });
      }
    });
  }

  //PARA REPORTE 4
  buscarConsultas_general() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa ambas fechas correctamente'
      });
      return;
    }

    this.cargando_general = true;
    const filtros = this.form.value;

    this.servicioRest.generateConsultasGeneral(filtros).subscribe({
      next: (res: any[]) => {
        this.dataSource_general.data = res;
        this.cargando_general = false;
      },
      error: (err) => {
        this.cargando_general = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Error al cargar los datos'
        });
      }
    });
  }

  exportarPDF_general() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Debes seleccionar fecha de inicio y fin.',
      });
      return;
    }

    const fechas = this.form.value;
    console.log("fechas ", fechas);

    this.servicioRest.generatePDFConsultasGeneral(fechas).subscribe({
      next: (pdfBlob: any) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace y forzar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = `consultas_general_${fechas.fecha_inicio}_a_${fechas.fecha_fin}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No se pudo generar el PDF.',
        });
      }
    });
  }

}
