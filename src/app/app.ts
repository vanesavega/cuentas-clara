import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class App {
  protected readonly title = signal('cuentas-claras');
  ngOnInit(): void {
    initFlowbite();
  }
} 
