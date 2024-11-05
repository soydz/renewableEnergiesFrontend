import { Component } from '@angular/core'
import { NavComponent } from '../../components/nav/nav.component'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
