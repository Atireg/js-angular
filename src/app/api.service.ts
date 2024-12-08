import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from './types/theme';
import { Post } from './types/post';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getThemes(){
    return this.http.get<Theme[]>('/api/themes')
  };

  getSingleTheme(themeId: string){
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

  getLatestPosts(countPosts: number){
    return this.http.get<Post[]>(`/api/posts?limit=${countPosts}`)
  }

  updatePost(themeId: string, postId: string, postText: string){
    return this.http.put<Theme>(`/api/themes/${themeId}/posts/${postId}`, postText)
  }

}