import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { GvarService } from './../gvar.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  urlImageStorage : string[] = [];

  constructor(
    private afStorage : AngularFireStorage,
  	public gvarService : GvarService
  ) {}
  async ionViewDidEnter(){
    await this.gvarService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData(){
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res)=>{
      res.items.forEach((itemRef)=>{
        itemRef.getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url);
        });
      });
    }).catch((error)=>{
      console.log(error);
    });
  }
}
