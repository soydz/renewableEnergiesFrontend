import { Routes } from '@angular/router'
import { IndexComponent } from './pages/index/index.component'
import { EnergyTableComponent } from './pages/energy-table/energy-table.component'
import { GraphicsComponent } from './pages/graphics/graphics.component'
import { RegisterComponent } from './pages/register/register.component'
import { UserLoginComponent } from './pages/user-login/user-login.component'
import { UserProfileComponent } from './pages/user-profile/user-profile.component'

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'energy-table', component: EnergyTableComponent },
  { path: 'graphics', component: GraphicsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-profile', component: UserProfileComponent }
]
