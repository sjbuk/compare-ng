import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './services/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page-components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { UploadComponent } from './page-components/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormCompareComponent } from './components/form-compare/form-compare.component';
import { PageTestComponent } from './page-components/page-test/page-test.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';
import { DndDirective } from './directive/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { ImportWizardComponent } from './components/import-wizard/import-wizard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CompareListComponent } from './components/compare-list/compare-list.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResultGridComponent } from './components/result-grid/result-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        UploadComponent,
        FormCompareComponent,
        PageTestComponent,
        DragNDropComponent,
        DndDirective,
        ProgressComponent,
        ImportWizardComponent,
        CompareListComponent,
        ResultGridComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatChipsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule ,
        FormsModule,
        MatStepperModule,
        MatBadgeModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
    ],
    exports: [

    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [FormCompareComponent]
})
export class AppModule { }
