export interface IuploadImageForm {
    ImageType: string;
    file: any | null;
    filePath: string | null;
    required: boolean;
    uploaded: boolean;
    name: string;
}
