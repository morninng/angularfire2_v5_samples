import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';

interface Item {
  name: string;
  id: number;
}

interface ItemInfo extends Item {
  key: string;
}

const firebase_path_items = 'test_items';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  items: Observable<Item[]>;
  item_info: Observable<ItemInfo[]>;
  itemsRef: AngularFireList<Item[]>;
  found_items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  found_items2$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private db: AngularFireDatabase) {
   }

  ngOnInit() {
    this.itemsRef = this.db.list(firebase_path_items);
    this.items = this.itemsRef.valueChanges();

    const items_first = this.itemsRef.valueChanges().take(1);
    items_first.subscribe((list) => {
      console.log('items_first', list);
      list.forEach((item) => {
        console.log('item', item);

      });
    });

    this.item_info = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsRef.snapshotChanges().take(1).subscribe(changes => {
      console.log(changes);
      changes.forEach((item) => {
        console.log('item.payload.key', item.payload.key);
        console.log('item.payload.val', item.payload.val());
      });
    });


    this.itemsRef.stateChanges().subscribe(changes => {
      console.log('stateChanges', changes);
    });

    this.itemsRef.auditTrail().subscribe(trail => {
      console.log('auditTrail', trail);
    });

    this.found_items$ = this.db.list(firebase_path_items, (ref) =>
      ref.orderByChild('name').equalTo('ddd')
    ).snapshotChanges();

    this.found_items2$ = this.db.list(firebase_path_items, (ref) =>
      ref.orderByChild('name').startAt('eee')
    ).snapshotChanges();

  }

  add() {
    this.itemsRef.push({ name: 'sss', id: 111 }).then(() => {
      console.log('added');
    });
  }

  update(key) {
    console.log(key);
    this.itemsRef.set(key, {name: 'dde', id: 222});
  }

  delete(key) {
    this.itemsRef.remove(key);
  }

}


