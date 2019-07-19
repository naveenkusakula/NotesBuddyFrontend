// Author Name: Sunit Shah
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css']
})
export class CourseHomeComponent implements OnInit {
  [x: string]: any;
  notes = [];
  courseId = ''
  courseName = ''
  formdata;
  location;
  selectedFile: File;
  courses;
  username;
  userid;
  constructor(private route: ActivatedRoute, private client: HttpClient, private authentocationService: AuthenticationService) { }

  ngOnInit() {
    if(this.authentocationService.isUserLoggedIn())
    {
      this.username =  sessionStorage.getItem('username')
      this.userid = sessionStorage.getItem('userid')
      this.client.get("http://localhost:9090/getCoursesForProgram?programId=" +this.programId)
    .subscribe((data:any)=>{
    this.courses =data.Data;
    });
    }
    else
    {
      this.authentocationService.logOut();
      this.router.navigate(['']);
    }

    this.formdata = new FormGroup({
      title: new FormControl("", Validators.compose([
        Validators.required
      ])),
      description: new FormControl("", Validators.compose([
        Validators.required
      ])),
      emailid: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])),
      courseID: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });

    this.client.get("https://webbackendnotesbuddy.herokuapp.com/getCoursesForProgram?programId=" +this.programId)
    .subscribe((data:any)=>{
    this.courses =data.Data;
    });

    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
      this.courseName = params['courseName'];
    });
    // this.client.get("https://webbackendnotesbuddy.herokuapp.com/getCourseDetail?courseId=" +this.courseId)
    // .subscribe((data:any)=>{

    // });
    this.client.get("https://webbackendnotesbuddy.herokuapp.com/getNotes?courseId=" + this.courseId)
      .subscribe((data: any) => {
        this.notes = data.Data;
      });

    //   this.notes = [
    //     {id: 1, title:'Superman', description:"hsdhvjhsgfhvsdhfbjhsbfhj",location:"D:\DAL\Summer_19\web\project\proj\webdevelopmentproject\HtmlPage\faq.html",dateAdded:"sdfsdf"},
    //     {id: 2, title:'sdfg', description:"hsdhvjhsgfhvsdhfbjhsbfhj",location:"sdfsdf",dateAdded:"sdfsdf"},
    //     {id: 3, title:'xbvb', description:"hsdhvjhsgfhvsdhfbjhsbfhj",location:"sdfsdf",dateAdded:"sdfsdf"},
    //     {id: 4, title:'Supbxcverman', description:"hsdhvjhsgfhvsdhfbjhsbfhj",location:"sdfsdf",dateAdded:"sdfsdf"},
    //     {id: 5, title:'ghshg', description:"hsdhvjhsgfhvsdhfbjhsbfhj",location:"sdfsdf",dateAdded:"sdfsdf"},
    //     {id: 6, title:'ewrq', description:"hsdhvjhsgfhvsdhfbjhsbfhj",location:"sdfsdf",dateAdded:"sdfsdf"}
    // ];
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onClickSubmit(data) {
    let formdata: FormData = new FormData();
    if (this.selectedFile) {
      formdata.append('file', this.selectedFile);
      //End point needs to be updated if hosted on a different server
      this.client.post('https://webbackendnotesbuddy.herokuapp.com/notes/savenotes', formdata).subscribe(resBody => {
        this.location = resBody['location'];
        this.updateNotes(data.title, data.emailid, data.courseID)
      },
        error => { alert("some thing went wrong, please try again later or contact support@notesbuddy.com") }
      );
    }
    else {
      alert("Please select file");
    }
  }
  updateNotes(title: string, emailID: string, description: string) {
    var object = {};
    object["name"] = title;
    object["email"] = emailID;
    object["description"] = description;
    object["location"] = this.location;
    object["courseID"] = this.courseId;
    object["userID"] = this.userid;
    //End point needs to be updated if hosted on a different server
    this.client.post('https://webbackendnotesbuddy.herokuapp.com/notes/upload', object).subscribe(resBody => {
      alert(resBody['name'] + " Notes Uploaded Sucessfully!!!!!");
      // this.formdata.reset();
      window.location.reload();
    });
  }

  onClickMe(value: any) {
    //End point needs to be updated if hosted on a different server
    window.location.href = 'https://webbackendnotesbuddy.herokuapp.com/notes/download/' + value;
  }

}
