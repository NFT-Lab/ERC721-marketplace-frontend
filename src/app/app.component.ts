import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

export const opacityAnimation = trigger('entering', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.3s', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('.3s', style({ opacity: 0 }))]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [opacityAnimation],
})
export class AppComponent {
  title = 'metamaskdApp';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
