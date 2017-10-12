const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';
const FETCH_POSTS = 'FETCH_POSTS';

import * as firebase from 'firebase';
var config = {
	apiKey: 'AIzaSyB_Qv8YEigQUJZUR_553KRN02v0EZqtkhg',
	authDomain: 'react-ecommerce.firebaseapp.com',
	databaseURL: 'https://react-ecommerce.firebaseio.com',
	projectId: 'react-ecommerce',
	storageBucket: 'react-ecommerce.appspot.com',
	messagingSenderId: '392133875475'
};
 
const fi = firebase.initializeApp(config).database().ref();

const Posts = fi;

export function AddPost(data) {
	return {
		type: ADD_POST,
		payload: data
	};
}

export function DeletePost(data) {
	return {
		type: DELETE_POST,
		payload: data
	};
}

export function UpdatePost(index, data) {
	return {
		type: UPDATE_POST,
		payload: {data: data, index: index}
	};
}

export function FetchPosts() {
	console.log('firebase', Posts);
	return dispatch => {
		Posts.on('value', snapshot => {
			console.log('value', snapshot);
			dispatch({
				type: FETCH_POSTS,
				payload: snapshot.val()
			});
		});
	};
}