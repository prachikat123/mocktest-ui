import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Subject } from '../../models/subject.model';
import { QuestionModel } from '../../models/question.model';
import { MockTestModel } from '../../models/mock-test.model';
import { UserService } from './user.service';
import { TestResultModel } from '../../models/test-result.model';
import { TestSubmitResponseModel } from '../../models/test-submit-response.model';

@Injectable({
  providedIn: 'root',
})
export class MockTestService {
  baseUrl: string = 'https://localhost:8081/api';
  private apiUrl = 'https://localhost:8081/api/questions/get-questions';
  private resultUrl = 'https://localhost:8081/api/results';

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  getAllTests() {
    return this.http.get(`${this.baseUrl}/tests`, this.getAuthHeader());
  }

  getResult(attemptId: number) {
    return this.http.get<TestResultModel>(`${this.resultUrl}/${attemptId}`, this.getAuthHeader());
  }

  private getAuthHeader() {
    const token = this.userService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getActiveTests(): Observable<MockTestModel[]> {
    return this.http.get<MockTestModel[]>(`${this.baseUrl}/mocktest/active`, this.getAuthHeader());
  }

  startTest(testId: number) {
    return this.http.get(`${this.baseUrl}/mocktest/start/${testId}`, this.getAuthHeader());
  }

  getRemainingTime(attemptId:number){
    return this.http.get<TestResultModel>(
      `${this.baseUrl}/CheckTime/remaining-time/${attemptId}`,this.getAuthHeader());
  }

  getQuestions(subjectId: number, levelId: number): Observable<QuestionModel[]> {
    return this.http.post<QuestionModel[]>(this.apiUrl, { subjectId, levelId }).pipe(
      map((questions: QuestionModel[]) => {
        return questions.map((q) => ({
          ...q,
          // parse answerSet JSON string into array
          answerSet: typeof q.answerSet === 'string' ? JSON.parse(q.answerSet) : q.answerSet,
          status: 'unanswered',
          givenAnswer: [],
        }));
      }),
    );
  }

  submitTest(payload: any) { 
    return this.http.post<TestSubmitResponseModel>(
      `${this.baseUrl}/test/submit`,
      payload,
      this.getAuthHeader(),
    );
  }

  getActiveSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/subject/all`);
  }
}
