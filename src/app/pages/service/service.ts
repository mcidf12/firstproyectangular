import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { ClientService } from '../../services/user/clientService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service',
  imports: [ReactiveFormsModule, NgIf, NgFor, NgxSonnerToaster, NgClass],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service implements OnInit, OnDestroy {
  serviceForm!: FormGroup;
  loading = false;
  adding = false;
  //servicios es un array de cualquier tipo
  servicios: any[] = [];
  //cliente es un objeto con clave numerica (referencia a service->id) y valor de cualquier tipo
  cliente: { [key: number]: any } = {};
  data: any = null;
  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private router: Router, private api: ClientService) {
    this.serviceForm = this.fb.group({
      numero_cliente: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^00\d{6}-[A-Z]$/i)]],
    });
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  load() {
    this.loading = true;
    const s = this.api.getService().subscribe({
      next: (data) => {
        this.servicios = Array.isArray(data) ? data : (data?.servicios ?? []);
        this.cliente = data?.cliente ?? [];

        this.loading = false;
        console.log(data);
      },
      error: (e) => {
        this.loading = false;
        console.error('Error cargando servicios', e);
        toast.error('No se pudo obtener servicios');
      }
    });
    this.subs.push(s);
  }

  get numero_cliente() {
    return this.serviceForm.controls['numero_cliente'];
  }

  service() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      toast.error('Completar los campos requeridos');
      return;
    }

    const raw = this.serviceForm.value;

    //normalizar numero de cliente
    const codigoNormalizado = raw.numero_cliente.trim().toUpperCase();
    const payload = {
      numero_cliente: codigoNormalizado,
    };


    this.adding = true;

    const s = this.api.addService(payload).subscribe({
      next: (res) => {
        toast.success('Servicio agregado correctamente');
        this.serviceForm.reset();
        this.adding = false;
        this.load();
      },
      error: (e) => {
        this.adding = false;
        //console.error('Error al agregar servicio', e);
        if (e?.status === 0) {
          toast.error('No se pudo conectar al servidor');
        } else if (e?.status === 404) {
          toast.error('Servicio no encontrado');
        } else if (e?.status === 409) {
          toast.error('Servicio ya existente');
        } else if (e?.status === 422) {
          toast.error('Error de validación');
        } else if (e?.status === 401) {
          toast.error('No autorizado');
          this.router.navigateByUrl('/iniciar-sesion');
        } else if (e?.status === 403) {
          toast.error('Este cliente esta clasificado como baja de servicio');
        } else {
          toast.error('Error inesperado');
        }
      }
    });

    this.subs.push(s);
  }

  //toast con mensaje 
  eliminarServicio(id: number) {
    toast.warning('¿Eliminar servicio?', {
      description: 'Esta accion no se puede deshacer',
      action: {
        label: 'Eliminar',
        onClick: () => this.eliminar(id),
      },
      cancel: {
        label: 'Cancelar',
      },
    });
  }

  eliminar(id: number) {
    //if (!confirm('¿Eliminar servicio?')) return;
    const s = this.api.deleteService(id).subscribe({
      next: () => {
        toast.success('Eliminado');
        this.load();
      },
      error: (e) => {
        if (e?.status === 409) {
          toast.error('Debes tener minimo un servicio');
        } else {
          toast.error('No se pudo eliminar');
        }
      }
    });
    this.subs.push(s);
  }

  verDetalles(numero: string) {
    this.router.navigate(['/dashboard', numero]);
  }
}
