import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	private socket;

	constructor() {}

	connect(): Subject<MessageEvent> {
		this.socket = io.connect('http://10.208.1.47:3000');

		const observable = new Observable((observer) => {
			this.socket.on('postagem', (data) => {
				observer.next(data);
			});

			this.socket.on('comentario', (data) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});

		const observer = {
			next: (data: Object) => {
				this.socket.emit('postagem', JSON.stringify(data));
			}
		};

		return Subject.create(observer, observable);
	}
}