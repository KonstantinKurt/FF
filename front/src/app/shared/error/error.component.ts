import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  private title: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((param: Params) => {
      this.setTitle(param.type);
    });
  }

  ngOnInit() {
  }

  private setTitle(type: string) {
    switch (type) {
      case '500': {
        this.title = `Something went wrong`;
        break;
      }
      case '404': {
        this.title = `Not found`;
        break;
      }
      default: {
        this.title = `Something went wrong`;
        break;
      }
    }
  }

}
