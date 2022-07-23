export default function (ctx) {
  const user = ctx.app.$cookies.get('arziantseva_username')
  if (!user) {
    return ctx.redirect({ name: 'login', query: { status: false } })
  }
  const authUntil = ctx.app.$cookies.get('auth_until')
  if (authUntil < Date.now()) {
    ctx.app.$cookies.remove('arziantseva_username')
    ctx.app.$cookies.remove('auth_until')
    return ctx.redirect({ name: 'login', query: { status: 'expired' } })
  }
}
