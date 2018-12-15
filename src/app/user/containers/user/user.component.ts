import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {

  user$: Observable<IUser>;

  constructor(
    private route: ActivatedRoute,
    private dataSvc: DataService
  ) { }

  ngOnInit() {
    // Non Observalbe way of reading param values
    // const id = this.route.snapshot.paramMap.get('id');
    // console.log('Non Observalbe =>', id);

    // Observalbe way of reading param
    // this.route.paramMap.subscribe((param: ParamMap) => {
    //   console.log('Observable Way =>', param.get('id'));
    // });

    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.dataSvc.getUser(params.get('id')))
    );

  }

}
