import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent} from '../page-components/upload/upload.component'
import { HomeComponent } from '../page-components/home/home.component';
import { PageTestComponent } from '../page-components/page-test/page-test.component';

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
