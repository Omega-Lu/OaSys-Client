
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from 'src/app/_services/debtor.service';

@Component({
  selector: 'app-maintain-debtor',
  templateUrl: './maintain-debtor.component.html',
  styleUrls: ['./maintain-debtor.component.css']
})
export class MaintainDebtorComponent implements OnInit {

  @Output() return = new EventEmitter<string>();
  debtors: Debtor[] = [];
  debtor: Debtor;
  successDelete : boolean = false;
  model: any;
  delete : boolean = false;
  searchText: any = '';
  updateDebtor: boolean = false;
  deleteNumber : any;
  constructor(private debtorService: DebtorService) { }

  ngOnInit() {
    this.getAllDebtors();
  }

  deletee(delet : any){
    this.deleteNumber = delet;
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe((response) => {
      this.debtors = response;
      console.log(this.debtors);
    });
  }

  deleteDebtor() {
    this.debtorService.deleteDebtor(this.deleteNumber).subscribe((response) => {
      this.getAllDebtors();
      console.log(this.debtors);
    });
  }

  populateForm(debtor : Debtor){
    this.debtor = debtor;
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.debtors = this.debtors.filter((employee) =>{
        console.log(employee.name.match(searchValue));
        return employee.name.match(searchValue);

            });
            console.log(this.debtor);
          }
    else {
      this.getAllDebtors();
    }
  }

  back(){
    this.return.emit('false');
  }

}
