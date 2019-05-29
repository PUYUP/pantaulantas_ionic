import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Component
import { SendRebukesComponent } from '../../components/send-rebukes/send-rebukes.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    constructor(
        public modalController: ModalController) {

    }

    ngOnInit() {

    }

    // Open modal send
    async sendRebukes() {
        const modal = await this.modalController.create({
            component: SendRebukesComponent,
            backdropDismiss: false,
            componentProps: { value: 123 }
        });
        return await modal.present();
    }

}
