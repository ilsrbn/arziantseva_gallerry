export default function ({ $auth, redirect }) {
  $auth.loggedIn && redirect('/admin')
}
