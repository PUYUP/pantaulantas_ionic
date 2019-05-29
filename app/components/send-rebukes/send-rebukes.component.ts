import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';

// LOCAL SERVICES
import { CoresService } from '../../services/cores.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-send-rebukes',
  templateUrl: './send-rebukes.component.html',
  styleUrls: ['./send-rebukes.component.scss'],
})
export class SendRebukesComponent implements OnInit {

    @ViewChild('sendRebukesStep') sendRebukesStep: IonSlides;
    @ViewChild('explanationElement', { read: ElementRef }) explanationElement: ElementRef;

    // Optional parameters see http://idangero.us/swiper/api/ for valid options.
    slideOpts = {
        initialSlide: 0,
        speed: 250,
        autoHeight: true,
        roundLengths: true
    };
    stepIndex = 0;
    vehicleSelected = false;

    // Define
    vehicleList: any;
    vehicleViolations: any;
    vehicleDetail: any;
    stepAFormGroup: FormGroup;
    stepBFormGroup: FormGroup;
    stepAValue: any;
    stepBValue: any;
    isLoading = true;
    isError = false;
    violation: any;

    constructor(
        public modalCtrl: ModalController,
        public formBuilder: FormBuilder,
        private coresService: CoresService) {

        // Activated form
        this.stepAForm();
        this.stepBForm();
    }

    ngOnInit() {
        // Run Fetch vehicle
        this.getVehicles();

        // Get current step index
        this.currentStepIndex();

        // Lock step
        this.sendRebukesStep.lockSwipeToNext(true);
        this.sendRebukesStep.lockSwipeToPrev(true);
    }

    // Close modal
    close() {
        this.modalCtrl.dismiss();
    }

    // Get current index
    currentStepIndex(): void {
        this.sendRebukesStep.getActiveIndex()
            .then((index) => {
                this.stepIndex = index;
            });
    }

    // Prev step
    prevStep(index: number): void {
        // Open lock
        this.sendRebukesStep.lockSwipeToNext(false);
        this.sendRebukesStep.lockSwipeToPrev(false);

        const stepIndex = index - 1;
        this.sendRebukesStep.slideTo(stepIndex);
    }

    // Next step
    nextStep(index: number): void {
        // Open lock
        this.sendRebukesStep.lockSwipeToNext(false);
        this.sendRebukesStep.lockSwipeToPrev(false);

        const stepIndex = index + 1;
        this.sendRebukesStep.slideTo(stepIndex);
    }

    // Step change
    stepChange(event: any): any {
        this.stepAValue = this.stepAFormGroup.value;
        this.stepBValue = this.stepBFormGroup.value;
        console.log(this.stepAValue);
        console.log(this.stepBValue);
        console.log(this.vehicleViolations);
        console.log(this.vehicleDetail);
    }

    // On trasition change
    stepOnChange(): void {
        // Get current step index
        this.currentStepIndex();

        // Lock step
        this.sendRebukesStep.lockSwipeToNext(true);
        this.sendRebukesStep.lockSwipeToPrev(true);

        // Init textarea violation height
        const explanationValue = this.explanationElement.nativeElement.children[0].value;
        if (explanationValue.length === 0) {
            this.explanationElement.nativeElement.children[0].style.height = 'auto';
        }
    }

    // Fetch all Vehicles
    private getVehicles(event: any = ''): void {
        this.coresService.getVehicles()
            .pipe(
                finalize(() => {
                    // Hilangkan loading
                    this.isLoading = false;
                })
            )
            .subscribe((res: any) => {
                if (res) {
                    this.vehicleList = res.results;
                }
            }, (error) => {
                this.isError = true;
                console.log(error);
            });
    }

    // Vehicle detail with violations
    getVehiclesDetail(fetchUrl: string = ''): void {
        this.coresService.getVehiclesDetail(fetchUrl)
            .pipe(
                finalize(() => {
                    // Hilangkan loading
                    this.isLoading = false;
                })
            )
            .subscribe((res: any) => {
                if (res) {
                    this.vehicleDetail = res.vehicle;
                    this.vehicleViolations = res.results;
                }
            }, (error) => {
                this.isError = true;
            });
    }

    // Select vehicle
    vehicleSelect(event) {
        this.vehicleViolations = null;
        this.getVehiclesDetail(event.target.value);
    }

    // Change text to uppercase
    plateOnInput(event) {
        const value = event.target.value.toUpperCase();
        event.target.value = value;
    }

    // Step 1
    private stepAForm() {
        this.stepAFormGroup = this.formBuilder.group({
            number: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(9),
                    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$')
                ]
            ],
            vehicle: ['', Validators.required],
        });
    }

    // Step 2
    private stepBForm() {
        this.stepBFormGroup = this.formBuilder.group({
            violation: ['', Validators.required],
            explanation: [''],
        });
    }

}
