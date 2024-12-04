function setCookie(
  name: string,
  value: string,
  days: number,
  secure: boolean = false,
) {
  let expires = '';
  let protect = '';

  if (secure) {
    protect += '; Secure; HttpOnly; SameSite=Strict';
  }

  if (days) {
    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = name + '=' + (value || '') + expires + protect + '; path=/';
}

function getCookie(name: string) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
}

function appendCookie(
  name: string,
  newValue: string,
  days: number,
  secure: boolean = false,
) {
  let currentValue = getCookie(name);

  if (currentValue) {
    currentValue += ',' + newValue;
  } else {
    currentValue = newValue;
  }

  setCookie(name, currentValue, days, secure);
}

function deleteCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export { appendCookie, deleteCookie, getCookie };
