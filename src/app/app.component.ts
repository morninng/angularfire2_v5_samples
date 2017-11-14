import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireObject,  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

const firebase_path_user = 'test_user';

interface User {
  name: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'app';
  user: Observable<User>;
  user_ref: AngularFireObject<User>;

  constructor(private db: AngularFireDatabase) {
    this.user_ref = this.db.object( firebase_path_user );
    this.user = db.object(firebase_path_user).valueChanges();

    this.user_ref.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
    });
  }

  save_firebasedata() {
   // this.user_ref = this.db.object( firebase_path_user );
    this.user_ref.set({name: 'sss', id: 111});
  }

  update_firebasedata() {
   // this.user_ref = this.db.object( firebase_path_user );
    this.user_ref.update({name: 'ddd'});
  }

  delete_firebasedata() {
  //  this.user_ref = this.db.object( firebase_path_user );
    this.user_ref.remove();
  }


}
