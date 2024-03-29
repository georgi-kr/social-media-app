import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowHistoryDTO } from '../models/show-history-dto';
import { CONFIG } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  public constructor(private readonly http: HttpClient) {}

  public getHistory(): Observable<ShowHistoryDTO[]> {
    return this.http.get<ShowHistoryDTO[]>(
      `${CONFIG.DOMAIN_NAME}/admin/history`
    );
  }
}
