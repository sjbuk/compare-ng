import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent} from '../app/upload/upload.component'
import { HomeComponent } from './home/home.component';
import { PageTestComponent } from './page-test/page-test.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'test', component: PageTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
