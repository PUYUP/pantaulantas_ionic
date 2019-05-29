import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

// Component
import { SendRebukesComponent } from '../../components/send-rebukes/send-rebukes.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: HomePage }])
    ],
    entryComponents: [
        SendRebukesComponent
    ],
    declarations: [
        HomePage,
        SendRebukesComponent
    ]
})
export class HomePageModule {}
