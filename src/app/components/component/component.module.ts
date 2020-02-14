import { PipesModule } from './../../pipes/pipes/pipes.module';
import { ImageUploadComponent } from './../image-upload/image-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [ImageUploadComponent],
  providers: [],
})
export class ComponentModule {}
