export interface IuploadImageForm {
    ImageType: string;
    file: File | null;
    filePath: string | null;
    required: boolean;
    uploaded: boolean;
    name: string;
}
