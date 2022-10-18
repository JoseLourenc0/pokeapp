/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public storageState = new Subject<boolean>();
  public setUsed = new Subject<boolean>();
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.storageState.next(true);
  }

  public async set(key: string, value: any) {
    await this.waitStorageGetReady();
    await this._storage?.set(key, value);
    this.setUsed.next(!this.setUsed);
  }

  public async get(key: string) {
    await this.waitStorageGetReady();
    return await this._storage?.get(key);
  }

  public async getKeys() {
    await this.waitStorageGetReady();
    return await this._storage?.keys();
  }

  private async waitStorageGetReady() {
    return new Promise(resolve => {
      if(this._storage) {return resolve(true);}
      this.storageState.subscribe(e => resolve(e));
    });
  }
}
