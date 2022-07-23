export default function (ctx) {
  const user = ctx.app.$cookies.get('arziantseva_username')
  const authUntil = ctx.app.$cookies.get('auth_until')
  if (user && authUntil > Date.now()) {
    return ctx.redirect({ name: 'admin' })
  }
}
