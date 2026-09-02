// =============================================
// مدیریت وضعیت کاربر در سایت
// =============================================

const AppState = {
  currentUser: null,
  currentProfile: null,
  isAuthenticated: false,

  async init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      this.currentUser = user;
      this.isAuthenticated = true;
      await this.loadProfile();
    }
  },

  async loadProfile() {
    if (!this.currentUser) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', this.currentUser.id)
      .single();
    this.currentProfile = data;
  },

  async refreshProfile() {
    await this.loadProfile();
  }
};
