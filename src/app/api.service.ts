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

  getSingleTheme(themeId:string){
    return this.http.get<Theme>(`/api/themes/${themeId}`)
  };

  createCube(themeName: string, postText: string, colour: string, size: string, rotation: string[]){
    const payload = { themeName, postText, size, colour, rotation };
    return this.http.post<Theme>('/api/themes', payload)
  };

  createPost(themeId: string, postText: string){
    const payload = { postText }
    return this.http.post<Theme>(`/api/themes/${themeId}`, payload)
  };

  // updateCube(themeId: string, themeName: string, postText: string, colour: string, size: string, rotation: string[]){
  //   const payload = { themeName, postText, size, colour, rotation };
  //   return this.http.put<Theme>(`/api/themes/${themeId}`, payload)
  // };

}