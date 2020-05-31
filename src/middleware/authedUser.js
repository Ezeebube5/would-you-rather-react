/*
 * Authed User Middleware
 *
 * Keeps the authedUser logged in even after browser refresh
 * by utilizing a cookie to remember the authed user name.
 * Why? I got tired of "logging in" whenever the app is refreshed.
 */

import {
  SET_AUTHED_USER,
  GET_AUTHED_USER_FROM_COOKIE,
  LOGOUT_AUTHED_USER } from '../actions/authedUser'

const COOKIE_NAME = 'authedUser'
const COOKIE_DURATION = 2

const authedUser = (store) => (next) => (action) => {
  switch (action.type) {

    case SET_AUTHED_USER :
      setCookie(COOKIE_NAME, action.id, COOKIE_DURATION)
      return next(action)

    case GET_AUTHED_USER_FROM_COOKIE :
      const authedUser = getCookie(COOKIE_NAME)
      action.id = authedUser ? authedUser : null
      return next(action)

    case LOGOUT_AUTHED_USER :
      setCookie(COOKIE_NAME, action.id, -1)
      action.id = null
      return next(action)

    default :
      return next(action)
  }
}

/*
 * setCookie and getCookie functions gotten from w3schools at:
 * https://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(cookieName, cookieValue, extraDays) {
  var date = new Date();
  date.setTime(date.getTime() + (extraDays * 24 * 60 * 60 * 1000));
  var expires = "expires="+date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var cookieArray = document.cookie.split(';');
  for(var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export default authedUser
