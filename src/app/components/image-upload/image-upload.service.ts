import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { IuploadImageForm } from './imageUploadForm.model';

@Injectable({
    providedIn: 'root',
})
export class ImageUploadService {
    startImageUpload: EventEmitter<string> = new EventEmitter<string>();
    allRequiredImagesUploaded: EventEmitter<boolean> = new EventEmitter<
        boolean
    >();
    constructor(private http: HttpClient) {}
    private headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data;',
        Accept: '*/*',
    });

    updateImage(id: string, imageResponse: any): Observable<any> {
        const httpParams = new HttpParams().set('id', id);
        const options = { params: httpParams };
        return this.http.post(
            `${environment.filmsApi}/mobile/updateimagesingle`,
            imageResponse,
            options
        );
    }

    attachImage(id: string, body: Array<IuploadImageForm>): Observable<any> {
        // setup query parameters
        const httpParams = new HttpParams().set('paymentRequestId', id);
        // setup formdata for images
        const fd = new FormData();
        for (const file of body) {
            console.log(file, 'files');
            fd.append(
                file.ImageType,
                new Blob([file.file], { type: file.file.type }),
                file.file.name
            );
        }
        // console.log(fd);
        return this.http.post(
            `${environment.filmsApi}/mobile/attachImages`,
            fd,
            {
                params: httpParams,
                reportProgress: true,
                observe: 'events',
                // headers: this.headers,
            }
        );
    }
}
