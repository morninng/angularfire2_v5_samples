// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBE1rGgyg4buxhWaQSKbWSkfDzG0HeLLi8',
    authDomain: 'mixidea-test-a2f1f.firebaseapp.com',
    databaseURL: 'https://mixidea-test-a2f1f.firebaseio.com',
    projectId: 'mixidea-test-a2f1f',
    storageBucket: 'mixidea-test-a2f1f.appspot.com',
    messagingSenderId: '662140797815'
  },
  cloudfunction_base_url: 'https://us-central1-mixidea-test-a2f1f.cloudfunctions.net/',
};
