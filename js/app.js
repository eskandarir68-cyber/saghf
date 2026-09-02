const app = document.getElementById("app");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

function renderHomePage() {
  app.innerHTML = `
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-label">پلتفرم حرفه‌ای املاک ایران</div>

        <h1>
          خانه‌ای که دنبالش هستید،
          <span>پیدا کنید</span>
        </h1>

        <p class="hero-description">
          در سقف، خرید، فروش و اجاره ملک ساده‌تر، سریع‌تر و مطمئن‌تر انجام می‌شود.
          همه چیز برای پیدا کردن خانه مناسب شما زیر یک سقف جمع شده است.
        </p>

        <form class="search-box" id="searchForm">
          <input
            id="searchText"
            type="search"
            placeholder="مثلاً آپارتمان در تهران"
            aria-label="جستجوی ملک"
          >

          <select id="transactionType" aria-label="نوع معامله">
            <option value="">نوع معامله</option>
            <option value="sale">فروش</option>
            <option value="rent">اجاره</option>
            <option value="mortgage">رهن</option>
          </select>

          <select id="propertyType" aria-label="نوع ملک">
            <option value="">نوع ملک</option>
            <option value="apartment">آپارتمان</option>
            <option value="house">خانه</option>
            <option value="land">زمین</option>
            <option value="office">دفتر کار</option>
          </select>

          <button class="search-button" type="submit">
            جستجو
          </button>
        </form>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="section-heading">
          <h2>چرا سقف؟</h2>
          <p>راهی ساده و مطمئن برای رسیدن به خانه مناسب شما</p>
        </div>

        <div class="feature-grid">
          <article class="feature-card">
            <div class="feature-icon">⌕</div>
            <h3>جستجوی هوشمند</h3>
            <p>
              ملک موردنظر خود را بر اساس شهر، منطقه، قیمت و متراژ پیدا کنید.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">⌂</div>
            <h3>فایل‌های واقعی</h3>
            <p>
              فایل‌های ملکی توسط مشاوران ثبت و با اطلاعات کامل نمایش داده می‌شوند.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">☎</div>
            <h3>ارتباط مستقیم</h3>
            <p>
              به‌سادگی با مشاور ملک تماس بگیرید و اطلاعات بیشتری دریافت کنید.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-box">
          <div>
            <h2>مشاور املاک هستید؟</h2>
            <p>
              فایل‌های ملکی خود را در سقف ثبت کنید و مشتریان بیشتری پیدا کنید.
            </p>
          </div>

          <a class="btn" href="#/register">ثبت‌نام به‌عنوان مشاور</a>
        </div>
      </div>
    </section>
  `;

  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchText = document.getElementById("searchText").value.trim();
    const transactionType = document.getElementById("transactionType").value;
    const propertyType = document.getElementById("propertyType").value;

    const params = new URLSearchParams();

    if (searchText) {
      params.set("search", searchText);
    }

    if (transactionType) {
      params.set("transaction", transactionType);
    }

    if (propertyType) {
      params.set("type", propertyType);
    }

    window.location.hash = `/properties?${params.toString()}`;
  });
}

function renderSimplePage(title, description) {
  app.innerHTML = `
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-label">سقف</div>
        <h1>${title}</h1>
        <p class="hero-description">${description}</p>
        <a href="#/" class="btn btn-primary">بازگشت به صفحه اصلی</a>
      </div>
    </section>
  `;
}

function router() {
  const currentHash = window.location.hash || "#/";

  if (currentHash === "#/" || currentHash === "#") {
    renderHomePage();
    return;
  }

  if (currentHash.startsWith("#/properties")) {
    renderSimplePage(
      "جستجوی املاک",
      "در مرحله بعد، فهرست واقعی املاک و فیلترهای Supabase را به این صفحه اضافه می‌کنیم."
    );
    return;
  }

  if (currentHash === "#/about") {
    renderSimplePage(
      "درباره سقف",
      "سقف یک پلتفرم برای پیدا کردن خانه، فروش، خرید و اجاره ملک است."
    );
    return;
  }

  if (currentHash === "#/login") {
    renderSimplePage(
      "ورود به حساب کاربری",
      "فرم ورود کاربران در مرحله احراز هویت به این صفحه اضافه می‌شود."
    );
    return;
  }

  if (currentHash === "#/register") {
    renderSimplePage(
      "ثبت‌نام در سقف",
      "ثبت‌نام مشتری و مشاور املاک در مرحله بعد فعال می‌شود."
    );
    return;
  }

  renderSimplePage(
    "صفحه پیدا نشد",
    "آدرس واردشده در سایت سقف وجود ندارد."
  );
}

menuButton.addEventListener("click", function () {
  mobileMenu.classList.toggle("open");
});

mobileMenu.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    mobileMenu.classList.remove("open");
  }
});

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
