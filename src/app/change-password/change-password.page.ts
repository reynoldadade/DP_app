import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { throttleTime } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';
import { IChangePassword } from './change-password.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    constructor(
        private fb: FormBuilder,
        private changePasswordService: ChangePasswordService,
        private sharedService: SharedService,
        private router: Router
    ) {}
    changePasswordForm: FormGroup;
    spinner = false;
    ngOnInit() {
        this.changePasswordForm = this.fb.group({
            userid: [sessionStorage.getItem('userCode'), Validators.required],
            oldpass: ['', Validators.required],
            newpass: ['', Validators.required],
        });
    }

    changePassword(form: FormGroup) {
        this.spinner = true;
        this.changePasswordService
            .changePassword(form.value)
            .pipe(throttleTime(1000))
            .subscribe(
                (response) => {
                    if (response) {
                        this.sharedService.presentToast('Password Changed');
                    } else {
                        this.sharedService.presentToast(
                            'Unable to change Password'
                        );
                    }
                    this.spinner = false;
                    //  console.log(response, '[Password Change Response]');
                    form.reset();
                    this.router.navigate(['landing']);
                },
                () => {
                    this.sharedService.presentToast('Network Error');
                    this.spinner = false;
                    form.reset();
                }
            );
    }
}
