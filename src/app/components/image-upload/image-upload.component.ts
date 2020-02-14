import { ImageUploadService } from './image-upload.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IuploadImageForm } from './imageUploadForm.model';
import { Router } from '@angular/router';
import { PostLoanService } from 'src/app/post-loan/post-loan.service';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpEventType } from '@angular/common/http';
@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, OnDestroy {
    currentImage: any;
    uploadFiles: Array<IuploadImageForm> = [
        {
            ImageType: 'SELFIE',
            file: null,
            filePath: null,
            required: true,
            uploaded: false,
            name: 'Selfie',
        },
        {
            ImageType: 'FORMA',
            file: null,
            filePath: null,
            required: true,
            uploaded: false,
            name: 'Form A',
        },
        {
            ImageType: 'MANDATE',
            file: null,
            filePath: null,
            required: false,
            uploaded: false,
            name: 'Mandate Form',
        },
        {
            ImageType: 'TRANSFER',
            file: null,
            filePath: null,
            required: false,
            uploaded: false,
            name: 'Transfer Letter',
        },
        {
            ImageType: 'LOANADVANCE',
            file: null,
            filePath: null,
            required: false,
            uploaded: false,
            name: 'Loan Advance',
        },
        {
            ImageType: 'AUTHORITYNOTE',
            file: null,
            filePath: null,
            required: false,
            uploaded: false,
            name: 'Authority Note',
        },
        {
            ImageType: 'PASSPORT',
            file: null,
            filePath: null,
            required: false,
            uploaded: false,
            name: 'Passport Picture',
        },
    ];

    constructor(
        private imageUploadService: ImageUploadService,
        private router: Router,
        private postLoanService: PostLoanService,
        private shared: SharedService
    ) {}

    ngOnInit() {
        this.imageUploadService.startImageUpload.subscribe((id: string) => {
            // if (id) {
            //     // console.log('event recieved');
            //     this.uploadImagesToServerBulk(id, this.uploadFiles);
            // }

            this.uploadImagesToServerBulk(id, this.uploadFiles);
        });
    }

    getImage(id: string, files: FileList) {
        if (files) {
            console.log(files.item(0));
            const output = URL.createObjectURL(files.item(0));
            this.uploadFiles[this.findObjectFromArray(id)].file = files.item(0);
            this.uploadFiles[this.findObjectFromArray(id)].filePath = output;
        } else {
            this.uploadFiles[this.findObjectFromArray(id)].filePath = null;
            this.uploadFiles[this.findObjectFromArray(id)].file = null;
        }

        // console.log(this.uploadFiles, 'array');
    }

    sendThatFormIsValid() {
        // const everyFieldisUploaded = (imageObject: IuploadImageForm) =>
        //   imageObject.filePath && imageObject.required;
        this.imageUploadService.allRequiredImagesUploaded.emit(
            this.formisValid(this.uploadFiles)
        );
    }

    formisValid(obj: Array<IuploadImageForm>): boolean {
        // if (obj[0].required && obj[0].filePath) {
        //   return true;
        // }
        return (
            obj[0].required &&
            obj[0].filePath &&
            obj[1].filePath &&
            obj[1].required
        );
    }

    findObjectFromArray(id: string) {
        const value = this.uploadFiles.findIndex(object => {
            return object.ImageType === id;
        });
        return value;
    }

    removeImage(id: string) {
        this.uploadFiles[this.findObjectFromArray(id)].filePath = null;
    }

    uploadImagesToServer(id: string) {
        this.uploadFiles.forEach(uploadFile => {
            if (uploadFile.filePath) {
                const imageResponse = {
                    id,
                    Image: uploadFile.file,
                    Type: uploadFile.ImageType,
                };
                this.imageUploadService
                    .updateImage(id, imageResponse)
                    .subscribe(response => {
                        console.log(response);
                        uploadFile.uploaded = response.Status;
                    });
            }
        });
        const selectedImages = this.uploadFiles.filter(item => item.filePath);
        sessionStorage.setItem('imageResponse', JSON.stringify(selectedImages));
        this.postLoanService.loading.dismiss();
        console.log('image upload complete');
        this.router.navigate(['loan-posting-confirmation']);
    }

    uploadImagesToServerBulk(
        id: string,
        filestoUpload: Array<IuploadImageForm>
    ) {
        const results = this.filterForContentToUpload(filestoUpload);
        console.log(results, 'filter results');
        this.imageUploadService.attachImage(id, results).subscribe(
            event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        console.log(
                            `Upload Progress ${(
                                Math.round(event.loaded / event.total) * 100
                            ).toString()}%`
                        );
                        break;
                    case HttpEventType.Response:
                        console.log(event.body, 'response');
                }
            },
            () => this.shared.presentToast('Failed to upload')
        );
        const selectedImages = this.uploadFiles.filter(item => item.filePath);
        sessionStorage.setItem('imageResponse', JSON.stringify(selectedImages));
        // this.postLoanService.loading.dismiss();
        // console.log('image upload complete');
        // this.router.navigate(['loan-posting-confirmation']);
    }

    filterForContentToUpload(filestoUpload: Array<IuploadImageForm>) {
        const filterObject = (file: IuploadImageForm) => file.file;
        return filestoUpload.filter(filterObject);
    }

    ngOnDestroy() {
        this.imageUploadService.startImageUpload.unsubscribe();
    }

    convertToBase64(file: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result.toString().split(',')[1];
                resolve(result);
            };
            reader.onerror = error => reject(error);
        });
    }
}
