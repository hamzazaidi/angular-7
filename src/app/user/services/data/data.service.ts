import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, switchMap, delay } from 'rxjs/operators';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  delayDuration = 1000;

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number = 1): Observable<IUser[]> {
    return this.http.get<IUser[]>(`https://reqres.in/api/users?page=${pageNumber}`).pipe(
      tap(() => console.log('Fetching all Users')),
      switchMap((response: any) => {
        const { data } = response;
        data.forEach((user: IUser) => user.isProcessing = false);
        return of(data);
      }),
      delay(this.delayDuration),
      catchError(this.handleError)
    );
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`https://reqres.in/api/users`, user).pipe(
      tap(() => console.log('Posting User to create')),
      switchMap((response: IUser) => {
        const randomEye = Math.floor(Math.random() * 10) + 1;
        const randomNose = Math.floor(Math.random() * 10) + 1;
        const randomMouth = Math.floor(Math.random() * 10) + 1;
        const randomColor = Math.floor(Math.random() * 10) + 1;
        response.isProcessing = false;
        response.avatar = this.avatarUrl({ randomEye, randomColor, randomMouth, randomNose });
        return of(response);
      }),
      delay(this.delayDuration),
      catchError(this.handleError)
    );
  }

  getUser(id: number | string): Observable<IUser> {
    return this.http.get<IUser>(`https://reqres.in/api/users/${id}`).pipe(
      tap(() => console.log(`Fetching User id=${id}`)),
      map((response: any) => response.data),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`https://reqres.in/api/users/${id}`).pipe(
      tap(() => console.log(`Deleting User id=${id}`)),
      map((response: any) => response),
      delay(this.delayDuration),
      catchError(this.handleError)
    );
  }

  editUser(user: IUser): Observable<IUser> {
    user.name = `${user.first_name} ${user.last_name}`;
    return this.http.patch<IUser>(`https://reqres.in/api/users/${user.id}`, user).pipe(
      tap(() => console.log(`Editing User id=${user.id}`)),
      switchMap((response: IUser) => {
        response.isProcessing = false;
        return of(response);
      }),
      delay(this.delayDuration),
      catchError(this.handleError)
    );
  }

  avatarUrl = ({
    randomEye,
    randomNose,
    randomMouth,
    randomColor
  }) => `https://api.adorable.io/avatars/face/eyes${randomEye}/nose${randomNose}/mouth${randomMouth}/color${randomColor}`

  handleError(e: HttpErrorResponse) {
    return throwError(e.message);
  }

}
