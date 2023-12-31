import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
})
export class EditarProductoComponent {
  producto: Producto = new Producto;
  id: number;

  constructor(private productoServicio: ProductoService,
    private ruta: ActivatedRoute,
    private enrutador: Router) {}

    ngOnInit(){
      this.id = this.ruta.snapshot.params['id'];
      this.productoServicio.GetById(this.id).subscribe(
        {
          next: (datos) => this.producto = datos
          ,
          error: (errores: any) => console.log(errores)
        }
      );
    }

    onSubmit(){
      this.editarProducto();
    }

    editarProducto(){
      this.productoServicio.editarProducto(this.id, this.producto).pipe(
        tap((data: any) =>{
          console.log("producto editado: ", data);
          this.irListaProducto();
        }),
        catchError((error: any) => {
          console.log("error al editar producto: ", error);
          throw error;
        })
      )
      .subscribe();
    }

    irListaProducto(){
      this.enrutador.navigate(['/productos']);
    }
    
}
