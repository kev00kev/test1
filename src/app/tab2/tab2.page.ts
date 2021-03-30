import { Component } from '@angular/core';
import { GvarService } from './../gvar.service';
import { AngularFireStorage } from '@angular/fire/storage';



export interface fileFoto {
	name : string; //filepath
	path : string; //webviewpath
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlImageStorage : string[] = [];
  constructor(	
    private afStorage : AngularFireStorage,
  	public gvarService : GvarService
  ) {}

  async ngOnInit() {
   
  }

  TambahFoto(){
  	this.gvarService.tambahFoto();
  }
  
 




  uploadFoto(){
    this.urlImageStorage=[];
    for(var index in this.gvarService.dataFoto){
      const imgFilepath = "imgStorage/"+(this.gvarService.dataFoto[index].filePath);
      this.afStorage.upload(imgFilepath, this.gvarService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url);
        });
      });
    }
 
  }

}
