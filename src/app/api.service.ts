import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from './types/theme';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getThemes(){
    return this.http.get<Theme[]>('/api/themes')
  };

  getSingleTheme(id:string){
    return this.http.get<Theme>(`/api/themes/${id}`)
  };

  createCube(themeName: string, postText: string, colour: string, size: string, rotation: string[]){
    const payload = { themeName, postText, size, colour, rotation };
    // console.log(payload);
    return this.http.post<Theme>('/api/themes', payload)
  };


}